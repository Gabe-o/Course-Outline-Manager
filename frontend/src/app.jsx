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
import OutlineManagement from './pages/instructorPages/outlineManagement';
import DocumentListPage from './components/outlineManagement/outlinePage';

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        {window.location.pathname.toString() !== "/login" && window.location.pathname.toString() !== "/register" && window.location.pathname.toString() !== "/" ? <Navbar /> : null}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/outlines" element={<DocumentListPage />} />
          <Route element={<InstructorWrapper />}>
            <Route path="/createOutline" element={<CreateOutline />} />
            <Route path="/outlineManagement" element={<OutlineManagement />} />
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
