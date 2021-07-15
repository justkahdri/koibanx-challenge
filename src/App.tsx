import React, { useState } from "react";
import { Heading, Stack, useToast } from "@chakra-ui/react";
import Header from "./components/Header";
import Searcher from "./components/Searcher";
import Table from "./components/Table";
import getData from "./utils/getData";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<TableData>();
  const toast = useToast();

  // Sends the input values to the API through getData.
  const handleSearch = async (
    query: string,
    filters: TFilters,
    order?: any
  ) => {
    setLoading(true);

    let response;

    try {
      response = await getData(query, filters, order);
    } catch (err) {
      // Notifies the user if the load fails
      toast({
        title: "Ocurrió un error. Por favor, intente más tarde.",
        description: err.message,
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
    setTableData(response);
    setLoading(false);
  };

  // Triggers when the user clicks the sortable headers
  const handleSort = (
    event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
    last_input: [string, TFilters]
  ) => {
    let order: 1 | -1;
    if (event.currentTarget.className == "sortable active") {
      order = -1;
    } else {
      order = 1;
    }

    handleSearch(...last_input, {
      param: event.currentTarget.id,
      value: order,
    });
  };

  return (
    <Stack className="App" spacing="4rem" alignItems="center">
      <Header />
      <Searcher handleSearch={handleSearch} loading={loading} />
      {tableData ? (
        <Table loading={loading} {...tableData} handleSort={handleSort} />
      ) : (
        <Heading as="h2" className="placeholder" size="lg">
          🔎 Los resultados aparecer&aacute;n aqu&iacute;.
        </Heading>
      )}
    </Stack>
  );
};

export default App;
