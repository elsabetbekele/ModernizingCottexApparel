import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { amount, email, tx_ref } = req.body;

    
      const chapaSecretKey = process.env.NEXT_PUBLIC_CHAPA_SECRET_KEY;

      if (!chapaSecretKey) {
        return res.status(500).json({
          error: "Chapa secret key is not set in environment variables.",
        });
      }

      
      const baseUrl = "http://localhost:3000";

      
      const response = await axios.post(
        "https://api.chapa.co/v1/transaction/initialize",
        {
          amount,
          currency: "ETB",
          email,
          tx_ref,
          callback_url: `${baseUrl}/api/chapa/callback`, 
          return_url: `${baseUrl}/success`,
        },
        {
          headers: {
            Authorization: `Bearer ${chapaSecretKey}`,
          },
        }
      );


      res.status(200).json(response.data);
    } catch (error) {
      console.error("Chapa API error:", error);
      res.status(500).json({ error: "Failed to initialize payment" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
