import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC
from sklearn.metrics import classification_report
import sys
df=pd.read_csv('E:/vastag-app/server/models/nlp/sai.csv',usecols=['text','rate'])
tfidf = TfidfVectorizer(max_features=200000, ngram_range=(1,7), analyzer='char')
x = tfidf.fit_transform(df['text'])
y = df['rate']
x_train, x_test, y_train, y_test =train_test_split(x,y,test_size=0.2,random_state=0)
clf=LinearSVC(C =20, class_weight='balanced', max_iter=100000)
clf.fit(x_train, y_train)
y_pred = clf.predict(x_test)
from sklearn.metrics import confusion_matrix

from sklearn.metrics import accuracy_score
# print("The model accuracy")
accuracy_score(y_test, y_pred)
l=[]

# for i in range(1):

# comment = ["this product is excellent","bad"] 

# for i in range(len(comment)):
# vec =tfidf.transform([output])
# a=clf.predict(vec)
  # l.append(int(a))
# print(a[0])
# sys.stdout.flush()
import sys
import json
import ast

data_to_send_back = "send this to the node process"

input = (sys.argv[1:])
output = []
# input = ["this product is excellent","bad"] 
for i in input:
  vec =tfidf.transform([i])
  a = clf.predict(vec)
  output.append(a[0])
print(list(output))
# print(json.dumps(output))
sys.stdout.flush()