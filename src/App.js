import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
