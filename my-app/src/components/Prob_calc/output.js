import "./wrapper.css"


const Output = ({name, ptoc}) => {
    return (
        <div className="output">
            <div className="inpName">{name}</div>
            <input  type="number" value={ptoc} readOnly/>
        </div>
    )
} ;
export default Output;