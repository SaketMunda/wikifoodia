from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def home():
    return jsonify(predictions= "Hello World!")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
