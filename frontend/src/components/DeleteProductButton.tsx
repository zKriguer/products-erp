import {
  REACT_QUERY_KEYS,
  REACT_QUERY_MUTATION_KEYS,
} from "@/enums/react-query";
import { deleteProduct } from "@/hooks/fetchers";
import { Button, type ButtonProps } from "@nextui-org/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";

type DeleteProductButtonProps = ButtonProps & {
  productId: string;
};

export function DeleteProductButton({
  productId,
  ...props
}: DeleteProductButtonProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: handleDeleteProduct, isPending } = useMutation({
    mutationKey: [REACT_QUERY_MUTATION_KEYS.DELETE_PRODUCT, productId],
    async mutationFn() {
      await deleteProduct(productId);
    },
    async onSuccess() {
      await queryClient.refetchQueries({
        queryKey: [REACT_QUERY_KEYS.GET_PRODUCTS],
      });
    },
  });

  return (
    <Button
      isIconOnly
      size="sm"
      className="bg-red-400/5 p-0 w-fit flex items-center"
      onClick={() => handleDeleteProduct()}
      isDisabled={isPending}
      {...props}
    >
      <Trash className="text-red-400" size={22} />
    </Button>
  );
}
