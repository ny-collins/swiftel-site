# In finsight/ai-service/Dockerfile

# 1. Start from an official, modern Python image
FROM python:3.11-slim

# 2. Set the working directory inside the container
WORKDIR /ai_app

# 3. Copy the requirements file
COPY requirements.txt .

# 4. Install the Python dependencies (this will work because we are on Python 3.11)
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port the API will run on
EXPOSE 8000

# 7. Command to run the Uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
