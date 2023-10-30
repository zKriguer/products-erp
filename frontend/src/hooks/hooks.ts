import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "@/hooks/fetchers";
import { REACT_QUERY_KEYS } from "@/enums/react-query";

export const useGetProducts = () => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_PRODUCTS],
    queryFn: getProducts,
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_CATEGORIES],
    queryFn: getCategories,
  });
};
