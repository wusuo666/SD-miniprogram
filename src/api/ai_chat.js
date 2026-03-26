import Taro from "@tarojs/taro";
import request from "./request";
import {
  SaveChatRequest,
  SaveChatResponse,
  GetSessionListResponse,
  GetSessionResponse,
} from "./proto/ai_chat";

const normalizeSavePayload = (data = {}) => ({
  sessionId: data.sessionId ?? data.session_id ?? "",
  title: data.title ?? "",
  userMessage: data.userMessage ?? data.user_message ?? "",
  aiResponse: data.aiResponse ?? data.ai_response ?? "",
  messageType: data.messageType ?? data.message_type ?? 0,
});

const normalizeSaveResponse = (decoded) => ({
  ...decoded,
  session_id: decoded.sessionId,
  sessionId: decoded.sessionId,
  message_info: decoded.messageInfo,
  messageInfo: decoded.messageInfo,
});

/**
 * 保存对话记录
 * POST /api/ai_chat/save
 */
export const saveChatMessage = (data) => {
  const payload = normalizeSavePayload(data);
  const message = SaveChatRequest.create(payload);
  const buffer = SaveChatRequest.encode(message).finish();

  return request({
    url: "/api/ai_chat/save",
    method: "POST",
    header: {
      "Content-Type": "application/x-protobuf",
      Authorization: Taro.getStorageSync("token") || "",
    },
    data: buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    ),
    responseType: "arraybuffer",
  })
    .then((res) => {
      console.log("saveChatMessage 原始返回:", res);
      const bufferData = res.data || res;
      const decoded = SaveChatResponse.decode(new Uint8Array(bufferData));
      const normalized = normalizeSaveResponse(decoded);
      console.log("saveChatMessage 解析后:", normalized);
      return normalized;
    })
    .catch((err) => {
      console.error("saveChatMessage 请求或解析失败:", err);
      throw err;
    });
};

/**
 * 获取会话列表
 * GET /api/ai_chat/sessions?page=1&page_size=10
 */
export const getChatSessions = (page = 1, pageSize = 10) => {
  return request({
    url: `/api/ai_chat/sessions?page=${page}&page_size=${pageSize}`,
    method: "GET",
    header: {
      Authorization: Taro.getStorageSync("token") || "",
    },
    responseType: "arraybuffer",
  }).then((res) => {
    // 增加调试输出：如果在 request 那边已经把 statusCode 判断后 resolve(res.data) 了，
    // 这里传入 getChatSessions 的 res 实际上就是 res.data 本身。
    console.log("getChatSessions 原始返回:", res);

    // 兼容不同的返回包裹结构，确保提取到正确的 ArrayBuffer
    const bufferData = res.data || res;

    if (!bufferData || bufferData.byteLength === 0) {
      console.error("未能获取到有效的 ArrayBuffer:", res);
      throw new Error("Empty response arraybuffer");
    }

    const decoded = GetSessionListResponse.decode(new Uint8Array(bufferData));
    console.log("getChatSessions 解析后:", decoded);
    return decoded;
  });
};

/**
 * 获取单个会话的详细对话记录
 * GET /api/ai_chat/session?session_id=xxx
 */
export const getChatSessionDetail = (sessionId) => {
  return request({
    url: `/api/ai_chat/session?session_id=${sessionId}`,
    method: "GET",
    header: {
      Authorization: Taro.getStorageSync("token") || "",
    },
    responseType: "arraybuffer",
  }).then((res) => {
    console.log("getChatSessionDetail 原始返回:", res);
    const bufferData = res.data || res;

    if (!bufferData || bufferData.byteLength === 0) {
      console.error("未能获取到有效的 ArrayBuffer:", res);
      throw new Error("Empty response arraybuffer");
    }

    const decoded = GetSessionResponse.decode(new Uint8Array(bufferData));
    console.log("getChatSessionDetail 解析后:", decoded);
    return decoded;
  });
};
