const { useState, useEffect } = React;

// --- Components ---

const IconDev = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="#555"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>;
const IconHosp = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="#555"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>;
const IconAdmin = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="#555"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>;

// 【重點修改區】：PersonaCard
const PersonaCard = ({ id, title, desc, icon, isSelected, onSelect, targetLink }) => {
    
    // 定義點擊跳轉邏輯
    const handleEnter = () => {
        if (targetLink) {
            window.location.href = targetLink; // 有連結就跳轉
        } else {
            alert(`正在前往 ${title} (頁面建置中)...`); // 沒連結就跳警告
        }
    };

    return (
        <div 
            className={`card ${isSelected ? 'selected' : ''}`} 
            onMouseEnter={() => onSelect(id)} // 1. 改成 hover 就選取
            // onMouseLeave={() => onSelect(null)} // (選擇性) 如果想要滑出後取消選取，可以把這行打開
            onClick={handleEnter}             // 2. 點擊整個卡片就觸發跳轉
            style={{ cursor: 'pointer' }}     // 讓滑鼠變成手指形狀
        >
            <div className="card-icon">{icon}</div>
            <h2 className="card-title">{title}</h2>
            <p className="card-desc">{desc}</p>
            
            {/* 按鈕現在變成純視覺提示 (Visual Cue)，因為整個卡片都能點 */}
            <div className="card-cta">
                <span className={`card-btn ${isSelected ? 'active' : ''}`}>
                    {isSelected ? "Enter Portal →" : "Hover to Select"}
                </span>
            </div>
        </div>
    );
};

// --- Main App Logic ---

const App = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [latency, setLatency] = useState(24);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(Math.floor(Math.random() * 30) + 15);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const cardsData = [
        // 這裡加上 targetLink，讓你控制要去哪裡
        { 
            id: 'dev', 
            title: 'Model Developer', 
            desc: 'Build, validate, and monitor AI models. Track FDA readiness, analyze bias metrics, and manage model lifecycle.', 
            icon: <IconDev />,
            targetLink: 'model-registry.html' // 只有這個設好連結
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
                            {...card} // 使用 spread operator 傳遞所有屬性 (id, title, desc, icon, targetLink)
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
