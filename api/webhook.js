module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(200).send('Bot activo');

  try {
    const msg = req.body.message;
    if (!msg) return res.status(200).end();

    const chatId = msg.chat.id;
    const text = msg.text || '';
    let reply = '';

    if (text.startsWith('/start')) {
      reply = '\u{1f44b} \u{00a1}Hola! Soy el asistente de Randy Bonucci.\n\n'
        + 'Soy Ingeniero Inform\u00e1tico especializado en Ciberseguridad, Data Analytics e IA.\n\n'
        + '\u{1f4cc} Si me contactaste por la web, tu mensaje ya fue recibido.\n'
        + '\u{1f4cc} Si quieres contactarlo directamente, puedes enviarme un mensaje y se lo har\u00e9 llegar.\n\n'
        + '\u23f3 Randy suele responder en menos de 24h. Gracias por tu paciencia.';
    } else {
      reply = '\u2705 Tu mensaje ha sido recibido. '
        + 'Randy lo revisar\u00e1 y te responder\u00e1 pronto.\n\n'
        + '\u23f3 Tiempo estimado de respuesta: < 24h.\n'
        + '\u{1f4ce} linkedin.com/in/randy-bonucci-mart\u00edn-b60824209';
    }

    await fetch(`https://api.telegram.org/bot8954748594:AAHxHA3GCkHmaG5q-tZhkxV-DAVbc5I0NTo/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: reply })
    });

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(200).end();
  }
};
