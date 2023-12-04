import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

/* 영화 목록 검색 
  apikey 필수
  s(영화 제목) 필수
  page(페이지) 기본값 1
  y(영화 출시 년도) 기본값 X
*/

const { APIKEY } = process.env;

interface SearchValue {
  title: string;
  page?: string;
  year?: string;
}

export default async function (req: VercelRequest, res: VercelResponse) {
  const { title, page } = req.body as SearchValue;

  const { data: responseValue } = await axios({
    url: `https://omdbapi.com?apikey=${APIKEY}&s=${title}&page=${page}`,
    method: 'GET'
  });

  res.status(200).json(responseValue);
}
