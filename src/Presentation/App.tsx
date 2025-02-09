import { Button, ChakraProvider, Flex } from '@chakra-ui/react';

import DataTable from './Pages/DataTable';

export default function App() {
  return (
    <ChakraProvider>
      <Button size="sm" onClick={() => localStorage.clear()}>
        Reset
      </Button>

      <Flex className="AppContainer" minW="full" minH="100svh" justifyContent="center">
        <DataTable />
      </Flex>
    </ChakraProvider>
  );
}
