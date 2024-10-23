import { create, useStore } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

interface ExtendedCart extends currentCart.Cart {
  subtotal?: { amount: string | number };
}

type CartState = {
  cart: ExtendedCart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => Promise<void>;
  addItem: (wixClient: WixClient, productId: string, variantId: string, quantity: number) => Promise<void>;
  removeItem: (wixClient: WixClient, itemId: string) => Promise<void>;
  clearCart: () => void; 
};

export const useCartStore = create<CartState>((set) => ({
  cart: {
    lineItems: [], 
    subtotal: { amount: 0 }, 
  } as ExtendedCart,
  isLoading: true,
  counter: 0,

  getCart: async (wixClient) => {
    set({ isLoading: true });
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || { lineItems: [], subtotal: { amount: 0 } },
        isLoading: false,
        counter: cart?.lineItems.length || 0,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      set({ isLoading: false });
    }
  },

  addItem: async (wixClient, productId, variantId, quantity) => {
    set({ isLoading: true });

    try {
      const response = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
              catalogItemId: productId,
              ...(variantId && { options: { variantId } }),
            },
            quantity: quantity,
          },
        ],
      });
      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length || 0,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      set({ isLoading: false });
    }
  },

  removeItem: async (wixClient, itemId) => {
    set({ isLoading: true });
    try {
      const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length || 0,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      set({ isLoading: false });
    }
  },

  clearCart: () => {
    set({
      cart: { lineItems: [], subtotal: { amount: 0 } }, // Reset the cart correctly
      counter: 0,
    });
  },
}));
