import request from "../utils/request"

const studentApi = {};

studentApi.getStudentByStudentId = function(grade, id){
    return request({
        method: "GET",
        url: `/student/findByGradeAndStudentId?grade=${grade}&studentId=${id}`
    })
}

studentApi.getStudentByGradeAndClass = function(grade, classId){
    return request({
        method: "GET",
        url: `/student/findByGradeAndClass?grade=${grade}&class=${classId}`,
    })
}

studentApi.getStudentByGradeAndClass2 = function(grade, classId, classId2){
    return request({
        method: "GET",
        url: `/student/findByGradeAndClass2?grade=${grade}&class=${classId}&class2=${classId2}`
    })
}


export default studentApi;