import request from "../utils/request"

const gradeApi = {};

gradeApi.getAllGrade = function () {
  return request({
    method: "GET",
    url: "/grade/findAll",
  });
};

export default gradeApi;