from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import csv
import tensorflow as tf


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#model URL
model =  tf.keras.models.load_model('model/efficientnetb0_dropout_fine_tuned/1')

file = open("model/food_101_classes.csv", "r")

class_names = list(csv.reader(file, delimiter="\n"))

file.close()

# make predictions on custom image
custom_img = 'grilled-salmon.jpeg'

def load_and_prep_image(filename=custom_img):
    # read the image
    raw = tf.io.read_file(filename)

    # decode the image
    img = tf.io.decode_image(raw, channels=3)

    # resize the image
    img = tf.image.resize(img, [224, 224])

    return tf.cast(img, tf.float32)

def make_prediction(img):

    pred_prob = model.predict(tf.expand_dims(img, axis=0))    
    top_5_pred = (pred_prob.argsort())[0][-5:][::-1]    
    labels = []    
    probs = []

    for x in range(5):
        label = str(class_names[top_5_pred[x]]).replace('[\'',"").replace('\']',"")
        labels.append(label)        
        probs.append(float(f'{(pred_prob[0][top_5_pred[x]])*100:.2f}'))
    
    return labels, probs



@app.route('/predict', methods=['GET', 'POST'])
@cross_origin()
def home():

    img = load_and_prep_image() 

    labels, pred_probs = make_prediction(img)  

    return jsonify(labels= f'{labels}', probs = f'{pred_probs}')    

if __name__ == '__main__':
    app.run(debug=True)
