import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { tema, publico_alvo, problema, paginas, tom_voz } = req.body;

    const prompt = `Gere um índice com tópicos para um e-book sobre ${tema}, voltado para ${publico_alvo}, abordando o problema "${problema}". O e-book deve ter ${paginas} páginas e um tom de voz ${tom_voz}.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    res.status(200).json({
      topicos: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Erro ao chamar a OpenAI:", error);
    res.status(500).json({ error: "Erro ao gerar os tópicos do e-book" });
  }
}
