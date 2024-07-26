import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Page404 from "./components/Page404";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/test" element={<Test />}></Route> */}
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/home" element={<Home />} ></Route>
          <Route path="*" element={<Page404 />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
