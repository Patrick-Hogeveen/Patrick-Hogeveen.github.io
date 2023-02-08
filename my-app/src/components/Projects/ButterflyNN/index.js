import { Navibar } from "../../Nav/Nav"
import {useState, useEffect} from 'react';
import "./butter.css"
import links from './butterfly_links.json'
import { Link } from "react-router-dom";

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
                <Navibar />
                <div className='term' >
                <div class='container'>
                
                
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
            </>
            
        )
}

export default Butterfly