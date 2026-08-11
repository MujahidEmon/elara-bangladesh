"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCartProducts,
  saveToCart,
  deleteFromCart,
  incrementFromCart,
  decrementFromCart,
} from "./LocalStorage";
import { useCartAnimation } from "@/components/cart/CartAnimationProvider";

const useLocalCart = () => {
  const { openCartSlider } = useCartAnimation();
  const queryClient = useQueryClient();

  // Load cart products
  const { data: cartProducts = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartProducts,
  });

  // Add to cart
  const addMutation = useMutation({
    mutationFn: saveToCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      openCartSlider();
    },
  });

  // Delete from cart
  const deleteMutation = useMutation({
    mutationFn: deleteFromCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  // Increment quantity
  const incMutation = useMutation({
    mutationFn: incrementFromCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  // Decrement quantity
  const decMutation = useMutation({
    mutationFn: decrementFromCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  return {
    cartProducts,

    handleAddToCart: (product) => {
      addMutation.mutate(product);
    },

    handleDeleteFromLs: (product) => {
      deleteMutation.mutate(product);
    },

    handleIncreaseLs: (id) => {
      incMutation.mutate(id);
    },

    handleDecreaseLs: (id) => {
      decMutation.mutate(id);
    },
  };
};

export default useLocalCart;