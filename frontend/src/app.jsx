import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState } from "react";
import CreateOutline from "./pages/createOutline";

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
        <h1>{test}</h1>
      </div>
      <div>
        <CreateOutline></CreateOutline>
      </div>
      <Routes>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
