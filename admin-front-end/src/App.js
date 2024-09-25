
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Service from "./pages/Service"
import TransactionProof from "./pages/TransactionProof"
import GoogleAccount from "./pages/GoogleAccount"
import Header from "./components/Header"
import ChromeUser from './pages/ChromeUser';
import Proxy from './pages/Proxy';

function App() {
  return (
    <>
        <Router>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<Service />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/transaction-proof" element={<TransactionProof />} />
                    <Route path="/google-account" element={<GoogleAccount />} />
                    <Route path="/chrome-user" element={<ChromeUser />} />
                    <Route path="/proxy" element={<Proxy />} />
                </Routes>
            </main>
        </Router>
    </>
  );
}
export default App;
