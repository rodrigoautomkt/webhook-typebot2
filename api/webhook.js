export default function handler(req, res) {
    if (req.method === "POST") {
        return res.status(200).json({ message: "Webhook recebido com sucesso!" });
    }
    res.status(405).json({ error: "Método não permitido" });
}