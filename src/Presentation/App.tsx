import { Button, ChakraProvider, Flex } from "@chakra-ui/react";

import DataTable from "./Pages/DataTable";

export default function App() {
  return (
    <ChakraProvider>
      <Flex className="AppContainer">
        <Button
          position="absolute"
          top={3}
          left={3}
          size="sm"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Reset
        </Button>

        <DataTable />
      </Flex>
    </ChakraProvider>
  );
}
