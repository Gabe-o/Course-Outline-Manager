import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateOutline from "./pages/createOutline";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<div><Login /></div>} />
        <Route path="/register" element={<div><Register /></div>} />
        <Route path="/createOutline" element={<div><CreateOutline /></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
