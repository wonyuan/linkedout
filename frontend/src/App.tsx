import '@mantine/core/styles.css';
import { Home } from '@pages/Home';
import { Dashboard } from '@pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MessagesProvider } from '@context/messageContext';
import { InitialPage } from './pages/InitialPage';


const App = () => {
  return (
    <MessagesProvider>
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </MessagesProvider>
  );
};

export default App;

