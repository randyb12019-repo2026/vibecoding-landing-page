const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 200, headers, body: 'OK' };

  try {
    const { name, company, reason, message, contact } = JSON.parse(event.body);

    const text = `<b>📩 Nuevo contacto desde la web</b>

<b>👤 Nombre:</b> ${name}
<b>🏢 Empresa:</b> ${company || '<i>No especificada</i>'}
<b>📧 Contacto:</b> ${contact}
<b>📌 Motivo:</b> ${reason}

<b>📝 Mensaje:</b>
${message}

<i>--- Enviado desde el asistente web ---</i>`;

    const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' })
    });

    const data = await resp.json();
    return { statusCode: resp.ok ? 200 : 500, headers, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
