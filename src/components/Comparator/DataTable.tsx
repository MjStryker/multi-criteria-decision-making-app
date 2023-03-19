import { Box, Progress, Table, TableContainer } from "@chakra-ui/react";

import { DataContext } from "../../context/DataContext";
import { IsAnyEditDialogOpenedContextProvider } from "../../context/IsAnyEditDialogOpened";
import TableBody from "./Table/Body/TableBody";
import TableFooter from "./Table/Footer/TableFooter";
import TableHeader from "./Table/Header/TableHeader";
import { useContext } from "react";

const PendingProgress = () => (
  <Box position="fixed" top={0} left={0} w="full">
    <Progress size="xs" isIndeterminate />
  </Box>
);

const DataTable = () => {
  const { isPending } = useContext(DataContext);

  return (
    <IsAnyEditDialogOpenedContextProvider>
      {isPending ? <PendingProgress /> : null}

      <TableContainer
        className="TableContainer"
        flex={1}
        display="flex"
        overflowY="auto"
        h="full"
        p={4}
      >
        <Table size="sm" w="auto" h="min-content" m="0 auto">
          <TableHeader />

          <TableBody />

          <TableFooter />
        </Table>
      </TableContainer>
    </IsAnyEditDialogOpenedContextProvider>
  );
};

export default DataTable;
