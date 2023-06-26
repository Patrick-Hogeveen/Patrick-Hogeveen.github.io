//import styles from "./wrapper.css"
import Input from "./input"
import Output from "./output";
import {useState, useEffect} from 'react';
import { Navibar } from "../../Nav/Nav"
import init, { all_probability } from "wasm-lib"

import Chart from "./barchart";



function calc_allvals(probabilities, success){
    var equal = probabilities[success]
    var atleast = probabilities.slice(success,probabilities.length).reduce((a,b) => a + b)
    var more = atleast - equal
    var lessequal = 1 - more
    var less = 1 - atleast

    return [equal, less, lessequal,more, atleast]
}

const Prob_calc = ({ children }) => {
    const Successes = 'x'
    init()
    const inputDatas = [
        {
            id: 1,
            name: 'Probability of Success',
            value: 0
        },
        {
            id: 2,
            name: 'Number of Trials',
            value: 0
        },
        {
            id: 3,
            name: 'Number of Successes (x)',
            value: 0
        }
    ]
    const outputDatas = [
        {
            id: 1,
            name: 'P(X='+Successes+')',
            value: 0
        },
        {
            id: 2,
            name: 'P(X<x)',
            value: 0
        },
        {
            id: 3,
            name: 'P(X<=x)',
            value: 0
        },
        {
            id: 4,
            name: 'P(X>x)',
            value: 0
        },
        {
            id: 5,
            name: 'P(X>=x)',
            value: 0
        }
    ]

const [data, setData] = useState(inputDatas)
const [odata, setOdata] = useState(outputDatas)
const [numSuccesses, setSuccesses] = useState(Successes)
const [probabilities, setProbabilities] = useState([])

    useEffect(() => {
        if (probabilities.length > 0) {
            var outVals = calc_allvals(probabilities,data[2].value)
            const newArray = odata.map((item,i) => {
                if (i == 0){
                    return {...item, value:outVals[0]};
                } else if (i == 1) {
                    return {...item, value:outVals[1]};
                } else if (i == 2) {
                    return {...item, value:outVals[2]};
                } else if (i == 3) {
                    return {...item, value:outVals[3]};
                } else if (i == 4) {
                    return {...item, value:outVals[4]};
                } else {
                    return item;
                }
                
            });
            
            
            
            setOdata(newArray)
        }
    },[probabilities]);

    const updateState = (index) => (e) => {
        const newArray = data.map((item, i) => {
            if (index === i){
                return { ...item,  value: e.target.valueAsNumber };     
            } else {
                return item;
            }
        });
        setData(newArray)
        
    }

    const clickHandler = ()  => {
        if(data.filter(x => x.value >= 0).length == 3 && data[1].value>0 && data[2].value <= data[1].value && data[0].value<=1 ){
            setProbabilities(all_probability(data[0].value,data[1].value))
                
            
            
            setSuccesses(Successes)
            
            console.log(probabilities)
        } else {
            console.log("Improper Input, probability 0<=x<=1, number of trials>=1, 0<=number of successes<=number of trials ")
        }
        
    }

    return (
        <>
        <Navibar />
    <h1 className="title_binom">Binomial Probability Calculator</h1>
    <div className="wrapper">
        <div className="row" style={{justifyContent: 'center'}}>
        <div className="col-md-4" >
        {
            data.map((datum, index) => {
                return (
                    <Input name={datum.name} event={updateState(index)} index={index}/>
                )
            })
        }
        {
            odata.map((datum, index) => {
                return (
                    <Output name={datum.name} ptoc={datum.value} />
                )
            })

        }
        <button id="calc" onClick={clickHandler}>Calculate</button>
        </div>
        <div className="col-md-7">
            <Chart width={800} height={600} data={probabilities} />
            
        </div>
        </div>
    </div>
    </>
    )
  };
  
  export default Prob_calc;