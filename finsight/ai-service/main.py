# In finsight/ai-service/main.py

from fastapi import FastAPI
from pydantic import BaseModel  # <-- Make sure this is imported
import joblib
from sklearn.pipeline import Pipeline

# This class tells FastAPI what the request body should look like
class Transaction(BaseModel):
    description: str

app = FastAPI()

model: Pipeline = None

@app.on_event("startup")
def load_model():
    global model
    model_path = "model.joblib"
    print(f"Loading model from {model_path}...")
    model = joblib.load(model_path)
    print("Model loaded successfully.")

@app.get("/")
def read_root():
    return {"message": "FinSIGHT AI Service is running"}

# Make sure your function signature matches this exactly
@app.post("/predict")
def predict_category(transaction: Transaction):
    if not model:
        return {"error": "Model is not loaded yet."}
    
    prediction_input = [transaction.description]
    predicted_category = model.predict(prediction_input)[0]
    
    return {
        "description": transaction.description,
        "predicted_category": predicted_category
    }
