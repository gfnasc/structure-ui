<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

const error = ref<Error | null>(null);

onErrorCaptured((err) => {
  error.value = err as Error;
  // Prevent the error from propagating further up
  return false;
});
</script>

<template>
  <div v-if="error" class="contents">
    <slot name="error" :error="error">
      <!-- Default minimal error message -->
      <div role="alert">
        Something went wrong: {{ error.message }}
      </div>
    </slot>
  </div>
  <Suspense v-else>
    <template #default>
      <slot />
    </template>
    <template #fallback>
      <slot name="fallback">
        <!-- Default minimal loading state -->
        <div aria-busy="true">Loading...</div>
      </slot>
    </template>
  </Suspense>
</template>
