import request from "../utils/request"

const courseApi = {};

courseApi.getCourseByGrade = function (grade) {
  return request({
    method: "GET",
    url: `/course/findByGrade?grade=${grade}`,
  });
};

export default courseApi;