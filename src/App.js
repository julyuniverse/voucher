import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/login/LoginPage';

function App() {
    return (
        <div className="App">
            <BrowserRouter basename="/voucher"> {/* basename은 배포 시 하위 경로일 경우 설정한다. ex) http://localhost -> http://localhost/voucher */}
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;