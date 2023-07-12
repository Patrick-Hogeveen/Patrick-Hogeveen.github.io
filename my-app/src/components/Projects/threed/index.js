

import { Navibar, NavBar2 } from "../../Nav/Nav"

import "./index.css"
import Scene from './scene';

function Threed() {
    
    return (
      <>
      <NavBar2 />
      <div id="container">
        <Scene />
        
        </div>
        <div className="term">
                    <h2 className="title">Project Details</h2>
                    <p className="text">This was a little project to generate 3d objects using an algorithm. I settled on marching cubes as I'd used it before when creating games for fun in unity. This has 3 options noise which uses 3d simplex noise to generate something resembling a cave system, sphere which attempts to generate a sphere as the name would suggest, and terrain which uses 2d simplex noise to generate something resembling height map.
                    The original algorithm can be found <a href="http://paulbourke.net/geometry/polygonise/">here</a> along with other algorithms of a similar nature. This website is primarily made using react so I made use of <a href="https://threejs.org/">threejs</a> and <a href="https://github.com/pmndrs/react-three-fiber">react-three-fiber</a> to adapt marching cubes into a web format. </p>
                </div>
        </>
      );
} 

export default Threed