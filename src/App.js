import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/Login/LoginPage';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
