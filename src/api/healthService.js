import request from "./request";

/**
 * 获取卫生服务站列表
 * GET /api/medical_service
 *
 * @returns {Promise<{
 *   medical_services: Array<{
 *     id: number,
 *     name: string,
 *     address: string,
 *     phone: string,
 *     latitude: number,
 *     longitude: number,
 *     service_time: string,
 *     create_time: string,
 *   }>,
 *   code: number,
 *   message: string,
 * }>}
 */
export const getMedicalServices = () => {
  return request({
    url: "/api/medical_service",
    method: "GET",
  });
};

/**
 * 新增卫生服务站
 * POST /api/medical_service
 *
 * @param {{ name: string, address: string, phone: string, latitude: number, longitude: number, service_time: string }} data
 * @returns {Promise<{ medical_services: Array, code: number, message: string }>}
 */
export const addMedicalService = (data) => {
  return request({
    url: "/api/medical_service",
    method: "POST",
    data,
  });
};

/**
 * 修改卫生服务站
 * PUT /api/medical_service?id=xx
 *
 * @param {number} id
 * @param {{ name?: string, address?: string, phone?: string, latitude?: number, longitude?: number, service_time?: string }} data
 * @returns {Promise<{ medical_services: Array, code: number, message: string }>}
 */
export const updateMedicalService = (id, data) => {
  return request({
    url: `/api/medical_service?id=${id}`,
    method: "PUT",
    data,
  });
};

/**
 * 删除卫生服务站
 * DELETE /api/medical_service?id=xx
 *
 * @param {number} id
 * @returns {Promise<{ code: number, message: string }>}
 */
export const deleteMedicalService = (id) => {
  return request({
    url: `/api/medical_service?id=${id}`,
    method: "DELETE",
  });
};
