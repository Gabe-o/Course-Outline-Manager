import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CreateOutline from "./pages/createOutline";
import Login from "./pages/login";
import Register from "./pages/register";
import ManageCourses from './pages/manageCourses';
import AdminWrapper from './components/adminWrapper';

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
