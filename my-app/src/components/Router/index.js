import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../Home/index';




const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    
                    <Route path="" element={<Home />}/>
                    

                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Router