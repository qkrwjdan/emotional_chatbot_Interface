from flask import Flask, render_template, request

import requests
import json
import os
import time

app = Flask(__name__)


@app.route('/english', methods=('GET', 'POST'))
def english():
    if request.method == 'POST':
        input_text = request.json['message']
        print(input_text)
        answer = "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest"
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
