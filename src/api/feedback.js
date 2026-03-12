import request, { withQuery } from "./request";

export const submitFeedback = (data) => {
  return request({
    url: "/api/feedback",
    method: "POST",
    data,
  });
};

export const exportFeedback = ({ start_time, end_time }) => {
  return request({
    url: withQuery("/api/feedback/export", { start_time, end_time }),
    method: "GET",
  });
};
