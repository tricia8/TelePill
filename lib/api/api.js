import axios from "axios";

const api = axios.create({
  baseURL: "https://newsapi.org/v2/",
});

const apiKey = "ad4436a4de5648b8ae03ecaa1745130a";

export async function fetchHealthNewsByCountry(country) {
  const response = await api.get(
    `/top-headlines?category=health&country=${country}&apiKey=${apiKey}`
  );
  return response.data;
}

export async function fetchHealthNewsByQuery(query) {
  const response = await api.get(
    `/everything?category=health&q=${query}&apiKey=${apiKey}`
  );
  return response.data;
}
