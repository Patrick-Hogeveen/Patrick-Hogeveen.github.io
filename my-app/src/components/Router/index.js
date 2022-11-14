import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../Home/index';
import Prob_calc from '../Prob_calc/index'




const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    
                    <Route path="" element={<Home />}/>
                    <Route path="probability_calculator" element={<Prob_calc />} />
                    

                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Router