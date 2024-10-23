"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OrderDetailsPage = () => {
  const router = useRouter();

  const sampleOrderDetails = [
    {
      id: "34a24b1be",
      receiverName: "elzabet",
      receiverEmail: "elzabetbekele383@example.com",
      totalAmount: 0, 
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
    },
  ];

  // Calculate totalAmount by multiplying amount by quantity
  const totalAmount = sampleOrderDetails.reduce(
    (total, order) =>
      total +
      order.products.reduce(
        (subTotal, product) => subTotal + product.amount * product.quantity,
        0
      ),
    0
  );
  sampleOrderDetails[0].totalAmount = totalAmount; // Update the totalAmount

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // Redirect to homepage after 5 seconds
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="container mx-auto mt-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center">Order Summary</h1>
      <div className="mt-5 text-left w-full max-w-md p-5 border border-gray-300 rounded-lg">
        {sampleOrderDetails.map((order, index) => (
          <div key={index} className="mb-4">
            <div className="mb-2">
              <span className="font-semibold">Order ID:</span>
              <span className="ml-2">{order.id}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Receiver Name:</span>
              <span className="ml-2">{order.receiverName}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Receiver Email:</span>
              <span className="ml-2">{order.receiverEmail}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Payment Status:</span>
              <span className="ml-2">{order.paymentStatus}</span>
            </div>
            <div>
              <span className="font-semibold">Order Status:</span>
              <span className="ml-2">{order.orderStatus}</span>
            </div>
            <hr className="my-2" />
            <div className="mt-2">
              <span className="font-semibold">Products:</span>
              <ul className="ml-4">
                {order.products.map((product, prodIndex) => (
                  <li key={prodIndex}>
                    {product.name} (Qty: {product.quantity}, Amount:{" "}
                    {product.amount * product.quantity} ETB)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="font-bold mt-4">
          <span>Total Amount:</span>
          <span className="ml-2">{totalAmount} ETB</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
