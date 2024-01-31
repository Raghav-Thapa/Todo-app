import { BrowserRouter, Route, Routes } from "react-router-dom"
import Todo from "../components/Todo.app"
import HomePage from "../pages/Homepage"
import Home from "../components/Home"
import ViewCategories from "../pages/ViewCategories"

const Routing = () => {
    return(<>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage/>} >
        <Route index element = {<ViewCategories/>} ></Route>
        {/* <Route path="/edit" element = {<Todo/>} ></Route> */}
        {/* <Route path="/list" element = {<ViewCategories/>} ></Route> */}
        </Route>
    </Routes>
    </BrowserRouter>
    </>)
}


export default Routing