import { useLaunch } from "@tarojs/taro";
import { UserProvider } from "./context/UserContext";

import "./app.scss";

function App({ children }) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  // 使用 UserProvider 包裹应用
  return <UserProvider>{children}</UserProvider>;
}

export default App;
