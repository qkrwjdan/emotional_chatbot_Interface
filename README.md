# EMOTIONAL CHATBOT Interface


This project aims to develop meorable and emotional chatbot using transfer learning (fine tune GPT-2 345M). You can find original code [here](https://github.com/openai/gpt-2).

This is gpt-2 chatbot using interface.

It is never designed for commercial purposes.


![ex_screenshot](./static/img/botAvatar.png)


## Install python library
```
$ pip install -r requirements.txt
```

## Model install
1) clik the [link](https://drive.google.com/file/d/1CzCNAuaXiaQsdCMTiki2X9XuyCwowQY3/view?usp=sharing) and download.
2) Place the downloaded model in ***models\345M_org.***.




## Usage

just run **_main.py_**.

```
$ python main.py
```

and go to "http://localhost:5000".

you can see this page.

![ex_screenshot](./img/2021-04-12%2020-05-54.png)

you can use **_text mode_** mode and **_speech mode_**.

### text mode
click toggle and type your message.

![ex_screenshot](./img/2021-04-12%2020-08-48.png)

### speech mode

if you want to use speech mode, you need google **_speech-to-text key_**. refer this page [*speech to text*](https://www.youtube.com/watch?v=Ds-7D8d-FwA&t=1154s)

if you get **_key.json_**, replace key.json with you **_key.json_**


then click toggle and click **_ChatBot_** .  text color changes to black. now you can to the chatbot with your mic.

![ex_screenshot](./img/2021-04-12%2020-14-57.png)

## Author
Jungseob Lee / [ js-lee-AI](https://github.com/js-lee-AI) / omanma1928@naver.com

Jungmu Park / [boong_u](https://github.com/qkrwjdan) / madogisa12@naver.com

## Related papers
A Radford, et al., ["Language Models are Unsupervised Multitask Learners"](https://d4mucfpksywv.cloudfront.net/better-language-models/language-models.pdf), openAI blog, 2019.

A Vaswani, et al., ["Attention is All you Need"](https://arxiv.org/pdf/1706.03762.pdf), NIPS 2017

## Refrences
[*openAI*](https://github.com/openai/gpt-2)

[*emotional chatbot*](https://github.com/js-lee-AI/emotional-chatbot_gpt2)

[*speech to text*](https://www.youtube.com/watch?v=Ds-7D8d-FwA&t=1154s)

[*rasa chatbot interface youtube*](https://www.youtube.com/watch?v=Fyap_IP1i3Q&t=98s)

[*interface*](https://github.com/GKTechy/rasa_core_chatbot)