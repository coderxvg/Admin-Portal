<template>
  <div>
    <select
      class="form-control"
      id="exampleFormControlSelect1"
      :value="value"
      @input="updateValue($event.target.value)"
    >
      <option value="" disabled selected>{{ this.label }}</option>
      <option v-for="data in options" :key="data.id">{{ data.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "base-dropdown",
  props: ["options", "value","label"],
  methods: {
    updateValue(value) {
      this.$emit("input", value)
    }
}
}
</script>

<style>
</style>