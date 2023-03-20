import { ChakraProvider, Flex } from "@chakra-ui/react";

import { DataContextProvider } from "./context/DataContext";
import DataTable from "./components/Comparator/DataTable";

function App() {
  return (
    <ChakraProvider>
      <DataContextProvider>
        <Flex
          className="AppContainer"
          width="full"
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <DataTable />
        </Flex>
      </DataContextProvider>
    </ChakraProvider>
  );
}

export default App;
