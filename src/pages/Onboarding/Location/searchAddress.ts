import { JUSO_KEY } from 'keys';

export default async function searchAddress(
  query: string,
  page = 1,
  countPerPage = 50,
) {
  const url = 'https://www.juso.go.kr/addrlink/addrLinkApi.do';
  const params = {
    confmKey: JUSO_KEY,
    resultType: 'json',
    keyword: query,
    currentPage: page.toString(),
    countPerPage: countPerPage.toString(),
  };
  const paramStr = new URLSearchParams(params).toString();

  try {
    const res = await fetch(`${url}?${paramStr}`);
    const data = await res.json();
    return await data.results;
  } catch (e) {
    return null;
  }
}

