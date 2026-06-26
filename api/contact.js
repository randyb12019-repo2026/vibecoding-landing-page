export const config = {
  runtime: 'edge'
};

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('OK', { status: 200 });
  }

  try {
    const { name, company, reason, message } = await req.json();
    const text = `Nuevo contacto desde la web:\nNombre: ${name}\nEmpresa: ${company || '(no especificada)'}\nMotivo: ${reason}\nMensaje: ${message}`;

    const resp = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: process.env.CHAT_ID, text })
    });

    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      status: resp.ok ? 200 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
