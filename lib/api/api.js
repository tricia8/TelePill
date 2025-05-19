import axios from "axios";
import Constants from "expo-constants";

const api = axios.create({
  baseURL: "https://newsapi.org/v2/",
});

const apiKey = "536b65088caa43458a8f8633d7c829af";

export async function fetchHealthNewsByCountry(country) {
  const response = await api.get(
    `/top-headlines?category=health&country=${country}&apiKey=${apiKey}`
  );
  return response.data;
}

export async function fetchHealthNewsByQuery(country, query) {
  const response = await api.get(
    `/top-headlines?category=health&country=${country}&q=${query}&apiKey=${apiKey}`
  );
  return response.data;
}

export async function fetchCampaignAlerts() {
  const response = await api.get(
    `/top-headlines?category=health&country=${country}&apiKey=${apiKey}`
  );

  return response.data;
}

/* export async function fetchMultipleKeywords(country) {
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
    keywords.map((keyword) => fetchHealthNewsByQuery(country, keyword))
  );

  // Merge and deduplicate
  const mergedResources = allResults.flatMap((result) => result.articles || []);

  const uniqueResources = Array.from(
    new Map(mergedResources.map((item) => [item.url, item])).values()
  );

  console.log(uniqueResources);
  return { articles: uniqueResources };
} */

export async function fetchMultipleKeywords(country) {
  const keywords = ["campaign", "screening", "vaccine", "free"];

  const uniqueArticlesMap = new Map();

  for (const keyword of keywords) {
    try {
      const result = await fetchHealthNewsByQuery(country, keyword);
      for (const article of result.articles || []) {
        uniqueArticlesMap.set(article.url, article);
      }
      // Add a short delay between calls (avoid 429)
      await new Promise((res) => setTimeout(res, 500));
    } catch (err) {
      console.warn(`Error fetching keyword "${keyword}": ${err.message}`);
    }
  }

  return { articles: Array.from(uniqueArticlesMap.values()) };
}
/* const proxyUrl = "http://cors-anywhere.herokuapp.com";
const preventiveApi = axios.create({
  baseURL: proxyUrl + "health.gov/myhealthfinder/api/v3/",
}); */

export async function fetchHealthLiteracyData() {
  const data = await axios.get(
    `${HFDevBaseUrl}/api/v3/topicsearch.json?lang=english`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(JSON.stringify(data, null, 2));
  return data.Result.Resources.Resource;
}

const HealthFinderDevBaseURL = Constants.expoConfig.extra.HFDevBaseUrl;

export async function fetchHealthFinderReco(age, sex) {
  console.log(
    `${HealthFinderDevBaseURL}/api/healthfinder?age=${age}&sex=${sex}`
  );
  const response = await axios.get(
    `${HealthFinderDevBaseURL}/api/healthfinder?age=${age}&sex=${sex}`
  );
  return response.data;
}
