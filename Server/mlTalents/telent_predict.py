# from flask import Flask, request, jsonify
# import pickle
# import numpy as np
# import pandas as pd
# from flask_cors import CORS
# import os

# app = Flask(__name__)
# CORS(app)  # Enable CORS to allow requests from your React app

# # Get the directory where the script is located
# current_dir = os.path.dirname(os.path.abspath(__file__))
# model_path = os.path.join(current_dir, 'talent_classifier.pkl')

# # Load the trained model
# try:
#     with open(model_path, 'rb') as model_file:
#         model = pickle.load(model_file)
#     print("Model loaded successfully!")
# except Exception as e:
#     print(f"Error loading model: {e}")
#     print(f"Attempted to load model from: {model_path}")
#     model = None

# @app.route('/talent_predict', methods=['POST'])
# def talent_predict():
#     if model is None:
#         return jsonify({"error": "Model not loaded"}), 500
    
#     try:
#         # Get data from request
#         data = request.get_json()
        
#         # Extract features from the request
#         quiz_time = float(data.get('quiz_time', 0))
#         quiz_score = float(data.get('quiz_score', 0))
#         piano_time = float(data.get('piano_time', 0))
#         piano_key_count = float(data.get('piano_key_count', 0))
#         drawing_time = float(data.get('drawing_time', 0))
#         drawing_similarity = float(data.get('drawing_similarity', 0))
#         gender = data.get('gender', 'M')
#         age = float(data.get('age', 0))
        
#         # Calculate efficiency features
#         quiz_efficiency = quiz_score / quiz_time if quiz_time > 0 else 0
#         piano_efficiency = piano_key_count / piano_time if piano_time > 0 else 0
#         drawing_efficiency = drawing_similarity / drawing_time if drawing_time > 0 else 0
        
#         # Create a DataFrame with the input data
#         input_df = pd.DataFrame({
#             'quiz_time': [quiz_time],
#             'quiz_score': [quiz_score],
#             'piano_time': [piano_time],
#             'piano_key_count': [piano_key_count],
#             'drawing_time': [drawing_time],
#             'drawing_similarity': [drawing_similarity],
#             'quiz_efficiency': [quiz_efficiency],
#             'piano_efficiency': [piano_efficiency],
#             'drawing_efficiency': [drawing_efficiency],
#             'age': [age],
#             'gender': [gender]
#         })
        
#         # One-hot encode the gender column
#         input_df = pd.get_dummies(input_df, columns=['gender'], drop_first=True)
        
#         # Make sure the input has the same columns as the training data
#         # If gender_M is missing, add it
#         if 'gender_M' not in input_df.columns:
#             input_df['gender_M'] = 0
            
#         # Ensure all expected columns are present
#         expected_columns = ['quiz_time', 'quiz_score', 'piano_time', 'piano_key_count',
#                             'drawing_time', 'drawing_similarity', 'quiz_efficiency',
#                             'piano_efficiency', 'drawing_efficiency', 'age', 'gender_M']
        
#         # Reorder columns to match the model's expected order
#         for col in expected_columns:
#             if col not in input_df.columns:
#                 input_df[col] = 0
        
#         input_df = input_df[expected_columns]
        
#         # Make prediction
#         prediction = model.predict(input_df)[0]
#         prediction_proba = model.predict_proba(input_df)[0]
        
#         # Get the probabilities for each class
#         class_probabilities = {
#             cls: float(prob) for cls, prob in zip(model.classes_, prediction_proba)
#         }
        
#         # Return the prediction and probabilities
#         return jsonify({
#             'prediction': prediction,
#             'probabilities': class_probabilities,
#             'success': True
#         })
        
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'success': False
#         }), 400

# @app.route('/health', methods=['GET'])
# def health_check():
#     return jsonify({"status": "healthy", "model_loaded": model is not None})

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)


from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)

# Define the model structure manually instead of loading from a file
def create_model():
    # Define categorical and numerical features
    categorical_features = ['gender']
    numerical_features = ['quiz_time', 'quiz_score', 'piano_time', 'piano_key_count', 
                         'drawing_time', 'drawing_similarity', 'age',
                         'quiz_efficiency', 'piano_efficiency', 'drawing_efficiency']
    
    # Create preprocessing steps
    numerical_transformer = StandardScaler()
    categorical_transformer = OneHotEncoder(handle_unknown='ignore')
    
    # Create a preprocessor
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numerical_transformer, numerical_features),
            ('cat', categorical_transformer, categorical_features)
        ])
    
    # Create and return the model pipeline
    model = Pipeline([
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(random_state=42))
    ])
    
    return model

# Create the model
model = create_model()

# In a real application, you would train this model with your data
# Since we don't have trained model weights, we'll use rule-based predictions
def rule_based_prediction(data):
    """
    Apply the talent identification rules to determine the talent.
    """
    # Quiz talent rule: score >= 3 AND time between 300-1200 seconds (5-20 min)
    quiz_talented = data['quiz_score'] >= 3 and 300 <= data['quiz_time'] <= 1200
    
    # Piano talent rules
    piano_time = data['piano_time']
    piano_keys = data['piano_key_count']
    piano_talented = ((60 <= piano_time <= 360 and 100 <= piano_keys <= 250) or 
                      (360 < piano_time <= 600 and 200 <= piano_keys <= 450))
    
    # Drawing talent rule: similarity >= 60% AND time between 300-1800 seconds (5-30 min)
    drawing_talented = data['drawing_similarity'] >= 60 and 300 <= data['drawing_time'] <= 1800
    
    # Decide on the talent based on the rules
    # If multiple talents are identified, choose based on the highest "score"
    talents = []
    
    if quiz_talented:
        quiz_score = data['quiz_efficiency'] * 1000  # Normalize for comparison
        talents.append(('Quiz', quiz_score))
    
    if piano_talented:
        piano_score = data['piano_efficiency'] * 100  # Normalize for comparison
        talents.append(('Piano', piano_score))
    
    if drawing_talented:
        drawing_score = data['drawing_efficiency'] * 100  # Normalize for comparison
        talents.append(('Drawing', drawing_score))
    
    # Choose the talent with the highest score
    if talents:
        talents.sort(key=lambda x: x[1], reverse=True)
        return talents[0][0]
    else:
        return "None"

@app.route('/talent_predict', methods=['POST'])
def predict():
    """
    Endpoint to predict talent based on activity data.
    """
    try:
        # Get data from request
        data = request.get_json()
        
        # Convert all values to appropriate types
        processed_data = {
            'quiz_time': float(data['quiz_time']),
            'quiz_score': float(data['quiz_score']),
            'piano_time': float(data['piano_time']),
            'piano_key_count': float(data['piano_key_count']),
            'drawing_time': float(data['drawing_time']),
            'drawing_similarity': float(data['drawing_similarity']),
            'gender': str(data['gender']),
            'age': float(data['age'])
        }
        
        # Calculate efficiency features
        processed_data['quiz_efficiency'] = processed_data['quiz_score'] / processed_data['quiz_time']
        processed_data['piano_efficiency'] = processed_data['piano_key_count'] / processed_data['piano_time']
        processed_data['drawing_efficiency'] = processed_data['drawing_similarity'] / processed_data['drawing_time']
        
        # Use rule-based prediction instead of model prediction
        prediction = rule_based_prediction(processed_data)
        
        # Get detailed prediction information
        details = get_prediction_details(processed_data)
        
        # Return result
        return jsonify({
            'predicted_talent': prediction,
            'prediction_details': details,
            'success': True
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

def get_prediction_details(data):
    """
    Apply the rules to determine why a particular talent was chosen.
    """
    details = {}
    
    # Quiz talent rule: score >= 3 AND time between 300-1200 seconds (5-20 min)
    quiz_talented = data['quiz_score'] >= 3 and 300 <= data['quiz_time'] <= 1200
    details['quiz'] = {
        'meets_criteria': quiz_talented,
        'reason': 'Score >= 3 and time between 5-20 minutes' if quiz_talented else 
                  'Does not meet required criteria'
    }
    
    # Piano talent rules
    piano_time = data['piano_time']
    piano_keys = data['piano_key_count']
    
    piano_talented = ((60 <= piano_time <= 360 and 100 <= piano_keys <= 250) or 
                      (360 < piano_time <= 600 and 200 <= piano_keys <= 450))
    
    details['piano'] = {
        'meets_criteria': piano_talented,
        'reason': 'Meets key count and time requirements' if piano_talented else 
                  'Does not meet required key count or time criteria'
    }
    
    # Drawing talent rule: similarity >= 60% AND time between 300-1800 seconds (5-30 min)
    drawing_talented = data['drawing_similarity'] >= 60 and 300 <= data['drawing_time'] <= 1800
    details['drawing'] = {
        'meets_criteria': drawing_talented,
        'reason': 'Similarity >= 60% and time between 5-30 minutes' if drawing_talented else 
                  'Does not meet required similarity or time criteria'
    }
    
    # Add efficiency scores for comparison
    details['efficiency_scores'] = {
        'quiz_efficiency': data['quiz_efficiency'],
        'piano_efficiency': data['piano_efficiency'],
        'drawing_efficiency': data['drawing_efficiency']
    }
    
    return details

@app.route('/test', methods=['POST'])
def test():
    """
    Test endpoint to check if the server is working correctly.
    """
    data = request.get_json()
    return jsonify({
        'received_data': data, 
        'message': 'Server is functioning correctly',
        'success': True
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)-