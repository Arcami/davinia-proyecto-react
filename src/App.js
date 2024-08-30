import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Start from "./pages/Start";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateProduct from "./pages/UpdateProduct"; // Import the new component
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/wishlist/:userId" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/update/:productId" element={<UpdateProduct />} />
            <Route path="*" element={<Start />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
