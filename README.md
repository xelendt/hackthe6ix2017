# Hack the 6ix - 2017

## Overview

Head tracking for daydream

## Todo

* Positional tracker on the phone
* Tracking headset via RGB camera
* API Server

## Documentation

#### Setup:

This entire process can be done from the parent directory by running ```./full_clean```. This will remove all previous training samples and start building a training set from scratch.

* Collection: gather a number of images that contain the marker on some background. To use, run ```make collect-run``` from the ```lighthouse``` folder. To take an image, left-click with the mouse, and when you are done, press escape.
* Sampling: Split up the collection of images into positive and negative samples for training the classifier. To use, run ```make generate-run``` from the ```lighthouse``` folder. To identify a positive sample, click on the image where the sample should be. Once complete for a certain image, press space to view your positive samples (green) and negative (black) samples. Press space again to move onto the next image.
* Training: To train a SVM with the samples gathered in the previous step. To use, run ```python3 train.py``` from within the ```pylighthouse``` folder. Once complete it will save the SVM parameters in a text file called ```pylighthouse/svm_data.txt```

#### Application:

There are three components of the application that need to work together:

* Camera: The camera server uses the classifier to detect the marker within camera-space. It then updates the API server with that value. To use, run ```python3 server.py``` from the ```pylighthouse``` folder.

* API Server: The API server allows the communication between the VR application and the camera server. To use, run ```npm start``` from the ```apiServer``` folder. The database that is maintained simply stores the x and y position in camera space, and a guess at the size of the marker in the image.

* VR Application: This uses ReactVR to run a VR application. It takes values off the API server, and uses those values to help guess where the headset is in space. To run, setup the node server from the ```phonetracker/WelcomeToVR``` folder, run ```npm start```. Afterward, we suggest using a tool called ```ngrok``` to keep the port open, and ```ngrok``` will give you a unique URL to visit. 


