import BrainVisualization3D from './components/3d/BrainVisualization3D';
import ChatInterface from './components/ChatInterface';
import { geminiService } from './services/gemini';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (apiKey) {
      if (geminiService.initialize(apiKey)) {
        setIsReady(true);
      }
    }
  }, [apiKey]);

  const handleKeySubmit = (e) => {
    e.preventDefault();
    const key = e.target.elements.key.value;
    setApiKey(key);
  };

  if (!isReady) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h1 className="glow-text">Baby AI Initialization</h1>
        <p style={{ color: 'var(--text-muted)' }}>Enter your Google Gemini API Key to wake the baby.</p>
        <form onSubmit={handleKeySubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            name="key"
            type="password"
            placeholder="Gemini API Key"
            style={{ padding: '10px', borderRadius: '8px', border: 'none', width: '300px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white' }}>
            Wake Up
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Brain View - Takes remaining space */}
      <div style={{ flex: 1, height: '100vh', position: 'relative' }}>
        <BrainVisualization3D />
      </div>

      {/* Chat View - Fixed sidebar */}
      <div style={{ width: '450px', padding: '20px', height: '100vh', zIndex: 10 }}>
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;
