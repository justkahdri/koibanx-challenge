import dummy from "../dummy_API.json";
import { FetchToAPI } from "../Types";

const fetchQuery: FetchToAPI = async (input, filters) => {
  const possible_matches = filters
    .filter((f) => f !== "active")
    .map((f) => `{"${f}":"${input}"}`);

  let query;

  if (filters.includes("active")) {
    query = `?={"$and": [{"$or": [${possible_matches}]}, {"active": 1}]}`;
  } else {
    query = `?={"$or": [${possible_matches}]}`;
  }

  if (process.env.NODE_ENV !== "production") {
    // DEVELOPMENT
    const formatedData = dummy;

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulates the load
    return {
      data: formatedData,
      pages: 100,
      rowsPerPage: 20,
      total: 2500,
      page: 1,
    };
  } else {
    // PRODUCTION
    try {
      if (!process.env.API_URL) {
        throw new Error("API url missing on environment.");
      }
      const response = await fetch(process.env.API_URL + query);
      const formatedData = await response.json();

      return formatedData;
    } catch (err) {
      return {
        message_error: err,
      };
    }
  }
};

export default fetchQuery;
