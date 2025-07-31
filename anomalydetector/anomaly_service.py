from flask_cors import CORS
from flask import Flask, jsonify
import pandas as pd
from detect_anomalies import detect_anomalies  # Make sure this function is defined

app = Flask(__name__)
CORS(app)
@app.route('/api/anomalies', methods=['GET'])
def get_anomalies():
    df = pd.read_csv("synthetic_manufacturing_data.csv")  # Place this file in the same folder
    anomalies = detect_anomalies(df)
    return jsonify(anomalies)

if __name__ == '__main__':
    app.run(port=5001)
