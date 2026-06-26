export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, company, reason, message } = req.body;

    const text = `Nuevo contacto desde la web:
Nombre: ${name}
Empresa: ${company || '(no especificada)'}
Motivo: ${reason}
Mensaje: ${message}`;

    const token = process.env.BOT_TOKEN || '8954748594:AAHxHA3GCkHmaG5q-tZhkxV-DAVbc5I0NTo';
    const chatId = process.env.CHAT_ID || '6446460318';

    const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    const data = await resp.json();
    res.status(resp.ok ? 200 : 500).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
