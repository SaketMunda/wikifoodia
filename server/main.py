from flask import  Flask, jsonify,request
from flask_cors import CORS, cross_origin
from utils import load_and_prep_image, make_prediction, save_image_for_prediction, del_image_after_prediction
import uuid
import os
import openai

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# make predictions on custom image
custom_img = 'grilled-salmon.jpeg'
path = './images_for_prediction/'


# openai configuration
openai.api_key = os.environ.get("OPENAI_API_KEY")

@app.route("/alive", methods=['GET'])
@cross_origin()
def check():    
    return jsonify(message="I am alive !!", status_code=200)

@app.route("/predict", methods=['POST'])
@cross_origin()
def home():
    if 'file' not in request.files:
        return jsonify(message="Please upload an Image", status_code=500)
    
    # create the filename
    img_name = f'{str(uuid.uuid4())}.jpg'
    img_path = path + img_name
    try:
        # save the file before prediction        
        file = request.files.get('file')
        save_image_for_prediction(file, img_path)

        # preprocess the image
        img = load_and_prep_image(img_path)         
        # make prediction
        labels, pred_probs = make_prediction(img)                

        return jsonify(labels=labels, probs=pred_probs, status_code=200)
    except:
        return jsonify(message="Exception occured", status_code=500)
    finally:
        # delete the file after prediction
        del_image_after_prediction(img_path)


@app.route("/detail", methods=['POST'])
@cross_origin()
def detail():

    request_data = request.get_json()

    label = request_data['label']
    send = request_data['send']

    # format the request for gpt model
    content = ""
    if send=="recipe": 
        content = "What is the recipe for " + label.replace('_', ' ') + " dish"
    elif send=="history":
        content = "What is the history of " + label.replace('_', ' ') + " dish"

    if content=="":
        return jsonify(error="Incorrect payload", status_code=500)

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": content}]
    )

    return jsonify(text=completion.choices[0].message, status_code=200)  


        
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
#ngrok http --hostname *.example.com 80
# use production_url