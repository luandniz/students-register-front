<template>
  <div class="flex no-wrap justify-between w-full space-x-2">
    <SelectComponent
      v-model="store.params"
      :options="options"
      label="Esolha o filtro"
      class="w-[30%]"
    />

    <InputComponent
      v-model="store.search"
      label="Pesquisar"
      buttonIcon="search"
      type="text"
      :disable="store.params.length === 0 ? true : false"
      class="w-[70%]"
      @search-fn="searchFn()"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useStudents } from "../../store/useStudents";
import InputComponent from "../input/inputComponent.vue";
import SelectComponent from "../select/selectComponent.vue";

const store = useStudents();

const options = [
  {
    label: "Nome",
    value: "name",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "CPF",
    value: "cpf",
  },
];

const searchFn = async (): Promise<void> => {
  await store.getStudents();
};

const search = computed<string>(() => store.search);

watch(search, async (newValue): Promise<void> => {
  if (newValue === "") {
    store.search = "";
    await store.getStudents();
  }
});
</script>
