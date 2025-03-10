export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const { tema, publico_alvo, problema, paginas, tom_voz } = req.body;

        if (!tema || !publico_alvo || !problema || !paginas || !tom_voz) {
            return res.status(400).json({ error: "Faltam informações obrigatórias" });
        }

        // Chamada para a API da OpenAI para gerar os tópicos do e-book
        const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // Chave da API
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "Você é um assistente especializado em criação de e-books." },
                    { role: "user", content: `Crie tópicos para um e-book sobre ${tema}, voltado para ${publico_alvo}, que ajude com ${problema}. O tom de voz deve ser ${tom_voz}. O e-book terá ${paginas} páginas.` }
                ],
                max_tokens: 1000,
            }),
        });

        const data = await openaiResponse.json();

        if (!data.choices || data.choices.length === 0) {
            return res.status(500).json({ error: "Erro ao gerar os tópicos do e-book." });
        }

        // Retornando os tópicos gerados
        return res.status(200).json({ topicos: data.choices[0].message.content });

    } catch (error) {
        console.error("Erro no Webhook:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}
