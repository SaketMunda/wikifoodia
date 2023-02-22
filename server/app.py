import os
from flask import Flask, jsonify
import requests
from flask_cors import CORS, cross_origin

from utils import load_and_prep_image, predict_json



app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Setup environment credentials (you'll need to change these)
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "wikifoodia-378603-4a130475e9b2.json"
PROJECT = "wikifoodia"
REGION = "asia-southeast1"
MODEL = "foodia"
PROJECT_ID = "wikifoodia-378603"


# def make_prediction(img):

#     pred_prob = model.predict(img)    
#     top_5_pred = (pred_prob.argsort())[0][-5:][::-1]    
#     labels = []    
#     probs = []

#     for x in range(5):
#         label = str(class_names[top_5_pred[x]]).replace('[\'',"").replace('\']',"")
#         labels.append(label)        
#         probs.append(float(f'{(pred_prob[0][top_5_pred[x]])*100:.2f}'))
    
#     return labels, probs


# make predictions on custom image
custom_img = 'grilled-salmon.jpeg'

@app.route('/predict', methods=['GET', 'POST'])
@cross_origin()
def home():

    img = load_and_prep_image(custom_img) 

    predictions = predict_json(project=PROJECT, project_id = PROJECT_ID, region=REGION, model=MODEL,instances=img)

    #labels, pred_probs = make_prediction(img)  

    # return jsonify(labels= f'{labels}', probs = f'{pred_probs}')    
    return jsonify(predictions=predictions)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105,debug=True)
