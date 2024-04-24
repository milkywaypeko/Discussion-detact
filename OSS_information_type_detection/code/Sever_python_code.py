import joblib
from spacy.lang.en import English
from flask import Flask, request, jsonify
import tokenizer

app = Flask(__name__)

pipeline = joblib.load('./model.pkl')

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    sentence = data['sentence']
    result = pipeline.predict([sentence])[0]
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(port=5000)