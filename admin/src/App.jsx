import { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  BarChart3,
  Building2,
  ChevronDown,
  FileText,
  Flame,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  Settings,
  ShieldCheck,
  Trash2,
  Users,
  X,
} from "lucide-react";
import {
  login,
  getServices,
  createService,
  deleteService,
  getLeads,
  updateLead,
  getSettings,
  saveSettings,
} from "./api";
function Guard({ children }) {
  return localStorage.getItem("sd_admin_token") ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}
function Shell({ children }) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("sd_admin_token");
    nav("/login");
  };
  return (
    <div className="app">
      <aside className={open ? "sidebar open" : "sidebar"}>
        <div className="admin-brand">
          <span>SD</span>
          <div>
            Fire Services Admin<small>CONTROL CENTER</small>
          </div>
        </div>
        <nav>
          <NavLink to="/">
            <LayoutDashboard size={17} />
            Overview
          </NavLink>
          <NavLink to="/services">
            <ShieldCheck size={17} />
            Services
          </NavLink>
          <NavLink to="/leads">
            <Users size={17} />
            Leads
          </NavLink>
          <NavLink to="/settings">
            <Settings size={17} />
            Settings
          </NavLink>
        </nav>
        <button className="logout" onClick={logout}>
          <LogOut size={16} />
          Sign out
        </button>
      </aside>
      <main className="main">
        <header className="top">
          <button className="menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X /> : <Menu />}
          </button>
          <div>
            <small>SD FIRE SERVICES</small>
            <h1>Control center</h1>
          </div>
          <div className="profile">
            Admin <ChevronDown size={14} />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "admin@sdservices.local",
    password: "ChangeMe@123",
  });
  const [error, setError] = useState("");
  const go = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const r = await login(form);
      localStorage.setItem("sd_admin_token", r.token);
      nav("/");
    } catch (e) {
      setError(e?.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-mark">SD</div>
        <div className="eyebrow">FIRE SAFETY ADMIN</div>
        <h1>Welcome back.</h1>
        <p>Manage services, enquiries and company data.</p>
        <form onSubmit={go}>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          <button>Sign in</button>
          {error && <div className="error">{error}</div>}
        </form>
        <small className="hint">
          Change the seed password before production use.
        </small>
      </div>
    </div>
  );
}
function Overview() {
  const [services, setServices] = useState([]);
  const [leads, setLeads] = useState([]);
  useEffect(() => {
    Promise.all([getServices(), getLeads()]).then(([s, l]) => {
      setServices(s);
      setLeads(l);
    });
  }, []);
  const fresh = useMemo(
    () => leads.filter((l) => l.status === "new").length,
    [leads],
  );
  return (
    <div className="page">
      <div className="welcome">
        <div>
          <span className="eyebrow">OPERATIONS</span>
          <h2>Good day. Here's your safety snapshot.</h2>
        </div>
        <div className="chip">
          <Flame size={15} />
          Live system
        </div>
      </div>
      <div className="kpis">
        <Kpi
          icon={<ShieldCheck />}
          label="Live services"
          value={services.length}
        />
        <Kpi icon={<Users />} label="Total leads" value={leads.length} />
        <Kpi icon={<BarChart3 />} label="New leads" value={fresh} />
        <Kpi icon={<FileText />} label="Admin status" value="Active" />
      </div>
      <div className="panel">
        <div className="panel-head">
          <h3>Latest enquiries</h3>
          <NavLink to="/leads">View all</NavLink>
        </div>
        {leads.slice(0, 6).map((l) => (
          <div className="lead-row" key={l._id}>
            <div>
              <b>{l.name}</b>
              <small>
                {l.company || "Individual"} · {l.service || "General enquiry"} ·{" "}
                <a
                  href={`tel:${l.phone}`}
                  style={{
                    color: "#ef3d25",
                    fontWeight: "700",
                    textDecoration: "none",
                  }}
                >
                  📞 {l.phone}
                </a>
              </small>
            </div>
            <span className={`status ${l.status}`}>{l.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function Kpi({ icon, label, value }) {
  return (
    <div className="kpi">
      <span>{icon}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
function Services() {
  const [services, setServices] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    icon: "ShieldCheck",
    order: 1,
  });
  const load = () => getServices().then(setServices);
  useEffect(() => {
    load();
  }, []);
  const add = async (e) => {
    e.preventDefault();
    await createService(form);
    setShow(false);
    setForm({
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      icon: "ShieldCheck",
      order: services.length + 1,
    });
    load();
  };
  const del = async (id) => {
    if (confirm("Delete this service?")) {
      await deleteService(id);
      load();
    }
  };
  return (
    <div className="page">
      <div className="page-title">
        <div>
          <span className="eyebrow">CONTENT</span>
          <h2>Services</h2>
        </div>
        <button className="primary-btn" onClick={() => setShow(true)}>
          <Plus size={16} />
          Add service
        </button>
      </div>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Slug</th>
              <th>Featured</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id}>
                <td>
                  <b>{s.title}</b>
                  <small>{s.shortDescription}</small>
                </td>
                <td>{s.slug}</td>
                <td>
                  <span className="status contacted">Active</span>
                </td>
                <td>
                  <button
                    className="icon-btn danger"
                    onClick={() => del(s._id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {show && (
        <Modal title="Add service" close={() => setShow(false)}>
          <form className="modal-form" onSubmit={add}>
            <label>
              Title
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </label>
            <label>
              Slug
              <input
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </label>
            <label>
              Short description
              <textarea
                required
                rows="3"
                value={form.shortDescription}
                onChange={(e) =>
                  setForm({ ...form, shortDescription: e.target.value })
                }
              />
            </label>
            <label>
              Icon
              <input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              />
            </label>
            <button className="primary-btn">Create service</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
function Leads() {
  const [leads, setLeads] = useState([]);
  const load = () => getLeads().then(setLeads);
  useEffect(() => {
    load();
    const refresh = () => load();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, []);
  const change = async (id, status) => {
    await updateLead(id, status);
    load();
  };
  return (
    <div className="page">
      <div className="page-title">
        <div>
          <span className="eyebrow">CRM</span>
          <h2>Leads</h2>
        </div>
        <div className="count">{leads.length} enquiries</div>
      </div>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Contact</th>
              <th>Service</th>
              <th>Phone (Click to call)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l._id}>
                <td>
                  <b>{l.name}</b>
                  <small>
                    {l.company || "—"} ·{" "}
                    {l.email ? (
                      <a
                        href={`mailto:${l.email}`}
                        style={{ color: "inherit" }}
                      >
                        {l.email}
                      </a>
                    ) : (
                      "No email"
                    )}
                  </small>
                </td>
                <td>{l.service || "General"}</td>
                <td>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <a
                      href={`tel:${l.phone}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        color: "#ef3d25",
                        fontWeight: "700",
                        textDecoration: "none",
                        padding: "5px 10px",
                        borderRadius: "8px",
                        background: "#fff0ea",
                        fontSize: "12px",
                      }}
                      title="Click to open dial pad"
                    >
                      <Phone size={13} />
                      {l.phone}
                    </a>
                    {l.phone && (
                      <a
                        href={`https://wa.me/${String(l.phone).replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "#16a34a",
                          fontWeight: "600",
                          textDecoration: "none",
                          padding: "5px 9px",
                          borderRadius: "8px",
                          background: "#edf7d8",
                          fontSize: "11px",
                        }}
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle size={13} />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </td>
                <td>
                  <select
                    className="status-select"
                    value={l.status}
                    onChange={(e) => change(l._id, e.target.value)}
                  >
                    <option>new</option>
                    <option>contacted</option>
                    <option>quoted</option>
                    <option>closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function SettingsPage() {
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState("");
  useEffect(() => {
    getSettings().then(setForm);
  }, []);
  const save = async (e) => {
    e.preventDefault();
    await saveSettings(form);
    setMsg("Saved successfully.");
    setTimeout(() => setMsg(""), 2500);
  };
  return (
    <div className="page">
      <div className="page-title">
        <div>
          <span className="eyebrow">BUSINESS DATA</span>
          <h2>Company settings</h2>
        </div>
      </div>
      <div className="settings-card">
        <form className="modal-form" onSubmit={save}>
          <div className="two">
            <label>
              Business name
              <input
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label>
              Tagline
              <input
                value={form.tagline || ""}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              />
            </label>
          </div>
          <label>
            Address
            <textarea
              rows="3"
              value={form.address || ""}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </label>
          <div className="two">
            <label>
              Email
              <input
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label>
              Map query
              <input
                value={form.mapQuery || ""}
                onChange={(e) => setForm({ ...form, mapQuery: e.target.value })}
              />
            </label>
          </div>
          <label>
            Phone numbers (comma separated)
            <input
              value={(form.phones || []).join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  phones: e.target.value
                    .split(",")
                    .map((x) => x.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>
          <label>
            Licence / registration number
            <input
              value={form.licenceNumber || ""}
              onChange={(e) =>
                setForm({ ...form, licenceNumber: e.target.value })
              }
            />
          </label>
          <button className="primary-btn">
            <Settings size={16} />
            Save settings
          </button>
          {msg && <div className="success">{msg}</div>}
        </form>
      </div>
    </div>
  );
}
function Modal({ title, close, children }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-head">
          <h3>{title}</h3>
          <button onClick={close}>
            <X size={17} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <Guard>
            <Shell>
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/services" element={<Services />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </Shell>
          </Guard>
        }
      />
    </Routes>
  );
}
