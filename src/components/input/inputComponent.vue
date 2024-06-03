<template>
  <q-input
    v-model="model"
    :label="label"
    :type="type"
    :disable="disable"
    :mask="mask"
    fill-mask
    debounce="500"
    outlined
    dense
  >
    <template v-slot:prepend>
      <q-icon :name="inputIcon" color="blue-6" v-if="inputIcon !== undefined" />
    </template>
    <template v-slot:append>
      <q-btn
        v-if="buttonIcon"
        unelevated
        dense
        :icon="buttonIcon"
        color="primary"
        text-color="white"
        @click="$emit('searchFn')"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const model = defineModel<string | number>();

interface InputProps {
  label: string;
  type:
    | "text"
    | "email"
    | "number"
    | "textarea"
    | "time"
    | "search"
    | "password"
    | "tel"
    | "file"
    | "url"
    | "date"
    | "datetime-local"
    | undefined;
  disable?: boolean;
  buttonIcon?: string;
  inputIcon?: string;
  mask?: string;
}

defineEmits(["searchFn"]);
defineProps<InputProps>();
</script>
