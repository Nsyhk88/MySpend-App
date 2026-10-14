import { useEffect, useState, type ReactNode } from "react";

type View =
  | "home"
  | "add"
  | "activity"
  | "scanner"
  | "processing"
  | "review"
  | "details"
  | "analytics"
  | "budget"
  | "settings"
  | "debt"
  | "sheets";

type IconName =
  | "home" | "activity" | "chart" | "wallet" | "settings" | "bell" | "chevron"
  | "arrowUp" | "arrowDown" | "scan" | "food" | "fuel" | "cart" | "phone"
  | "search" | "filter" | "camera" | "image" | "close" | "check" | "edit"
  | "trash" | "calendar" | "card" | "receipt" | "more" | "back" | "target"
  | "sheet" | "debt" | "user" | "download" | "repeat" | "folder" | "plus";


type Transaction = {
  icon: IconName;
  name: string;
  category: string;
  amount: string;
  time: string;
  kind: "expense" | "income";
};


const paths: Record<IconName, ReactNode> = {
  home: <><path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.5V21h13V9.5M9.5 21v-7h5v7"/></>,
  activity: <><path d="M6 3v3M18 3v3M3.5 9h17"/><rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M8 13h3M8 17h6"/></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  wallet: <><path d="M4 6.5h14a2 2 0 0 1 2 2V19H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12v3.5"/><path d="M16 11h6v5h-6a2.5 2.5 0 0 1 0-5Z"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  arrowUp: <><path d="m7 11 5-5 5 5M12 6v12"/></>,
  arrowDown: <><path d="m7 13 5 5 5-5M12 18V6"/></>,
  scan: <><path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4"/><path d="M8 12h8M12 8v8"/></>,
  food: <><path d="M7 3v7M4 3v4a3 3 0 0 0 6 0V3M7 10v11M17 3v18M17 3c3 2 3 8 0 10"/></>,
  fuel: <><path d="M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h15M8 7h5v4H8z"/><path d="m16 8 3 3v6a2 2 0 0 0 4 0v-5l-3-3"/></>,
  cart: <><path d="M3 4h2l2.5 11h10l2-7H6"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></>,
  phone: <><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  filter: <path d="M4 6h16M7 12h10M10 18h4"/>,
  camera: <><path d="M4 7h4l2-3h4l2 3h4a2 2 0 0 1 2 2v10H2V9a2 2 0 0 1 2-2Z"/><circle cx="12" cy="13" r="4"/></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m3 17 5-4 4 3 3-2 6 5"/></>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  edit: <><path d="m4 20 4.5-1L19 8.5 15.5 5 5 15.5 4 20Z"/><path d="m13.5 7 3.5 3.5"/></>,
  trash: <><path d="M4 7h16M9 3h6l1 4M7 7l1 14h8l1-14M10 11v6M14 11v6"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 10h18"/></>,
  card: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></>,
  receipt: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/></>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  back: <><path d="m15 18-6-6 6-6"/></>,
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
  sheet: <><path d="M5 3h10l4 4v14H5V3Z"/><path d="M15 3v5h5M8 12h8M8 16h8M11 9v10"/></>,
  debt: <><circle cx="9" cy="12" r="6"/><path d="M15 7h3a4 4 0 0 1 0 8h-3M9 8v8M6.5 10h4a1.5 1.5 0 0 1 0 3h-3"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  download: <><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></>,
  repeat: <><path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/></>,
  folder: <><path d="M3 6h7l2 2h9v11H3V6Z"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{paths[name]}</svg>;
}

function IconButton({ icon, onClick, label, className = "" }: { icon: IconName; onClick?: () => void; label: string; className?: string }) {
  return <button className={`icon-button ${className}`} onClick={onClick} aria-label={label}><Icon name={icon} /></button>;
}

function Header({ title, subtitle, back, action }: { title: string; subtitle?: string; back?: () => void; action?: ReactNode }) {
  return <header className="page-header">
    <div className="header-side">{back && <IconButton icon="back" onClick={back} label="Go back" />}</div>
    <div className="header-copy"><div className="header-title">{title}</div>{subtitle && <div className="header-subtitle">{subtitle}</div>}</div>
    <div className="header-side end">{action}</div>
  </header>;
}

const navItems: { id: View; label: string; icon: IconName }[] = [
  { id: "home", label: "Home", icon: "home" }, { id: "activity", label: "Activity", icon: "activity" },
  { id: "analytics", label: "Insights", icon: "chart" }, { id: "budget", label: "Budget", icon: "wallet" },
  { id: "settings", label: "Settings", icon: "settings" },
];

function BottomNav({ view, go }: { view: View; go: (v: View) => void }) {
  return <nav className="bottom-nav">{navItems.map((item) =>
    <button key={item.id} className={view === item.id ? "nav-item active" : "nav-item"} onClick={() => go(item.id)}>
      <Icon name={item.icon} size={21}/><span>{item.label}</span>
    </button>
  )}</nav>;
}

const transactions: Transaction[] = [
  { icon: "food" as IconName, name: "Nasi Kandar Pelita", category: "Food & Beverage", amount: "- RM 18.50", time: "12:42 PM", kind: "expense" },
  { icon: "arrowDown" as IconName, name: "Salary", category: "Work / Business", amount: "+ RM 4,850.00", time: "9:00 AM", kind: "income" },
  { icon: "fuel" as IconName, name: "Petronas", category: "Motorcycle / Car Fuel", amount: "- RM 65.00", time: "Yesterday", kind: "expense" },
  { icon: "cart" as IconName, name: "Jaya Grocer", category: "Groceries", amount: "- RM 124.80", time: "Yesterday", kind: "expense" },
];

function TransactionRow({ item, onClick, receipt }: { item: typeof transactions[number]; onClick?: () => void; receipt?: boolean }) {
  return <button className="transaction-row" onClick={onClick}>
    <span className={`transaction-icon ${item.kind}`}><Icon name={item.icon} size={19}/></span>
    <span className="transaction-copy"><strong>{item.name}</strong><small>{item.category} · {item.time}</small></span>
    {receipt && <span className="receipt-mini"><Icon name="receipt" size={13}/></span>}
    <span className={`transaction-amount ${item.kind}`}>{item.amount}</span>
  </button>;
}

function Home({ go, transactions, onSelectTransaction }: { go: (v: View, mode?: "income" | "expense") => void; transactions: Transaction[]; onSelectTransaction: (transaction: Transaction) => void }) {
  const income = transactions.filter(t => t.kind === "income").reduce((total, t) => total + Number(t.amount.replace(/[^\d.]/g, "")), 0);
  const expenses = transactions.filter(t => t.kind === "expense").reduce((total, t) => total + Number(t.amount.replace(/[^\d.]/g, "")), 0);
  const balance = income - expenses;
  return <><main className="screen home-screen">
    <div className="topbar"><div><div className="eyebrow">Good morning,</div><h1>Amir</h1></div><IconButton icon="bell" label="Notifications" /></div>
    <div className="month-pill"><Icon name="calendar" size={16}/><span>May 2025</span><Icon name="chevron" size={15}/></div>
    <section className="balance-card">
      <div className="balance-label">Total balance <span>•••</span></div>
      <div className="balance-value">RM {balance.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      <div className="balance-change"><Icon name="arrowUp" size={14}/> 12.4% from last month</div>
      <div className="balance-stats">
        <div><span className="stat-icon income"><Icon name="arrowDown" size={17}/></span><span><small>Income</small><strong>RM {income.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></span></div>
        <div><span className="stat-icon expense"><Icon name="arrowUp" size={17}/></span><span><small>Expenses</small><strong>RM {expenses.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></span></div>
      </div>
    </section>
    <div className="quick-grid">
      <button onClick={() => go("add", "income")}><span className="quick-icon income"><Icon name="arrowDown"/></span><span>Add income</span></button>
      <button onClick={() => go("add", "expense")}><span className="quick-icon expense"><Icon name="arrowUp"/></span><span>Add expense</span></button>
      <button onClick={() => go("scanner")}><span className="quick-icon scan"><Icon name="scan"/></span><span>Scan receipt</span></button>
    </div>
    <section className="card budget-preview" onClick={() => go("budget")}>
      <div className="section-head"><div><small>MONTHLY BUDGET</small><strong>RM 2,186 <em>of RM 3,500</em></strong></div><span>62%</span></div>
      <div className="progress"><i style={{ width: "62%" }}/></div>
      <div className="budget-foot"><span>RM 1,314 remaining</span><span>12 days left</span></div>
    </section>
    <section className="card chart-card" onClick={() => go("analytics")}>
      <div className="section-head"><div><strong>Cash flow</strong><small>Income vs expense</small></div><button className="text-button">View report</button></div>
      <div className="mini-chart">
        {[42, 55, 39, 72, 58, 86, 66].map((h, i) => <div className="bar-pair" key={i}><i style={{height: `${h}%`}}/><b style={{height: `${Math.max(25, h - 22)}%`}}/></div>)}
      </div>
      <div className="chart-labels"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
    </section>
    <section className="recent">
      <div className="section-head"><strong>Recent transactions</strong><button className="text-button" onClick={() => go("activity")}>See all</button></div>
      <div className="transaction-list">{transactions.slice(0, 3).map((t) => <TransactionRow key={t.name} item={t} onClick={() => onSelectTransaction(t)}/>)}</div>    </section>
  </main><BottomNav view="home" go={go}/></>;
}

const categories = [
  ["food", "Food & Beverage"], ["fuel", "Motorcycle / Car Fuel"], ["cart", "Groceries"], ["folder", "Needs & Essentials"],
  ["settings", "Services & Maintenance"], ["phone", "Internet & Phone"], ["wallet", "Clothing"], ["activity", "Work / Business"],
  ["chart", "Entertainment"], ["phone", "Gadgets"], ["debt", "Debt Repayment"], ["target", "Health"],
  ["activity", "Transportation"], ["receipt", "Education"], ["wallet", "Savings"], ["user", "Gifts"],
  ["more", "Others"],
] as [IconName, string][];

function AddTransaction({ go, initialMode, onSave }: { go: (v: View) => void; initialMode: "income" | "expense"; onSave: (transaction: Transaction) => void; }) {
  const [mode, setMode] = useState(initialMode);
  const [selected, setSelected] = useState("Food & Beverage");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    const value = Number(amount);

    if (!amount.trim() || !Number.isFinite(value) || value <= 0) {
      window.alert("Please enter a valid amount.");
      return;
    }

    const transaction: Transaction = {
      icon: 
        selected === "Food & Beverage" ? "food" :
        selected === "Motorcycle / Car Fuel" ? "fuel" :
        selected === "Groceries" ? "cart" :
        mode === "income" ? "arrowDown" : "folder",
      name: description.trim() || selected,
      category: mode === "income" ? "Work / Business" : selected,
      amount: `${mode === "income" ? "+" : "-"} RM ${value.toFixed(2)}`,
      time: "Just now",
      kind: mode,
    };
    onSave(transaction);
    go("home");
  };

  return <main className="screen">
    <Header title="Add transaction" back={() => go("home")}/>
    <div className="content">
      <div className="segment"><button className={mode === "expense" ? "active" : ""} onClick={() => setMode("expense")}>Expense</button><button className={mode === "income" ? "active" : ""} onClick={() => setMode("income")}>Income</button></div>
      <div className="amount-entry"><small>AMOUNT</small><div><span>RM</span><input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" aria-label="Amount"/></div><p>Available balance RM 8,432.70</p></div>
      <section><div className="section-head"><strong>Category</strong><button className="text-button">+ Custom</button></div>
        <div className="category-grid">{categories.map(([icon, label]) => <button key={label} className={selected === label ? "category selected" : "category"} onClick={() => setSelected(label)}><span><Icon name={icon}/></span><small>{label}</small></button>)}</div>
      </section>
      <div className="form-stack">
        <label><span>Date</span><div className="field"><Icon name="calendar"/><span>15 May 2025</span><Icon name="chevron" size={16}/></div></label>
        <label><span>Description</span><div className="field"><Icon name="edit"/><input placeholder="What was this for?" value={description} onChange={(e) => setDescription(e.target.value)} /></div></label>
        <label><span>Payment method</span><div className="field"><Icon name="card"/><span>Maybank Visa •••• 4821</span><Icon name="chevron" size={16}/></div></label>
        <button className="receipt-upload"><Icon name="receipt"/><span><strong>Attach receipt</strong><small>Optional · JPG, PNG or PDF</small></span><Icon name="plus"/></button>
      </div>
    </div>
    <div className="sticky-action"><button className="primary-button" onClick={handleSave}><Icon name="check"/>Save {mode}</button></div>
  </main>;
}

function Activity({ go, transactions }: { go: (v: View) => void; transactions: Transaction[] }) {
  const income = transactions.filter((t) => t.kind === "income").reduce((total, t) => total + Number(t.amount.replace(/[^\d.]/g, "")), 0);
  const expenses = transactions.filter((t) => t.kind === "expense").reduce((total, t) => total + Number(t.amount.replace(/[^\d.]/g, "")), 0);
  const net = income - expenses;
  return <><main className="screen">
    <Header title="Activity" subtitle="Your transaction history" action={<IconButton icon="more" label="More options"/>}/>
    <div className="content activity-content">
      <div className="search"><Icon name="search"/><input placeholder="Search transactions"/><IconButton icon="filter" label="Filter transactions"/></div>
      <div className="filter-row"><button>May 2025 <Icon name="chevron" size={14}/></button><button>All categories <Icon name="chevron" size={14}/></button></div>
      <div className="summary-strip"><div><small>Income</small><strong className="green">RM {income.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div><div><small>Expenses</small><strong className="coral">RM {expenses.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div><div><small>Net</small><strong>RM {net.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div></div>
      <div className="date-label"><strong>All Transactions</strong><span>{transactions.length} records</span></div>
      <div className="transaction-list card-list">{transactions.map((t, i) => (<TransactionRow key={`${t.name}-${i}`} item={t} onClick={() => go("details")}/>))}</div>
    </div>
  </main><BottomNav view="activity" go={go}/></>;
}

function Scanner({ go }: { go: (v: View) => void }) {
  const [error, setError] = useState(false);
  return <main className="scanner-screen">
    <div className="scanner-top"><IconButton icon="close" label="Close scanner" onClick={() => go("home")}/><div><strong>Scan receipt</strong><small>Place receipt within frame</small></div><IconButton icon="image" label="Open gallery" onClick={() => go("processing")}/></div>
    <div className="camera-view">
      <div className="camera-glow"/>
      <div className="receipt-paper"><div className="receipt-brand">KEDAI SERBANEKA</div><i/><i/><i className="short"/><i/><div className="receipt-total">TOTAL &nbsp; RM 46.80</div><i/><i className="short"/></div>
      <div className="scan-frame"><span/><span/><span/><span/></div>
      <div className="scan-hint">{error ? "We couldn't read that receipt" : "Hold steady and avoid glare"}</div>
      {error && <div className="scan-error"><Icon name="close"/><div><strong>Receipt not detected</strong><small>Try better lighting or upload a clear photo.</small></div><button onClick={() => setError(false)}>Try again</button></div>}
    </div>
    <div className="scanner-controls"><button className="gallery-button" onClick={() => go("processing")}><Icon name="image"/><small>Gallery</small></button><button className="capture-button" onClick={() => go("processing")}><span><Icon name="camera" size={28}/></span></button><button className="gallery-button" onClick={() => setError(true)}><Icon name="repeat"/><small>Retake</small></button></div>
  </main>;
}

function Processing({ go }: { go: (v: View) => void }) {
  useEffect(() => { const timer = window.setTimeout(() => go("review"), 1800); return () => window.clearTimeout(timer); }, [go]);
  return <main className="processing-screen">
    <div className="processing-receipt"><div className="skeleton wide"/><div className="skeleton"/><div className="skeleton short"/><div className="scan-line"/><div className="skeleton wide"/><div className="skeleton"/><div className="skeleton short"/></div>
    <div className="processing-spinner"><span/><span/><span/></div>
    <h2>Reading your receipt</h2><p>We’re extracting the details for your review.<br/>This should only take a moment.</p>
    <div className="security-note"><Icon name="check" size={15}/> Your receipt stays private</div>
  </main>;
}

function Review({ go }: { go: (v: View) => void }) {
  const [editing, setEditing] = useState(false);
  return <main className="screen review-screen">
    <Header title="Review receipt" subtitle="Check every detail before saving" back={() => go("scanner")} action={<button className="header-text" onClick={() => setEditing(!editing)}>{editing ? "Done" : "Edit"}</button>}/>
    <div className="content">
      <div className="review-banner"><Icon name="receipt"/><div><strong>Receipt scanned</strong><small>Some fields need your attention</small></div><span>2</span></div>
      <div className="receipt-preview"><div className="tiny-receipt">KK<br/><i/><i/><i/><b>RM 46.80</b></div><div><strong>KK Super Mart</strong><small>Receipt image · 1 page</small></div><button>View</button></div>
      <section className="review-card">
        <ReviewField label="MERCHANT NAME" value="KK Super Mart • Bangsar" icon="folder" editing={editing}/>
        <div className="two-col"><ReviewField label="DATE" value="15 May 2025" icon="calendar" editing={editing}/><ReviewField label="TIME" value="8:42 PM" icon="activity" editing={editing}/></div>
        <ReviewField label="TOTAL AMOUNT" value="RM 46.80" icon="wallet" amount editing={editing}/>
        <ReviewField label="CATEGORY" value="Groceries" icon="cart" uncertain editing={editing}/>
        <ReviewField label="PAYMENT METHOD" value="Cash" icon="card" editing={editing}/>
        <ReviewField label="TAX (OPTIONAL)" value="RM 2.65" icon="receipt" uncertain editing={editing}/>
      </section>
      <section className="items-card">
        <div className="section-head"><strong>Detected items</strong><button className="text-button">Edit items</button></div>
        {[["Mineral Water 1.5L","RM 3.20"],["Gardenia Bread","RM 4.30"],["Household essentials","RM 36.65"],["SST 6%","RM 2.65"]].map(([name, amount], i) => <div className="item-row" key={name}><span><small>{i + 1}</small>{name}</span><strong>{amount}</strong></div>)}
        <div className="items-total"><span>Total</span><strong>RM 46.80</strong></div>
      </section>
      <p className="review-note"><Icon name="check" size={15}/> Please confirm scanned details. OCR results may be inaccurate.</p>
    </div>
    <div className="dual-sticky"><button className="secondary-button" onClick={() => go("scanner")}><Icon name="repeat"/>Retake</button><button className="primary-button" onClick={() => go("details")}><Icon name="check"/>Save expense</button></div>
  </main>;
}

function ReviewField({ label, value, icon, uncertain, amount, editing }: { label:string; value:string; icon:IconName; uncertain?:boolean; amount?:boolean; editing:boolean }) {
  return <label className={uncertain ? "review-field uncertain" : "review-field"}><span>{label}{uncertain && <em>Check this</em>}</span><div><Icon name={icon}/><input defaultValue={value} readOnly={!editing} className={amount ? "amount" : ""}/>{uncertain ? <span className="warning">!</span> : <Icon name="chevron" size={16}/>}</div></label>;
}

function Details({ go }: { go: (v: View) => void }) {
  const [deleted, setDeleted] = useState(false);
  if (deleted) return <main className="screen"><Header title="Transaction details" back={() => go("activity")}/><div className="empty-state"><span><Icon name="trash" size={28}/></span><h2>Transaction deleted</h2><p>This prototype has not changed any real data.</p><button className="primary-button" onClick={() => go("activity")}>Back to activity</button></div></main>;
  return <main className="screen details-screen">
    <Header title="Transaction details" back={() => go("activity")} action={<IconButton icon="more" label="More"/>}/>
    <div className="content">
      <div className="detail-hero"><span><Icon name="cart" size={25}/></span><small>EXPENSE</small><h2>− RM 46.80</h2><p>KK Super Mart • Bangsar</p><em>Completed</em></div>
      <section className="detail-card">
        <DetailRow icon="cart" label="Category" value="Groceries"/><DetailRow icon="calendar" label="Date & time" value="15 May 2025 · 8:42 PM"/><DetailRow icon="card" label="Payment" value="Cash"/><DetailRow icon="receipt" label="Receipt" value="Attached" purple/>
      </section>
      <section className="detail-card"><div className="section-head"><strong>Receipt items</strong><span>4 items</span></div><p className="detail-note">Mineral Water, Gardenia Bread, Household essentials and SST</p></section>
      <div className="prototype-note">Prototype transaction · No real payment was made</div>
      <div className="detail-actions"><button className="secondary-button" onClick={() => go("review")}><Icon name="edit"/>Edit</button><button className="danger-button" onClick={() => setDeleted(true)}><Icon name="trash"/>Delete</button></div>
    </div>
  </main>;
}

function DetailRow({icon,label,value,purple}:{icon:IconName;label:string;value:string;purple?:boolean}) {
  return <div className="detail-row"><span><Icon name={icon}/></span><div><small>{label}</small><strong className={purple ? "purple" : ""}>{value}</strong></div><Icon name="chevron" size={16}/></div>;
}

function Analytics({ go }: { go:(v:View)=>void }) {
  const [period, setPeriod] = useState("Monthly");
  return <><main className="screen">
    <Header title="Insights" subtitle="Understand your money"/>
    <div className="content analytics-content">
      <div className="segment compact">{["Weekly","Monthly","Yearly"].map(p=><button className={period===p?"active":""} onClick={()=>setPeriod(p)} key={p}>{p}</button>)}</div>
      <section className="card cashflow-card"><div className="section-head"><div><small>NET CASH FLOW</small><strong className="large">+ RM 3,054</strong></div><span className="positive">+12.4%</span></div><div className="legend"><span><i className="income"/>Income RM 5,240</span><span><i className="expense"/>Expense RM 2,186</span></div><div className="line-chart"><svg viewBox="0 0 320 110" preserveAspectRatio="none"><path className="area" d="M0 90 C45 80 55 30 95 45 S150 85 180 48 S245 10 320 30 L320 110 L0 110Z"/><path className="income-line" d="M0 90 C45 80 55 30 95 45 S150 85 180 48 S245 10 320 30"/><path className="expense-line" d="M0 95 C55 75 75 85 120 70 S190 90 220 62 S275 80 320 55"/></svg></div><div className="chart-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span></div></section>
      <section className="card category-chart"><div className="section-head"><strong>Spending by category</strong><button className="text-button">May</button></div><div className="donut-wrap"><div className="donut"><div><strong>RM 2,186</strong><small>Total spent</small></div></div><div className="category-legend"><span><i className="purple-dot"/>Food & Beverage <b>32%</b></span><span><i className="coral-dot"/>Groceries <b>24%</b></span><span><i className="green-dot"/>Transport <b>18%</b></span><span><i className="yellow-dot"/>Others <b>26%</b></span></div></div></section>
      <section className="card trends"><div className="section-head"><strong>Top categories</strong><button className="text-button">View all</button></div>{[["Food & Beverage","RM 698","32%"],["Groceries","RM 524","24%"],["Transportation","RM 393","18%"]].map(([n,v,p],i)=><div className="trend-row" key={n}><span>{i+1}</span><div><strong>{n}</strong><div className="progress"><i style={{width:p}}/></div></div><b>{v}</b></div>)}</section>
    </div>
  </main><BottomNav view="analytics" go={go}/></>;
}

function Budget({ go, transactions }: { go:(v:View)=>void; transactions: Transaction[] }) {
  const expenses = transactions.filter((t) => t.kind === "expense").reduce((total, t) => total + Number(t.amount.replace(/[^\d.]/g, "")), 0);
  const budgetLimit = 3500;
  const remaining = budgetLimit - expenses;
  const spentPercentage = Math.min((expenses / budgetLimit) * 100, 100);
  return <><main className="screen"><Header title="Budget" subtitle="May 2025" action={<IconButton icon="plus" label="Add budget"/>}/><div className="content">
    <section className="budget-hero"><small>REMAINING THIS MONTH</small><h2>RM {remaining.toLocaleString("en-MY", {minimumFractionDigits:2, maximumFractionDigits: 2 })}</h2><p>of RM {budgetLimit.toLocaleString("en-MY")} monthly limit</p><div className="progress"><i style={{width:`${spentPercentage}%`}}/></div><div><span>RM {expenses.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2})} spent</span><span>12 days left</span></div></section>
    <div className="section-head"><strong>Category budgets</strong><button className="text-button">Edit</button></div>
    <section className="category-budgets">{[["food","Food & Beverage","RM 698 / RM 800","87%","warning"],["cart","Groceries","RM 524 / RM 650","80%",""],["fuel","Fuel","RM 365 / RM 400","91%","danger"],["phone","Internet & Phone","RM 87 / RM 150","58%",""]].map(([icon,n,v,p,state])=><div className="budget-row" key={n}><span className={`transaction-icon ${state}`}><Icon name={icon as IconName}/></span><div><strong>{n}</strong><small>{v}</small><div className={`progress ${state}`}><i style={{width:p}}/></div></div><b>{p}</b></div>)}</section>
    <section className="savings-card"><span><Icon name="target"/></span><div><small>SAVINGS GOAL</small><strong>Emergency Fund</strong><div className="progress"><i style={{width:"68%"}}/></div><p>RM 6,800 of RM 10,000</p></div><Icon name="chevron"/></section>
  </div></main><BottomNav view="budget" go={go}/></>;
}

function Settings({ go }: { go:(v:View)=>void }) {
  const items: [IconName,string,string,View?][] = [["user","Profile","Amir Hakim"],["wallet","Currency","MYR · Malaysian Ringgit"],["folder","Categories","17 categories + custom"],["repeat","Recurring transactions","3 active"],["bell","Notifications","Budget alerts on"],["download","Data export","CSV & PDF"],["receipt","Receipt storage","On this prototype"],["debt","Debt tracker","Owed & lent","debt"],["sheet","Google Sheets","Prototype configuration","sheets"]];
  return <><main className="screen"><Header title="Settings" subtitle="Preferences & connections"/><div className="content settings-content"><div className="profile-card"><div className="avatar">AH</div><div><strong>Amir Hakim</strong><small>amir.hakim@example.com</small></div><button>Edit</button></div><div className="settings-list">{items.map(([icon,n,v,link])=><button key={n} onClick={()=>link&&go(link)}><span><Icon name={icon}/></span><div><strong>{n}</strong><small>{v}</small></div><Icon name="chevron" size={16}/></button>)}</div><p className="app-version">MySpend prototype · Version 1.0</p></div></main><BottomNav view="settings" go={go}/></>;
}

function Debt({go}:{go:(v:View)=>void}) {
  return <main className="screen"><Header title="Debt tracker" subtitle="Money owed & lent" back={()=>go("settings")} action={<IconButton icon="plus" label="Add debt"/>}/><div className="content"><div className="debt-summary"><div><small>YOU OWE</small><strong className="coral">RM 1,250</strong></div><div><small>OWED TO YOU</small><strong className="green">RM 680</strong></div></div><div className="segment compact"><button className="active">Outstanding</button><button>History</button></div><div className="debt-list">{[["Farid","You lent","RM 450","Due 22 May","Pending"],["Motorcycle loan","You owe","RM 1,250","Due 28 May","Due soon"],["Aina","You lent","RM 230","Due 2 Jun","Part paid"]].map(([n,type,amt,due,status])=><div className="debt-card" key={n}><div className="avatar small">{n[0]}</div><div><strong>{n}</strong><small>{type} · {due}</small><span>{status}</span></div><b>{amt}</b></div>)}</div><section className="card repayment"><div className="section-head"><strong>Recent repayments</strong><span>May</span></div><p><Icon name="check"/> Aina repaid <strong>RM 100</strong><small>12 May 2025</small></p></section></div></main>;
}

function Sheets({go}:{go:(v:View)=>void}) {
  const [status,setStatus]=useState<"idle"|"success"|"error">("idle");
  return <main className="screen"><Header title="Google Sheets" subtitle="Prototype sync" back={()=>go("settings")}/><div className="content"><div className="prototype-banner"><Icon name="sheet"/><div><strong>Prototype connection</strong><p>A real Google account and API configuration are required before data can sync.</p></div></div><section className="sheet-card"><div className="sheet-status"><span><Icon name="sheet"/></span><div><strong>MySpend Monthly Tracker</strong><small><i/> Prototype connected</small></div></div><label><span>SELECTED SPREADSHEET</span><div className="field"><Icon name="sheet"/><span>MySpend Finance 2025</span><Icon name="chevron"/></div></label><div className="sync-meta"><span>Last sync</span><strong>Today, 9:42 AM</strong></div><button className="primary-button" onClick={()=>setStatus(status==="idle"?"success":status==="success"?"error":"success")}><Icon name="repeat"/>Sync now</button>{status==="success"&&<div className="sync-message success"><Icon name="check"/><span><strong>Sync complete</strong><small>24 prototype transactions prepared.</small></span></div>}{status==="error"&&<div className="sync-message error"><Icon name="close"/><span><strong>Couldn’t sync</strong><small>This is an expected prototype state.</small></span></div>}</section><section className="card sync-info"><strong>What will be synced</strong><p>Transactions, categories, budgets, and receipt references.</p><small>No data leaves this prototype.</small></section></div></main>;
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactionList, setTransactionList] =
  useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem("mySpendTransactions");
      return saved ? JSON.parse(saved) as Transaction[] : transactions;
    } catch {
      return transactions;
    }
  });
  useEffect(() => {
    localStorage.setItem("mySpendTransactions", JSON.stringify(transactionList));
  }, [transactionList]);

  const saveTransaction = (transaction: Transaction) => {
    setTransactionList((current) => [transaction, ...current]);
  };
  const openDetails = (transaction: Transaction) => { setSelectedTransaction(transaction); setView("details"); };
  const [addMode, setAddMode] = useState<"income" | "expense">("expense");
  const go = (next: View, mode?: "income" | "expense") => { if (mode) setAddMode(mode); setView(next); };
  return <div className="app-shell">
    {view === "home" && <Home go={go} transactions={transactionList} onSelectTransaction={openDetails}/>}
    {view === "add" && <AddTransaction go={go} initialMode={addMode} onSave={saveTransaction}/>}
    {view === "activity" && <Activity go={go} transactions={transactionList}/>}
    {view === "scanner" && <Scanner go={go}/>}
    {view === "processing" && <Processing go={go}/>}
    {view === "review" && <Review go={go}/>}
    {view === "details" && <Details go={go}/>}
    {view === "analytics" && <Analytics go={go}/>}
    {view === "budget" && <Budget go={go} transactions={transactionList}/>}
    {view === "settings" && <Settings go={go}/>}
    {view === "debt" && <Debt go={go}/>}
    {view === "sheets" && <Sheets go={go}/>}
  </div>;
}
