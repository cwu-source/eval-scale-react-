const { useState, useEffect } = React;

// --- Components ---

const IconDev = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="#555"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>;
const IconHosp = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="#555"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>;
const IconAdmin = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="#555"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>;

const PersonaCard = ({ id, title, desc, icon, isSelected, onSelect }) => {
    return (
        <div 
            className={`card ${isSelected ? 'selected' : ''}`} 
            onClick={() => onSelect(id)}
        >
            <div className="card-icon">{icon}</div>
            <h2 className="card-title">{title}</h2>
            <p className="card-desc">{desc}</p>
            <button 
                className="card-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    alert(`Navigating to ${title} portal...`);
                }}
            >
                {isSelected ? "Enter Portal →" : "Click to Select"}
            </button>
        </div>
    );
};

// --- Main App Logic ---

const App = () => {
    // 真正的 React State Logic
    const [selectedId, setSelectedId] = useState(null);
    const [latency, setLatency] = useState(24);
    
    // 模擬系統監控數據跳動
    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(Math.floor(Math.random() * 30) + 15);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const cardsData = [
        { id: 'dev', title: 'Model Developer', desc: 'Build and validate AI models. Track bias metrics.', icon: <IconDev /> },
        { id: 'hosp', title: 'Hospital Mgmt', desc: 'Monitor deployment and clinical workflows.', icon: <IconHosp /> },
        { id: 'admin', title: 'Platform Admin', desc: 'System monitoring and audit logs.', icon: <IconAdmin /> },
    ];

    return (
        <React.Fragment>
            <div className="bg-gradient"></div>
            <div className="bg-orb bg-orb-1"></div>
            <div className="bg-orb bg-orb-2"></div>

            <div className="container">
                <div className="system-status">
                    <div className="status-dot"></div>
                    <span>System Operational</span>
                    <span style={{color: '#aaa', margin: '0 8px'}}>|</span>
                    <span>{latency}ms</span>
                </div>

                <header className="header">
                    <div className="logo-text">EvalScale</div>
                    <p className="slogan">Select your role to continue</p>
                </header>

                <div className="cards-container">
                    {cardsData.map((card) => (
                        <PersonaCard 
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            desc={card.desc}
                            icon={card.icon}
                            isSelected={selectedId === card.id} 
                            onSelect={setSelectedId}
                        />
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
