const REGIONS_API_URL = "https://hotels-com-provider.p.rapidapi.com/v2/regions";
const API_HOST = "hotels-com-provider.p.rapidapi.com";
const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

export const searchHotelRegions = async (query) => {
  if (!API_KEY) {
    throw new Error("RapidAPI key is not configured.");
  }

  const trimmedQuery = query.trim();
  const response = await fetch(
    `${REGIONS_API_URL}?query=${encodeURIComponent(trimmedQuery)}&locale=es_AR&domain=AR`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY
      }
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch destination.");
  }

  const data = await response.json();
  return Array.isArray(data?.data) ? data.data : [];
};

export const toHotelSearchState = (query, allResults) => ({
  query: query.trim(),
  allResults,
  hotelResults: allResults.filter((item) => item?.type === "HOTEL")
});
