import { type PrimitiveAtom, useAtom } from "jotai";
import { type FormEvent, useEffect, useState } from "react";

import type { ProductDto } from "@/Application/Dtos/Product.dto";
import { useProducts } from "./useProducts";

type UseProductFormProps = {
  productAtom: PrimitiveAtom<ProductDto>;
  onClose: VoidFunction;
};

export function useProductForm({ productAtom, onClose }: UseProductFormProps) {
  const [product, setProduct] = useAtom(productAtom);
  const { removeProduct } = useProducts();

  const [name, setName] = useState<string>(product.name || "");
  const [reference, setReference] = useState<string>(product.reference || "");

  const isDirty = name !== product.name || reference !== product.reference;

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setName(product.name || "");
  }, [product.name]);

  useEffect(() => {
    setReference(product.reference || "");
  }, [product.reference]);

  /**
   * * Handle Inputs change
   */
  const onNameChange = (e: FormEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);
  const onReferenceChange = (e: FormEvent<HTMLInputElement>) =>
    setReference(e.currentTarget.value);

  /**
   * * Form actions
   */
  const onSave = () => {
    setProduct(prev => ({ ...prev, name, reference }));
    onClose();
  };

  const onDelete = () => {
    removeProduct(product.uuid);
    onClose();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave();
  };

  return {
    name,
    reference,
    isDirty,
    onNameChange,
    onReferenceChange,
    onSave,
    onDelete,
    onSubmit
  };
}
