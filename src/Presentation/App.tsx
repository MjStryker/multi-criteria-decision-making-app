import {
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch
} from "@chakra-ui/react";
import { IconAlertTriangle, IconChevronDown } from "@tabler/icons-react";
import { useAtom } from "jotai";

import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import { DataTable } from "./Pages/DataTable/DataTable";
import { ChakraAppProvider } from "./Providers/ChakraProvider";

export default function App() {
  return (
    <ChakraAppProvider>
      <Flex className="AppContainer">
        <HStack position="absolute" top={3} left={3}>
          <SettingsMenu />
        </HStack>

        <DataTable />
      </Flex>
    </ChakraAppProvider>
  );
}

function SettingsMenu() {
  const [advanced, setAdvanced] = useAtom(AppSettingsAtoms.advancedMode);
  const [autoRecompute, setAutoRecompute] = useAtom(
    AppSettingsAtoms.autoRecompute
  );

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={
          <Icon>
            <IconChevronDown />
          </Icon>
        }
      >
        Settings
      </MenuButton>

      <MenuList>
        <MenuItem
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Clear data
          <Center minW="32px">
            <Icon boxSize="20px" color="orange.500">
              <IconAlertTriangle />
            </Icon>
          </Center>
        </MenuItem>

        <MenuItem
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          onClick={() => setAdvanced(prev => !prev)}
        >
          Advanced Mode
          <Switch isChecked={advanced} pointerEvents="none" />
        </MenuItem>

        <MenuItem
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          onClick={() => setAutoRecompute(prev => !prev)}
        >
          Auto Recompute
          <Switch isChecked={autoRecompute} pointerEvents="none" />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
