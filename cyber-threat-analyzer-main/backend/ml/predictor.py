# Loads the trained ML model (TF-IDF & Logistic Regression) and predicts the threat category based on description input.
import os
import joblib
import numpy as np

#  Load trained model pipeline
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')
model = joblib.load(MODEL_PATH)

# Confidence threshold for predictions 
CONFIDENCE_THRESHOLD = 0.2

def predict_threat_category(description: str) -> str:
    """
    Predict the threat category for a given input description.
    Returns 'Uncertain' if confidence is below threshold or input is invalid.
    """
    if not description or len(description.strip()) < 5:
        return "Uncertain"
    pred_proba = model.predict_proba([description])
    max_prob = np.max(pred_proba)
    predicted_label = model.classes_[np.argmax(pred_proba)]
    return predicted_label if max_prob >= CONFIDENCE_THRESHOLD else "Uncertain"


