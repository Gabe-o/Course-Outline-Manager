import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState } from "react";
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
      <Routes>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
