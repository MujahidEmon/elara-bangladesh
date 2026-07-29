"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCartProducts,
  saveToCart,
  deleteFromCart,
  incrementFromCart,
  decrementFromCart,
} from "./LocalStorage";

const useLocalCart = () => {
  const queryClient = useQueryClient();

  // load cart products
  const { data: cartProducts = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartProducts,
  });


  // add to cart
  const addMutation = useMutation({
    mutationFn: saveToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });


  // delete from cart
  const deleteMutation = useMutation({
    mutationFn: deleteFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });


  // increment quantity
  const incMutation = useMutation({
    mutationFn: incrementFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });


  // decrement quantity
  const decMutation = useMutation({
    mutationFn: decrementFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  return {
    cartProducts,
    handleAddToCart: (product) => addMutation.mutate(product),
    handleDeleteFromLs: (product) => deleteMutation.mutate(product  ),
    handleIncreaseLs: (id) => incMutation.mutate(id),
    handleDecreaseLs: (id) => decMutation.mutate(id),
  };
};

export default useLocalCart;
