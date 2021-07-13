import dummy from "../dummy_API.json";

const getData: FetchFromAPI = async (input, filters, order = false) => {
  // Transforms the selected filters (excluding 'active') to the query format
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
  if (order) {
    // Example: https://mydb-fafc.restdb.io/rest/people?q={}&h={"$orderby": {"name": 1, "age": -1}}
    query += `&h={"$orderby": {"${order.param}": ${order.value}}}`;
  }

  if (process.env.NODE_ENV !== "production") {
    // DEVELOPMENT
    const formatedData = dummy;
    console.log(`Se inicia la busqueda en la URL: \n${query}`);

    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulates the load
    return {
      data: formatedData as DataRow[],
      pages: 100,
      rowsPerPage: 20,
      total: 2500,
      page: 1,
      order,
      last_input: [input, filters],
    };
  } else {
    // PRODUCTION
    if (!process.env.API_URL) {
      throw new Error("API url missing on environment.");
    }

    const response = await fetch(process.env.API_URL + query);
    if (response.status !== 200) {
      throw new Error(
        `La conección a la API respondió con código ${response.status}.`
      );
    }
    const formatedData = (await response.json()) as APIResponse;

    return { ...formatedData, last_input: [input, filters], order };
  }
};

export default getData;
