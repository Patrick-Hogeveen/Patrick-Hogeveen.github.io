import { Navibar, NavBar2 } from "../../Nav/Nav"
import {useState, useEffect} from 'react';
import "./butter.css"
//import {Tensor} from 'onnxruntime-web'
import links from './butterfly_links.json'
import { Link } from "react-router-dom";
import class_img from '../../../butter_classes_before.png';
import { curveMonotoneX } from "d3";
import butternames from './butterfly.json'

const ort = require('onnxruntime-web')

const WIDTH = 224;
const DIMS = [1, 3, WIDTH, WIDTH];
const MAX_LENGTH = DIMS[0] * DIMS[1] * DIMS[2] * DIMS[3];
const MAX_SIGNED_VALUE = 255.0;

let predictedClass;
let isRunning = false;

const Butterfly = () => {
    const [result, setResult] = useState()
    async function loaded(e) {
        const response = await fetch("https://patrick-h-butter.hf.space/run/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              data: [e.result]
            })})
          .then(r => r.json())
          .then(
            r => {
              let data = r.data;
              console.log(data)
              setResult(data[0]['label'])
              
              wiki(links[data[0]['label']].split('/').pop())
            }
          )
          
    }

    function argMax(arr) {
        let max = arr[0];
        let maxIndex = 0;
        for (var i = 1; i < arr.length; i++) {
          if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
          }
        }
        return [max, maxIndex];
      }

    async function run(inputTensor) {
        try {
          const session = await ort.InferenceSession.create("butter.onnx");
          const feeds = { input: inputTensor };
            console.log(inputTensor)
          // feed inputs and run
          const results = await session.run(feeds);
          const [maxValue, maxIndex] = argMax(results.output.data);
            console.log(results.output.data)
          predictedClass = `${butternames[maxIndex]}`;
          console.log(predictedClass)
          setResult(predictedClass)
          wiki(links[predictedClass].split('/').pop())
          isRunning = false;
        } catch (e) {
          console.error(e);
          isRunning = false;
        }
      }

    function handleImage(img, targetWidth, ctx) {
        ctx.drawImage(img, 0, 0);
        const resizedImageData = processImage(img, targetWidth);
        const inputTensor = imageDataToTensor(resizedImageData, DIMS);
        run(inputTensor);
      }
      
      function processImage(img, width) {
        const canvas = document.getElementById("myCanvas"),
          ctx = canvas.getContext("2d");
      
        canvas.width = width;
        canvas.height = canvas.width * (img.height / img.width);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
        //document.getElementById("canvas-image").src = canvas.toDataURL();
        return ctx.getImageData(0, 0, width, width).data;
      }

      function imageDataToTensor(data, dims) {
        // 1. filter out alpha
        // 2. transpose from [224, 224, 3] -> [3, 224, 224]
        const [R, G, B] = [[], [], []];
        for (let i = 0; i < data.length; i += 4) {
          R.push(data[i]);
          G.push(data[i + 1]);
          B.push(data[i + 2]);
          // here we skip data[i + 3] because it's the alpha channel
        }
        const transposedData = R.concat(G).concat(B);
      
        // convert to float32
        let i,
          l = transposedData.length; // length, we need this for the loop
        const float32Data = new Float32Array(MAX_LENGTH); // create the Float32Array for output
        for (i = 0; i < l; i++) {
          float32Data[i] = transposedData[i] / MAX_SIGNED_VALUE; // convert to float
        }
      
        // return ort.Tensor
        const inputTensor = new ort.Tensor("float32", float32Data, dims);
        return inputTensor;
      }


    async function PredictButter(e) {
        //This is a mess :(
        
        let dims = [1, 3, 224, 224]
        var img = new Image()
        img.src = URL.createObjectURL(e.target.files[0])
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d")
        console.log('here')
        img.onload = () => handleImage(img, WIDTH, ctx)
        console.log('there')
        /*
        var imageBufferData = ctx.getImageData(0,0,224, 224)
        console.log(imageBufferData)
        const [redArray, greenArray, blueArray] = new Array([], [], [])

        // 2. Loop through the image buffer and extract the R, G, and B channels
        for (let i = 0; i < imageBufferData.length; i += 4) {
            redArray.push(imageBufferData[i]);
            greenArray.push(imageBufferData[i + 1]);
            blueArray.push(imageBufferData[i + 2]);
            // skip data[i + 3] to filter out the alpha channel
        }

        // 3. Concatenate RGB to transpose [224, 224, 3] -> [3, 224, 224] to a number array
        const transposedData = redArray.concat(greenArray).concat(blueArray);

        // 4. convert to float32
        let i, l = transposedData.length; // length, we need this for the loop
        // create the Float32Array size 3 * 224 * 224 for these dimensions output
        const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);
        for (i = 0; i < l; i++) {
            float32Data[i] = transposedData[i] / 255.0; // convert to float
        }
        // 5. create the tensor object from onnxruntime-web.
        const inputTensor = new ort.Tensor("float32", float32Data, dims);
        console.log(inputTensor)
        
        
        const session = await ort.InferenceSession.create('./butter.onnx')

        console.log('Inference session created')
        const feed = { input: inputTensor}
        var output_data = await session.run(feed)
        console.log(output_data.output)
        
        //var ret = butternames[indexOfMax(output_data.output.data)]
        //console.log(ret)*/
        return 0;


    }
    
    async function wiki(search) {
        
        const url = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles='+search;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)
        
        var pages = data['query']['pages']
        var firstkey = Object.keys(pages)[0]
        console.log(pages[firstkey])
        //var innertext = JSON.parse(data, null, 4)
        //console.log(innertext)
        //console.log(innertext['query'])
        console.log(pages[firstkey]['extract'])
        document.getElementById('response').innerText = pages[firstkey]['extract'];
    }

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        const reader = new FileReader()
        setSelectedFile(e.target.files[0])
        reader.addEventListener('load', () => PredictButter(e))
        reader.readAsDataURL(e.target.files[0])
    }


        return (
            <>
                <NavBar2 />
                <div className='term' >
                <div class='container'>
                
            <div class="row"><h1 className="title">Usage</h1><p className="usage">Upload an image of a butterfly or moth (peferably cropped to only show the butterfly or moth) <br /> This can make mistakes and is not 100% accurate. <br /><s>The model is hosted <a href="https://huggingface.co/spaces/patrick-h/butter">@here</a></s> Model converted to ONNX and runs in browser.  </p></div>
            <div class="row">
                <div class="col-md-4">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="well"><input className="butter_input" id="photo" type="file" onChange={onSelectFile}></input></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="well"><canvas id="myCanvas" width="224" height="224" ></canvas></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div className="butter-info"class="well"><div id="results" className="butter_result" >{result}</div>
                    {<p className="snippet" id="response"></p>}
                    {result && <a href={links[result]} >Read More</a>}
                    </div>
                </div>
            
            </div>
                </div>
                </div>
                <div className="term">
                    <h2 className="title">Project Details</h2>
                    <p className="text">This was written in python using the fastai deep learning library to create and train the model. The dataset was provided from kaggle <a href="https://www.kaggle.com/datasets/gpiosenka/butterfly-images40-species" >@here</a>.
                    Initially the validation set was a little smaller than I'd liked it to be so I moved some of the training images into it, while modifying the datasets I also noticed the classes were more unbalanced than I'd like as shown here.<img src={class_img} style={{height:"70%", width:"100%", margin:"2% auto", backgroundColor:"white"}}></img>
                    After discovering this I duplicated and transformed some of the images of the less represented classes until each had an equal share. After cleaning up the data it was down to deciding on a model. <br/><br/><br/>
                    The first model I tried was <a href="https://arxiv.org/pdf/1512.03385.pdf">resnet18</a> a well known residual convolutional based network, it performed well in training and testing however when trying it against real pictures taken by a friend it seemed to misclassify very easy examples. After discovering this I then decided to try a more complex network.
                    I next tried <a href="https://github.com/liuzhuang13/DenseNet">densenet201</a> a convolutional fully connected network and while it performed a percent or two better than <a href="https://arxiv.org/pdf/1512.03385.pdf">resnet18</a> it still failed on the same examples post training. It took me a moment to figure out the issue was not the models or training but the examples, the pictures were of landscapes including butterflies rather than only butterflies
                    which the models had been trained on. This in my opinion didn't really need to be fixed as images can easily be cropped down to only show the butterfly and after doing so both the dense and res models were able to identify them with ease.</p>
                </div>
            </>
            
        )
}

export default Butterfly