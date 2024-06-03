<template>
  <div class="w-full h-full relative overflow-hidden">
    <HeaderComponent @createStudent="showModalCreateStudent" />
    <div class="w-[90%] h-[calc(100%_-_80px)] m-auto space-y-3 mt-5">
      <FilterSection />
      <EmptyState v-if="!haveStudentsRegister" />
      <ListComponent
        v-else
        :list="studentsList"
        @deleteStudent="showNotify"
        @editStudent="showModalUpdateStudent"
      />
      <PopupComponent
        v-model="showDialog"
        :type="popupType"
        @submit="gerencySubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useStudents } from "../../store/useStudents";
import {
  Student,
  StudentUpdate,
  StudentCreate,
} from "../../interfaces/students.interfaces";
import { useQuasar } from "quasar";
import HeaderComponent from "../../components/header/headerComponent.vue";
import FilterSection from "../../components/filterSection/filterSectionComponent.vue";
import ListComponent from "../../components/list/listComponent.vue";
import PopupComponent from "../../components/popup/popupComponent.vue";
import EmptyState from "../../components/empty/emptyStateComponent.vue";
import { showPositiveNotify, showNegativeNotify } from "../../utils/useNotify";

onMounted(async () => {
  await store.getStudents();
});

const store = useStudents();
const $q = useQuasar();
const studentsList = computed<Student[]>(() => store.studentsList);
const haveStudentsRegister = computed<boolean>(() =>
  studentsList.value.length > 0 ? true : false
);
const showDialog = ref<boolean>(false);
const popupType = ref<string>("");

const showNotify = (student: Student) => {
  $q.notify({
    message: `Deseja deleta ${student.name}? Está ação não poderá ser desfeita.`,
    color: "dark",
    position: "center",
    progress: true,
    timeout: 5000,
    actions: [
      {
        label: "Cancelar",
        color: "yellow",
        handler: () => {},
      },
      {
        label: "Deletar",
        color: "red",
        handler: async (): Promise<void> => {
          let response = await store.deleteStudent(student.id);
          if (response !== null) {
            showPositiveNotify("Aluno deletado com sucesso");
          } else {
            showNegativeNotify(
              "Houve um problema para deletar o cadastro do aluno. Tente novamente ou contate o administrador."
            );
          }
        },
      },
    ],
  });
};

const showModalCreateStudent = () => {
  popupType.value = "create";
  showDialog.value = true;
  store.currentStudent = { name: "", email: "", cpf: "" };
};

const showModalUpdateStudent = (student: Student) => {
  popupType.value = "edit";
  showDialog.value = true;
  store.currentStudent = { ...student };
};

const gerencySubmit = async (student: StudentUpdate | StudentCreate) => {
  await (popupType.value === "edit"
    ? submitUpdate(student as StudentUpdate)
    : submitCreate(student as StudentCreate));
};

const submitUpdate = async (student: StudentUpdate): Promise<void> => {
  if ("id" in store.currentStudent && store.currentStudent.id !== undefined) {
    const id: number = store.currentStudent.id;

    const response = await store.updateStudent(id, student);

    if (response !== null) {
      showDialog.value = false;
      showPositiveNotify("Cadastro do aluno editado com sucesso");
    }
  } else {
    showDialog.value = true;
  }
};

const submitCreate = async (student: StudentCreate): Promise<void> => {
  if (store.currentStudent) {
    const response = await store.createStudent(student);
    if (response !== null) {
      showDialog.value = false;
      showPositiveNotify("Aluno cadastrado com sucesso");
      return;
    } else {
      showDialog.value = true;
    }
  }
};
</script>
