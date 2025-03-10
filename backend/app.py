from flask import Flask
from flask_cors import CORS
from routes.categories import categories_bp
from routes.images import images_bp
from routes.pronunciation import pronunciation_bp
from routes.results import results_bp
from routes.analytics import analytics_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(categories_bp)
app.register_blueprint(images_bp)
app.register_blueprint(pronunciation_bp)
app.register_blueprint(results_bp)
app.register_blueprint(analytics_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
