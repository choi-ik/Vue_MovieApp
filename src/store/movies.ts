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
    detailMovieData: {} // 영화 상세 데이터
  }),
  getters: {},
  actions: {
    // 영화 제목 검색
    async searchMovies({ title, page = '', year = '' }: SearchMoviePayload) {
      const { data } = await axios.post('/api/movieSearch', {
        title,
        page,
        year
      });

      this.movieData = data;
    },
    // 영화 상세 정보 검색
    async detailSearchMovie({ movieId, plot = 'short' }: DetailSearchMovie) {
      const { data } = await axios.post('/api/detailSearchMovie', {
        movieId,
        plot
      });

      this.detailMovieData = data;
      console.log('상세 데이터', this.detailMovieData);
    }
  }
});
