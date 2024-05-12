# Image_Caption_Generator

A Deep learning applications that can generate captions for images using the power of Xception (CNN) and LSTM (RNN) with a user friendly ReactJs interface


## Run this project locally

Clone the project

```bash
  git clone https://github.com/Mubaasim/Image_Caption_Generator
```

Go to the project directory

```bash
  cd Image_Caption_Generator
```
Go to the frontend directory using command prompt

```bash
  cd icg-frontend
```
Install dependencies using npm

```bash
  npm install
```

Start the server

```bash
  npm start
```
In a new terminal, navigate to the backend directory 

```bash
  cd Native3
```
To install the required Python Packages 

```bash
  pip install -r requirements.txt
```
Run the backend flask server and make sure to replace \*\*yourlocalpath\*\* with your PC path on flask_code.py (line 21 and 22) 

```bash
  python flask_code.py
```
React UI will be running on port:3000 from where you can access the application to generate captions

## To train the model yourself (Optional)
Download the dataset from below links
1. Flickr8k_Dataset.zip  https://github.com/jbrownlee/Datasets/releases/download/Flickr8k/Flickr8k_Dataset.zip

2. Flickr8k_text.zip https://github.com/jbrownlee/Datasets/releases/download/Flickr8k/Flickr8k_text.zip

Run the ipynb on jupyter notebook and the model will be saved on models folder on the backend directory


