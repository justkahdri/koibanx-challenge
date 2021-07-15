import dummy from "../dummy_API.json";

// NOTE: In vite we use 'import.meta.env' as 'import\.meta'

const getData: FetchFromAPI = async (input, filters, order = false) => {
  if (!import.meta.env.VITE_API_URL) {
    throw new Error("API url missing on environment.");
  }

  // Transforms the selected filters to the query format
  const possible_matches = filters.byInput.map((f) => `{"${f}":"${input}"}`);

  let query;

  // QUERY PARAMS
  if (filters.byActivity !== "all") {
    if (filters.byActivity == "active") {
      query = `?={"$and": [{"$or": [${possible_matches}]}, {"active": 1}]}`; // All active matches
    } else {
      query = `?={"$and": [{"$or": [${possible_matches}]}, {"active": 0}]}`; // All non-active matches
    }
  } else {
    query = `?={"$or": [${possible_matches}]}`;
  }

  // ORDER BY
  if (order) {
    // Example: https://mydb-fafc.restdb.io/rest/people?q={}&h={"$orderby": {"name": 1, "age": -1}}
    query += `&h={"$orderby": {"${order.param}": ${order.value}}}`;
  }

  if (!import.meta.env.PROD) {
    // DEVELOPMENT

    const formatedData = dummy as DataRow[];
    console.log(
      "Se inicia la busqueda en la URL:",
      `\n${import.meta.env.VITE_API_URL + query}`
    );

    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulates the load
    return {
      data: formatedData,
      pages: 100,
      rowsPerPage: 20,
      total: 2500,
      page: 1,
      order,
      last_input: [input, filters],
    };
  } else {
    // PRODUCTION

    const response = await fetch(import.meta.env.VITE_API_URL + query);
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
