import {useState, useEffect} from 'react';
import { Navibar, NavBar2 } from "../../Nav/Nav"
import init, { answer } from "wasm-lib"
import "./index.css"
import allowedtext from './allowed_words.txt'
import matrix_data from './matrix.csv'
import Papa from 'papaparse'


const Wordle = () => {
    init()
    var data;
    const [allowed_words, setAllowed_words] = useState([])
    const [input, setInput] = useState("")
    const [words, setWords] = useState([]);
    const [scores, setScores] = useState([]);
    const [matrix, setMatrix] = useState([]);
    let output = []

    fetch(allowedtext)
        .then(row => row.text())
        .then(text => {
            allowed_words.push(text.split('\n'))
    })
    //console.log(answer(words, scores))
    //output = answer(words, scores)


    const handleChange = (event) => {
        setInput(event.target.value);
    }

    //Sanitize input and convert to word and score arrays 
    const clickHandler = () => {
        /*
        var lines = input.split("\n")

        for (let i =0; i<lines.length; i++) {
            var word = lines[i].split(" ")[0]
            var score = lines[i].split(" ")[1]

            if (word.length==5 && '/^[^a-z]+$/i'.text(word)) {
                words.push(word)
            } else {
                console.log("Please only use 5 lowecase letters when inputting a word")
            }




        }
        
        console.log(allowed_words)
        */

        //var test = answer(words, scores)
        Papa.parse(fetch(matrix_data), {
            download: false,
            header: false,
            dynamicTyping: true,
            complete: function(results) {
                console.log(results);
                data = results.data;
            }
        })
        /*
        fetch(matrix_data)
            .then(row => row.text())
            .then(text => {
                matrix.push(text)
            }).then (() =>
            console.log(matrix))
        */
    }

    return (
        <>
            <NavBar2/>
            <div className="wrapper">
                <div class="text-project">
                    <span>
                        Input a guess and a mask seperated by a space a mask being the pattern associated with that guess 0 being grey, 1 being yellow and 2 being green.
                    </span>
                </div>
                <div>
                    <input type="textarea"
                        class="Words"
                        onChange={handleChange}
                        value={input} />
                        <div>
                            {output}
                        </div>
                </div>
                <button class="Input" onClick={clickHandler}  >Calculate</button>
            </div>
        </>
    )
} 
export default Wordle