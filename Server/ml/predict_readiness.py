# # import sys
# # import pandas as pd
# # import joblib
# # import json
# # import os

# # # Determine the current script's directory
# # script_dir = os.path.dirname(os.path.abspath(__file__))

# # # Load the trained model and scaler
# # model_path = os.path.join(script_dir, "logistic_regression_model.pkl")
# # scaler_path = os.path.join(script_dir, "scaler.pkl")

# # model = joblib.load(model_path)
# # scaler = joblib.load(scaler_path)


# # # Get input data from Node.js
# # input_data = json.loads(sys.argv[1])

# # # Convert input data to a DataFrame
# # df = pd.DataFrame([input_data])

# # # Convert categorical variables to dummy variables (similar to training preprocessing)
# # df = pd.get_dummies(df, columns=["gender", "category", "difficulty"], drop_first=True)

# # # Standardize numerical features
# # columns = scaler.get_feature_names_out() if hasattr(scaler, "get_feature_names_out") else None
# # df = df.reindex(columns=columns, fill_value=0)  # Ensure all columns match
# # df_scaled = scaler.transform(df)

# # # Make prediction
# # readiness_prediction = model.predict(df_scaled)
# # probability = model.predict_proba(df_scaled)[0]

# # # Output prediction and probability as JSON
# # output = {
# #     "readiness": int(readiness_prediction[0]),
# #     "probability": {
# #         "not_ready": float(probability[0]),
# #         "ready": float(probability[1]),
# #     },
# # }
# # print(json.dumps(output))


# import sys
# import pandas as pd
# import joblib
# import json
# import os

# # Determine the current script's directory
# script_dir = os.path.dirname(os.path.abspath(__file__))
# model_path = os.path.join(script_dir, "logistic_regression_model.pkl")
# scaler_path = os.path.join(script_dir, "scaler.pkl")

# try:
#     print(f"Model path: {model_path}", flush=True)
#     print(f"Scaler path: {scaler_path}", flush=True)

#     model = joblib.load(model_path)
#     scaler = joblib.load(scaler_path)
# except Exception as e:
#     print(f"Error loading model or scaler: {e}", flush=True)
#     sys.exit(1)

# # Get input data from Node.js
# try:
#     input_data = json.loads(sys.argv[1])
#     print(f"Input data: {input_data}", flush=True)
# except Exception as e:
#     print(f"Error parsing input data: {e}", flush=True)
#     sys.exit(1)

# # Preprocessing
# try:
#     df = pd.DataFrame([input_data])
#     df = pd.get_dummies(df, columns=["gender", "category", "difficulty"], drop_first=True)

#     columns = scaler.get_feature_names_out() if hasattr(scaler, "get_feature_names_out") else None
#     df = df.reindex(columns=columns, fill_value=0)
#     df_scaled = scaler.transform(df)

#     readiness_prediction = model.predict(df_scaled)
#     probability = model.predict_proba(df_scaled)[0]

#     output = {
#         "readiness": int(readiness_prediction[0]),
#         "probability": {
#             "not_ready": float(probability[0]),
#             "ready": float(probability[1]),
#         },
#     }
#     print(json.dumps(output), flush=True)
# except Exception as e:
#     print(f"Error during prediction: {e}", flush=True)
#     sys.exit(1)
