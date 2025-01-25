import { Box, Progress } from "@chakra-ui/react";

export default function ComputingRanksIndicator() {
  const isPending = false; // TODO

  if (!isPending) {
    return null;
  }

  return (
    <Box position="fixed" top={0} left={0} w="full">
      <Progress size="sm" isIndeterminate />
    </Box>
  );
}
