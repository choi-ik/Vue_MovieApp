<script setup lang="ts">
const a = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=황해&page=`).then(
  (res) => res.json()
);

console.log(a);
</script>

<template>
  <h1>Main Page</h1>
</template>
