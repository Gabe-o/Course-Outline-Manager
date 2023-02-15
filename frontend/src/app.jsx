import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/defaultPages/home';
import CreateOutline from "./pages/instructorPages/createOutline";
import Login from "./pages/defaultPages/login";
import Register from "./pages/defaultPages/register";
import ManageCourses from './pages/adminPages/manageCourses';
import AdminWrapper from './components/wrappers/adminWrapper';
import Navbar from './components/ui/navbar';
import AuthContext from './components/misc/authContext';
import InstructorWrapper from './components/wrappers/instructorWrapper';
import ReviewerWrapper from './components/wrappers/reviewerWrapper';
import OutlineManagment from './pages/instructorPages/outlineManagment';

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        {window.location.pathname.toString() !== "/login" && window.location.pathname.toString() !== "/register" ? <Navbar /> : null}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route element={<InstructorWrapper />}>
            <Route path="/createOutline" element={<CreateOutline />} />
            <Route path="/outlineManagment" element={<OutlineManagment />} />
          </Route>
          <Route element={<AdminWrapper />}>
            <Route path="/manageCourses" element={<ManageCourses />} />
          </Route>
          <Route element={<ReviewerWrapper />}>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
