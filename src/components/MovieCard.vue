<script setup lang="ts">
import TheModal from '~/components/TheModal.vue';
import { useMoiveStore } from '~/store/movies';
import { ref } from 'vue';

const detailMovieStore = useMoiveStore();
const detailMovieContent = ref({});
const isModalOpen = ref(false);
const $card = ref(null);

interface ModelValue {
  Poster: string;
  Title: string;
  Person: string;
  Type: string;
  Year: string;
  imdbID: string;
}

const props = defineProps<{
  modelValue: ModelValue;
}>();
console.log(props.modelValue);
// 영화 상세 내용 검색
const detailSearchMovie = async (movieId: string) => {
  await detailMovieStore.detailSearchMovie({ movieId });

  detailMovieContent.value = detailMovieStore.detailMovieData;
};
</script>

<template>
  <div
    ref="$card"
    class="card">
    <img
      :src="modelValue.Poster"
      alt="movieImg" />
    <div class="movieContent">
      <template
        v-for="(value, key) in modelValue"
        :key="key">
        <div
          v-if="key !== 'Poster' && key !== 'imdbID' && key !== 'Type'"
          class="content">
          {{ key }}: {{ value }}
        </div>
      </template>
      <button
        @click="
          async () => {
            await detailSearchMovie(modelValue.imdbID);
            isModalOpen = true;
          }
        ">
        더 보기
      </button>
      <TheModal
        v-if="isModalOpen"
        v-model="isModalOpen"
        :response-detail="detailMovieContent" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 180px;
  height: 300px;
  margin: 10px 20px 10px 20px;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 4px 0px 20px 10px rgba(#000, 0.2);
}
img {
  width: 180px;
  height: 200px;
}
.movieContent {
  background-color: white;
  width: 100%;
  height: 100px;
  padding: 5px 5px 10px 5px;
  box-sizing: border-box;
  color: black;
  font-size: 15px;
  .content {
    margin: 10px 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  button {
    cursor: pointer;
  }
}
</style>
