import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import tensorflow as tf
from utils import class_names
import googleapiclient.discovery
from google.oauth2 import service_account
from google.api_core.client_options import ClientOptions


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Setup environment credentials (you'll need to change these)
GOOGLE_APPLICATION_CREDENTIALS= "wikifoodia-377804-7184a0374de9.json"
PROJECT = "wikifoodia"
REGION = "asia-southeast1"
MODEL = "foodia_model"

# make predictions on custom image
custom_img = 'grilled-salmon.jpeg'

def load_and_prep_image(filename=custom_img):
    # read the image
    raw = tf.io.read_file(filename)

    # decode the image
    img = tf.io.decode_image(raw, channels=3)

    # resize the image
    img = tf.image.resize(img, [224, 224])

    return tf.cast(tf.expand_dims(img, axis=0), tf.int16)

def predict_json(instances, version="v0001"):
    """
    Send json data to a deployed model for prediction

    Args:
        instances ([Mapping[str:Any]]): Keys should be the names of Tensors
        your deployed model expects as inputs. Values should be datatypes
        convertible to Tensors, or (potentially nested) lists of datatypes
        convertible to Tensors.
        version (str): version of the model to target

    Return:
        dictionary of prediction results defined by the model
    """
    credentials = service_account.Credentials.from_service_account_file(GOOGLE_APPLICATION_CREDENTIALS)
    # Create the ML Engine service object
    prefix = "{}-ml".format(REGION) if REGION else "ml"
    api_endpoint = "https://{}.googleapis.com".format(prefix)
    client_options = ClientOptions(api_endpoint=api_endpoint)
    service = googleapiclient.discovery.build(
        'ml','v1', cache_discovery=False, client_options=client_options, credentials=credentials)    

    # Setup the model path
    model_path = "projects/{}/models/{}".format(PROJECT, MODEL)
    if version is not None:
        model_path += "/versions/{}".format(version)
    
    instances_list = instances.numpy().tolist() # turn input into list (ML Engine wants JSON)

    response = service.projects().predict(
        name=model_path,
        body={'instances':instances_list}
    ).execute()

    
    # # Create ML Engine resource endpoint and input data
    # ml_resource = googleapiclient.discovery.build(
    #     "ml", "v1", cache_discovery=False, client_options=client_options).projects()
   
    # input_data_json = {"signature_name":"serving_default",
    #                     "instances": instances_list}

    # request = ml_resource.predict(name=model_path, body=input_data_json)
    # response = request.execute()

    if "error" in response:
        raise RuntimeError(response["error"])
    
    return response["predictions"]


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


@app.route('/predict', methods=['GET', 'POST'])
@cross_origin()
def home():

    img = load_and_prep_image() 

    predictions = predict_json(instances=img)

    #labels, pred_probs = make_prediction(img)  

    # return jsonify(labels= f'{labels}', probs = f'{pred_probs}')    
    return jsonify(predictions=predictions)

if __name__ == '__main__':
    app.run(debug=True)
