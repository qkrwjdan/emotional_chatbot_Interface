#!/usr/bin/env python3
import json
import os
import numpy as np
import tensorflow as tf

tf.compat.v1.disable_eager_execution()

from . import model, sample, encoder

class gpt2_tensor2:
    def __init__(
        self,
        model_name='345M_org',
        seed=None,
        nsamples=1,
        batch_size=1,
        length=20,
        temperature=0.7,
        top_k=40,
        top_p=1,
        models_dir='./models',
    ):
    
        self.models_dir = os.path.expanduser(os.path.expandvars(models_dir))
        
        if batch_size is None:
            batch_size = 1
        
        self.batch_size = batch_size
        self.nsamples = nsamples
        
        assert self.nsamples % self.batch_size == 0

        self.model_name = model_name
        self.enc = encoder.get_encoder(self.model_name, self.models_dir)
        self.hparams = model.default_hparams()
        with open(os.path.join(self.models_dir, self.model_name, 'hparams.json')) as f:
            self.hparams.update(json.load(f))

        if length is None:
            length = self.hparams['n_ctx'] // 2
        elif length > self.hparams['n_ctx']:
            raise ValueError("Can't get samples longer than window size: %s" % self.hparams['n_ctx'])

        self.length = length
        self.seed = seed
        self.temperature = temperature
        self.top_k = top_k
        self.top_p = top_p
        self.raw_text = '<|endofdlg|>'

        self.graph = tf.compat.v1.get_default_graph()
        self.sess = tf.compat.v1.Session(graph = self.graph)
        self.context = tf.compat.v1.placeholder(tf.int32,[self.batch_size, None])
        
        np.random.seed(self.seed)
        tf.compat.v1.set_random_seed(self.seed)

        with self.sess.as_default():
            self.output = sample.sample_sequence(
                hparams=self.hparams, length=self.length,
                context=self.context,
                batch_size=self.batch_size,
                temperature=self.temperature, top_k=self.top_k, top_p=self.top_p
            )

        saver = tf.compat.v1.train.Saver()
        ckpt = tf.train.latest_checkpoint(os.path.join(self.models_dir, self.model_name))
        saver.restore(self.sess,ckpt)

    def interact_model(
        self,
        input_utt,
    ):
        """
            self.raw = history
            input_utt = string type
            result[0] = chatbot's output
        """
        self.raw_text +='\n' + 'user: '+ input_utt + '\n' + 'bot: '

        context_tokens = self.enc.encode(self.raw_text)
        generated = 0
        for _ in range(self.nsamples // self.batch_size):
            out = self.sess.run(self.output, feed_dict={
                self.context: [context_tokens for _ in range(self.batch_size)]
            })[:, len(context_tokens):]
            for i in range(self.batch_size):
                generated += 1
                text = self.enc.decode(out[i])
                result=list(text.partition('\n'))
                self.raw_text += str(result[0])
        return(result[0])

    def clear_session(self):
        self.raw_text = '<|endofdlg|>'