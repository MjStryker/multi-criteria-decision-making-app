import { COLORS } from "../../constants/colors";
import { CSSProperties } from "react";
import { border } from "../../styles/tables/tableCell";

export const DATA_TABLE_STYLES = {
  TEXT: {
    MORE_INFO_CONTAINER: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    } as CSSProperties,
    MORE_INFO: {
      marginLeft: 8,
      fontSize: 12,
      color: COLORS.GREY,
    },
  },
  INPUT: {
    TEXT: {
      fontSize: 16,
      textAlign: "inherit",
    } as CSSProperties,
  },
  TD: {
    CELL_VALUE: {
      border,
      textAlign: "right",
    } as CSSProperties,
    CRITERIA: {
      width: "fit-content",
      minWidth: 200,
      border,
    } as CSSProperties,
    CRITERIA_BENEFICIAL: {
      minWidth: 36,
      border,
    } as CSSProperties,
    CRITERIA_WEIGHT: {
      border,
      textAlign: "right",
      width: 40,
    } as CSSProperties,
  },
} as const;
