<template>
  <b-badge
    pill
    :variant="variant"
  >
    {{ disabled | status }}
  </b-badge>
</template>

<script>
export default {
  computed: {
    variant() {
      return this.disabled ? 'danger' : 'success';
    },
  },
  filters: {
    status(disabled) {
      return disabled ? 'Disabled' : 'Enabled';
    },
  },
  props: {
    disabled: {
      required: true,
      type: Boolean,
    },
  },
};
</script>
