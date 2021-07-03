import { Stack } from "@chakra-ui/react";
import React from "react";
import Header from "./components/Header";
import Searcher from "./components/Searcher";
import Table from "./components/Table";

const App: React.FC = () => {
  return (
    <Stack className="App" spacing="4rem" alignItems="center">
      <Header />
      <Searcher />
      <Table />
    </Stack>
  );
};

export default App;
