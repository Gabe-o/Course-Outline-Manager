import axios from "axios";
import { useState } from "react";
import CreateOutline from "./pages/createOutline";

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
      <CreateOutline></CreateOutline>
    </div>
  );
}

export default App;
