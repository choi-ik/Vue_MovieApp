<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface responseDetailMovie {
  [key: string]: string;
}

interface MovieData {
  Title: string;
  Year: string;
  Genre: string;
  Actors: string;
  Director: string;
  Writer: string;
  Poster: string;
  Released: string;
  Runtime: string;
}

const outerModal = ref(HTMLDivElement);
const detailData = ref<MovieData>({
  Title: '',
  Year: '',
  Genre: '',
  Actors: '',
  Director: '',
  Writer: '',
  Poster: '',
  Released: '',
  Runtime: ''
});

onMounted(() => {
  if (props.modelValue) {
    window.addEventListener('keydown', closeModal);
    window.addEventListener('click', closeModal);
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', closeModal);
  window.removeEventListener('click', closeModal);
});

const props = defineProps<{
  responseDetail: responseDetailMovie;
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const {
  Title,
  Year,
  Genre,
  Actors,
  Director,
  Writer,
  Poster,
  Released,
  Runtime
} = props.responseDetail;

detailData.value = {
  Title,
  Year,
  Genre,
  Actors,
  Director,
  Writer,
  Poster,
  Released,
  Runtime
};

// 모달창 제거 함수
const closeModal = (event: MouseEvent | KeyboardEvent) => {
  if (event.target === outerModal.value) emit('update:modelValue', false);
  else if (event.key === 'Escape') emit('update:modelValue', false);
};
</script>

<template>
  <div
    ref="outerModal"
    class="modal-outer">
    <div class="modal-inner">
      <img
        :src="responseDetail.Poster"
        alt="detailMovieImg" />
      <template
        v-for="(value, key) in detailData"
        :key="key">
        <div
          v-if="key !== 'Poster'"
          class="detail-content">
          {{ key }}: {{ value }}
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-outer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .modal-inner {
    width: 30%;
    height: 70%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);

    img {
      width: 100%;
      height: 60%;
    }
    .detail-content {
      background-color: white;
      flex-grow: 1;
    }
  }
}
</style>
