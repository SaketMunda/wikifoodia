# Food Vision101
A food vision app is an image classification app for 101 dishes demonstrating the power of transfer learning.

This app is using all of the data from the [Food101 dataset provided by tensorflow dataset](https://www.tensorflow.org/datasets/catalog/food101) of Image Classification.

For this project, the goal is to beat [DeepFood](https://www.researchgate.net/publication/304163308_DeepFood_Deep_Learning-Based_Food_Image_Recognition_for_Computer-Aided_Dietary_Assessment), a 2016 paper which used a Convolutional Neural Network trained for 2-3 days to achieve 77.4% top-1 accuracy.

## About the Food101 Dataset

Food101 dataset is provided by TensorFlow Datasets and it contains 75,750 images for train dataset and 25,250 images for test dataset in total.

Which also mean, 750 images and 250 images per class in train and test set respectively.

## What I've learned

- Using TensorFlow Datasets to download and explore data
- Creating preprocessing function for our data
- Batching & preparing datasets for modelling (making our datasets run fast)
- Creating modelling callbacks
- Setting up mixed precision training
- Building a feature extraction model 
- Fine-tuning the feature extraction model
- Viewing training results on TensorBoard

## Things to Explore

- [ ] It would be good to see:
  - A confusion matrix between all of the model's predictions and true labels.
  - A graph showing the f1-scores of each class.
  - A visualization of the model making predictions on various images and comparing the predictions to the ground truth. For example, plot a sample image from the test dataset and have the title of the plot show the prediction, the prediction probability and the ground truth label.
  Note: To compare predicted labels to test labels, it might be a good idea when loading the test data to set shuffle=False (so the ordering of test data is preserved alongside the order of predicted labels).
- [ ] Take 3 of your own photos of food and use the Food Vision model to make predictions on them. How does it go? Share your images/predictions with the other students.
- [ ] Retrain the model (feature extraction and fine-tuning) we trained in this notebook, except this time use `EfficientNetB4` as the base model instead of `EfficientNetB0`. Do you notice an improvement in performance? Does it take longer to train? Are there any tradeoffs to consider?
Name one important benefit of mixed precision training, how does this benefit take place?
- [ ] Read up on learning rate scheduling and the [learning rate scheduler callback](https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/LearningRateScheduler). What is it? And how might it be helpful to this project?
- [ ] Read up on TensorFlow data loaders ([improving TensorFlow data loading performance](https://www.tensorflow.org/guide/data_performance)). Is there anything we've missed? What methods you keep in mind whenever loading data in TensorFlow? Hint: check the summary at the bottom of the page for a great round up of ideas.
- [ ] Read up on the documentation for [TensorFlow mixed precision training](https://www.tensorflow.org/guide/mixed_precision). What are the important things to keep in mind when using mixed precision training?
