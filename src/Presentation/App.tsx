import { Button, Flex, HStack, Switch } from "@chakra-ui/react";
import { useAtom } from "jotai";

import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import { DataTable } from "./Pages/DataTable/DataTable";
import { ChakraAppProvider } from "./Providers/ChakraProvider";

export default function App() {
  return (
    <ChakraAppProvider>
      <Flex className="AppContainer">
        <HStack position="absolute" top={3} left={3}>
          <ResetButton />
          <AdvancedModeToggle />
        </HStack>

        <DataTable />
      </Flex>
    </ChakraAppProvider>
  );
}

function ResetButton() {
  return (
    <Button
      size="sm"
      onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}
    >
      Reset
    </Button>
  );
}

function AdvancedModeToggle() {
  const [advanced, setAdvanced] = useAtom(AppSettingsAtoms.advancedMode);

  return (
    <Switch
      isChecked={advanced}
      onChange={v => setAdvanced(v.target.checked)}
    />
  );
}
