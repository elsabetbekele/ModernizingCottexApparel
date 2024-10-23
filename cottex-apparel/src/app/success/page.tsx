"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { useCartStore } from "@/hooks/useCartStore";

const SuccessPage = () => {
  const router = useRouter();
  const { clearCart } = useCartStore();

  const orderDetails = {
    id: "34a24b1be",
    receiverName: "elzabet",
    receiverEmail: "elzabet383@example.com",
    totalAmount: 0, // Total will be calculated below
    paymentStatus: "PAID",
    orderStatus: "APPROVED",
    products: [
      {
        name: "Classic Hoodies",
        quantity: 2,
        amount: 1600, 
      },
      {
        name: "Cotton Hoodie",
        quantity: 1,
        amount: 2000,
      },
    ],
  };

  // Calculate totalAmount by multiplying amount by quantity
  const totalAmount = orderDetails.products.reduce(
    (acc, product) => acc + product.amount * product.quantity,
    0
  );
  orderDetails.totalAmount = totalAmount; 

  useEffect(() => {
    clearCart();

    const sendOrderEmail = async () => {
      try {
        await fetch("/api/sendOrderEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderDetails: {
              ...orderDetails,
              products: orderDetails.products.map((product) => ({
                ...product,
                totalAmount: product.amount * product.quantity, // Send correct total per product
              })),
            },
          }),
        });
      } catch (error) {
        console.error("Failed to send order email", error);
      }
    };

    sendOrderEmail();

    const timer = setTimeout(() => {
      router.push("/orders");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [router, clearCart]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh-180px)]">
      <Confetti width={2000} height={1000} />
      <h1 className="text-6xl text-green-700">ክፍያዎ በትክክል ተክናውኗል!</h1>
      <h2 className="text-xl font-medium">
        ትዕዛዝዎ በተሳካ ሁኔታ ተካሂዷል! ኢሜልዎ ላይ ያረጋግጡ።
      </h2>
    </div>
  );
};

export default SuccessPage;
