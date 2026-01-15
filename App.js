const { useState, useEffect } = React;

// --- 共用 Icons ---
const LogoIcon = () => <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>;
const IconDev = () => <svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>;
const IconHosp = () => <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>;
const IconAdmin = () => <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.58 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" style={{width:16, height:16, fill:'currentColor'}}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;

// --- [頁面 1] Landing Page 元件 ---
const PersonaCard = ({ id, title, desc, icon, onClick }) => {
    return (
        <div className="home-card" onClick={onClick}>
            <div className="home-card-icon">{icon}</div>
            <h2 className="home-card-title">{title}</h2>
            <p className="home-card-desc">{desc}</p>
            <div className="home-card-cta">
                Enter Portal <span>→</span>
            </div>
        </div>
    );
};

const LandingPage = ({ onNavigate }) => {
    const cardsData = [
        { 
            id: 'dev', 
            title: 'Model Developer', 
            desc: 'Build, validate, and monitor AI models. Track FDA readiness, analyze bias metrics, and manage model lifecycle.', 
            icon: <IconDev />,
            // 點擊後，通知父層去 'registry' 頁面
            action: () => onNavigate('registry') 
        },
        { 
            id: 'hosp', 
            title: 'Hospital Management', 
            desc: 'Monitor deployment performance, manage infrastructure, and track clinical workflow integration across sites.', 
            icon: <IconHosp />,
            action: () => alert("Hospital Portal coming soon!")
        },
        { 
            id: 'admin', 
            title: 'Platform Admin', 
            desc: 'System-wide monitoring, audit logs, API health, and ROI analytics. Full control over the evaluation platform.', 
            icon: <IconAdmin />,
            action: () => alert("Admin Portal coming soon!")
        },
    ];

    return (
        <div className="landing-container">
            <header className="header-center">
                <div className="logo-container">
                    <div className="logo-box">
                        <LogoIcon />
                    </div>
                    <div className="logo-text">EvalScale</div>
                </div>
                <p className="slogan">Evaluated here. <em>Trusted everywhere.</em></p>
            </header>

            <div className="cards-container">
                {cardsData.map((card) => (
                    <PersonaCard 
                        key={card.id} 
                        {...card} 
                        onClick={card.action}
                    />
                ))}
            </div>

            <footer className="footer">
                <p className="footer-text">Enterprise Medical AI Evaluation Platform</p>
                <div className="compliance-badge">
                    <IconCheck /> 21 CFR Part 11 Compliant
                </div>
            </footer>
        </div>
    );
};

// --- [頁面 2] Model Registry 元件 ---
const DonutChart = ({ percentage, color }) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    
    return (
        <div className="donut-chart">
            <svg viewBox="0 0 36 36" className="circle-chart">
                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle-progress" stroke={color} strokeDasharray={strokeDasharray} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="donut-text">
                <div className="donut-percent">{percentage}%</div>
                <div className="donut-label">FDA Ready</div>
            </div>
        </div>
    );
};

const ModelCard = ({ data }) => {
    const getProgressColor = (score) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="model-card">
            <div className="card-header">
                <h3 className="card-title">{data.name}</h3>
                <span className={`status-tag ${data.status === 'IN REVIEW' ? 'status-review' : 'status-pending'}`}>{data.status}</span>
            </div>
            <div className="version-row">
                <span className="version-badge">{data.version}</span>
                <span className="card-desc" style={{flex:1}}>{data.desc}</span>
            </div>
            <div className="metrics-container">
                <DonutChart percentage={data.fdaScore} color={getProgressColor(data.fdaScore)} />
                <div className="status-list">
                    <div className="status-item"><span className="status-label">Clinical Validation</span><span className={`status-val ${data.checks.validation === 'Complete' ? 'text-green' : 'text-orange'}`}>{data.checks.validation}</span></div>
                    <div className="status-item"><span className="status-label">Bias Testing</span><span className={`status-val ${data.checks.bias === 'Passed' ? 'text-green' : 'text-orange'}`}>{data.checks.bias}</span></div>
                    <div className="status-item"><span className="status-label">Documentation</span><span className={`status-val ${data.checks.doc === '100%' ? 'text-green' : 'text-orange'}`}>{data.checks.doc}</span></div>
                </div>
            </div>
        </div>
    );
};

const ModelRegistry = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('premarket');

    const models = [
        { id: 1, type: 'premarket', name: "ChestXR-Detect", version: "v2.4.1", desc: "Chest X-Ray Pneumonia Detection", status: "IN REVIEW", fdaScore: 87, checks: { validation: "Complete", bias: "Passed", doc: "92%" } },
        { id: 2, type: 'premarket', name: "MammoScreen-AI", version: "v1.8.0", desc: "Mammography Cancer Screening", status: "PENDING", fdaScore: 64, checks: { validation: "In Progress", bias: "Passed", doc: "78%" } },
        { id: 3, type: 'premarket', name: "RetinaVision", version: "v3.1.2", desc: "Diabetic Retinopathy Detection", status: "IN REVIEW", fdaScore: 93, checks: { validation: "Complete", bias: "Passed", doc: "100%" } },
        { id: 4, type: 'premarket', name: "CardioRhythm", version: "v1.2.0", desc: "ECG Arrhythmia Classification", status: "PENDING", fdaScore: 45, checks: { validation: "Not Started", bias: "Pending", doc: "30%" } }
    ];
    
    const filteredModels = models.filter(m => m.type === activeTab);

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="nav-left">
                    {/* 點擊 Logo 回到首頁 */}
                    <div className="logo-row" onClick={() => onNavigate('home')}>
                        <div className="logo-box-sm"><LogoIcon /></div>
                        <span>EvalScale</span>
                    </div>
                    <div className="breadcrumbs">
                        <span onClick={() => onNavigate('home')} style={{cursor:'pointer'}}>Home</span> &rsaquo; <span>Model Registry</span>
                    </div>
                </div>
                <div className="user-avatar">MD</div>
            </nav>

            <header className="page-header">
                <h1 className="page-title">Model Registry</h1>
                <p className="page-subtitle">Manage and monitor your AI models across all lifecycle stages</p>
            </header>

            <div className="tabs">
                <button className={`tab-btn ${activeTab === 'premarket' ? 'active' : 'inactive'}`} onClick={() => setActiveTab('premarket')}>Premarket <span className="badge">4</span></button>
                <button className={`tab-btn ${activeTab === 'postmarket' ? 'active' : 'inactive'}`} onClick={() => setActiveTab('postmarket')}>Postmarket <span className="badge">3</span></button>
            </div>

            <div className="model-grid">
                {filteredModels.map(model => <ModelCard key={model.id} data={model} />)}
            </div>
        </div>
    );
};

// --- [主程式] App 負責控制頁面切換 ---
const App = () => {
    // 狀態：目前要顯示哪個頁面 ('home' 或 'registry')
    const [currentPage, setCurrentPage] = useState('home');

    return (
        <React.Fragment>
            <div className="bg-gradient"></div>
            
            {/* 根據 currentPage 決定顯示哪個元件 */}
            {currentPage === 'home' && (
                <LandingPage onNavigate={setCurrentPage} />
            )}
            
            {currentPage === 'registry' && (
                <ModelRegistry onNavigate={setCurrentPage} />
            )}
            
        </React.Fragment>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
