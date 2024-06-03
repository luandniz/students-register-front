import { defineStore } from "pinia";
import { ref } from "vue";
import {
  Student,
  StudentCreate,
  StudentUpdate,
} from "../interfaces/students.interfaces";
import { api } from "../services";
import { showNegativeNotify } from "../utils/useNotify";

export const useStudents = defineStore("students", () => {
  const studentsList = ref<Student[]>([]);
  const currentStudent = ref<StudentCreate | StudentUpdate>({});

  const params = ref<string>("");
  const search = ref<string>("");
  const loading = ref<boolean>(false);

  const getStudents = async (): Promise<Student[]> => {
    loading.value = true;
    let query: string = "";

    if (
      typeof params.value === "string" &&
      params.value.trim() !== "" &&
      typeof search.value === "string" &&
      search.value.trim() !== ""
    ) {
      query = `?${params.value}=${search.value}`;
    }

    try {
      const response = await api.get<Student[]>(`/students${query}`);
      studentsList.value = response.data;
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const createStudent = async (
    newStudent: StudentCreate
  ): Promise<Student | null> => {
    try {
      const response = await api.post<Student>("/students", newStudent);
      if (response) {
        studentsList.value.push(response.data);
      }

      return response.data;
    } catch (error) {
      handleUpdateStudentError(error);
      return null;
    }
  };

  const updateStudent = async (
    id: number,
    updatedData: StudentUpdate
  ): Promise<Student | null> => {
    try {
      const response = await api.patch<Student>(`/students/${id}`, updatedData);
      if (response) {
        const index = studentsList.value.findIndex(
          (student) => student.id === id
        );
        if (index !== -1) {
          studentsList.value[index] = response.data;
        }
      }
      return response.data;
    } catch (error: any) {
      handleUpdateStudentError(error);
      return null;
    }
  };

  const deleteStudent = async (id: number): Promise<void> => {
    try {
      const response = await api.delete(`/students/${id}`);

      if (response) {
        let index = studentsList.value.findIndex(
          (student) => student.id === id
        );
        if (index !== -1) {
          studentsList.value.splice(index, 1);
        }
      }
    } catch (error) {}
  };

  const handleUpdateStudentError = (error: any): void => {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      switch (errorMessage) {
        case "Email already in use":
          showNegativeNotify("Este e-mail já está cadastrado");
          break;
        case "CPF already in use":
          showNegativeNotify("Este número de CPF já está cadastrado");
          break;
        default:
          showNegativeNotify(
            "Houve um problema para editar o cadastro do aluno. Tente novamente ou contate o administrador."
          );
          break;
      }
    } else {
      showNegativeNotify(
        "Houve um problema para editar o cadastro do aluno. Tente novamente ou contate o administrador."
      );
    }
  };

  return {
    studentsList,
    currentStudent,
    params,
    search,
    loading,
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
});
