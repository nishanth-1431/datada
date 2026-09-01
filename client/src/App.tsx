import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Results from './pages/Results';
import Demo from './pages/Demo';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary text-gray-100 font-sans selection:bg-accent/30">
        
        {/* Background glow */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-accent/10 blur-[100px] rounded-full" />
        </div>

        {/* App content */}
        <div className="relative z-10 font-[Inter]">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/demo" element={<Demo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
