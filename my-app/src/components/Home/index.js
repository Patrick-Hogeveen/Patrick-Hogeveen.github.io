import { Navibar, NavBar2 } from "../Nav/Nav.js"
import './index.css'
import {Link} from "react-router-dom"
import {TermBox, ProjectBoxs} from "../stylez/containers.js"
import json from "../Projects/consts.json"


const Home = () => {
    return (
        <>
        <div class="site">
            <NavBar2/>
            <TermBox title="About" text="Hi, my name is Patrick Hogeveen I am a recent graduate from the University of Toronto with an Honors Bachelor of Science and a specialist in Computer Science. I have a great love of technology and more specifically computer science and engineering as I have always enjoyed learning how complex or interesting things work.  In my spare time I enjoy working on interesting side projects, reading fantasy novels, playing video games and running.">
                
            </TermBox>
            <TermBox title="Skills and Experience" text={"I have experience with a number of programming languages including: Python, C#, Java, C, Javascript, assembly, HTML, CSS, Haskell, Racket, Go. I am primarily familiar with object oriented languages but do have some experience with function languages as well. These are the languages with which I have experience but I am a quick learner and can pick up new languages fairly quickly given most have similar principles in terms of data structure and algorithm design.\n\n When it comes to web development most of my experience has been with using django and react for back end and front end development respectively. I have spent time working on both front end only applications as well as RESTful applications making use of my database expertise as well when working on the latter, django in tandem with an SQL database makes for an easy and scalable framework in my experience.\n\n When it comes to machine learning I have the most experience with the pytorch framework for building and training models, though having built models from scratch in numpy before I can adapt to new platforms. For data extraction, cleaning and analysis I've used everything from pandas and sklearn down to self made functions for data processing and of course for larger distributed datasets making use of spark and map reduce is necessary. \n\nI am also familiar with the field of information security, having worked in application security in an offensive security role as well as participated in bug bounties before. I have worked with all levels of software vulnerabilities from low level buffer overflows and rootkits to web applications."}>
                
            </TermBox>
            <TermBox title="Work and Projects" text={
                (Object.entries(json) || []).map(([key, value]) => (
                <ProjectBoxs title={value.title} text={value.description} link={<Link  to={"/"+key}>Link</Link>} />
                ))
            }>
                
            </TermBox>
            
            </div>
        </>
    )


}

export default Home