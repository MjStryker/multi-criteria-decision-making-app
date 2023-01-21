import { ChakraProvider, Flex } from "@chakra-ui/react";

import DataTable from "./components/Comparator/DataTable";

function App() {
  return (
    <ChakraProvider>
      <Flex
        className="AppContainer"
        width="full"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <DataTable />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
