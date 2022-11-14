import { Navibar } from "../Nav/Nav"
import './index.css'
import {Link} from "react-router-dom"

const Home = () => {
    return (
        <>
            <Navibar />
            <h1 className="Title" id="About">About</h1>
            <h1 className="Title" id="Experience">Experience</h1>
            <h1 className="Title" id="Work and Projects">Work and Projects</h1>
            <Link  to={"/probability_calculator"}> probability_calculator</Link>
        </>
    )


}

export default Home