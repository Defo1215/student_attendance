<template>
  <div px-5>
    <div my-5>
      <el-radio-group v-model="show">
        <el-radio-button label="未签到" />
        <el-radio-button label="缺勤" />
        <el-radio-button label="已签到" />
      </el-radio-group>
    </div>
    <div mb-5 v-show="show == '缺勤'">
      <!-- <div h-10 text-center>缺勤</div> -->
      <el-table :data="absenceList" stripe style="width: 100%" :height="height+'px'">
        <el-table-column prop="studentId" label="学号" align="center" />
        <el-table-column prop="studentName" label="姓名" align="center" />
        <el-table-column label="操作" align="center" width="150px">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              plain
              @click="registerAbsenceAfterChecked(scope.row)"
              >签到</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div mb-5 v-show="show == '未签到'">
      <!-- <div h-10 text-center>未签到</div> -->
      <el-table :data="pendingList" stripe style="width: 100%" :height="height+'px'">
        <el-table-column prop="studentId" label="学号" align="center" />
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column label="操作" align="center" width="150px">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              plain
              style="width: 50px"
              @click="registerAbsence(scope.row)"
              >缺勤</el-button
            >
            <el-button
              size="small"
              type="primary"
              plain
              style="width: 50px"
              @click="registerChecked(scope.row)"
              >签到</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="show == '已签到'">
      <!-- <div h-10 text-center>已签到</div> -->
      <el-table :data="checkedList" stripe style="width: 100%" :height="height+'px'">
        <!-- //height="454.8px" -->
        <el-table-column prop="studentId" label="学号" align="center" />
        <el-table-column prop="studentName" label="姓名" align="center" />
        <el-table-column label="操作" align="center" width="150px">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              plain
              style="width: 50px"
              @click="registerAbsenceAfterAbsence(scope.row)"
              >缺勤</el-button
            >
            <el-button
              size="small"
              type="warning"
              plain
              style="width: 50px"
              @click="registerCheckedAfterUnknown(scope.row)"
              >未签到</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import attendanceApi from "../../api/studentAttendance";
import { ElMessage } from "element-plus";

import { ref, reactive, onMounted } from "vue";

const props = defineProps({
  date: String,
  grade: String,
  courseId: String,
});

const show = ref("缺勤");

const height = window.innerHeight * 0.7516 

// 已签到列表
const checkedList = reactive([]);
// 缺勤列表
const absenceList = reactive([]);
// 待处理列表
const pendingList = reactive([]);

// 获取已签到列表;
const getCheckedList = async () => {
  const res = await attendanceApi.getByDateAndGradeAndCourseIdAndState(
    props.date,
    props.grade,
    props.courseId,
    1
  );
  res.data.data.forEach((e) => {
    checkedList.push(e);
  });
};

// 获取缺勤列表;
const getAbsenceList = async () => {
  const res = await attendanceApi.getByDateAndGradeAndCourseIdAndState(
    props.date,
    props.grade,
    props.courseId,
    0
  );
  res.data.data.forEach((e) => {
    absenceList.push(e);
  });
};

// 获取未签到列表
const getPendingList = async () => {
  const res = await attendanceApi.getNotCheckedStudent(
    props.date,
    props.grade,
    props.courseId
  );
  res.data.data.forEach((e) => {
    pendingList.push(e);
  });
};

// 未签到->缺勤
const registerAbsence = async (row) => {
  const res = await attendanceApi.save({
    grade: parseInt(props.grade),
    courseId: props.courseId,
    studentId: row.studentId,
    status: 0,
  });

  switch (res.data.code) {
    case 1:
      ElMessage({
        message: `${props.grade}级${row.studentId}号${row.studentName}缺勤`,
        type: "success",
      });
      break;
    case 0:
      ElMessage({
        message: `${res.data.msg}`,
        type: "error",
      });
      break;
  }
  // 从待处理列表中移除该学生
  const index = pendingList.indexOf(row);
  if (index !== -1) {
    pendingList.splice(index, 1);
  }
  // 将该学生添加到缺勤列表中
  absenceList.push({
    ...row,
    studentName: row.name,
    name : ""

  });
};

// 未签到->签到
const registerChecked = async (row) => {
  const res = await attendanceApi.save({
    grade: parseInt(props.grade),
    courseId: props.courseId,
    studentId: row.studentId,
    status: 1,
  });
  switch (res.data.code) {
    case 1:
      ElMessage({
        message: `${props.grade}级${row.studentId}号${row.studentName}签到成功`,
        type: "success",
      });
      break;
    case 0:
      ElMessage({
        message: `${res.data.msg}`,
        type: "error",
      });
      break;
  }
  // 从待处理列表中移除该学生
  const index = pendingList.indexOf(row);
  if (index !== -1) {
    pendingList.splice(index, 1);
  }
  // 将该学生添加到已签到列表中
  checkedList.push({
    ...row,
    studentName: row.name,
    name : ""
  });
};

// 已签到->缺勤
const registerAbsenceAfterAbsence = async (row) => {
  //  获取当前行的索引
  const index = checkedList.indexOf(row);

  const res = await attendanceApi.updateById({
    ...checkedList[index],
    status: 0,
    studentName: ""
  });
  switch (res.data.code) {
    case 1:
      ElMessage({
        message: `${props.grade}级${row.studentId}号${row.studentName}更改为缺勤`,
        type: "success",
      });
      break;
    case 0:
      ElMessage({
        message: `${res.data.msg}`,
        type: "error",
      });
      break;
  }
  // 从已签到列表中移除该学生
  if (index !== -1) {
    checkedList.splice(index, 1);
  }
  // 将该学生添加到缺勤列表中
  absenceList.push(row);
};

// 已签到->未签到
const registerCheckedAfterUnknown = async (row) => {
  //  获取当前行的索引
  const index = checkedList.indexOf(row);

  const res = await attendanceApi.removeById({
    ...checkedList[index],
    studentName: ""
  });
  switch (res.data.code) {
    case 1:
      ElMessage({
        message: `${props.grade}级${row.studentId}号${row.studentName}更改为未签到`,
        type: "success",
      });
      break;
    case 0:
      ElMessage({
        message: `${res.data.msg}`,
        type: "error",
      });
      break;
  }
  // 从已签到列表中移除该学生
  if (index !== -1) {
    checkedList.splice(index, 1);
  }
  // 将该学生添加到未签到列表中
  pendingList.push(row);
};

const registerAbsenceAfterChecked = async (row) => {
  const index = absenceList.indexOf(row);

  const res = await attendanceApi.updateById({
    ...absenceList[index],
    status: 1,
    studentName: ""
  });
  switch (res.data.code) {
    case 1:
      ElMessage({
        message: `${props.grade}级${row.studentId}号${row.studentName}签到成功`,
        type: "success",
      });
      break;
    case 0:
      ElMessage({
        message: `${res.data.msg}`,
        type: "error",
      });
      break;
  }
  // 从缺勤列表中移除该学生
  if (index !== -1) {
    absenceList.splice(index, 1);
  }
  // 将该学生添加到已签到列表中
  checkedList.push(row);
};

onMounted(() => {
  getCheckedList();
  getPendingList();
  getAbsenceList();
});
</script>
