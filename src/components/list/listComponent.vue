<template>
  <q-list
    bordered
    class="rounded-borders h-[calc(100%_-_55px)] overflow-y-auto"
    separator
  >
    <q-item v-for="item in list" :key="item.id">
      <q-item-section avatar top>
        <q-avatar color="orange" text-color="white">{{
          item.name ? item.name.charAt(0) : ""
        }}</q-avatar>
      </q-item-section>

      <q-item-section top>
        <q-item-label
          lines="1"
          class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
        >
          <span class="cursor-pointer">{{ item.name ? item.name : "" }}</span>
        </q-item-label>

        <q-item-label caption lines="1">
          {{ formattCPF(item.cpf) }}
        </q-item-label>
        <q-item-label lines="1">
          <span class="text-weight-medium">{{
            item.email ? item.email : ""
          }}</span>
        </q-item-label>
      </q-item-section>

      <q-item-section top side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            class="gt-xs"
            color="blue-6"
            size="12px"
            flat
            dense
            icon="edit"
            @click="$emit('editStudent', item)"
          />
          <q-btn
            class="gt-xs"
            color="red"
            size="12px"
            flat
            dense
            icon="delete"
            @click="$emit('deleteStudent', item)"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>

  <q-inner-loading :showing="loading">
    <q-spinner-facebook size="sm" color="primary" />
  </q-inner-loading>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { Student } from "../../interfaces/students.interfaces";
import { useStudents } from "../../store/useStudents";

const store = useStudents();

interface ListProps {
  list: Student[];
}

defineProps<ListProps>();
defineEmits(["editStudent", "deleteStudent"]);

const loading = computed<boolean>(() => store.loading);

const formattCPF = (cpf: string | null | undefined): string => {
  if (!cpf || cpf.length !== 11) {
    return "";
  }
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};
</script>
