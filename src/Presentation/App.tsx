import { Button, Flex } from "@chakra-ui/react";

import { DataTable } from "./Pages/DataTable/DataTable";
import { ChakraAppProvider } from "./Providers/ChakraProvider";

export default function App() {
  return (
    <ChakraAppProvider>
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
    </ChakraAppProvider>
  );
}
