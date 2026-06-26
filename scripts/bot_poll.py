import os, json, urllib.request, urllib.parse

BOT_TOKEN = os.environ['BOT_TOKEN']
OFFSET_FILE = 'offset.txt'

def get_updates(offset=None):
    params = {'timeout': 5}
    if offset:
        params['offset'] = offset
    url = f'https://api.telegram.org/bot{BOT_TOKEN}/getUpdates?' + urllib.parse.urlencode(params)
    r = urllib.request.urlopen(url, timeout=10)
    data = json.loads(r.read())
    return data.get('result', [])

def send_message(chat_id, text):
    url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'
    body = json.dumps({'chat_id': chat_id, 'text': text}).encode()
    req = urllib.request.Request(url, data=body, headers={'Content-Type': 'application/json'})
    urllib.request.urlopen(req, timeout=10)

def main():
    offset = None
    if os.path.exists(OFFSET_FILE):
        with open(OFFSET_FILE) as f:
            v = f.read().strip()
            if v:
                offset = int(v)

    updates = get_updates(offset)
    if not updates:
        print('No new updates')
        return

    for u in updates:
        msg = u.get('message', {})
        chat_id = msg.get('chat', {}).get('id')
        text = msg.get('text', '') or ''
        if not chat_id:
            continue
        if text.startswith('/start'):
            reply = '\u2705 \u00a1Hola! Soy el asistente de Randy Bonucci.\nSoy Ingeniero Inform\u00e1tico especializado en Ciberseguridad, Data Analytics e IA.\n\u00bfEn qu\u00e9 puedo ayudarte?'
        else:
            reply = '\u2705 Tu mensaje ha sido recibido. Randy lo revisar\u00e1 y te responder\u00e1 pronto.\n\u23f3 Tiempo estimado de respuesta: < 24h.\n\ud83d\udcce linkedin.com/in/randy-bonucci-mart\u00edn-b60824209'
        send_message(chat_id, reply)
        print(f'Replied to chat {chat_id}')

    last_id = updates[-1]['update_id']
    with open(OFFSET_FILE, 'w') as f:
        f.write(str(last_id + 1))
    print(f'Saved offset: {last_id + 1}')

if __name__ == '__main__':
    main()
