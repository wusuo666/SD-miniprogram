import Taro from "@tarojs/taro";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { setRequestToken } from "../api/request";
import { getUserInfo, modifyUserInfo } from "../api/user";

// 1. 创建 Context 对象
export const UserContext = createContext(null);

// 2. 创建 Provider 组件
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  // 登出逻辑抽取
  const performLogout = useCallback(() => {
    setUserInfo(null);
    setIsLogged(false);
    Taro.removeStorageSync("token");
    Taro.removeStorageSync("userInfo");
    setRequestToken("");
    // 可选：跳转回首页或登录页
    // Taro.reLaunch({ url: '/pages/index/index' })
  }, []);

  // 监听全局 Auth 事件 (来自 request.js)
  useEffect(() => {
    const handleAuthLogout = () => {
      console.log("收到 Token 失效通知，执行登出");
      performLogout();

      Taro.showModal({
        title: "登录过期",
        content: "您的登录状态已失效，请前往“我的”页面重新登录",
        showCancel: false,
        confirmText: "确定",
        success: (res) => {
          if (res.confirm) {
            Taro.switchTab({
              url: "/PersonalDetails/profile/index",
            });
          }
        },
      });
    };
    Taro.eventCenter.on("auth:logout", handleAuthLogout);
    return () => {
      Taro.eventCenter.off("auth:logout", handleAuthLogout);
    };
  }, [performLogout]);

  // 初始化时从 Storage 读取缓存并校验
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = Taro.getStorageSync("userInfo");
        const storedToken = Taro.getStorageSync("token");

        if (storedToken && storedUser) {
          // 1. 乐观更新：先设置状态，让用户觉得已经登录
          setUserInfo(storedUser);
          setIsLogged(true);
          setRequestToken(storedToken);

          // 2. 异步校验：请求用户信息接口验证 Token 是否有效
          try {
            // 如果 Token 失效，getUserInfo 会触发 401，进而触发 auth:logout
            const res = await getUserInfo();
            console.log("Token 校验通过");

            if (res && res.user) {
              setUserInfo(res.user);
              Taro.setStorageSync("userInfo", res.user);
              console.log("用户信息已同步远程:", res.user);
            }
          } catch (err) {
            console.error("Token 校验未通过或网络异常", err);
            // 注意：如果是 401，auth:logout 会处理登出。
            // 如果是断网等其他错误，这里可以选择不登出，保留缓存状态
          }
        }
      } catch (e) {
        console.error("读取本地缓存失败", e);
      }
    };
    initAuth();
  }, []);

  // 提供给外部调用的更新方法
  const login = (user) => {
    setUserInfo(user);
    setIsLogged(true);
    // 同时持久化及保存 Token
    if (user.token) {
      Taro.setStorageSync("token", user.token);
      // 同步到 request 模块
      setRequestToken(user.token);
    }
    Taro.setStorageSync("userInfo", user);
  };

  const logout = performLogout;

  const updateUserInfo = async (newInfo) => {
    try {
      // 1. 调用后端 API 更新
      const updatedUser = await modifyUserInfo(newInfo);
      console.log("更新后返回信息:", updatedUser);
      // 2. 更新成功后，更新 Context 和本地缓存
      // 注意：这里我们优先使用后端返回的最新 User 对象，如果后端没返回，则使用本地合并结果
      const finalUser = { ...userInfo, ...newInfo };

      setUserInfo(finalUser);
      Taro.setStorageSync("userInfo", finalUser);

      Taro.showToast({ title: "更新成功", icon: "success" });
    } catch (error) {
      console.error("更新用户信息失败:", error);
      // 避免覆盖 401 的全局提示（登录过期）
      if (error?.code !== 401 && error?.statusCode !== 401) {
        Taro.showToast({ title: "更新失败", icon: "none" });
      }
      // 选择性抛出错误，以便组件层也能感知
      throw error;
    }
  };

  // 纯本地更新，不调用 API (用于已经从服务器获取了最新数据，只需同步Context的场景)
  const updateLocalUserInfo = (user) => {
    setUserInfo(user);
    Taro.setStorageSync("userInfo", user);
    console.log("本地用户信息已更新:", user);
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        isLogged,
        login,
        logout,
        updateUserInfo,
        updateLocalUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 3. 自定义 Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
