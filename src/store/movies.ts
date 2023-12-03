import axios from 'axios';
import { defineStore } from 'pinia';

interface SearchMoviePayload {
  title: string;
  page?: string;
  year?: string;
}

interface DetailSearchMovie {
  movieId: string;
  plot?: string;
}

export const useMoiveStore = defineStore('movies', {
  state: () => ({
    movieData: [], // 영화 데이터
    detailMovieData: {}, // 영화 상세 데이터
    isLoading: false
  }),
  getters: {},
  actions: {
    // 영화 제목 검색
    async searchMovies({ title, page = '', year = '' }: SearchMoviePayload) {
      // 로딩중 일때는 API 요청 X
      if (this.isLoading) return;

      this.isLoading = true;
      const { data } = await axios.post('/api/movieSearch', {
        title,
        page,
        year
      });
      this.movieData = data;
      this.isLoading = false;
    },
    // 영화 상세 정보 검색
    async detailSearchMovie({ movieId, plot = 'short' }: DetailSearchMovie) {
      // 로딩중 일때는 API 요청 X
      if (this.isLoading) return;

      this.isLoading = true;

      const { data } = await axios.post('/api/detailSearchMovie', {
        movieId,
        plot
      });

      this.detailMovieData = data;
      this.isLoading = false;
    }
  }
});
