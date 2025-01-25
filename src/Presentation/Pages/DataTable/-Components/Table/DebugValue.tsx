import { Tag, TagLabel, TagLabelProps, TagProps } from "@chakra-ui/react";

type DebugValueProps = {
  value: number | string | null | null;
  labelProps?: Partial<TagLabelProps>;
};

const DebugValue = ({
  value,
  labelProps,
  ...tagProps
}: DebugValueProps & Partial<TagProps>) => {
  return (
    <Tag colorScheme="purple" size="sm" fontSize="10px" {...tagProps}>
      <TagLabel {...labelProps}>{value}</TagLabel>
    </Tag>
  );
};

export default DebugValue;
