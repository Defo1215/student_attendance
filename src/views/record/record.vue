<template>
  <div>
    <div>
      <DeDeadline title="记录" />
    </div>

    <div p-5>
      <div flex mb-3>
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="日期"
          size="large"
          class="mr-2"
        />
        <el-tree-select
          lazy
          :load="load"
          :props="props"
          v-model="selectTreeValue"
          size="large"
          placeholder="年级与课程"
          :data="selectTreeData"
          :render-after-expand="false"
        />
      </div>
      <div>
        <el-table
          :data="showForm"
          style="width: 100%"
          stripe
          fixed
          @row-click="linkTo"
        >
          <el-table-column prop="date" label="日期" align="center" />
          <el-table-column
            prop="grade"
            label="年级"
            align="center"
            width="80"
          />
          <el-table-column prop="courseName" label="科目" align="center" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import DeDeadline from "../../components/DeDeadline.vue";

import studentApi from "../../api/student";
import courseApi from "../../api/course";
import attendanceApi from "../../api/studentAttendance";
import gradeApi from "../../api/grade";
import timeUtils from "../../utils/time";
import { useRouter } from "vue-router";
import { reactive, ref, watch, onMounted, computed } from "vue";

const router = useRouter();

const form = reactive({
  date: "",
  grade: "",
  course: "",
});

//  列表数据
const showForm = reactive([]);

// 加载已有年级
gradeApi
  .getAllGrade()
  .then((res) => {
    for (let i = 0; i < res.data.data.length; i++) {
      selectTreeData.push({
        value: res.data.data[i],
        label: `${res.data.data[i]}级`,
        children: [],
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

const props = {
  label: "label",
  children: "children",
  isLeaf: "isLeaf",
};

const load = (node, resolve) => {
  if (node.isLeaf) return resolve([]);
  if (node.data.value == null) return;
  courseApi.getCourseByGrade(node.data.value).then((res) => {
    let tempList = [];
    for (let i = 0; i < res.data.length; i++) {
      tempList.push({
        value: `${node.data.value}-${res.data[i].courseId}`,
        label: `${res.data[i].courseName}`,
        isLeaf: true,
      });
    }
    resolve(tempList);
  });
};

const selectTreeValue = ref();
const selectTreeData = reactive([]);

onMounted(() => {
  // 获取已有考勤记录
  attendanceApi.getWithDateAndGradeAndCourseId().then((res) => {
    console.log(res.data)
    for (let i = 0; i < res.data.data.length; i++) {
      const tempData = {
        timestamp: res.data.data[i].createTime,
        date: timeUtils.timestampToTime(res.data.data[i].createTime),
        grade: res.data.data[i].grade,
        courseId: res.data.data[i].courseId,
        courseName: res.data.data[i].courseName,
      };
      showForm.unshift(tempData);
    }
  });
});

// 将选择的年级与课程进行分割,并赋值
watch(selectTreeValue, () => {
  const tempList = selectTreeValue.value.split("-");
  form.grade = tempList[0];
  form.course = tempList[1];
});

// 页面跳转
const linkTo = (event) => {
  router.push(
    `/recordDetails/${event.timestamp}/${event.grade}/${event.courseId}`
  );
};

</script>
