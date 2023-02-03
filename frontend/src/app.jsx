import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CreateOutline from "./pages/createOutline";

function App() {
  return (
    <BrowserRouter>
      <div>
        <CreateOutline></CreateOutline>
      </div>
      <Routes>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
