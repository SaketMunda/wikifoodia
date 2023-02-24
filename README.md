# Wikifoodia
Wikifoodia is an image classification app for 101 dishes demonstrating the power of transfer learning.

This app is using all of the data from the [Food101 dataset provided by tensorflow dataset](https://www.tensorflow.org/datasets/catalog/food101) of Image Classification.

## Project Tree

```bash
.
├── client                        # Nextjs App
├── server                        # Flask API project
│   ├── images_for_prediction     # temp dir which will store the image for prediction and delete after prediction
│   ├── models
|   │   ├── efficientnetb0_dropout_fine_tuned # fine tuned savedmodel format model
│   ├── grilled-salmon.jpeg       # test image
│   ├── main.py                   # main file to execute for flask api
│   ├── utils.py                  # utility functions
│   ├── requirements.txt          # all the dependencies for server project
│   ├── ...         
├── food_vision101_with_tensorflow.ipynb                # model's training file
├── README.md   
└── ...
```

### Environment Setup

Before running this project need to setup some environment variables,

#### Nextjs App (Client)

Create `.env.local` or `.env.development.local` file inside `client` directory and declare below variables,

```
HOSTNAME=your_api_host
PORT=portname
NEXT_PUBLIC_HOST=http://$HOSTNAME:$PORT
```

#### Flask API (server)

Create `env` virtual environment inside `server` directory using,

> python3 -m venv env

Activate the environment

> source env/bin/activate

Install the dependencies

> pip install -r requirements.txt

### Run the Project

We have to run both the projects separately, order of execution doesn't matter.

Inside `client` directory

> npm run dev

Inside `server` directory after activating the `env`

> python3 main.py

## Foodia's Goal (About the model)

> I named the model as *Foodia* after training.

For this project, the goal is to beat [DeepFood](https://www.researchgate.net/publication/304163308_DeepFood_Deep_Learning-Based_Food_Image_Recognition_for_Computer-Aided_Dietary_Assessment), a 2016 paper which used a Convolutional Neural Network trained for 2-3 days to achieve 77.4% top-1 accuracy.

Please refer the below colab link to view the foodia's training,

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/SaketMunda/food-vision-101/blob/master/food_vision101_with_tensorflow.ipynb)

### About the Food101 Dataset

Food101 dataset is provided by TensorFlow Datasets and it contains 75,750 images for train dataset and 25,250 images for test dataset in total.

Which also mean, 750 images and 250 images per class in train and test set respectively.

### What I've learned

- Using TensorFlow Datasets to download and explore data
- Creating preprocessing function for our data
- Batching & preparing datasets for modelling (making our datasets run fast)
- Creating modelling callbacks
- Setting up mixed precision training
- Building a feature extraction model 
- Fine-tuning the feature extraction model
- Viewing training results on TensorBoard

### Things to Explore
- [x] A confusion matrix between all of the model's predictions and true labels.
- [x] A graph showing the f1-scores of each class.
- [ ] A visualization of the model making predictions on various images and comparing the predictions to the ground truth. For example, plot a sample image from the test dataset and have the title of the plot show the prediction, the prediction probability and the ground truth label.
  Note: To compare predicted labels to test labels, it might be a good idea when loading the test data to set shuffle=False (so the ordering of test data is preserved alongside the order of predicted labels).
- [x] Take 3 of your own photos of food and use the Food Vision model to make predictions on them. How does it go? Share your images/predictions with the other students.
- [x] Retrain the model (feature extraction and fine-tuning) we trained in this notebook, except this time use `EfficientNetB4` as the base model instead of `EfficientNetB0`. Do you notice an improvement in performance? Does it take longer to train? Are there any tradeoffs to consider?
Name one important benefit of mixed precision training, how does this benefit take place?
- [ ] Read up on learning rate scheduling and the [learning rate scheduler callback](https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/LearningRateScheduler). What is it? And how might it be helpful to this project?
- [ ] Read up on TensorFlow data loaders ([improving TensorFlow data loading performance](https://www.tensorflow.org/guide/data_performance)). Is there anything we've missed? What methods you keep in mind whenever loading data in TensorFlow? Hint: check the summary at the bottom of the page for a great round up of ideas.
- [ ] Read up on the documentation for [TensorFlow mixed precision training](https://www.tensorflow.org/guide/mixed_precision). What are the important things to keep in mind when using mixed precision training?


## Libraries and dependencies

- Model's Training and Prediction
  - [tensorflow](https://www.tensorflow.org/)
  - [tensorflow_hub](https://www.tensorflow.org/hub)
  - [tensorflow_datasets](https://www.tensorflow.org/datasets)
  - [pandas](https://pandas.pydata.org/)
  - [matplotlib](https://matplotlib.org/)
  - [scikit-learn](https://scikit-learn.org/)
  - [numpy](https://numpy.org/)

- Client App (front-end)
  - [nextjs](https://nextjs.org/)
  - [tailwindcss](https://tailwindcss.com/)

- Server app (back-end) 
  - [flask](https://flask.palletsprojects.com/en/2.2.x/)

- Deployment
  - [vercel](https://vercel.com/) for Client App
  - [ngrok](https://ngrok.com/) for on premises deployment of Server App

# Acknowledgment 🙌🏽

Huge thanks to [Mr.Daniel Bourke](https://www.mrdbourke.com/) for his lectures and study materials on tensorflow and foodvision milestone project.

Thanks to [Mr. Adrian Hajdin](https://github.com/adrianhajdin) for clearing the concepts of frontend(nextjs and tailwindcss) through your videos.

Thanks for the favicon used for this project created by [Laisa Islam Ani - Flaticon](https://www.flaticon.com/free-icons/typographic)