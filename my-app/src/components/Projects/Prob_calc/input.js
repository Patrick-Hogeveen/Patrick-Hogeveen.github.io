//import styles from "./wrapper.css"


const Input = ({name, event, index}) => {
    return (
        <div className="input" key={index+"t"}>
            <div key={index}className="inpName">{name}</div>
            <input key={index+"inp"} type="number" min="0" onChange={event}/>
        </div>
    )
} ;
export default Input;