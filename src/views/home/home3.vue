<template>
    <div>
        <div>
            <DeDeadline title="考勤" />
        </div>
        <div p-5>
            <el-input v-model="textarea" :autosize="{ minRows: 5, maxRows: 10 }" type="textarea" placeholder="请输入学号" />
        </div>
        <EcButton px-4 py-3 m-5 @click="Class1And2">1-2班</EcButton>
        <EcButton px-4 py-3 m-5 @click="Class3And4">3-4班</EcButton>
        <EcButton px-4 py-3 m-5 @click="submit">提交</EcButton>

        <div flex flex-wrap h-30 m-5 bg-white rounded-lg border border-gray-300 v-if="isShow"> 
            <div mx-3 v-for="item in AbsenceArr">
                {{ item }}  
            </div>
        </div>
    </div>
</template>

<script setup>
import DeDeadline from "../../components/DeDeadline.vue"
import EcButton from "../../components/EcButton.vue"
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

//提交并计算出缺勤学号
const textarea = ref('')
let tempArr = [];
const AbsenceArr = ref([]);

const isShow = ref(false);
function submit() {
    // 从表单中获取每个学号
    tempArr = textarea.value.split(' ');
    // String数组转为Number数组
    tempArr = tempArr.map(Number);
    console.log(tempArr)

    // 对两个数组进行作差
    AbsenceArr.value = stuArr.filter(items => {
        if (!tempArr.includes(items)) return items;
    })
    isShow.value = true;
    console.log(AbsenceArr.value);
}

// 通过选择不同班级，导入生成不同学号
let stuArr = [];
function Class1And2() {
    let i;
    let number = 101;
    for (i = 0; i < 80; i++) {
        stuArr[i] = number;
        number++;
        if (number == 141) {
            number = 201;
        }
    }
    console.log(stuArr);
}
function Class3And4() {
    let i;
    let number = 301;
    for (i = 0; i < 80; i++) {
        stuArr[i] = number;
        number++;
        if (number == 341) {
            number = 401;
        }
    }
    console.log(stuArr);
}

</script>


