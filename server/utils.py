from googleapiclient import discovery
from google.api_core.client_options import ClientOptions
import tensorflow as tf

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


def load_and_prep_image(filename):
    # read the image
    raw = tf.io.read_file(filename)

    # decode the image
    img = tf.io.decode_image(raw, channels=3)

    # resize the image
    img = tf.image.resize(img, [224, 224])

    return tf.cast(tf.expand_dims(img, axis=0), tf.int16)

def predict_json(project, project_id, region, model, instances, version="v0001"):
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
    
    # Create the ML Engine service object        
    endpoint = "https://{}-ml.googleapis.com".format(region)
    client_options = ClientOptions(api_endpoint=endpoint) 
    ml = discovery.build("ml", "v1", client_options=client_options) 

    instances_list = instances.numpy().tolist() # turn input into list (ML Engine wants JSON)

    request_body = {"instances": instances_list}

    # Setup the model path
    model_path = "projects/{}/models/{}".format(project_id, model)
    if version is not None:
        model_path += "/versions/{}".format(version)

    request = ml.projects().predict(name=model_path, body=request_body)
    response = request.execute()
    
    # # ALT: Create model api
    # model_api = api_endpoint + model_path + ":predict"
    # headers = {"Authorization": "Bearer " + token}
    # response = requests.post(model_api, json=input_data_json, headers=headers)

    # response = service.projects().predict(
    #     name=model_path,
    #     body={'instances':instances_list}
    # ).execute()  
   

    if "error" in response:
        raise RuntimeError(response["error"])
    
    return response["predictions"]

