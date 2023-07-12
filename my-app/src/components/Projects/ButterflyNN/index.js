import { Navibar, NavBar2 } from "../../Nav/Nav"
import {useState, useEffect} from 'react';
import "./butter.css"
import links from './butterfly_links.json'
import { Link } from "react-router-dom";
import class_img from '../../../butter_classes_before.png';

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
        reader.addEventListener('load', () => loaded(reader))
        reader.readAsDataURL(e.target.files[0])
    }


        return (
            <>
                <NavBar2 />
                <div className='term' >
                <div class='container'>
                
            <div class="row"><h1 className="title">Usage</h1><p className="usage">Upload an image of a butterfly or moth (peferably cropped to only show the butterfly or moth) <br /> The model is hosted <a href="https://huggingface.co/spaces/patrick-h/butter">@here</a>  </p></div>
            <div class="row">
                <div class="col-md-4">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="well"><input className="butter_input" id="photo" type="file" onChange={onSelectFile}></input></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="well">{selectedFile && <img className="butter_image" width="200" height="200" src={preview} /> }</div>
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