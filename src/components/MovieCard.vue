<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    type: string[];
    required: true;
  };
}>();

console.log(props.modelValue);
</script>

<template>
  <div class="card">
    <img
      :src="modelValue.Poster"
      alt="movieImg" />
    <div class="movieContent">
      <div
        v-for="(value, key) in modelValue"
        :key="key">
        {{ key }}: {{ value }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 180px;
  height: 300px;
  margin: 10px 20px 10px 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  box-shadow:
    4px 0px 20px 10px rgba(#000, 0.1),
    4px 0px 20px 10px rgba(#000, 0.2);
}
img {
  width: 180px;
  height: 200px;
  border-radius: 20px 20px 0 0;
}
.movieContent {
  background-color: white;
  width: 100%;
  height: 100px;
  padding: 5px 5px 10px 5px;
  box-sizing: border-box;
  color: black;
  font-size: 15px;
  border-radius: 0 0 20px 20px;
}
</style>
