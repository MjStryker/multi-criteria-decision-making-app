import { TProduct } from "../types/product";
import cordlessVacuumCleaner from "../data/cordlessVacuumCleaner";
import { nanoid } from "nanoid";
import { useState } from "react";

type DataTableProps = {};

const DataTable = (props: DataTableProps) => {
  const [criteria, setCriteria] = useState(cordlessVacuumCleaner.criteria);
  const [products, setProducts] = useState(cordlessVacuumCleaner.products);
  const [productsWithCriteria, setProductsWithCriteria] = useState(
    cordlessVacuumCleaner.productsWithCriteria
  );

  const nbCriteria = criteria.length;
  const nbProducts = products.length;

  const createEmptyProduct = (): TProduct => ({
    id: nanoid(),
    name: "",
    reference: "",
  });

  const addProduct = (product: TProduct) =>
    setProducts((prev) => [...prev, product]);

  const removeProduct = ({ id }: TProduct) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  const tdStyle = {
    border: "1px solid #7c7c7c",
  };

  return (
    <table
      cellSpacing={0}
      cellPadding={8}
      style={{ height: "fit-content", borderCollapse: "collapse" }}
    >
      <tr>
        <td />
        <td />
        {products.map((p) => (
          <td key={p.id} style={tdStyle}>
            {p.name} <button onClick={() => removeProduct(p)}>x</button>
          </td>
        ))}
        <td>
          <button onClick={() => addProduct(createEmptyProduct())}>+</button>
        </td>
      </tr>

      {criteria.map((c) => (
        <tr key={c.id}>
          <td style={tdStyle}>
            {c.name} ({c.unit})
          </td>
          <td style={tdStyle}>{c.weight}</td>

          {products.map((p) => {
            const v = productsWithCriteria.find(
              ({ criteriaId, productId }) =>
                criteriaId === c.id && productId === p.id
            );

            return (
              <td key={v?.id} style={tdStyle}>
                {v?.value ?? "-"}
              </td>
            );
          })}
        </tr>
      ))}

      <tr>
        <td colSpan={2}>
          <button>+</button>
        </td>
        <td colSpan={nbProducts + 1} />
      </tr>
    </table>
  );
};

export default DataTable;
