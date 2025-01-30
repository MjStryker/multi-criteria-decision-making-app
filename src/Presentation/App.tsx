import { ChakraProvider, Flex } from '@chakra-ui/react';

import DataTable from './Pages/DataTable';
import UseGlobalHooks from '@/Application/@Global/UseGlobalHooks';
import { EventServiceProvider } from '@/@Event/EventService';

export default function App() {
  UseGlobalHooks();

  return (
    <EventServiceProvider>
      <ChakraProvider>
        <Flex className="AppContainer" minW="full" minH="100svh" justifyContent="center">
          <DataTable />
        </Flex>
      </ChakraProvider>
    </EventServiceProvider>
  );
}
