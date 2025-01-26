import { Table, TableContainer } from '@chakra-ui/react';

import ComputingRanksIndicator from './-Components/ComputingRanksIndicator';
import TableBody from './-Components/Table/Body/TableBody';
import TableFooter from './-Components/Table/Footer/TableFooter';
import TableHeader from './-Components/Table/Header/TableHeader';

export default function DataTable() {
  return (
    <>
      <ComputingRanksIndicator />

      <TableContainer className="TableContainer" flex={1} display="flex" overflowY="auto" h="full" p={4}>
        <Table size="sm" w="auto" h="min-content" m="0 auto">
          <TableHeader />

          <TableBody />

          <TableFooter />
        </Table>
      </TableContainer>
    </>
  );
}
