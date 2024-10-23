// Cart.js
"use client";

import React from "react";
import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Cart = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem, clearCart } = useCartStore();
  
  const handleChapa = async () => {
    try {
      const email = "elzabetbekele383@gmail.com";
      const amount = Number(cart?.subtotal?.amount || 0);
      const transactionId = `trx-${uuidv4()}`;

      if (amount <= 0) {
        console.error("Amount is not valid.");
        return;
      }

      const chapaResponse = await axios.post("/api/chapa", {
        amount,
        email,
        tx_ref: transactionId,
        callback_url: "http://localhost:3000/api/chapa/callback", 
        return_url: "http://localhost:3000/success",
        orderId: 1,
      });

      const paymentUrl = chapaResponse.data.data.checkout_url;

      
      clearCart();

      window.location.href = paymentUrl;
      
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        "An error occurred while processing your payment. Please try again."
      );
    }
  };

  return (
    <div className="w-max absolute p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-4 z-20">
      {isLoading ? (
        <div>Loading...</div>
      ) : !cart.lineItems || cart.lineItems.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {cart.lineItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt={item.productName?.original || "Product Image"}
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-center w-full">
                  <div>
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity} x
                          </div>
                        )}
                        {item.price?.amount} br
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>{Number(cart?.subtotal?.amount || 0)} br</span> 
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              ክፍያ በማድረግ ግዢዎን ያጠናቅቁ
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
                onClick={handleChapa}
              >
                አሁን ይክፈሉ
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
