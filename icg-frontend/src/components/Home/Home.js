import React from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import {Tabs, Tab} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import api from '../../api/axiosConfig';
//You can set breakpoints for the fluid prop. Setting it to a breakpoint (sm, md, lg, xl, xxl) will set the Container as fluid until the specified breakpoint
//import { Placeholder } from 'react-bootstrap';
import { useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { CodeBlock, a11yLight } from 'react-code-blocks';

function Home() {
  
  const [buttonPressTime, setButtonPressTime] = useState(null);
  const [file, setFile] = useState("PH.jpg");
  const [caption, setCaption] = useState("");
  var code = 
  `from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.applications.xception import Xception
from keras.models import load_model
from pickle import load
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import argparse
def extract_features(filename, model):
  try:
    image = Image.open(filename)
  except:
    print("ERROR: Couldn't open image! Make sure the image path and extension is correct")
  image = image.resize((299,299))
  image = np.array(image)
  # for images that has 4 channels, we convert them into 3 channels
  if image.shape[2] == 4: 
    image = image[..., :3]
    image = np.expand_dims(image, axis=0)
    image = image/127.5
    image = image - 1.0
    feature = model.predict(image)
  return feature

def word_for_id(integer, tokenizer):
  for word, index in tokenizer.word_index.items():
    if index == integer:
      return word
    return None

def generate_desc(model, tokenizer, photo, max_length):
  in_text = 'start'
  for i in range(max_length):
    sequence = tokenizer.texts_to_sequences([in_text])[0]
    sequence = pad_sequences([sequence], maxlen=max_length)
    pred = model.predict([photo,sequence], verbose=0)
    pred = np.argmax(pred)
    word = word_for_id(pred, tokenizer)
    if word is None:
      break
    in_text += ' ' + word
    if word == 'end':
      break
  return in_text

#Trying to run the below on app.py
max_length = 32
tokenizer = load(open("C:/Users/mubaa/Documents/College/SEM VII/Project/Native3/tokenizer.p","rb"))
model = load_model("C:/Users/mubaa/Documents/College/SEM VII/Project/Native3/models/model_9.h5")
xception_model = Xception(include_top=False, pooling="avg")
photo = extract_features(img_path, xception_model)
img = Image.open(img_path)

description = generate_desc(model, tokenizer, photo, max_length)`;

  const handleButton = () => {
    setButtonPressTime(new Date());
  };

  const handleCaption = (props) => {
    setCaption(props);
  };

  function handleUpload(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    formData.append('image', file);
    try {
        const response = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        handleCaption(response.data);

    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

  return (
    <>
    <Container className='MainContainer' fluid>
      <Tabs defaultActiveKey="ICG"  id="uncontrolled-tab-example" fill> 
        <Tab eventKey="ICG" title="ICG">
          <Container className='py-5 px-5' fluid>
            <Row>
              <Col>
                <Card id="cardForImage" style={{ height : '30rem' , width: '40rem' }}>
                  <Card.Img variant="top" src={file} alt='Just' />
                  <Card.Body>
                    <Card.Title>Once Generated, Caption will be displayed below</Card.Title>
                    <Card.Text as='div'>
                     <b>{caption?.replace(/^(start)\s*|\b(end)\s*$/g,"")}</b>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="text-center my-5">
                  <Card.Header>Image Uploader</Card.Header>
                  <Card.Body>
                    <Card.Title>Upload an Image Here</Card.Title>
                    <Card.Text  as='div'>
                      <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Click on Generate Caption</Form.Label>
                        <Form.Control name = "image" type="file" size="lg" onChange={handleUpload} />
                        <br></br>
                        <Button variant="primary" type = 'submit' onClick={handleButton}>Generate Caption</Button>
                        </Form.Group>
                      </Form>
                    </Card.Text>
                    
                    
                  </Card.Body>
                  <Card.Footer className="text-muted">{buttonPressTime &&(<ReactTimeAgo date={buttonPressTime} locale="en-US" />)}</Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="Algorithm" title="Algorithm">
        <Container  className='py-5 px-5'>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Python Code</Accordion.Header>
              <Accordion.Body>
              <CodeBlock
                text={code}
                language={"python"}
                showLineNumbers={true}
                theme={a11yLight}
              />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Dev Notes</Accordion.Header>
              <Accordion.Body>
               Make sure the image is not too big.(&lt; 5mb)<br></br>
               The given algorithm is a standardised version of what is used for the project.<br></br>
               The original backend of this project has a different function calling sequence due to the usage of Flask.

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          </Container>
        </Tab>
      </Tabs>
    </Container>
    </>

  )
}

export default Home
