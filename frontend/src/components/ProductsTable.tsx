import { ProductTable } from "@/types/Product";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { Loader } from "lucide-react";
import { DeleteProductButton } from "./DeleteProductButton";

type Props = {
  products: ProductTable[] | undefined;
  isLoadingProducts: boolean;
};

export const ProductsTable = ({ products, isLoadingProducts }: Props) => {
  return (
    <Table
      aria-label="Table for products list with sorting"
      removeWrapper
      isHeaderSticky
      classNames={{
        base: "max-h-[500px] overflow-y-scroll min-h-[500px] bg-zinc-900 p-4 rounded-md min-w-[1200px]",
        td: "hover:bg-zinc-800 rounded-md",
      }}
    >
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="description">Description</TableColumn>
        <TableColumn key="color">Color</TableColumn>
        <TableColumn key="category">Product Type</TableColumn>
        <TableColumn key="price">Price</TableColumn>
        <TableColumn key="promoPrice">Promotional Price</TableColumn>
        <TableColumn key="delete">Delete</TableColumn>
      </TableHeader>
      <TableBody
        items={products ?? []}
        isLoading={isLoadingProducts}
        loadingContent={<Loader className="animate-spin" />}
        emptyContent={!isLoadingProducts ? "No products found" : "Loading..."}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) =>
              columnKey === "delete" ? (
                <TableCell className="hover:bg-transparent">
                  <DeleteProductButton productId={item.id} />
                </TableCell>
              ) : (
                <TableCell
                  className="text-ellipsis max-w-[30ch] overflow-hidden whitespace-nowrap capitalize"
                  title={item[columnKey as keyof ProductTable] as string}
                >
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
