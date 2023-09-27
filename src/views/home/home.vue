<template>
  <div>
    <div mb-2>
      <DeDeadline position-sticky top-0 z-1 title="考勤" />
    </div>

    <div p-5>
      <el-form :model="form" :label-position="'top'" flex justify-between>
        <el-form-item label="年级" w-40 mr-4>
          <el-select
            v-model="form.grade"
            class="mb-2"
            placeholder="请选择年级"
            size="large"
          >
            <el-option
              v-for="(data, index) in showForm.gradeList"
              :label="data.name"
              :value="data.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课程" w-40>
          <el-select
            v-model="form.courseId"
            class="mb-2"
            placeholder="请选择课程"
            size="large"
            loading-text="加载中"
          >
            <el-option
              v-for="(data, index) in showForm.courseList"
              :label="data.name"
              :value="data.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="form" :label-position="'top'" flex justify-between>
        <el-form-item label="学号">
          <DeEditBox w-40 mr-4 v-model="form.studentId" />
        </el-form-item>
        <el-form-item label="姓名">
          <DeTextBox w-40 h-13 text-gray-5>{{
            showForm.studentName
          }}</DeTextBox>
        </el-form-item>
      </el-form>

      <div mt-4>
        <el-button type="primary" plain size="large" @click="onSubmit"
          >签到</el-button
        >
      </div>
    </div>

    <!-- <div class="absolute left-1/2 -translate-x-1/2  bottom-7">
      <a href="https://beian.miit.gov.cn/" target="_blank"
        >粤ICP备2022134092号-1</a
      >
    </div> -->
  </div>
</template>

<script setup>
import DeTextBox from "../../components/DeTextBox.vue";
import DeEditBox from "../../components/DeEditBox.vue";
import DeDeadline from "../../components/DeDeadline.vue";
import { ElMessage } from "element-plus";
import { reactive, ref, watch, watchEffect, onMounted, onUnmounted } from "vue";

import courseApi from "../../api/course";
import studentApi from "../../api/student";
import gradeApi from "../../api/grade";
import attendanceApi from "../../api/studentAttendance";

const form = reactive({
  grade: "",
  courseId: "",
  studentId: "",
  status: 0,
});

//  用于展示的表单
const showForm = reactive({
  gradeList: [],
  courseList: [],
  studentList: [],
  studentName: "",
});

// 加载已有年级
const loadGradeList = async () => {
  try {
    const res = await gradeApi.getAllGrade();
    showForm.gradeList = res.data.data
    showForm.gradeList
  } catch (err) {
    console.log(err);
  }
};
watch(form, async () => {
  // 选择年级后获取该年级的课程
  if (form.grade != "") {
    try {
      const res = await courseApi.getCourseByGrade(form.grade);
      console.log(res.data)
      showForm.courseList = res.data.data;
    } catch (err) {
      console.assert(err);
    } finally {
    }
  }
  //  选择年级和填写学号后获取该学生的姓名
  if (form.grade != "" && form.studentId != "" && form.studentId.length == 3) {
    try {
      const res = await studentApi.getStudentByStudentId(
        form.grade,
        form.studentId
      );
      showForm.studentName =
        res.data.code == 200 ? res.data.data.name : res.data.msg;
    } catch (err) {
      console.assert(err);
    }
  }
});

const onSubmit = async () => {
  if (form.grade != "" && form.courseId != "" && form.studentId != "") {
    form.status = 1;
    form.studentId = parseInt(form.studentId)
    try {
      console.log(form)
      const res = await attendanceApi.save(form);
      switch (res.data.code) {
        case 1:
          ElMessage({
            message: `${form.grade}级${form.studentId}号${showForm.studentName}签到成功`,
            type: "success",
          });
          form.studentId = "";
          break;
        case 0:
          ElMessage({
            message: `${res.data.msg}`,
            type: "error",
          });
          break;
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    ElMessage({
      message: "数据不能为空",
      type: "warning",
      grouping: true,
    });
  }
};

onMounted(() => {
  loadGradeList();
});
</script>
