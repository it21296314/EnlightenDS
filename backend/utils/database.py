from pymongo import MongoClient

client = MongoClient("mongodb+srv://it21342394:enlightends@cluster0.jflpe.mongodb.net/enlightends?retryWrites=true&w=majority&appName=Cluster0")
db = client["quiz_app"]
results_collection = db["results"]
