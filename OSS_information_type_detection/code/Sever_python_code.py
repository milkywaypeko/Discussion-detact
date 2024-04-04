import numpy as np
import pandas as pd
import xlrd as xl
from pandas import ExcelWriter
from pandas import ExcelFile
import pprint
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from nltk.stem import WordNetLemmatizer
import re
import pickle
from operator import itemgetter
import time, datetime
from functools import partial, update_wrapper
from openpyxl import load_workbook

from sklearn.feature_extraction.text import TfidfVectorizer

from imblearn.over_sampling import SMOTE

from sklearn.pipeline import Pipeline
from imblearn.pipeline import Pipeline as Imb_Pipeline

from sklearn.linear_model import LogisticRegression

from sklearn.model_selection import StratifiedKFold, GridSearchCV, cross_validate
from sklearn.metrics import precision_recall_fscore_support, classification_report, accuracy_score, make_scorer, confusion_matrix

pp = pprint.PrettyPrinter(indent=4)

## Ignore warnings
import warnings
warnings.filterwarnings('ignore')

import spacy
from spacy.lang.en import English

# Load the English language model
nlp = spacy.load('en_core_web_sm')

# Create an instance of the English parser
parser = English()

from string import punctuation
from nltk.corpus import stopwords

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

### Read from the pickled file
all_data = pd.read_csv('../data/combined_data_oversampled.csv')

print("Size of corpus: "+str(len(all_data)))

all_data = all_data.dropna(subset=['Text Content', 'Code'])

labels_to_remove = [ "Testing",'Future Plan','Issue Content Management']
all_data = all_data[~all_data['Code'].isin(labels_to_remove)]

X = all_data['Text Content'].values
y = all_data['Code'].values

print("Number of unique labels: "+str(len(set(y))))

labels = list(set(y))
labels.sort()

pp.pprint(labels)

pipeline = Imb_Pipeline([
    ('vect', TfidfVectorizer(tokenizer=tokenize)),
    ('clf', LogisticRegression())
])

### Hyperparameters to search
parameters = {
    'vect__ngram_range': ((1, 1), (1, 2)),  # unigrams or bigrams
    'clf__C': (0.01, 0.1, 1, 10),
}

pipeline.fit(X, y)
print(pipeline.predict(["@DenVys thank you so much!"]))