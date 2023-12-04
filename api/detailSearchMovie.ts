import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
/* 영화 목록 검색 
  apikey 필수
  i(영화 id) 필수
  plot(줄거리) 기본값 short
*/

const { APIKEY } = process.env;

interface SearchValue {
  movieId: string;
  plot?: string;
}

export default async function (req: VercelRequest, res: VercelResponse) {
  const { movieId, plot = 'short' } = req.body as SearchValue;

  const { data: responseValue } = await axios({
    url: `https://omdbapi.com?apikey=${APIKEY}&i=${movieId}&plot=${plot}`,
    method: 'GET'
  });

  res.status(200).json(responseValue);
}
