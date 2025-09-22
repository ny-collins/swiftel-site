# In finsight/ai-service/train_model.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline
import joblib

def train_and_save_model():
    """
    Reads transaction data, trains a text classification model,
    and saves the trained model pipeline to a file.
    """
    print("Starting model training process...")

    # 1. Load the dataset
    try:
        data = pd.read_csv('transactions.csv')
        print(f"Dataset loaded successfully with {len(data)} rows.")
    except FileNotFoundError:
        print("Error: transactions.csv not found. Please make sure it's in the ai-service directory.")
        return

    # Define features (X) and target (y)
    X = data['description']
    y = data['category']

    # 2. Create a model pipeline
    # A pipeline chains together multiple steps. This is a best practice.
    # Step 1: TfidfVectorizer - Converts text into numerical vectors.
    # Step 2: LinearSVC - A robust and efficient classification algorithm.
    model_pipeline = Pipeline([
        ('tfidf', TfidfVectorizer()),
        ('clf', LinearSVC())
    ])

    # 3. Train the model on the entire dataset
    print("Training the model...")
    model_pipeline.fit(X, y)
    print("Model training complete.")

    # 4. Save the entire pipeline to a file
    model_filename = 'model.joblib'
    joblib.dump(model_pipeline, model_filename)
    print(f"Model trained and saved to '{model_filename}'")

if __name__ == '__main__':
    train_and_save_model()
