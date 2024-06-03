<template>
  <div class="row no-wrap shadow-1">
    <q-toolbar class="bg-mainGreen text-dark col-7">
      <q-icon size="sm" name="whatshot" />
    </q-toolbar>
    <q-toolbar class="flex justify-end col-5 bg-grey-2 text-white">
      <q-btn
        glossy
        unelevated
        dense
        label="Novo Cadastro"
        color="blue-7"
        @click="$emit('createStudent')"
      />
    </q-toolbar>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";

defineEmits(["createStudent"]);
</script>
