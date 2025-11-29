import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar_user from './components/Navbar_user';
import Navbar_admin from './components/Navbar_admin';
import Navbar from './components/Navbar';
import EditGamePage from './components/EditGamePage';

// Pages
import Login_Page from './pages/Login_Page';
import Register_Page from './pages/Register_Page';
import HomePage_NotLog from './pages/HomePage_NotLog';

// User
import Home from './pages/User/Home_page';
//import HomePage from './pages/User/HomePage';
import Profile_Page from './pages/User/Profile_Page';

import NotificationPage from './pages/User/Notification_Page';

import GamePassPage from './pages/User/GamePassPage';
import Payment from './pages/User/Payment_page';
import AllGame from './pages/User/AllGame_page';
import Library from './pages/User/Library_page';
import GameDetail from './pages/User/GameDetail';
import Help from './pages/User/Help_page';
import AdminProfile from './pages/User/AdminProfile_page';
import BillTemplate from './pages/User/bill';

// admin
import Game_Manage from './pages/Admin/Game_Manage.jsx';


import { useAuth } from './contexts/AuthContext'; // 👈 ย้อนขึ้นไปหา contexts


function ProtectedRoute({ children, role }) {
  const { auth } = useAuth(); // 👉 ดึง auth จาก context


  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role && auth.role !== role) {
    return <Navigate to="/" replace />; // หรือหน้าอื่นที่เหมาะสม
  }

  return children;
}


function App() {
  const { auth } = useAuth(); // 👉 ใช้ auth ที่แชร์จาก context
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* แสดง Navbar ตาม role */}
        
        {auth.isLoggedIn === true ? (
          auth.role === 'admin' ? (
            <Navbar_admin />
            
          ) :  (
            <Navbar_user />
          )
        ) : (
          <Navbar />
        )}

        <main className="flex-grow bg-gray-50">
          <Routes>
            {/* หน้า public */}
            <Route path="/" element={<HomePage_NotLog />} />
            <Route path="/login" element={<Login_Page />} />
            <Route path="/register" element={<Register_Page />} />

            {/* หน้า user */}
            <Route
              path="/user"
              element={
                <ProtectedRoute role="user">
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/games"
              element={
                <ProtectedRoute role="user">
                  <AllGame />
                </ProtectedRoute>
              }
            />
            
          <Route path="user/library/:id/game/:id" element={<GameDetail />} />
          <Route path="user/games/game/:id" element={<GameDetail />} />
          <Route path="user/game/:id" element={<GameDetail />} />
            <Route
              path="/user/profile"
              element={
                <ProtectedRoute role="user">
                  <Profile_Page />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/library/:id"
              element={
                <ProtectedRoute role="user">
                  <Library />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/help"
              element={
                <ProtectedRoute role="user">
                  <Help />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/:id" element={<AdminProfile />} />
            
            <Route
              path="/user/notification"
              element={
                <ProtectedRoute role="user">
                  <NotificationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/gamepass"
              element={
                <ProtectedRoute role="user">
                  <GamePassPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/payment"
              element={
                <ProtectedRoute role="user">
                  <Payment />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/user/bill"
              element={
                <ProtectedRoute role="user">
                  <BillTemplate />
                </ProtectedRoute>
              }
            />

            <Route
              path="/test"
              element={
                
                  <Game_Manage />
                
              }
            />

            {/* หน้า admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <HomePage_NotLog/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/edit/:id"
              element={
                <ProtectedRoute role="admin">
                  <EditGamePage/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/games"
              element={
                <ProtectedRoute role="admin">
                  <Game_Manage/>
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;