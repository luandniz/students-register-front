import { defineStore } from "pinia";
import { ref } from "vue";

export const useStudents = defineStore("students", () => {
  const title = ref("Hello World");

  return {
    title,
  };
});
