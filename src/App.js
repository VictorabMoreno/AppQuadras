// App.js
import React from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import HomePage from './pages/Home.jsx';
import CourtDetails from './pages/CourtDetails.jsx';
import MyReservations from './pages/MyReservations.jsx';
import ReservationStatus from './pages/ReservationStatus.jsx';
import AffiliatePage from './pages/becomeAffiliate.jsx';

const App = () => {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
                  <Route path="/court/:id" element={<CourtDetails />} />
          <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/reservation-status/:id" element={<ReservationStatus />} />
        <Route path="/become-affiliate" element={<AffiliatePage />} />
              </Routes>
          </Router>
      </AuthProvider>
  );
};

const PrivateRoute = ({ element }) => {
  const { user } = React.useContext(AuthContext);
  return user ? element : <Navigate to="/login" />;
};

export default App;
