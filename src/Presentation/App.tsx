import { ChakraProvider, Flex } from '@chakra-ui/react';

import DataTable from './Pages/DataTable';
import UseGlobalHooks from '@/Application/@Global/UseGlobalHooks';

export default function App() {
  UseGlobalHooks();

  return (
    <ChakraProvider>
      <Flex className="AppContainer" minW="full" minH="100svh" justifyContent="center">
        <DataTable />
      </Flex>
    </ChakraProvider>
  );
}
