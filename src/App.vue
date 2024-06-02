<template>
  <div>{{ store.title }}</div>
</template>

<script setup lang="ts">
import { useStudents } from "./store/useStudents";

const store = useStudents();
</script>
