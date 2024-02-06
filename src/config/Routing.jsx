import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewCategories from "../pages/ViewCategories";
import FormPage from "../Form/form";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewCategories />}/>
          <Route path="/form" element={<FormPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
