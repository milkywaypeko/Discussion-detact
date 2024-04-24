import numpy as np
import pandas as pd
import nltk
import warnings
import spacy
import joblib
import tokenizer
from string import punctuation
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn import preprocessing
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_recall_fscore_support, classification_report, accuracy_score, make_scorer, confusion_matrix

## Ignore warnings
warnings.filterwarnings('ignore')

# Load the English language model
nlp = spacy.load('en_core_web_sm')

### Read from the pickled file
all_data = pd.read_csv('../data/combined_data_oversampled.csv')

all_data = all_data.dropna(subset=['Text Content', 'Code'])

labels_to_remove = [ "Testing",'Future Plan','Issue Content Management']
all_data = all_data[~all_data['Code'].isin(labels_to_remove)]

X = all_data['Text Content'].values
y = all_data['Code'].values

labels = list(set(y))
labels.sort()

pipeline = Pipeline([
    ('vect', TfidfVectorizer(tokenizer=tokenizer.tokenize)),
    ('clf', LogisticRegression())
])

### Hyperparameters to search
parameters = {
    'vect__ngram_range': ((1, 1), (1, 2)),  # unigrams or bigrams
    'clf__C': (0.01, 0.1, 1, 10),
}

pipeline.fit(X, y)

joblib.dump(pipeline, 'model.pkl')

print("Make model dump!")