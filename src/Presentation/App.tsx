import { Button, ChakraProvider, Flex } from '@chakra-ui/react';

import UseGlobalHooks from '@/Application/@Global/UseGlobalHooks';
import DataTable from './Pages/DataTable';

export default function App() {
  UseGlobalHooks();

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
