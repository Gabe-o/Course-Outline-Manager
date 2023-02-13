import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/defaultPages/home';
import CreateOutline from "./pages/instructorPages/createOutline";
import Login from "./pages/defaultPages/login";
import Register from "./pages/defaultPages/register";
import ManageCourses from './pages/adminPages/manageCourses';
import AdminWrapper from './components/wrappers/adminWrapper';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createOutline" element={<CreateOutline />} />
        <Route element={<AdminWrapper />}>
          <Route path="/manageCourses" element={<ManageCourses />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
