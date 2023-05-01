import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../Home/index';
import Prob_calc from '../Projects/Prob_calc/index'
import Butterfly from '../Projects/ButterflyNN/index'
import Threed from '../Projects/threed/index'




const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    
                    <Route path="" element={<Home />}/>
                    <Route path="probability_calculator" element={<Prob_calc />} />
                    <Route path="butterfly_classifier" element={<Butterfly />} />
                    <Route path="3D_mesh_generator" element={<Threed />} />
                    

                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Router