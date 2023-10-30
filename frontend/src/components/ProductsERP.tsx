"use client";
import { useGetProducts } from "@/hooks/hooks";
import React, { useState } from "react";
import { ProductsTable } from "./ProductsTable";
import { TableFilters } from "./TableFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { formatCurrency } from "@/utils/formatCurrency";

export type Filters = {
  search: string;
  categories: string[];
};

export const ProductsERP = () => {
  const { data: productData, isLoading } = useGetProducts();
  const [filters, setFilters] = useState<Filters>({
    search: "",
    categories: [],
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const products =
    debouncedSearch.trim().length > 0 || filters.categories.length > 0
      ? productData
          ?.filter((product) => {
            const values = Object.values(product).map((value) =>
              String(value).toLowerCase(),
            );

            const filteredProducts = values.some((value) =>
              value.includes(debouncedSearch),
            );

            if (filters.categories.length > 0) {
              return (
                filters.categories.includes(product.category) &&
                filteredProducts
              );
            }

            return filteredProducts;
          })
          .map((product) => ({
            ...product,
            price: formatCurrency(product.price),
            promoPrice: formatCurrency(product.price),
          }))
      : productData?.map((product) => ({
          ...product,
          price: formatCurrency(product.price),
          promoPrice: formatCurrency(product.price),
        }));

  return (
    <div className="flex flex-col gap-2">
      <TableFilters
        productData={productData}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="min-h-[500px] max-h-[300px] bg-zinc-900 rounded-3xl">
        <ProductsTable products={products} isLoadingProducts={isLoading} />
      </div>
    </div>
  );
};
