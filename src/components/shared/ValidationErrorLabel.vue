<template>
  <span class="validation-text text-danger">
    {{ error }}
  </span>
</template>

<script>
export default {
  name: 'ValidationErrorLabel',
  props: {
    error: {
      default: null,
      required: false,
      type: String,
    },
  },
};
</script>

<style>

</style>
