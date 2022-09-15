from flask import Flask, render_template, request
from dotenv import load_dotenv

import requests
import json
import os
import time

app = Flask(__name__)
ENG_CHATBOT_URL = os.environ.get("ENG_CHATBOT_URL")


def send_message_to_eng_chatbot(input_text):
    headers = {'Content-Type': 'application/json; charset=utf-8'}
    contents = {
        'message': input_text,
        'sender': "test"
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
        answer = send_message_to_eng_chatbot(input_text)
        context = {'text': answer, 'recipient_id': request.json['sender']}
        return context

    return render_template('english.html')


@app.route('/korean', methods=('GET', 'POST'))
def chat():
    if request.method == 'POST':
        input_text = request.json['message']
        print(input_text)
        answer = "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest"
        context = {'text': answer, 'recipient_id': request.json['sender']}
        return context

    return render_template('korean.html')


@app.route('/', methods=('GET', 'POST'))
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True, threaded=False)
