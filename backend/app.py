from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.categories import categories_bp
from routes.images import images_bp
from routes.pronunciation import pronunciation_bp
from routes.results import results_bp
from routes.analytics import analytics_bp
from routes.detect_emotion import detect_emotion_bp
from routes.randomimages import randomimage_bp
from routes.chart import chart_bp

load_dotenv()
from routes.predict import predict_bp
from routes.status import status_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(categories_bp)
app.register_blueprint(images_bp)
app.register_blueprint(pronunciation_bp)
app.register_blueprint(results_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(detect_emotion_bp)
app.register_blueprint(randomimage_bp)
app.register_blueprint(chart_bp, url_prefix="/charts")

app.register_blueprint(predict_bp)
app.register_blueprint(status_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
