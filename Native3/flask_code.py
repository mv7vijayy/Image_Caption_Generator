# backend.py
from flask import Flask, request
import subprocess
from flask_cors import CORS, cross_origin
from testing_caption_generator import *

app = Flask(__name__)
CORS(app)


@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return 'No image uploaded', 400

    image_file = request.files['image']
    image_path = './image.png'  # Path to save the uploaded image
    image_file.save(image_path)

    max_length = 32
    tokenizer = load(open("**yourlocalpath**/Native3/tokenizer.p","rb"))
    model = load_model("**yourlocalpath**/Native3/models/model_9.h5")
    xception_model = Xception(include_top=False, pooling="avg")

    photo = extract_features(image_path, xception_model)
    #img = Image.open(img_path)

    description = generate_desc(model, tokenizer, photo, max_length)
    return description

if __name__ == '__main__':
    app.run(debug=True)