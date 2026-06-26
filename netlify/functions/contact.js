const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 200, body: 'OK' };
  }

  try {
    const { name, company, reason, message } = JSON.parse(event.body);

    const text = `Nuevo contacto desde la web:
Nombre: ${name}
Empresa: ${company || '(no especificada)'}
Motivo: ${reason}
Mensaje: ${message}`;

    const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });

    const data = await resp.json();
    return {
      statusCode: resp.ok ? 200 : 500,
      body: JSON.stringify(data)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
