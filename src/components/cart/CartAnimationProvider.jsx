"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import CartSlider from "./CartSlider";

const CartAnimationContext = createContext(null);

export const useCartAnimation = () => {
  const context = useContext(CartAnimationContext);

  if (!context) {
    throw new Error(
      "useCartAnimation must be used inside CartAnimationProvider"
    );
  }

  return context;
};

export default function CartAnimationProvider({ children }) {
  const [isCartSliderOpen, setIsCartSliderOpen] = useState(false);

  /**
   * Open cart drawer
   */
  const openCartSlider = useCallback(() => {
    setIsCartSliderOpen(true);
  }, []);

  /**
   * Close cart drawer
   */
  const closeCartSlider = useCallback(() => {
    setIsCartSliderOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isCartSliderOpen,
      openCartSlider,
      closeCartSlider,
    }),
    [
      isCartSliderOpen,
      openCartSlider,
      closeCartSlider,
    ]
  );

  return (
    <CartAnimationContext.Provider value={value}>
      {children}

      {/* Global cart drawer */}
      <CartSlider />
    </CartAnimationContext.Provider>
  );
}






























// "use client";

// import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
// import CartAnimationLayer from "./CartAnimationLayer";
// import CartSlider from "./CartSlider";
// import FloatingCart from "./FloatingCart";

// const MAX_ACTIVE_ANIMATIONS = 6;

// const CartAnimationContext = createContext(null);

// const getElementCenter = (element) => {
//   if (!element) return null;

//   const rect = element.getBoundingClientRect();
//   return {
//     x: rect.left + rect.width / 2,
//     y: rect.top + rect.height / 2,
//     width: rect.width,
//     height: rect.height,
//   };
// };

// export const useCartAnimation = () => {
//   const context = useContext(CartAnimationContext);

//   if (!context) {
//     return {
//       triggerCartAnimation: () => {},
//       registerFloatingCart: () => {},
//       openCartSlider: () => {},
//       closeCartSlider: () => {},
//       bounceKey: 0,
//       isCartSliderOpen: false,
//     };
//   }

//   return context;
// };

// export default function CartAnimationProvider({ children }) {
//   const cartRef = useRef(null);
//   const [animations, setAnimations] = useState([]);
//   const [bounceKey, setBounceKey] = useState(0);
//   const [isCartSliderOpen, setIsCartSliderOpen] = useState(false);

//   const registerFloatingCart = useCallback((node) => {
//     cartRef.current = node;
//   }, []);

//   const triggerCartAnimation = useCallback(({ sourceElement, image, name } = {}) => {
//     try {
//       const start = getElementCenter(sourceElement);
//       const end = getElementCenter(cartRef.current);

//       if (!start || !end) {
//         setBounceKey((current) => current + 1);
//         return;
//       }

//       const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

//       setAnimations((current) => [
//         ...current.slice(-(MAX_ACTIVE_ANIMATIONS - 1)),
//         {
//           id,
//           start,
//           end,
//           image,
//           name,
//         },
//       ]);
//     } catch {
//       setBounceKey((current) => current + 1);
//     }
//   }, []);

//   const handleAnimationComplete = useCallback((id) => {
//     setAnimations((current) => current.filter((animation) => animation.id !== id));
//     setBounceKey((current) => current + 1);
//   }, []);

//   const openCartSlider = useCallback(() => {
//     setIsCartSliderOpen(true);
//   }, []);

//   const closeCartSlider = useCallback(() => {
//     setIsCartSliderOpen(false);
//   }, []);

//   const value = useMemo(
//     () => ({
//       triggerCartAnimation,
//       registerFloatingCart,
//       openCartSlider,
//       closeCartSlider,
//       bounceKey,
//       isCartSliderOpen,
//     }),
//     [bounceKey, closeCartSlider, isCartSliderOpen, openCartSlider, registerFloatingCart, triggerCartAnimation]
//   );

//   return (
//     <CartAnimationContext.Provider value={value}>
//       {children}
//       <FloatingCart />
//       <CartSlider />
//       <CartAnimationLayer animations={animations} onAnimationComplete={handleAnimationComplete} />
//     </CartAnimationContext.Provider>
//   );
// }
