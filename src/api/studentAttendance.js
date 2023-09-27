import request from "../utils/request";

const attendanceApi = {};

attendanceApi.findAll = function () {
  return request({
    method: "GET",
    url: "/attendance/findAll",
  });
};

//  新增考勤
attendanceApi.save = function (data) {
  return request({
    method: "POST",
    url: "/record/save",
    data,
  });
};

//  查询同一日期、年级、课程的记录
attendanceApi.getWithDateAndGradeAndCourseId = function () {
  return request({
    method: "GET",
    url: "/record/findAllTheSame",
  });
};

//  根据日期、年级、课程查询记录
attendanceApi.getByDateAndGradeAndCourseIdAndState = function(date, grade, courseId, status){
  return request({
    method: "GET",
    url: `/record/findByDateAndGradeAndCourseIdAndStatus?date=${date}&grade=${grade}&courseId=${courseId}&status=${status}`
  })
}

//  查询指定课程中未签到的学生
attendanceApi.getNotCheckedStudent = function(date, grade, courseId){
  return request({
    url: `/record/findNotCheckedStudents?date=${date}&grade=${grade}&courseId=${courseId}`
  })
}

//  根据记录id更新记录信息
attendanceApi.updateById = function(data){
  return request({
    method: "POST",
    url: "/record/update",
    data
  })
}

//  根据记录id删除记录
attendanceApi.removeById = function(data){
  return request({
    method: "POST",
    url: "/record/delete",
    data
  })
}
export default attendanceApi;
