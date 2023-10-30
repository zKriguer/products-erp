"use client";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Textarea,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useGetCategories } from "@/hooks/hooks";

import ky from "ky";
import { useQueryClient } from "@tanstack/react-query";
import { REACT_QUERY_KEYS } from "@/enums/react-query";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  category: z.string().trim().min(1, "Category is required"),
  description: z.string().trim().min(1, "Description is required"),
  color: z.string().trim().min(1, "Color is required"),
  price: z.string().trim().min(1, "Price is required"),
});

type FormSchema = z.output<typeof formSchema>;

export const AddProductForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: categories } = useGetCategories();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      color: "",
      price: "",
    },
  });

  const client = useQueryClient();

  const handleCreateProduct = handleSubmit(async (data) => {
    await ky.post(process.env.NEXT_PUBLIC_API_URL + "products", {
      json: { ...data, price: Number(data.price) },
    });
    await client.refetchQueries({ queryKey: [REACT_QUERY_KEYS.GET_PRODUCTS] });
    reset();

    onOpenChange();
  });

  return (
    <div className="w-full">
      <Button onPress={onOpen} className="bg-blue-500 w-full h-full">
        Add Product
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Add more products</ModalHeader>
          <ModalBody
            as="form"
            className="flex flex-col gap-4"
            onSubmit={handleCreateProduct}
          >
            <div className="flex gap-2">
              <div className="w-full">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Product Name"
                      {...field}
                      placeholder="Enter your name"
                    />
                  )}
                />
                <span>{errors.name?.message}</span>
              </div>
              <div className="w-full">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      items={categories}
                      label="Product Type"
                      placeholder="Select a Product Type"
                      className="max-w-xs"
                      {...field}
                      classNames={{ base: "w-full" }}
                    >
                      {(category) => (
                        <SelectItem key={category.productType}>
                          {category.productType}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />
                <span>{errors.category?.message}</span>
              </div>
            </div>

            <div>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    label="Description"
                    labelPlacement="outside"
                    {...field}
                    placeholder="Enter your description"
                  />
                )}
              />
              <span>{errors.description?.message}</span>
            </div>

            <div className="flex gap-2">
              <div>
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Product Color"
                      {...field}
                      placeholder="Enter your color"
                    />
                  )}
                />
                <span>{errors.color?.message}</span>
              </div>

              <div>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Product Price"
                      type="number"
                      min={0}
                      {...field}
                      placeholder="Enter your price"
                    />
                  )}
                />
                <span>{errors.price?.message}</span>
              </div>
            </div>

            <Button
              type="submit"
              className="bg-blue-500 w-fit self-end"
              isLoading={isSubmitting}
            >
              Add
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
