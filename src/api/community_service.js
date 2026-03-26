import request, { checkAuth } from "./request";
import root from "./proto/community_service";

// 获取 Proto Message 类型
const CommunityServiceResponse =
  root.api.community_service.CommunityServiceResponse;

/**
 * 辅助函数：解包 CommunityService 响应
 * @param {ArrayBuffer} data
 */
const decodeCommunityServiceResponse = (data) => {
  try {
    if (data instanceof ArrayBuffer) {
      data = new Uint8Array(data);
    }
    const message = CommunityServiceResponse.decode(data);
    const obj = CommunityServiceResponse.toObject(message, {
      longs: String,
      enums: String,
      bytes: String,
    });
    return checkAuth(obj);
  } catch (error) {
    if (error.code === 401) throw error;
    console.error("Proto decode error:", error);
    throw error;
  }
};

/**
 * 获取社区服务列表
 * GET /api/community_service
 */
export const getCommunityServices = () => {
  return request({
    url: "/api/community_service",
    method: "GET",
    responseType: "arraybuffer",
  }).then((res) => decodeCommunityServiceResponse(res));
};
