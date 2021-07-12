import dummy from "../dummy_API.json";
import { FetchToAPI } from "../Types";

const getData: FetchToAPI = async (input, filters) => {
  const possible_matches = filters
    .filter((f) => f !== "active")
    .map((f) => `{"${f}":"${input}"}`);

  let query;

  // QUERY PARAMS
  if (filters.includes("active")) {
    query = `?={"$and": [{"$or": [${possible_matches}]}, {"active": 1}]}`;
  } else {
    query = `?={"$or": [${possible_matches}]}`;
  }

  // ORDER BY
  //https://mydb-fafc.restdb.io/rest/people?q={}&h={"$orderby": {"name": 1, "age": -1}}

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
      if (response.status !== 200) {
        throw new Error(`Connection to API threw code ${response.status}.`);
      }
      const formatedData = await response.json();

      return formatedData;
    } catch (err) {
      return {
        message_error: err,
      };
    }
  }
};

export default getData;
