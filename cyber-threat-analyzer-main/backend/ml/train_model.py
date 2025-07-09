# Trains a TF-IDF + Logistic Regression classifier on balanced threat descriptions.
# Filters, oversamples, and saves model/vectorizer for use in /api/analyze.
import os
import pandas as pd
import joblib
from sklearn.utils import resample
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer

# Load dataset
csv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../data/threats.csv'))
df = pd.read_csv(csv_path)
df.columns = [col.strip().lower() for col in df.columns]

#  Validate column existence
desc_col = 'cleaned threat description'
label_col = 'topic modeling labels'

if desc_col not in df.columns or label_col not in df.columns:
    raise ValueError("Missing required columns: 'cleaned threat description' and/or 'topic modeling labels'.")

# Drop empty or short descriptions
df = df.dropna(subset=[desc_col, label_col])
df = df[df[desc_col].str.len() > 10]

# Balance classes using upsampling
label_counts = df[label_col].value_counts()
max_samples = label_counts.max()

resampled_dfs = []
for label in label_counts.index:
    subset = df[df[label_col] == label]
    if len(subset) < 2:
        print(f" Skipping label '{label}' due to insufficient samples.")
        continue
    resampled = resample(subset, replace=True, n_samples=max_samples, random_state=42)
    resampled_dfs.append(resampled)

#  If still empty after filtering
if not resampled_dfs:
    raise ValueError("No valid labels found to train. Check your CSV content.")

df_balanced = pd.concat(resampled_dfs)

# Feature/target split
X = df_balanced[desc_col]
y = df_balanced[label_col]

# Train/test split 
X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# TF-IDF & Logistic Regression pipeline
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(
        strip_accents='unicode',
        lowercase=True,
        max_df=0.95,
        min_df=2,
        ngram_range=(1, 3),
        max_features=2000
    )),
    ('clf', LogisticRegression(max_iter=1000, class_weight='balanced'))
])

# Train the model
pipeline.fit(X_train, y_train)

# Save model and vectorizer
model_dir = os.path.dirname(os.path.abspath(__file__))
joblib.dump(pipeline, os.path.join(model_dir, "model.pkl"))
joblib.dump(pipeline.named_steps["tfidf"], os.path.join(model_dir, "vectorizer.pkl"))
print(" Balanced model and vectorizer saved in backend/ml/")




