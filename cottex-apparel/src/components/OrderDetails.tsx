// components/OrderDetails.tsx
import React, { useEffect, useState } from 'react';

const OrderDetails = ({ orderId }: { orderId: string }) => {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`/api/orders/${orderId}`);
      const orderData = await response.json();
      setOrder(orderData);
    };

    fetchOrder();
  }, [orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order #{order._id}</h1>
      <p>Customer: {order.customer.name}</p>
      <p>Total: {order.total} ETB</p>
    </div>
  );
};

export default OrderDetails;
