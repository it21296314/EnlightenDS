# # from flask import Flask, request, jsonify
# # import pandas as pd
# # import joblib
# # import os

# # app = Flask(__name__)

# # # Load the trained model and scaler at startup
# # script_dir = os.path.dirname(os.path.abspath(__file__))
# # model_path = os.path.join(script_dir, "logistic_regression_model.pkl")
# # scaler_path = os.path.join(script_dir, "scaler.pkl")

# # try:
# #     model = joblib.load(model_path)
# #     scaler = joblib.load(scaler_path)
# #     print("Model and scaler loaded successfully.")
# # except Exception as e:
# #     print(f"Error loading model or scaler: {e}")

# # @app.route('/predict', methods=['POST'])
# # def predict():
# #     try:
# #         # Parse input JSON
# #         input_data = request.get_json()
# #         if not input_data:
# #             return jsonify({"error": "No input data provided"}), 400

# #         # Convert input data to DataFrame
# #         df = pd.DataFrame([input_data])

# #         # Preprocess categorical variables
# #         df = pd.get_dummies(df, columns=["gender", "category", "difficulty"], drop_first=True)

# #         # Standardize numerical features
# #         columns = scaler.get_feature_names_out() if hasattr(scaler, "get_feature_names_out") else None
# #         df = df.reindex(columns=columns, fill_value=0)  # Ensure all columns match
# #         df_scaled = scaler.transform(df)

# #         # Make prediction
# #         readiness_prediction = model.predict(df_scaled)
# #         probability = model.predict_proba(df_scaled)[0]

# #         # Prepare and return response
# #         response = {
# #             "readiness": int(readiness_prediction[0]),
# #             "probability": {
# #                 "not_ready": float(probability[0]),
# #                 "ready": float(probability[1]),
# #             },
# #         }
# #         return jsonify(response)
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500

# # if __name__ == '__main__':
# #     app.run(debug=True, port=5000)

# from flask import Flask, request, jsonify
# import pandas as pd
# import joblib
# import os
# import shap
# import numpy as np
# from flask_cors import CORS  # Import CORS

# app = Flask(__name__)

# CORS(app)  

# # Load model and scaler
# script_dir = os.path.dirname(os.path.abspath(__file__))
# model_path = os.path.join(script_dir, "logistic_regression_model.pkl")
# scaler_path = os.path.join(script_dir, "scaler.pkl")

# try:
#     model = joblib.load(model_path)
#     scaler = joblib.load(scaler_path)
#     feature_names = scaler.feature_names_in_ if hasattr(scaler, "feature_names_in_") else None
#     print("Model and scaler loaded successfully.")
# except Exception as e:
#     model, scaler, feature_names = None, None, None
#     print(f"Error loading model or scaler: {e}")

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Validate model and scaler availability
#         if model is None or scaler is None or feature_names is None:
#             return jsonify({"error": "Model, scaler, or feature names not loaded"}), 500

#         # Parse JSON input
#         input_data = request.get_json()
#         if not input_data:
#             return jsonify({"error": "No input data provided"}), 400

#         # Convert input data to DataFrame
#         df = pd.DataFrame([input_data])

#         # One-hot encode categorical variables
#         df = pd.get_dummies(df, columns=["gender", "category", "difficulty"], drop_first=True)

#         # Ensure feature alignment with trained scaler
#         df = df.reindex(columns=feature_names, fill_value=0)

#         # Standardize numerical features
#         df_scaled = scaler.transform(df)

#         # Make predictions
#         readiness_prediction = model.predict(df_scaled)
#         probability = model.predict_proba(df_scaled)[0]

#         # Compute SHAP values
#         # df_original = pd.DataFrame(scaler.inverse_transform(df_scaled), columns=feature_names)
#         # explainer = shap.LinearExplainer(model, df_original)
#         # shap_values = explainer.shap_values(df_original)
#         explainer = shap.Explainer(model, df_scaled)
#         shap_values = explainer(df_scaled).values[0]

#         # Convert SHAP values to dictionary with plain language explanations
#         feature_contributions = {feature: explain_feature_shap(feature, shap_val) for feature, shap_val in zip(feature_names, shap_values.flatten())}

#         # Get feature importance with simple explanations
#         feature_importance = {feature: explain_feature_importance(feature, coef) for feature, coef in zip(feature_names, model.coef_[0])}

#         # Prepare response
#         response = {
#             "readiness": int(readiness_prediction[0]),
#             "probability": {
#                 "not_ready": float(probability[0]),
#                 "ready": float(probability[1]),
#             },
#             "explainability": {
#                 "shap_values": feature_contributions,
#                 "feature_importance": feature_importance
#             }
#         }
#         return jsonify(response)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# def explain_feature_shap(feature, shap_value):
#     """Provide an explanation of SHAP value for a feature."""
#     if shap_value > 0:
#         return f"Your {feature} contributed positively to the decision, making you more likely to be ready."
#     elif shap_value < 0:
#         return f"Your {feature} contributed negatively to the decision, making you less likely to be ready."
#     else:
#         return f"Your {feature} did not significantly impact the decision."

# def explain_feature_importance(feature, coef):
#     """Provide an explanation of feature importance for a feature."""
#     if coef > 0:
#         return f"{feature} had a positive impact on the decision, making you more likely to be ready."
#     elif coef < 0:
#         return f"{feature} had a negative impact on the decision, making you less likely to be ready."
#     else:
#         return f"{feature} had a neutral impact on the decision."

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)




from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os
import shap
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and scaler
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, "logistic_regression_model.pkl")
scaler_path = os.path.join(script_dir, "scaler.pkl")
train_data_path = os.path.join(script_dir, "train_sample.csv")  # Path to training sample

try:
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    feature_names = scaler.feature_names_in_ if hasattr(scaler, "feature_names_in_") else None
    print("Model and scaler loaded successfully.")
except Exception as e:
    model, scaler, feature_names = None, None, None
    print(f"Error loading model or scaler: {e}")

# Load training data sample for SHAP
try:
    df_train_sample = pd.read_csv(train_data_path)
    df_train_sample = pd.get_dummies(df_train_sample, columns=["gender", "category", "difficulty"], drop_first=True)
    df_train_sample = df_train_sample.reindex(columns=feature_names, fill_value=0)
    df_train_sample_scaled = scaler.transform(df_train_sample)
    print("Training dataset sample loaded successfully for SHAP.")
except Exception as e:
    df_train_sample, df_train_sample_scaled = None, None
    print(f"Error loading training data sample: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None or scaler is None or feature_names is None:
            return jsonify({"error": "Model, scaler, or feature names not loaded"}), 500

        input_data = request.get_json()
        if not input_data:
            return jsonify({"error": "No input data provided"}), 400

        df = pd.DataFrame([input_data])
        df = pd.get_dummies(df, columns=["gender", "category", "difficulty"], drop_first=True)
        df = df.reindex(columns=feature_names, fill_value=0)
        df_scaled = scaler.transform(df)

        # Make predictions
        readiness_prediction = model.predict(df_scaled)
        probability = model.predict_proba(df_scaled)[0]

        # SHAP explainability using training data
        if df_train_sample_scaled is not None:
            explainer = shap.Explainer(model, df_train_sample_scaled)
            shap_values = explainer(df_scaled).values[0]
        else:
            shap_values = np.zeros(len(feature_names))  # Default to zeros if no training data

        # Convert SHAP values to explanations
        feature_contributions = {feature: explain_feature_shap(feature, shap_val) for feature, shap_val in zip(feature_names, shap_values.flatten())}
        feature_importance = {feature: explain_feature_importance(feature, coef) for feature, coef in zip(feature_names, model.coef_[0])}

        response = {
            "readiness": int(readiness_prediction[0]),
            "probability": {
                "not_ready": float(probability[0]),
                "ready": float(probability[1]),
            },
            "explainability": {
                "shap_values": feature_contributions,
                "feature_importance": feature_importance
            }
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def explain_feature_shap(feature, shap_value):
    if shap_value > 0:
        return f"Your {feature} contributed positively to the decision, making you more likely to be ready."
    elif shap_value < 0:
        return f"Your {feature} contributed negatively to the decision, making you less likely to be ready."
    else:
        return f"Your {feature} did not significantly impact the decision."

def explain_feature_importance(feature, coef):
    if coef > 0:
        return f"{feature} had a positive impact on the decision, making you more likely to be ready."
    elif coef < 0:
        return f"{feature} had a negative impact on the decision, making you less likely to be ready."
    else:
        return f"{feature} had a neutral impact on the decision."

if __name__ == '__main__':
    app.run(debug=True, port=5000)
