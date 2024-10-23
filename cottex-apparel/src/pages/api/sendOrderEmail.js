import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { orderDetails } = req.body;

    // Create a transporter with your email service and credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content with the order details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: orderDetails.receiverEmail, // Send to the receiver's email
      subject: "Order Confirmation",
      text: `
        Order ID: ${orderDetails.id}
        Receiver Name: ${orderDetails.receiverName}
        Receiver Email: ${orderDetails.receiverEmail}
        Total Amount: ${orderDetails.totalAmount} ETB
        Payment Status: ${orderDetails.paymentStatus}
        Order Status: ${orderDetails.orderStatus}
        Products:
        ${orderDetails.products
          .map(
            (product) =>
              `Product: ${product.name}, Quantity: ${
                product.quantity
              }, Amount: ${product.amount * product.quantity} ETB`
          )
          .join("\n")}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error while sending email:", error);
      res.status(500).json({ message: "Failed to send email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
