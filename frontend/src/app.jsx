import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CreateOutline from "./pages/createOutline";
import Login from "./pages/login";

function App() {
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
