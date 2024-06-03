<template>
  <q-dialog v-model="model" backdrop-filter="brightness(60%)">
    <q-card class="w-[90%] md:w-[50%]">
      <q-toolbar class="bg-mainGreen text-dark">
        <q-toolbar-title>{{
          type === "edit" ? "Editar informações" : "Cadastrar novo aluno."
        }}</q-toolbar-title>

        <q-btn icon="close" flat round dense v-close-popup color="primary" />
      </q-toolbar>

      <q-card-section class="q-pt-xl">
        <q-form ref="form" class="q-gutter-md">
          <ImputComponent
            v-model="store.currentStudent.name"
            label="Nome"
            type="text"
            inputIcon="person"
            :rules="[
              (val: string | null) => (val && val.length > 0) || 'Nome é um campo obrigatório',
            ]"
          />

          <ImputComponent
            v-model="store.currentStudent.email"
            label="Email"
            type="email"
            icon="user"
            inputIcon="email"
            :rules="[(val: string | null) => {
            if (!val) return 'Email é um campo obrigatório';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(val) || 'Email inválido';
            },
          ]"
          />

          <ImputComponent
            v-model="store.currentStudent.cpf"
            label="CPF"
            type="text"
            mask="###.###.###-##"
            inputIcon="assignment_ind"
            :rules="[
              (val: string | null) => (val && val.length > 0) || 'CPF é um campo obrigatório',
            ]"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          :label="type === 'edit' ? 'Editar' : 'Salvar'"
          type="submit"
          color="primary"
          @click="submitForm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, Ref } from "vue";
import { useStudents } from "../../store/useStudents";
import ImputComponent from "../input/inputComponent.vue";

const store = useStudents();
const emits = defineEmits(["submit"]);
const model = defineModel<boolean>();

interface FormComponent {
  validate: () => Promise<boolean>;
}

interface InputProps {
  type: string;
}

defineProps<InputProps>();

const form: Ref<FormComponent | null> = ref(null);

const submitForm = (): void => {
  if (form.value) {
    form.value.validate().then((success) => {
      if (success) {
        const currentStudent = { ...store.currentStudent };
        if (currentStudent.cpf) {
          currentStudent.cpf = currentStudent.cpf.replace(/\D/g, "");
        }
        emits("submit", currentStudent);
      } else {
        // *
      }
    });
  } else {
    // *
  }
};
</script>
