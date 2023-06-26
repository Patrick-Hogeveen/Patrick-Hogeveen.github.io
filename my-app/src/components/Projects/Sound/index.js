import {useEffect, useState} from 'react';
import { Navibar } from "../../Nav/Nav"
import init, { add } from "wasm-lib"

const Sound = () => {

    const [ans, setAns] = useState(0);
    useEffect(() => {
        init().then(() => {
            setAns(add(1,1));
        })
    }, [])

    return (
        <>
            <Navibar />
            
            <div className="title_binom">
                <p>1 + 1 = {ans}</p>
            </div>
        </>
    )
} 
export default Sound;