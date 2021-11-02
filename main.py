from flask import Flask,redirect,render_template,url_for,request,flash
from werkzeug.utils import secure_filename

# from gpt2.gpt2_generator import gpt2_tensor2 as gpt2

import requests
import json
import os
import time

# chbot = gpt2()

def audio_to_text(filename, languageCode = 'en-US'):
    # [START speech_quickstart]
    import io

    # Imports the Google Cloud client library
    # [START migration_import]
    from google.cloud import speech
    # [END migration_import]

    # Instantiates a client
    # [START migration_client]
    client = speech.SpeechClient()
    # [END migration_client]

    # The name of the audio file to transcribe
    file_name = os.path.join(
        os.path.dirname(__file__),
        '.',
        'uploads',
        filename)

    # Loads the audio into memory
    with io.open(file_name, 'rb') as audio_file:

        content = audio_file.read()
        audio = speech.RecognitionAudio(content=content)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=44100,
        language_code=languageCode,
        audio_channel_count=2,
        enable_separate_recognition_per_channel=True
        )

    # Detects speech in the audio file
    response = client.recognize(config = config, audio = audio)

    return response.results[0].alternatives[0].transcript

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','wav', 'avi'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/realtime/',methods=('GET', 'POST'))
def realtime():
    if request.method == 'POST':
        print("hello, method is post")
        if 'file' not in request.files:
            print("No file part")
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            print("No selected file")
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            print("file upload success!")
            output = audio_to_text(filename)
            print("google stt success!")
            return output
            
    print("GET")
    # chbot.clear_session()

    return render_template('realtime.html')

@app.route('/korean/',methods=('GET', 'POST'))
def korean():
    if request.method == 'POST':
        print("hello, method is post")
        if 'file' not in request.files:
            print("No file part")
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            print("No selected file")
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            print("file upload success!")
            # output = audio_to_text(filename)
            print("google stt success!")
            return "success"
            
    print("GET")
    # chbot.clear_session()

    return render_template('korean.html')

@app.route('/korean_mic/',methods=('GET','POST'))
def korean_mic():
    if request.method == 'POST':
        print("hello, method is post")
        print(request.files)

        if 'vfile' in request.files:
            aviFile = request.files['vfile']
            if aviFile and allowed_file(aviFile.filename):
                filename = secure_filename(aviFile.filename)
                aviFile.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            
        if 'rfile' in request.files:
            wavFile = request.files['rfile']
            if wavFile and allowed_file(wavFile.filename):
                filename = secure_filename(wavFile.filename)
                wavFile.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

                text = audio_to_text(filename,languageCode = 'ko-KR')

                return text
        
        return "오류가 발생했습니다."
            
    print("GET")

    return render_template('korean_mic.html')


@app.route('/chat/',methods=('GET', 'POST'))
def chat():
    if request.method == 'POST':

        input_text = request.json['message']
        
        # answer = chbot.interact_model(input_text)
        print(input_text)
        answer = "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest"
        context = {'text' : answer, 'recipient_id' : request.json['sender']}

        return context
            
    print("GET")
    # chbot.clear_session()
    return render_template('chat.html')

@app.route('/response/',methods=('GET','POST'))
def getResponse():

    input_text = request.form['message']
        
    # answer = chbot.interact_model(input_text)
    print(input_text)
    answer = "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest"
    print(answer)
    print(request.form['sender'])

    context = {'text' : answer, 'recipient_id' : request.form['sender']}

    return context

@app.route('/test/',methods=('GET','POST'))
def test():

    return render_template('test.html')

@app.route('/', methods=('GET', 'POST'))
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    # set ENVIRON
    # os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(os.getcwd(YOUR_KEY))
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(os.getcwd(),'key.json')

    app.run(debug=True, threaded=False)
