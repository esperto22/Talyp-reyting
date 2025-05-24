import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GraduationCap, Shield } from 'lucide-react';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails';
import MedalChart from './components/FacultyGrafics';
import MyComponent from './components/Test';


function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/student/:slug" element={<StudentDetails />} />
            <Route path="/FacultyGrafics"
              element={<MedalChart />           
              }
            />
             <Route path="/faculties" element={<MyComponent />} />
            <Route path='/'></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;