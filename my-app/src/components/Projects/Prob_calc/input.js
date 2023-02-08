//import styles from "./wrapper.css"


const Input = ({name, event}) => {
    return (
        <div className="input">
            <div className="inpName">{name}</div>
            <input type="number" onChange={event}/>
        </div>
    )
} ;
export default Input;