import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState } from "react";
import CreateOutline from "./pages/createOutline";
import Login from "./pages/login";

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
      <div>
        <Login></Login>
      </div>
      <Routes>
      <Route path="/editoutline" element={<div><CreateOutline /><CreateOutline /></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
