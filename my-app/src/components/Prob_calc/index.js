import "./wrapper.css"
import Input from "./input"
import Output from "./output";
import {useState} from 'react';
import { Navibar } from "../Nav/Nav"


function factn(n){
    const facts = [1]
    var curr_fact = 1
    for (var i = 1; i<n+1;i++){
        curr_fact = curr_fact*i
        facts.push(curr_fact)
    }

    return facts
}

function calc_equal(chance, numt, nums, factt,facts,factts){
    if (numt<nums || numt===0){
        return 0
    }

    var comb = (factt)/(factts*facts)
    return comb*(Math.pow(chance,nums))*(Math.pow((1-chance),numt-nums))
}

function calc_atleast(chance,numt,nums,facts){
    var prob = 0;
    for (var i =0;i<nums;i++){
        prob += calc_equal(chance, numt,i,facts[numt-1],facts[i],facts[numt-i-1])
    }
    return 1 - prob
}
function calc_all(chance, trials, success){
    if (trials<success || trials<1 || chance <0 || success<0){
        return 0
    }
    const facts = factn(trials)
    var equal = calc_equal(chance, trials,success,facts[trials],facts[success],facts[trials-success])
    var atleast = calc_atleast(chance,trials, success,facts)
    var more = atleast - equal
    var lessequal = 1 - more
    var less = 1 - atleast

    return [equal, less, lessequal,more, atleast]
}

const Prob_calc = ({ children }) => {

    const inputDatas = [
        {
            id: 1,
            name: 'Success of Trial',
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
            name: 'P(X=x)',
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
        var outVals = calc_all(data[0].value,data[1].value,data[2].value)
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

    return (
        <>
        <Navibar />
    <h1 className="title">Binomial Probability Calculator</h1>
    <div className="wrapper">
        
        {
            data.map((datum, index) => {
                return (
                    <Input name={datum.name} event={updateState(index)}/>
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
    </>
    )
  };
  
  export default Prob_calc;