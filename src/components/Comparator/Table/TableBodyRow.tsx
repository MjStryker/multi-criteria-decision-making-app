import { areDefined, isDefined } from "../../../utils/objects";
import { useRef, useState } from "react";

import { CRITERIA } from "../../../constants/criterias";
import { DATA_TABLE_STYLES } from "../DataTable.styles";
import { TCriteria } from "../../../types/criterias";
import { TProduct } from "../../../types/products";
import { capitalize } from "../../../utils/strings";
import { clampCriteriaWeightValue } from "../../../utils/criterias/criterias";
import { createEmptyProductCriteriaValue } from "../../../utils/productsWithCriterias/productsWithCriterias";
import { minWidth } from "../../../styles/tables/tableCell";
import productsWithCriterias from "../../../data/cordlessVacuumCleaner/productsWithCriterias";
import useClickOutside from "../../../hooks/useClickOutside";

type TableBodyRowProps = {
  criterion: TCriteria;
  products: TProduct[];
  rowIdx: number;
  weightTotal: number;
  maxWeight: number | null;
  updateCriteria: Function;
  removeCriteria: Function;
  setProductCriteriaValue: Function;
};

const TableBodyRow = (props: TableBodyRowProps) => {
  const inputRef = useRef(null);

  const [cellId, setCellId] = useState<string | null>(null);
  const [cellValue, setCellValue] = useState<string | number | boolean | null>(
    null
  );
  const [cellSecondaryValue, setCellSecondaryValue] = useState<
    string | number | boolean | null
  >(null);

  useClickOutside(inputRef, () => {
    console.log(`[ Cell ] Clicked away from ${cellId}..`);
    setCellId(null);
    setCellValue(null);
    setCellSecondaryValue(null);
  });

  const isCriteriaNameCellInEditMode = `${props.criterion.id}-name` === cellId;
  const isCriteriaBeneficialCellInEditMode =
    `${props.criterion.id}-beneficial` === cellId;
  const isCriteriaWeightCellInEditMode =
    `${props.criterion.id}-weight` === cellId;

  return (
    <tr key={props.criterion.id}>
      {/*
       * CRITERIA - NAME / UNIT
       */}
      <td
        style={{
          ...DATA_TABLE_STYLES.TD.CRITERIA,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            ref={isCriteriaNameCellInEditMode ? inputRef : undefined}
            onClick={() => {
              if (isCriteriaNameCellInEditMode) {
                return;
              }
              console.log(`[ Cell ] Selected ${props.criterion.id}-name`);
              setCellId(`${props.criterion.id}-name`);
              setCellValue(props.criterion.name ?? null);
              setCellSecondaryValue(props.criterion.unit ?? null);
            }}
            onBlur={() => {
              props.updateCriteria({
                ...props.criterion,
                name: `${cellValue}`,
                unit: `${cellSecondaryValue}`,
              });
              // setCellId(null);
              // setCellValue(null);
              // setCellSecondaryValue(null);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              margin: -8,
              padding: isCriteriaNameCellInEditMode ? 0 : 8,
              width: "100%",
            }}
          >
            {isCriteriaNameCellInEditMode ? (
              <div style={{ display: "flex" }}>
                {/*
                 * CRITERIA - NAME
                 */}
                <input
                  type="text"
                  value={cellValue ? `${cellValue}` : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newValue = value && value.length > 0 ? value : null;

                    setCellValue(newValue);
                    props.updateCriteria({
                      ...props.criterion,
                      name: `${newValue}`,
                    });
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      props.updateCriteria({
                        ...props.criterion,
                        name: `${cellValue}`,
                      });
                      // setCellId(null);
                      // setCellValue(null);
                    }
                  }}
                  style={{
                    ...DATA_TABLE_STYLES.INPUT.TEXT,
                    padding: "7px 6px",
                  }}
                />
                {/*
                 * CRITERIA - UNIT
                 */}
                <input
                  type="text"
                  value={cellSecondaryValue ? `${cellSecondaryValue}` : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newValue = value && value.length > 0 ? value : null;

                    setCellSecondaryValue(newValue);
                    props.updateCriteria({
                      ...props.criterion,
                      unit: `${newValue}`,
                    });
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      props.updateCriteria({
                        ...props.criterion,
                        unit: `${cellSecondaryValue}`,
                      });
                      // setCellId(null);
                      // setCellSecondaryValue(null);
                    }
                  }}
                  style={{
                    ...DATA_TABLE_STYLES.INPUT.TEXT,
                    maxWidth: 60,
                    padding: "7px 6px",
                  }}
                />
              </div>
            ) : (
              <div style={{ marginRight: 8 }}>
                {props.criterion.name
                  ? capitalize(props.criterion.name)
                  : `Critère ${props.rowIdx + 1}`}{" "}
                {props.criterion.unit && `(${props.criterion.unit})`}
              </div>
            )}
          </div>

          {!isCriteriaNameCellInEditMode && (
            <button onClick={() => props.removeCriteria(props.criterion)}>
              -
            </button>
          )}
        </div>

        {!isCriteriaNameCellInEditMode && (
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: -5,
              width: "100%",
              padding: "0 8px",
              boxSizing: "border-box",
            }}
          >
            <progress
              max="100"
              value={
                areDefined([props.maxWeight, props.criterion.weight])
                  ? (((props.criterion.weight ?? 1) / props.weightTotal) *
                      100) /
                    (props.maxWeight ?? 1)
                  : 0
              }
              style={{ width: "100%", height: 7 }}
            />
          </div>
        )}
      </td>

      {/*
       * CRITERIA - BENEFICIAL
       */}
      <td style={DATA_TABLE_STYLES.TD.CRITERIA_BENEFICIAL}>
        <div
          ref={isCriteriaBeneficialCellInEditMode ? inputRef : undefined}
          onClick={() => {
            if (isCriteriaBeneficialCellInEditMode) {
              return;
            }
            console.log(`[ Cell ] Selected ${props.criterion.id}-beneficial`);
            setCellId(`${props.criterion.id}-beneficial`);
            setCellValue(props.criterion.beneficial ?? null);
          }}
          onBlur={() => {
            props.updateCriteria({
              ...props.criterion,
              beneficial: cellValue === true,
            });
            setCellId(null);
            setCellValue(null);
          }}
          style={{
            ...DATA_TABLE_STYLES.INPUT.TEXT,
            width: "100%",
            margin: -8,
            padding: 8,
          }}
        >
          {isCriteriaBeneficialCellInEditMode ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 4, fontSize: 14 }}>
                Bénéfique (
                {props.criterion.beneficial === true
                  ? "oui"
                  : props.criterion.beneficial === false
                  ? "non"
                  : "??"}
                )
              </div>
              <input
                type="checkbox"
                checked={props.criterion.beneficial === true}
                onChange={(e) => {
                  const checked = e.target.checked;

                  setCellValue(checked);
                  props.updateCriteria({
                    ...props.criterion,
                    beneficial: checked,
                  });
                }}
              />
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              {props.criterion.beneficial === true
                ? "+"
                : props.criterion.beneficial === false
                ? "-"
                : "??"}
            </div>
          )}
        </div>
      </td>

      {/*
       * CRITERIA - WEIGHT
       */}
      <td style={DATA_TABLE_STYLES.TD.CRITERIA_WEIGHT}>
        <div
          ref={isCriteriaWeightCellInEditMode ? inputRef : undefined}
          onClick={() => {
            if (isCriteriaWeightCellInEditMode) {
              return;
            }
            console.log(`[ Cell ] Selected ${props.criterion.id}-weight`);
            setCellId(`${props.criterion.id}-weight`);
            setCellValue(props.criterion.weight ?? null);
          }}
          onBlur={() => {
            props.updateCriteria({
              ...props.criterion,
              weight: clampCriteriaWeightValue(Number(cellValue)),
            });
            setCellId(null);
            setCellValue(null);
          }}
          style={{
            margin: -8,
            padding: isCriteriaWeightCellInEditMode ? 0 : 8,
            width: "100%",
          }}
        >
          {isCriteriaWeightCellInEditMode ? (
            <input
              type="number"
              min={CRITERIA.WEIGHT.MIN}
              max={CRITERIA.WEIGHT.MAX}
              value={
                isDefined(cellValue) &&
                typeof cellValue === "number" &&
                !isNaN(cellValue)
                  ? cellValue
                  : ""
              }
              onChange={(e) => {
                const value = e.target.value;
                const newValue =
                  value && value.length > 0
                    ? clampCriteriaWeightValue(Number(value))
                    : null;

                setCellValue(newValue);
                props.updateCriteria({
                  ...props.criterion,
                  weight: newValue ?? undefined,
                });
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  props.updateCriteria({
                    ...props.criterion,
                    weight: clampCriteriaWeightValue(Number(cellValue)),
                  });
                  setCellId(null);
                  setCellValue(null);
                }
              }}
              style={{
                ...DATA_TABLE_STYLES.INPUT.TEXT,
                width: "100%",
                padding: "7px 6px",
              }}
            />
          ) : (
            <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO_CONTAINER}>
              <div>
                {isDefined(props.criterion.weight) &&
                !isNaN(props.criterion.weight)
                  ? props.criterion.weight
                  : "-"}
              </div>
              <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO}>
                {isDefined(props.criterion.weight) &&
                !isNaN(props.criterion.weight)
                  ? `(${(props.criterion.weight / props.weightTotal).toFixed(
                      3
                    )})`
                  : ""}
              </div>
            </div>
          )}
        </div>
      </td>

      {/*
       * PRODUCTS - CRITERIA VALUES
       */}
      {props.products.map((p, productColumnIdx) => {
        const v =
          productsWithCriterias.find(
            ({ criteriaId, productId }) =>
              criteriaId === props.criterion.id && productId === p.id
          ) ?? createEmptyProductCriteriaValue(p, props.criterion);

        const isCellInEditMode = v.id === cellId;

        const value =
          isDefined(v.value) && !isNaN(v.value) ? Number(v.value) : null;

        return (
          <td key={v.id} style={DATA_TABLE_STYLES.TD.CELL_VALUE}>
            <div
              ref={isCellInEditMode ? inputRef : undefined}
              onClick={() => {
                if (isCellInEditMode) {
                  return;
                }
                console.log(`[ Cell ] Selected ${v.id}`);
                setCellId(v.id);
                setCellValue(v.value ?? null);
              }}
              onBlur={() => {
                props.setProductCriteriaValue(
                  p,
                  props.criterion,
                  Number(cellValue)
                );
                setCellId(null);
                setCellValue(null);
              }}
              style={{
                margin: -8,
                padding: isCellInEditMode ? 0 : 8,
              }}
            >
              {isCellInEditMode ? (
                <input
                  type="number"
                  value={
                    isDefined(cellValue) &&
                    typeof cellValue === "number" &&
                    !isNaN(cellValue)
                      ? cellValue
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    const newValue =
                      value && value.length > 0 ? Number(value) : null;

                    setCellValue(newValue);
                    props.setProductCriteriaValue(p, props.criterion, newValue);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      props.setProductCriteriaValue(
                        p,
                        props.criterion,
                        Number(cellValue)
                      );
                      setCellId(null);
                      setCellValue(null);
                    }
                  }}
                  style={{
                    ...DATA_TABLE_STYLES.INPUT.TEXT,
                    width: minWidth,
                    padding: "7px 6px",
                  }}
                />
              ) : (
                <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO_CONTAINER}>
                  <div>{value ?? "-"}</div>
                  {isDefined(v.weightedValue) ? (
                    <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO}>
                      ({v.weightedValue?.toFixed(3) ?? "-"})
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </td>
        );
      })}
    </tr>
  );
};

export default TableBodyRow;
