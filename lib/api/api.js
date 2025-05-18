import axios from "axios";
import { DEV_BASE_URL } from "@env";

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
    `/top-headlines?category=health&q=${query}&apiKey=${apiKey}`
  );
  return response.data;
}

export async function fetchCampaignAlerts() {
  const response = await api.get(
    `/top-headlines?category=health&country=${country}&apiKey=${apiKey}`
  );

  return response.data;
}

export async function fetchMultipleKeywords() {
  const keywords = [
    "campaign",
    "screening",
    "vaccine",
    "immunization",
    "check-up",
    "clinic",
    "alert",
    "advisory",
    "free",
    "outreach",
  ];
  const allResults = await Promise.all(
    keywords.map((keyword) => fetchHealthNewsByQuery(keyword))
  );

  // Merge and deduplicate Resources
  const mergedResources = allResults.flatMap(
    (result) => result?.Result?.Resources?.all?.Resource || []
  );

  const uniqueResources = Array.from(
    new Map(mergedResources.map((item) => [item.Id, item])).values()
  );

  return uniqueResources;
}
/* const proxyUrl = "http://cors-anywhere.herokuapp.com";
const preventiveApi = axios.create({
  baseURL: proxyUrl + "health.gov/myhealthfinder/api/v3/",
}); */

export async function fetchHealthLiteracyData() {
  const data = await axios.get(
    `https://health.gov/myhealthfinder/api/v3/topicsearch.json?lang=english`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(JSON.stringify(data, null, 2));
  return data.Result.Resources.Resource;
}

export async function fetchHealthFinderReco(age, sex) {
  const response = await axios.get(
    `${DEV_BASE_URL}/api/healthfinder?age=30&sex=male`
  );
  return response.data;
  /* const response = await preventiveApi.get(
    `/myhealthfinder.json?age=${age}&sex=${sex}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(JSON.stringify(response.data, null, 2));
  return response.data.Result.Resources.Resource; */
}
