from flask import  Flask, jsonify,request
from flask_cors import CORS, cross_origin
from utils import load_and_prep_image, make_prediction

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# make predictions on custom image
custom_img = 'grilled-salmon.jpeg'
path = './images_for_prediction/'

@app.route("/alive", methods=['GET'])
@cross_origin()
def check():    
    return jsonify(message="I am alive !!", status_code=200)

@app.route("/predict", methods=['POST'])
@cross_origin()
def home():
    if 'file' not in request.files:
        return jsonify(message="Please upload an Image", status_code=500)
    
    file = request.files.get('file')
    img_bytes = file.read()
    img_path = path + 'test.jpg'
    with open(img_path, 'wb') as f:
        f.write(img_bytes)
        f.close()         

    img = load_and_prep_image(img_path)         
    # local prediction
    labels, pred_probs = make_prediction(img)          

    return jsonify(labels=labels, probs=pred_probs, status_code=200)

        
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
#ngrok http --hostname *.example.com 80
# use production_url