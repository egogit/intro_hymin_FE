import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import {AuthProvider} from "./components/AuthContext";

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />}/>
                <Route exact path="/login" element={<Login />}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
