from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)
ENG_CHATBOT_URL = "ip for chatbot server"
PORT = 3000

def send_message_to_eng_chatbot(input_text, sender):
    headers = {'Content-Type': 'application/json; charset=utf-8'}
    contents = {
        'message': input_text,
        'sender': sender
    }

    gpt2_res = requests.post(
        ENG_CHATBOT_URL, headers=headers, data=json.dumps(contents))
    gpt2_data = gpt2_res.json()

    gpt2_text = gpt2_data['message']

    return gpt2_text


@app.route('/english', methods=('GET', 'POST'))
def english():
    if request.method == 'POST':
        input_text = request.json['message']
        sender = request.json['sender']
        answer = send_message_to_eng_chatbot(input_text, sender)
        context = {'text': answer, 'recipient_id': request.json['sender']}
        return context

    return render_template('english.html')


@app.route('/synthesize', methods=['GET'])
def synthesize():
    if request.method == 'GET':
        input_text = request.args.get('text')
        resp = requests.get(ENG_CHATBOT_URL + "synthesize?text=" + input_text)
        res = resp.content
        return res


@app.route('/', methods=('GET', 'POST'))
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT, debug=True, threaded=False)
