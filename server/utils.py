import tensorflow as tf
import os

class_names = [
    'apple_pie',
    'baby_back_ribs',
    'baklava',
    'beef_carpaccio',
    'beef_tartare',
    'beet_salad',
    'beignets',
    'bibimbap',
    'bread_pudding',
    'breakfast_burrito',
    'bruschetta',
    'caesar_salad',
    'cannoli',
    'caprese_salad',
    'carrot_cake',
    'ceviche',
    'cheesecake',
    'cheese_plate',
    'chicken_curry',
    'chicken_quesadilla',
    'chicken_wings',
    'chocolate_cake',
    'chocolate_mousse',
    'churros',
    'clam_chowder',
    'club_sandwich',
    'crab_cakes',
    'creme_brulee',
    'croque_madame',
    'cup_cakes',
    'deviled_eggs',
    'donuts',
    'dumplings',
    'edamame',
    'eggs_benedict',
    'escargots',
    'falafel',
    'filet_mignon',
    'fish_and_chips',
    'foie_gras',
    'french_fries',
    'french_onion_soup',
    'french_toast',
    'fried_calamari',
    'fried_rice',
    'frozen_yogurt',
    'garlic_bread',
    'gnocchi',
    'greek_salad',
    'grilled_cheese_sandwich',
    'grilled_salmon',
    'guacamole',
    'gyoza',
    'hamburger',
    'hot_and_sour_soup',
    'hot_dog',
    'huevos_rancheros',
    'hummus',
    'ice_cream',
    'lasagna',
    'lobster_bisque',
    'lobster_roll_sandwich',
    'macaroni_and_cheese',
    'macarons',
    'miso_soup',
    'mussels',
    'nachos',
    'omelette',
    'onion_rings',
    'oysters',
    'pad_thai',
    'paella',
    'pancakes',
    'panna_cotta',
    'peking_duck',
    'pho',
    'pizza',
    'pork_chop',
    'poutine',
    'prime_rib',
    'pulled_pork_sandwich',
    'ramen',
    'ravioli',
    'red_velvet_cake',
    'risotto',
    'samosa',
    'sashimi',
    'scallops',
    'seaweed_salad',
    'shrimp_and_grits',
    'spaghetti_bolognese',
    'spaghetti_carbonara',
    'spring_rolls',
    'steak',
    'strawberry_shortcake',
    'sushi',
    'tacos',
    'takoyaki',
    'tiramisu',
    'tuna_tartare',
    'waffles',
]

model = tf.keras.models.load_model('models/efficientnetb0_dropout_fine_tuned')

def load_and_prep_image(file):
    # read the image
    raw = tf.io.read_file(file)

    # decode the image
    img = tf.io.decode_image(raw, channels=3)

    # resize the image
    img = tf.image.resize(img, [224, 224])

    return tf.cast(tf.expand_dims(img, axis=0), tf.float16)

def make_prediction(img, model=model):

    pred_prob = model.predict(img)    
    top_5_pred = (pred_prob.argsort())[0][-5:][::-1]    
    labels = []    
    probs = []

    for x in range(5):
        label = str(class_names[top_5_pred[x]]).replace('[\'',"").replace('\']',"")
        labels.append(label)        
        probs.append(float(f'{(pred_prob[0][top_5_pred[x]])*100:.2f}'))
    
    return labels, probs

def save_image_for_prediction(file, img_path):

    img_bytes = file.read()        
    with open(img_path, 'wb') as f:
        f.write(img_bytes)
        f.close()         

def del_image_after_prediction(img_path):
    # delete the file after prediction
    if os.path.isfile(img_path):
        os.remove(img_path)