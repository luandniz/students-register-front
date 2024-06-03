<template>
  <q-select
    dense
    v-model="model"
    :options="options"
    :label="label"
    emit-value
    map-options
    outlined
  />
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const model = defineModel();

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  options: Option[];
}

defineProps<SelectProps>();
</script>
