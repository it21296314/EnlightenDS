import google.generativeai as genai
import os

API_KEY = "AIzaSyAAFN5BwOdIuJhZxNQmijyzrlmnKrRA97g"  
genai.configure(api_key=API_KEY)

try:
    models = genai.list_models()
    print("Available Models:")
    for model in models:
        print(model.name)
except Exception as e:
    print("Error:", e)
