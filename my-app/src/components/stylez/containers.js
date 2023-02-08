import "./container.css"
import PropTypes from 'prop-types'
import json from "../Projects/consts.json"
var Latex = require("react-latex")

function TermBox({title, text}) {
    return (
        <div class='term'>
            <h1 class="title">{title}</h1>
            <div class="text">{text}</div>
        </div>
    )

} 
TermBox.propTypes = {
    title: PropTypes.string.isRequired,
    

}

function ProjectBoxs({title, text, link}) {

    return (
        <div class='innerterm'>
            <h3 class="title">{title}</h3>
            <div class="text-project"><Latex>{text}</Latex></div>
            <div class="link-text">{link}</div>
        </div>
    )
}




export {TermBox, ProjectBoxs};