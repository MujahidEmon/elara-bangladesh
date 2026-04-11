import toast from "react-hot-toast";

// Get items from localStorage
export const getCartProducts = () => {
  let cartProducts = [];
  const storedCartProducts = localStorage.getItem('cartProducts');
  if (storedCartProducts) {
    cartProducts = JSON.parse(storedCartProducts);
  }
  return cartProducts;
};

// Store item or increase quantity if already exists
export const saveToCart = (product) => {
  let cartProducts = getCartProducts();

  const isExist = cartProducts.find(p => p._id === product._id  
  );

  if (isExist) {
    isExist.quantity = (Number(isExist.quantity) || 1) + 1;
    toast.success('Increased quantity');
  } else {
    cartProducts.push({ ...product, quantity: 1 });
    toast.success('Added to cart');
  }

  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
};

// Delete product from cart
export const deleteFromCart = (p) => {
  let cartProducts = getCartProducts();
  const remaining = cartProducts.filter(b => b._id !== p._id);
  toast.success('Removed from cart');
  localStorage.setItem('cartProducts', JSON.stringify(remaining));
};

// Increase quantity
export const incrementFromCart = (id) => {
  const cart = getCartProducts();
  const updated = cart.map(item =>
    item._id === id ? { ...item, quantity: Number(item.quantity) + 1 } : item
  );
  toast.success('Increased quantity');
  localStorage.setItem('cartProducts', JSON.stringify(updated));
  return updated;
};

// Decrease quantity (or remove if quantity becomes 0)
export const decrementFromCart = (id) => {
  let cart = getCartProducts();
  const item = cart.find(p => p._id === id);

  if (item) {
    if (item.quantity > 1) {
      cart = cart.map(p =>
        p._id === id ? { ...p, quantity: Number(p.quantity) - 1 } : p
      );
      toast.success('Decreased quantity');
    } else {
      cart = cart.filter(p => p._id !== id);
      toast.success('Removed from cart');
    }
  }

  localStorage.setItem('cartProducts', JSON.stringify(cart));
  return cart;
};
