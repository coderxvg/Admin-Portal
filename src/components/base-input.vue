<template>
  <div>
    <input
      class="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      v-bind="$attrs"
      :value="value"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "base-input",
  props: ["value"],
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style>
</style>