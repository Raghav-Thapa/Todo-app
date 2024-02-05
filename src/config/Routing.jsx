import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewCategories from "../pages/ViewCategories";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewCategories />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
