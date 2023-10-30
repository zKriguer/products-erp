"use client";
import React from "react";

import { Selection, Input, Select, SelectItem } from "@nextui-org/react";
import { useGetCategories } from "@/hooks/hooks";

import { Product } from "@/types/Product";
import { AddProductForm } from "./AddProductForm";
import { Filters } from "./ProductsERP";

type Props = {
  productData: Product[] | undefined;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export const TableFilters = ({ filters, setFilters }: Props) => {
  const { data: categories } = useGetCategories();

  const handleChange = (e: string) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        search: e,
      };
    });
  };

  const handleSelectCategory = (selection: Selection) => {
    const categories = Array.from(selection).map((category) => {
      return category.toString().toLowerCase();
    });

    console.log(categories);

    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        categories,
      };
    });
  };

  return (
    <div className="flex gap-4 w-full">
      <Input
        label="Search"
        isClearable
        value={filters.search}
        onValueChange={handleChange}
      />

      <Select
        aria-label="Table Columns"
        placeholder="Select a Product Type"
        selectionMode="multiple"
        selectedKeys={filters.categories}
        onSelectionChange={handleSelectCategory}
        classNames={{ innerWrapper: "max-w-[300px]" }}
      >
        {
          categories?.map((category) => {
            return (
              <SelectItem
                key={category.productType}
                textValue={category.productType}
              >
                <p className="capitalize">{category.productType}</p>
              </SelectItem>
            );
          }) as React.ReactElement[]
        }
      </Select>

      <AddProductForm />
    </div>
  );
};
