const { useState, useEffect } = React;

// --- Icons ---
// 使用更符合截圖的簡單幾何圖標
const LogoIcon = () => <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>; // 一個十字/加號
const IconDev = () => <svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>;
const IconHosp = () => <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>;
const IconAdmin = () => <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.58 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" style={{width:16, height:16, fill:'currentColor'}}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;

// --- Component: PersonaCard ---
const PersonaCard = ({ id, title, desc, icon, targetLink }) => {
    
    // 點擊處理
    const handleEnter = () => {
        if (targetLink) {
            window.location.href = targetLink;
        } else {
            alert(`Navigating to ${title} portal...`);
        }
    };

    return (
        <div className="card" onClick={handleEnter}>
            <div className="card-icon">{icon}</div>
            <h2 className="card-title">{title}</h2>
            <p className="card-desc">{desc}</p>
            
            <div className="card-cta">
                Enter Portal <span>→</span>
            </div>
        </div>
    );
};

// --- Main App ---
const App = () => {
    const cardsData = [
        { 
            id: 'dev', 
            title: 'Model Developer', 
            desc: 'Build, validate, and monitor AI models. Track FDA readiness, analyze bias metrics, and manage model lifecycle.', 
            icon: <IconDev />,
            targetLink: 'model-registry.html'
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

            <div className="container">
                {/* Header 區域：Logo + Slogan */}
                <header className="header">
                    <div className="logo-container">
                        <div className="logo-box">
                            <LogoIcon />
                        </div>
                        <div className="logo-text">EvalScale</div>
                    </div>
                    {/* 使用 em 標籤來做斜體藍色效果 */}
                    <p className="slogan">Evaluated here. <em>Trusted everywhere.</em></p>
                </header>

                <div className="cards-container">
                    {cardsData.map((card) => (
                        <PersonaCard key={card.id} {...card} />
                    ))}
                </div>

                {/* Footer 區域：徽章 + 文字 */}
                <footer className="footer">
                    <p className="footer-text">Enterprise Medical AI Evaluation Platform</p>
                    <div className="compliance-badge">
                        <IconCheck /> 21 CFR Part 11 Compliant
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
