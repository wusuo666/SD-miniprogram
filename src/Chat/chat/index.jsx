import { useState, useRef, useEffect, useCallback } from "react";
import Taro, { useLoad } from "@tarojs/taro";
import { View, Text, ScrollView, Textarea } from "@tarojs/components";
import { Button } from "@taroify/core";
import {
  Arrow,
  Stop,
  SmileOutlined,
  FontOutlined,
  UserOutlined,
  ChatOutlined,
} from "@taroify/icons";
import {
  sendMessageStream,
  saveChatHistory,
  getChatById,
  generateChatId,
  generateSmartTitle,
} from "../api/bailian";
import {
  saveChatMessage,
  getChatSessions,
  getChatSessionDetail,
} from "../../api";
import { BAILIAN_CONFIG } from "../config/bailian";
import "./index.scss";

const WELCOME_MESSAGE = "你好！我是上地街道 AI 助手，有什么可以帮助您的吗？";

export default function Chat() {
  const [chatId, setChatId] = useState("");
  const [chatTitle, setChatTitle] = useState("新对话");
  const [messages, setMessages] = useState([
    { id: "welcome", type: "ai", content: WELCOME_MESSAGE, isWelcome: true },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [streamingId, setStreamingId] = useState(null);
  const [fontSize, setFontSize] = useState("normal");

  const abortFnRef = useRef(null);
  const textBufferRef = useRef([]);
  const isStreamActiveRef = useRef(false);
  const streamTimerRef = useRef(null);
  const scrollIntoViewId = useRef("");

  const quickQuestions = [
    "如何办理居住证？",
    "社区医院在哪里？",
    "养老服务有哪些？",
    "垃圾分类怎么分？",
  ];

  const fontSizeOptions = [
    { label: "小", value: "small", size: "14px" },
    { label: "中", value: "normal", size: "18px" },
    { label: "大", value: "large", size: "26px" },
  ];
  const currentFontSize = fontSizeOptions.find((opt) => opt.value === fontSize);

  const initNewChat = useCallback(() => {
    const newChatId = generateChatId();
    setChatId(newChatId);
    setChatTitle("新对话");
    setMessages([
      {
        id: "welcome",
        type: "ai",
        content: WELCOME_MESSAGE,
        isWelcome: true,
      },
    ]);
  }, []);

  useLoad(() => {
    const { chatId: urlChatId } =
      Taro.getCurrentInstance().router?.params || {};

    if (urlChatId) {
      const chatData = getChatById(urlChatId);
      if (chatData) {
        setChatId(urlChatId);
        setChatTitle(chatData.title);
        setMessages(chatData.messages);
      } else {
        initNewChat();
      }
    } else {
      initNewChat();
    }

    if (!BAILIAN_CONFIG.API_URL || !BAILIAN_CONFIG.API_KEY) {
      Taro.showModal({
        title: "配置提示",
        content: "百炼 API 配置未填写，请先配置后再使用。",
        showCancel: false,
      });
    }
  });

  const saveCurrentChat = useCallback(
    (newMessages, title = null) => {
      if (!chatId) return;
      const finalTitle = title || chatTitle;
      const messagesToSave = newMessages.filter((msg) => !msg.isWelcome);
      if (messagesToSave.length > 0) {
        saveChatHistory(chatId, finalTitle, messagesToSave);
      }
    },
    [chatId, chatTitle],
  );

  const handleFontSizeChange = () => {
    const currentIndex = fontSizeOptions.findIndex(
      (opt) => opt.value === fontSize,
    );
    const nextIndex = (currentIndex + 1) % fontSizeOptions.length;
    setFontSize(fontSizeOptions[nextIndex].value);
    Taro.showToast({
      title: `字体：${fontSizeOptions[nextIndex].label}`,
      icon: "none",
      duration: 1500,
    });
  };

  const handleStopGenerating = () => {
    isStreamActiveRef.current = false;
    textBufferRef.current = [];
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }
    if (abortFnRef.current) {
      abortFnRef.current();
      abortFnRef.current = null;
    }
    setIsLoading(false);
    setStreamingId(null);
    setStreamingText("");
  };

  const finishStream = async (fullText, streamId, userContent) => {
    const aiMessage = { id: streamId, type: "ai", content: fullText };

    setMessages((prev) => {
      const newMessages = [...prev, aiMessage];
      saveCurrentChat(newMessages, chatTitle);
      return newMessages;
    });

    setStreamingId(null);
    setStreamingText("");
    setIsLoading(false);
    abortFnRef.current = null;
    isStreamActiveRef.current = false;
    textBufferRef.current = [];
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }

    let currentTitle = chatTitle;
    if (chatTitle === "新对话" || chatTitle === "New Chat") {
      try {
        const smartTitle = await generateSmartTitle(userContent, fullText);
        if (smartTitle) {
          setChatTitle(smartTitle);
          currentTitle = smartTitle;
          setMessages((prev) => {
            saveCurrentChat(prev, smartTitle);
            return prev;
          });
        }
      } catch (e) {
        console.error("智能标题生成失败", e);
      }
    }

    try {
      const payload = {
        session_id: chatId.startsWith("session_") ? chatId : "",
        title: currentTitle,
        user_message: userContent,
        ai_response: fullText,
      };

      const res = await saveChatMessage(payload);
      if (
        res &&
        res.code === 200 &&
        res.session_id &&
        res.session_id !== chatId
      ) {
        setChatId(res.session_id);
      }
    } catch (e) {
      console.error("对话记录同步后端失败", e);
    }
  };

  const handleStreamError = (error, streamId) => {
    isStreamActiveRef.current = false;
    textBufferRef.current = [];
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }

    Taro.showToast({
      title: error.message || "请求失败",
      icon: "none",
      duration: 2000,
    });

    const errorMessage = {
      id: streamId,
      type: "ai",
      content: `抱歉，发生错误：${error.message || "未知错误"}`,
    };

    setMessages((prev) => {
      const newMessages = [...prev, errorMessage];
      saveCurrentChat(newMessages);
      return newMessages;
    });

    setStreamingId(null);
    setStreamingText("");
    setIsLoading(false);
    abortFnRef.current = null;
  };

  const handleStreamAbort = (streamId) => {
    isStreamActiveRef.current = false;
    textBufferRef.current = [];
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }

    if (streamingText) {
      const partialMessage = {
        id: streamId,
        type: "ai",
        content: streamingText || "（已停止生成）",
      };
      setMessages((prev) => {
        const newMessages = [...prev, partialMessage];
        saveCurrentChat(newMessages);
        return newMessages;
      });
    }

    setStreamingId(null);
    setStreamingText("");
    setIsLoading(false);
    abortFnRef.current = null;
  };

  const triggerChat = (content) => {
    if (isLoading) return;

    if (!BAILIAN_CONFIG.API_URL || !BAILIAN_CONFIG.API_KEY) {
      Taro.showToast({
        title: "请先配置百炼 API",
        icon: "none",
        duration: 2000,
      });
      return;
    }

    const userMessage = { id: Date.now().toString(), type: "user", content };
    setMessages((prev) => {
      const newMessages = [...prev, userMessage];
      saveCurrentChat(newMessages);
      return newMessages;
    });

    setInputValue("");
    setIsLoading(true);

    const streamId = (Date.now() + 1).toString();
    setStreamingId(streamId);
    setStreamingText("");

    textBufferRef.current = [];
    isStreamActiveRef.current = true;
    let currentDisplayedText = "";

    if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    streamTimerRef.current = setInterval(() => {
      if (textBufferRef.current.length > 0) {
        const bufferLen = textBufferRef.current.length;
        let takeCount = 2;
        if (bufferLen > 50) takeCount = 5;
        else if (bufferLen > 20) takeCount = 3;

        const chunk = textBufferRef.current.splice(0, takeCount).join("");
        currentDisplayedText += chunk;
        setStreamingText(currentDisplayedText);
      } else if (
        !isStreamActiveRef.current &&
        currentDisplayedText.length > 0
      ) {
        if (streamTimerRef.current) {
          clearInterval(streamTimerRef.current);
          streamTimerRef.current = null;
        }
        finishStream(currentDisplayedText, streamId, content);
      } else if (
        !isStreamActiveRef.current &&
        currentDisplayedText.length === 0
      ) {
        if (streamTimerRef.current) {
          clearInterval(streamTimerRef.current);
          streamTimerRef.current = null;
        }
      }
    }, 30);

    const history = messages
      .filter((msg) => !msg.isWelcome && msg.type !== "error")
      .map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }));

    abortFnRef.current = sendMessageStream(content, history, {
      onChunk: (chunk) => {
        if (chunk) textBufferRef.current.push(...chunk.split(""));
      },
      onDone: () => {
        isStreamActiveRef.current = false;
      },
      onError: (error) => handleStreamError(error, streamId),
      onAbort: () => handleStreamAbort(streamId),
    });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    triggerChat(inputValue.trim());
  };

  const handleQuickQuestion = (question) => {
    triggerChat(question);
  };

  const handleInputChange = (e) => {
    setInputValue(e.detail.value);
  };

  const handleOpenHistory = async () => {
    try {
      Taro.showLoading({ title: "加载历史中..." });
      const res = await getChatSessions(1, 20);
      Taro.hideLoading();

      if (!res || res.code !== 200) {
        Taro.showToast({ title: res?.message || "获取历史失败", icon: "none" });
        return;
      }

      const sessions = res.sessions || [];
      if (!sessions.length) {
        Taro.showToast({ title: "暂无历史记录", icon: "none" });
        return;
      }

      const itemList = sessions.map((s) => s.title || "未命名对话");
      const pick = await Taro.showActionSheet({ itemList });
      const selected = sessions[pick.tapIndex];
      if (!selected?.session_id) return;

      Taro.showLoading({ title: "加载对话中..." });
      const detail = await getChatSessionDetail(selected.session_id);
      Taro.hideLoading();

      if (!detail || detail.code !== 200) {
        Taro.showToast({
          title: detail?.message || "获取详情失败",
          icon: "none",
        });
        return;
      }

      const loadedMessages = (detail.messages || [])
        .map((msg) => [
          { id: `usr_${msg.id}`, type: "user", content: msg.user_message },
          { id: `ai_${msg.id}`, type: "ai", content: msg.ai_response },
        ])
        .flat();

      setChatId(detail.session_id || selected.session_id);
      setChatTitle(detail.title || selected.title || "历史对话");
      setMessages(
        loadedMessages.length
          ? loadedMessages
          : [
              {
                id: "welcome",
                type: "ai",
                content: "该历史对话暂无消息。",
                isWelcome: true,
              },
            ],
      );
    } catch (error) {
      Taro.hideLoading();
      if (error?.errMsg && /cancel/i.test(error.errMsg)) return;
      console.error("open history failed:", error);
      Taro.showToast({ title: "历史记录加载失败", icon: "none" });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      scrollIntoViewId.current = `msg-${lastMessage.id}`;
    }
  }, [messages, streamingText]);

  return (
    <View className="chat-page">
      <View className="chat-toolbar">
        <View className="toolbar-left" onClick={handleOpenHistory}>
          <ChatOutlined className="toolbar-icon" />
          <View className="toolbar-title-wrapper">
            <Text className="toolbar-title">{chatTitle}</Text>
            <Text className="toolbar-subtitle">
              {messages.filter((m) => m.type === "user").length} 条对话 ▾
            </Text>
          </View>
        </View>
        <View className="toolbar-right">
          <View className="toolbar-btn" onClick={handleFontSizeChange}>
            <FontOutlined className="toolbar-btn-icon" />
            <Text className="toolbar-btn-text">{currentFontSize?.label}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="chat-messages"
        scrollY
        scrollWithAnimation
        scrollIntoView={scrollIntoViewId.current}
        enhanced
        showScrollbar={false}
      >
        <View className="messages-wrapper">
          {messages.map((msg) => (
            <View key={msg.id} id={`msg-${msg.id}`}>
              {msg.isWelcome ? (
                <View className="welcome-container">
                  <View className="ai-avatar">
                    <SmileOutlined className="avatar-icon" />
                  </View>
                  <View className="welcome-content">
                    <View className="message-bubble ai-message">
                      <Text
                        className="message-text"
                        style={{ fontSize: currentFontSize?.size }}
                      >
                        {msg.content}
                      </Text>
                    </View>
                    <View className="quick-questions">
                      <Text className="quick-title">您可以问我：</Text>
                      <View className="quick-tags">
                        {quickQuestions.map((question) => (
                          <View
                            key={question}
                            className="quick-tag"
                            onClick={() => handleQuickQuestion(question)}
                          >
                            <Text className="quick-tag-text">{question}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  className={`message-row ${msg.type === "user" ? "user-row" : "ai-row"}`}
                >
                  {msg.type === "ai" ? (
                    <>
                      <View className="ai-avatar small">
                        <SmileOutlined className="avatar-icon" />
                      </View>
                      <View className="message-bubble ai-message">
                        <Text
                          className="message-text"
                          style={{ fontSize: currentFontSize?.size }}
                          selectable
                        >
                          {msg.content}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View className="message-bubble user-message">
                        <Text
                          className="message-text"
                          style={{ fontSize: currentFontSize?.size }}
                          selectable
                        >
                          {msg.content}
                        </Text>
                      </View>
                      <View className="user-avatar small">
                        <UserOutlined className="avatar-icon" />
                      </View>
                    </>
                  )}
                </View>
              )}
            </View>
          ))}

          {streamingId && (
            <View
              className="message-row ai-row loading-row"
              id={`msg-${streamingId}`}
            >
              <View className="ai-avatar small">
                <SmileOutlined className="avatar-icon" />
              </View>
              <View className="message-bubble ai-message streaming-message">
                <Text
                  className="message-text"
                  style={{ fontSize: currentFontSize?.size }}
                >
                  {streamingText}
                  <Text className="streaming-cursor">|</Text>
                </Text>
              </View>
            </View>
          )}

          {isLoading && !streamingId && (
            <View className="message-row ai-row loading-row">
              <View className="ai-avatar small">
                <SmileOutlined className="avatar-icon" />
              </View>
              <View className="message-bubble ai-message loading-bubble">
                <View className="loading-dots">
                  <View className="dot" />
                  <View className="dot" />
                  <View className="dot" />
                </View>
              </View>
            </View>
          )}

          <View className="messages-bottom-padding" />
        </View>
      </ScrollView>

      <View className="chat-input-area">
        <View className="input-wrapper">
          <Textarea
            className="text-input"
            value={inputValue}
            onInput={handleInputChange}
            placeholder="请输入您的问题..."
            placeholderClass="input-placeholder"
            maxlength={500}
            autoHeight
            disabled={isLoading}
            confirmType="send"
            onConfirm={handleSendMessage}
          />
          {isLoading ? (
            <Button
              className="send-button stop-button"
              onClick={handleStopGenerating}
            >
              <Stop className="send-icon" />
            </Button>
          ) : (
            <Button
              className={`send-button ${!inputValue.trim() ? "disabled" : ""}`}
              disabled={!inputValue.trim()}
              onClick={handleSendMessage}
            >
              <Arrow className="send-icon" />
            </Button>
          )}
        </View>
        <View className="input-tip">
          <Text className="tip-text">
            AI 助手回答仅供参考，具体政策以官方发布为准。
          </Text>
        </View>
      </View>

      <View className="safe-area-bottom" />
    </View>
  );
}
