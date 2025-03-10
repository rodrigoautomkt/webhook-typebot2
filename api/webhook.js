export default function handler(req, res) {
  if (req.method === "POST") {
    res.status(200).json({
      message: "Webhook recebido com sucesso!",
      data: req.body
    });
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
