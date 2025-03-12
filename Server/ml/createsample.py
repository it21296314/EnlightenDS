import pandas as pd

# Option 1: Use double backslashes
df_train = pd.read_csv("D:\\4Y1S\\Research\\savi\\EnlightenDS\\Server\\ml\\balanced_quiz_dataset.csv")



# Take a sample
df_train_sample = df_train.sample(n=500, random_state=42)

# Save the sample
df_train_sample.to_csv("train_sample.csv", index=False)

print("Training sample saved successfully!")
