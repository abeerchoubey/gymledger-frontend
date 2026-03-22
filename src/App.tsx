import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Plans from './pages/Plans';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/plans" element={<ProtectedRoute><Plans /></ProtectedRoute>} />
        <Route path="/get-started" element={<Payment />} />
        <Route path="/payment" element={<Payment />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute requirePlan={true}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}
