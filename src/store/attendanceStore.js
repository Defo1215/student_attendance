import { defineStore } from "pinia";

export const useStore = defineStore("attendance", {
  // 开启持久化
  persist: false,
  state: () => ({
    curId: 0,
    attendanceList: {},
  }),
  getters: {},
  actions: {
    // 获取id
    getNewId() {
      return this.curId++;
    },
    // 添加新数据
    addData(data) {
      console.log(this.attendanceList);
      this.attendanceList[data.id] = data;
    },
    // 删除
    removeDataById(id) {
      delete this.attendanceList[id];
    },
    // 清空
    clearList() {
      for (let key in this.attendanceList) {
        delete this.attendanceList[key];
      }
    },
  },
});
