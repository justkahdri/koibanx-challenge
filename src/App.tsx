import React, { useState } from "react";
import { Stack, useToast } from "@chakra-ui/react";
import Header from "./components/Header";
import Searcher from "./components/Searcher";
import Table from "./components/Table";
import getData from "./utils/getData";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<TableData>();
  const toast = useToast();

  const handleSearch = async (
    query: string,
    filters: string[],
    order?: any
  ) => {
    setLoading(true);

    let response;

    try {
      response = await getData(query, filters, order);
    } catch (err) {
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

  const handleSort = (
    event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
    last_input: [string, string[]]
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
        <h2 className="placeholder">
          🔎 Los resultados aparecer&aacute;n aqu&iacute;.
        </h2>
      )}
    </Stack>
  );
};

export default App;
