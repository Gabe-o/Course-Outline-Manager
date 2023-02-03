import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState } from "react";
import CreateOutline from "./pages/createOutline";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {

  const [test, setTest] = useState("orignal");
  axios.get('/test')
    .then(function (response) {
      console.log("Entered");
      setTest(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<div><Login /></div>} />
        <Route path="/register" element={<div><Register /></div>} />
        <Route path="/editoutline" element={<div><CreateOutline /></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
