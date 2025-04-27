import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./components/Recipe";
import SavedRecipesPage from "./components/Saved";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/Protected";
import { AuthProvider } from "../src/context/AUth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/recipes"
            element={
              <ProtectedRoute>
                <Recipes />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <SavedRecipesPage />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
