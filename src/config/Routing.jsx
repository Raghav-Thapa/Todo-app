import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/Homepage"
import ViewCategories from "../pages/ViewCategories"

const Routing = () => {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} >
                    <Route index element={<ViewCategories />} ></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </>)
}


export default Routing