from spacy.lang.en import English
from string import punctuation
from nltk.stem import WordNetLemmatizer

parser = English()
stop_words = list(punctuation) + ["'s", "'m", "n't", "'re", "-", "'ll", '...']  

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