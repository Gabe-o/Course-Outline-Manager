import axios from "axios";
import { useState } from "react";
function App() {

  const [test, setTest] = useState("orignal");
  axios.get('http://localhost:9000/test')
    .then(function (response) {
      console.log("Entered");
      setTest(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <div>
      <h1>{test}</h1>
    </div>
  );
}

export default App;
