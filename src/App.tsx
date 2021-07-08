import React, { useState } from "react";
import { Stack, useToast } from "@chakra-ui/react";
import Header from "./components/Header";
import Searcher from "./components/Searcher";
import Table from "./components/Table";
import getData from "./utils/getData";
import { Response } from "./Types";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<Response>();
  const toast = useToast();

  const handleSearch = async (query: string, filters: string[]) => {
    setLoading(true);

    const response = await getData(query, filters);
    if (response.hasOwnProperty("message_error")) {
      toast({
        title: "An error ocurred. Please try again later.",
        description: response["message_error"],
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
    setTableData(response);
    setLoading(false);
  };

  return (
    <Stack className="App" spacing="4rem" alignItems="center">
      <Header />
      <Searcher handleSearch={handleSearch} loading={loading} />
      <Table loading={loading} {...tableData} />
    </Stack>
  );
};

export default App;
