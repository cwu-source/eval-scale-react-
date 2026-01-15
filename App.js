const { useState, useEffect } = React;

// --- Icons ---
const IconDev = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="#555"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>;
const IconHosp = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="#555"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>;
const IconAdmin = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="#555"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>;

// --- Component: PersonaCard ---
const PersonaCard = ({ id, title, desc, icon, targetLink }) => {
    
    // 關鍵：將 ID 轉換成 CSS class，對應 App.css 裡的 .card--developer 等樣式
    const getCardClass = (id) => {
        if (id === 'dev') return 'card--developer';
        if (id === 'hosp') return 'card--hospital';
        if (id === 'admin') return 'card--admin';
        return '';
    };

    // 點擊處理：有連結就跳轉，沒連結就顯示 Alert
    const handleEnter = () => {
        if (targetLink) {
            window.location.href = targetLink;
        } else {
            alert(`Navigating to ${title} portal... (Page under construction)`);
        }
    };

    return (
        <div 
            className={`card ${getCardClass(id)}`} 
            onClick={handleEnter}
        >
            <div className="card-icon">{icon}</div>
            <h2 className="card-title">{title}</h2>
            <p className="card-desc">{desc}</p>
            
            <div className="card-cta">
                Enter Portal →
            </div>
        </div>
    );
};

// --- Main App Logic ---
const App = () => {
    const [latency, setLatency] = useState(24);
    
    // 模擬 Latency 數字跳動
    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(Math.floor(Math.random() * 30) + 15);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // 資料設定：在這裡設定 targetLink
    const cardsData = [
        { 
            id: 'dev', 
            title: 'Model Developer', 
            desc: 'Build, validate, and monitor AI models. Track FDA readiness, analyze bias metrics, and manage model lifecycle.', 
            icon: <IconDev />,
            targetLink: 'model-registry.html' // 設定 Developer 的跳轉連結
        },
        { 
            id: 'hosp', 
            title: 'Hospital Management', 
            desc: 'Monitor deployment performance, manage infrastructure, and track clinical workflow integration across sites.', 
            icon: <IconHosp />,
            targetLink: null 
        },
        { 
            id: 'admin', 
            title: 'Platform Admin', 
            desc: 'System-wide monitoring, audit logs, API health, and ROI analytics. Full control over the evaluation platform.', 
            icon: <IconAdmin />,
            targetLink: null 
        },
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
                    <p className="slogan">Evaluated here. Trusted everywhere.</p>
                </header>

                <div className="cards-container">
                    {cardsData.map((card) => (
                        <PersonaCard 
                            key={card.id}
                            {...card} 
                        />
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
