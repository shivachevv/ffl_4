<template>
  <div class="modal-header">
    <v-row justify="center" class="text-h3">
      <slot />
    </v-row>
    <v-divider class="divider" />
  </div>
</template>
<style scoped>
.divider {
  margin-top: 0.8rem;
}
</style>
