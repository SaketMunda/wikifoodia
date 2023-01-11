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
