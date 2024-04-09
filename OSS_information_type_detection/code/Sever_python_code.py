import sys
import joblib
from spacy.lang.en import English
from string import punctuation
from nltk.stem import WordNetLemmatizer

# Create an instance of the English parser
parser = English()

stop_words = list(punctuation) + ["'s","'m","n't","'re","-","'ll",'...'] #+ stopwords.words('english')

def get_lemma(item):
    return WordNetLemmatizer().lemmatize(item)

def tokenize(line):
    line_tokens = []
    tokens = parser(line)
    for token in tokens:
        if token.orth_.isspace():
            continue
        elif token.like_url:
            line_tokens.append('URL')
        elif token.orth_.startswith('@'):
            line_tokens.append('SCREEN_NAME')
        elif str(token) not in stop_words:
            line_tokens.append(get_lemma(token.lower_))
    return line_tokens

pipeline = joblib.load('model.pkl')

input_text = sys.stdin.readline()
output_text = pipeline.predict([input_text])
print(output_text)