import axios from "axios";

const api = axios.create({
  baseUrl: "https://newsapi.org/v2/",
});

export async function fetchHealthNewsByCountry(country) {
  const response = await api.get(
    `/top-headlines?category=health&country=${country}&apiKey=ad4436a4de5648b8ae03ecaa1745130a`
  );
  return response.data;
}

export async function fetchHealthNewsByQuery(query) {
  const response = await api.get(
    `/everything?category=health&q=${query}&apiKey=ad4436a4de5648b8ae03ecaa1745130a`
  );
  return response.data;
}
