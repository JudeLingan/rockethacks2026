import { useState, useEffect, useRef, useCallback } from "react";

// ─── Theme & Global Styles ────────────────────────────────────────────────────
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #E8232A;
    --red-dim: #9B1117;
    --red-glow: rgba(232,35,42,0.18);
    --red-border: rgba(232,35,42,0.45);
    --black: #0A0A0A;
    --surface: #111113;
    --surface2: #18181B;
    --surface3: #222227;
    --grey: #3A3A42;
    --grey-light: #5A5A65;
    --grey-text: #9090A0;
    --white: #F0EEE8;
    --white-dim: rgba(240,238,232,0.6);
    --mono: 'Share Tech Mono', monospace;
    --display: 'Barlow Condensed', sans-serif;
    --body: 'Barlow', sans-serif;
  }

  body {
    background: var(--black);
    color: var(--white);
    font-family: var(--body);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Scanline overlay */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.04) 2px,
      rgba(0,0,0,0.04) 4px
    );
    pointer-events: none;
    z-index: 9999;
  }

  .screen { animation: fadeIn 0.3s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb { background: var(--grey); border-radius: 3px; }
`;

// ─── Shared Components ────────────────────────────────────────────────────────
function TopBar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--grey)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", height: 56,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        onClick={() => setPage("home")}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <polygon points="14,2 26,24 2,24" fill="var(--red)" opacity="0.9"/>
          <polygon points="14,7 22,22 6,22" fill="var(--black)"/>
          <circle cx="14" cy="17" r="2.5" fill="var(--red)"/>
        </svg>
        <span style={{
          fontFamily: "var(--display)", fontWeight: 700, fontSize: 18,
          letterSpacing: "0.12em", color: "var(--white)", textTransform: "uppercase",
        }}>RocketHacks<span style={{ color: "var(--red)" }}>2026</span></span>
      </div>

      {/* Desktop nav */}
      <nav style={{ display: "flex", gap: 4 }}>
        {[["home","HOME"],["control","CONTROL"],["demo","DEMO"],["about","ABOUT"]].map(([id, label]) => (
          <button key={id} onClick={() => setPage(id)} style={{
            background: page === id ? "var(--red-glow)" : "transparent",
            border: page === id ? "1px solid var(--red-border)" : "1px solid transparent",
            color: page === id ? "var(--red)" : "var(--grey-text)",
            fontFamily: "var(--display)", fontWeight: 600, fontSize: 13,
            letterSpacing: "0.1em", padding: "6px 16px", cursor: "pointer",
            borderRadius: 2, transition: "all 0.2s",
          }}>{label}</button>
        ))}
        <a href="https://github.com/JudeLingan/rockethacks2026/tree/main/ControllerApp"
          target="_blank" rel="noreferrer" style={{
          background: "transparent", border: "1px solid var(--grey)",
          color: "var(--grey-text)", fontFamily: "var(--display)", fontWeight: 600,
          fontSize: 13, letterSpacing: "0.1em", padding: "6px 16px", cursor: "pointer",
          borderRadius: 2, textDecoration: "none", display: "flex", alignItems: "center",
          gap: 6, transition: "all 0.2s",
        }}>
          <GithubIcon size={14}/> GITHUB
        </a>
      </nav>
    </header>
  );
}

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function StatusBadge({ connected }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: connected ? "#22C55E" : "var(--red)",
        boxShadow: connected ? "0 0 8px #22C55E" : "0 0 8px var(--red)",
        animation: "pulse 2s infinite",
      }}/>
      <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--grey-text)" }}>
        {connected ? "CONNECTED" : "OFFLINE"}
      </span>
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ setPage }) {
  return (
    <div className="screen" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "80px 24px 40px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background grid */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} aria-hidden>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8232A" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>

      {/* Glowing orb */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,35,42,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      {/* Hero */}
      <div style={{ textAlign: "center", maxWidth: 720, position: "relative", zIndex: 1 }}>
        <div style={{
          fontFamily: "var(--mono)", fontSize: 12, color: "var(--red)",
          letterSpacing: "0.3em", marginBottom: 16, textTransform: "uppercase",
        }}>RocketHacks 2026 — Raspberry Pi RC Platform</div>

        <h1 style={{
          fontFamily: "var(--display)", fontWeight: 900, fontSize: "clamp(52px,10vw,96px)",
          lineHeight: 0.95, textTransform: "uppercase", letterSpacing: "-0.02em",
          marginBottom: 24,
        }}>
          MISSION<br/>
          <span style={{ color: "var(--red)", WebkitTextStroke: "2px var(--red)", WebkitTextFillColor: "transparent" }}>
            CONTROL
          </span>
        </h1>

        <p style={{
          color: "var(--white-dim)", fontSize: 17, lineHeight: 1.7,
          maxWidth: 480, margin: "0 auto 48px", fontWeight: 300,
        }}>
          Real-time remote vehicle control over WebSocket, live MJPEG video feed,
          and full keyboard + D-pad interface — all from your browser.
        </p>

        {/* Cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16, marginBottom: 48,
        }}>
          {[
            {
              icon: "◈", label: "CONTROL INTERFACE", desc: "D-pad & keyboard live control",
              action: () => setPage("control"), accent: true,
            },
            {
              icon: "▶", label: "DEMO", desc: "Gallery, footage & highlights",
              action: () => setPage("demo"), accent: false,
            },
            {
              icon: "◎", label: "ABOUT PROJECT", desc: "Team, tech & how it works",
              action: () => setPage("about"), accent: false,
            },
            {
              icon: "⌥", label: "SOURCE CODE", desc: "View on GitHub",
              action: () => window.open("https://github.com/JudeLingan/rockethacks2026/tree/main/ControllerApp","_blank"), accent: false,
            },
          ].map(({ icon, label, desc, action, accent }) => (
            <button key={label} onClick={action} style={{
              background: accent ? "rgba(232,35,42,0.08)" : "var(--surface)",
              border: accent ? "1px solid var(--red-border)" : "1px solid var(--grey)",
              borderRadius: 4, padding: "24px 20px", cursor: "pointer",
              textAlign: "left", transition: "all 0.2s", color: "inherit",
              display: "flex", flexDirection: "column", gap: 8,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--red)";
                e.currentTarget.style.background = "rgba(232,35,42,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = accent ? "var(--red-border)" : "var(--grey)";
                e.currentTarget.style.background = accent ? "rgba(232,35,42,0.08)" : "var(--surface)";
              }}
            >
              <span style={{ fontSize: 22, color: "var(--red)" }}>{icon}</span>
              <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 15, letterSpacing: "0.1em" }}>{label}</div>
              <div style={{ fontSize: 13, color: "var(--grey-text)", fontWeight: 300 }}>{desc}</div>
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div style={{
          display: "flex", gap: 32, justifyContent: "center",
          borderTop: "1px solid var(--grey)", paddingTop: 32,
          flexWrap: "wrap",
        }}>
          {[["PLATFORM","Raspberry Pi 4B"],["CAMERA","USB Webcam MJPEG"],["COMMS","WebSocket / TCP"],["TEAM","RocketHacks 2026"]].map(([k,v]) => (
            <div key={k} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--red)", letterSpacing: "0.2em" }}>{k}</div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 15, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONTROL SCREEN ───────────────────────────────────────────────────────────
function ControlScreen() {
  const [wsUrl, setWsUrl] = useState("ws://raspberrypi.local:8765");
  const [streamUrl, setStreamUrl] = useState("http://raspberrypi.local:8080/stream");
  const [connected, setConnected] = useState(false);
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [log, setLog] = useState([]);
  const [configOpen, setConfigOpen] = useState(false);
  const wsRef = useRef(null);
  const logRef = useRef(null);

  const addLog = useCallback((msg, type = "info") => {
    const ts = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLog(prev => [...prev.slice(-49), { ts, msg, type }]);
  }, []);

  const sendCommand = useCallback((action) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      addLog(`Cannot send [${action}] — not connected`, "error");
      return;
    }
    const payload = JSON.stringify({ action, timestamp: Date.now() });
    wsRef.current.send(payload);
    addLog(`TX → ${action.toUpperCase()}`, "tx");
  }, [addLog]);

  const connect = useCallback(() => {
    if (wsRef.current) wsRef.current.close();
    addLog(`Connecting to ${wsUrl}...`, "info");
    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;
      ws.onopen = () => { setConnected(true); addLog("WebSocket connected", "ok"); };
      ws.onclose = () => { setConnected(false); addLog("WebSocket closed", "warn"); };
      ws.onerror = () => addLog("Connection error", "error");
      ws.onmessage = (e) => addLog(`RX ← ${e.data}`, "rx");
    } catch {
      addLog("Invalid WebSocket URL", "error");
    }
  }, [wsUrl, addLog]);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    setConnected(false);
  }, []);

  // Keyboard handling
  useEffect(() => {
    const keyMap = { ArrowUp:"forward", ArrowDown:"backward", ArrowLeft:"left", ArrowRight:"right", w:"forward", s:"backward", a:"left", d:"right", " ":"stop" };
    const down = (e) => {
      const action = keyMap[e.key];
      if (!action) return;
      e.preventDefault();
      if (!activeKeys.has(e.key)) {
        setActiveKeys(prev => new Set([...prev, e.key]));
        sendCommand(action);
      }
    };
    const up = (e) => {
      const action = keyMap[e.key];
      if (!action) return;
      setActiveKeys(prev => { const n = new Set(prev); n.delete(e.key); return n; });
      if (action !== "stop") sendCommand("stop");
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [sendCommand, activeKeys]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const isActive = (dir) => {
    const map = { forward:["ArrowUp","w"], backward:["ArrowDown","s"], left:["ArrowLeft","a"], right:["ArrowRight","d"] };
    return (map[dir] || []).some(k => activeKeys.has(k));
  };

  const DPadBtn = ({ dir, icon }) => {
    const active = isActive(dir);
    return (
      <button
        onMouseDown={() => sendCommand(dir)}
        onMouseUp={() => sendCommand("stop")}
        onTouchStart={(e) => { e.preventDefault(); sendCommand(dir); }}
        onTouchEnd={(e) => { e.preventDefault(); sendCommand("stop"); }}
        style={{
          width: 64, height: 64, background: active ? "var(--red)" : "var(--surface2)",
          border: `1px solid ${active ? "var(--red)" : "var(--grey)"}`,
          borderRadius: 4, cursor: "pointer", fontSize: 22, color: active ? "#fff" : "var(--grey-text)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.08s", transform: active ? "scale(0.93)" : "scale(1)",
          userSelect: "none", WebkitUserSelect: "none",
        }}
      >{icon}</button>
    );
  };

  return (
    <div className="screen" style={{ minHeight: "100vh", padding: "72px 16px 32px" }}>
      {/* Header row */}
      <div style={{
        maxWidth: 1200, margin: "0 auto 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
      }}>
        <div>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 900, fontSize: 28, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            CONTROL <span style={{ color: "var(--red)" }}>INTERFACE</span>
          </h2>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--grey-text)", marginTop: 4 }}>
            USE ARROW KEYS / WASD · SPACE = STOP · OR TAP D-PAD
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <StatusBadge connected={connected}/>
          <button onClick={() => setConfigOpen(o => !o)} style={{
            background: "var(--surface2)", border: "1px solid var(--grey)",
            color: "var(--grey-text)", fontFamily: "var(--mono)", fontSize: 11,
            padding: "6px 12px", cursor: "pointer", borderRadius: 2, letterSpacing: "0.1em",
          }}>⚙ CONFIG</button>
          <button onClick={connected ? disconnect : connect} style={{
            background: connected ? "rgba(232,35,42,0.15)" : "rgba(34,197,94,0.12)",
            border: `1px solid ${connected ? "var(--red)" : "#22C55E"}`,
            color: connected ? "var(--red)" : "#22C55E",
            fontFamily: "var(--mono)", fontSize: 11, padding: "6px 14px",
            cursor: "pointer", borderRadius: 2, letterSpacing: "0.1em",
          }}>{connected ? "DISCONNECT" : "CONNECT"}</button>
        </div>
      </div>

      {/* Config panel */}
      {configOpen && (
        <div style={{
          maxWidth: 1200, margin: "0 auto 20px",
          background: "var(--surface)", border: "1px solid var(--grey)",
          borderRadius: 4, padding: 20, display: "grid",
          gridTemplateColumns: "1fr 1fr", gap: 16,
        }}>
          <div>
            <label style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--grey-text)", display: "block", marginBottom: 6 }}>WEBSOCKET URL</label>
            <input value={wsUrl} onChange={e => setWsUrl(e.target.value)}
              placeholder="ws://raspberrypi.local:8765"
              style={{
                width: "100%", background: "var(--surface2)", border: "1px solid var(--grey)",
                color: "var(--white)", fontFamily: "var(--mono)", fontSize: 13,
                padding: "8px 12px", borderRadius: 2, outline: "none",
              }}/>
          </div>
          <div>
            <label style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--grey-text)", display: "block", marginBottom: 6 }}>MJPEG STREAM URL</label>
            <input value={streamUrl} onChange={e => setStreamUrl(e.target.value)}
              placeholder="http://raspberrypi.local:8080/stream"
              style={{
                width: "100%", background: "var(--surface2)", border: "1px solid var(--grey)",
                color: "var(--white)", fontFamily: "var(--mono)", fontSize: 13,
                padding: "8px 12px", borderRadius: 2, outline: "none",
              }}/>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 340px",
        gap: 16, alignItems: "start",
      }}>
        {/* Left: video + dpad */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Video feed */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--grey)",
            borderRadius: 4, overflow: "hidden", position: "relative",
            aspectRatio: "16/9",
          }}>
            <div style={{
              position: "absolute", top: 10, left: 12,
              fontFamily: "var(--mono)", fontSize: 10, color: "var(--red)",
              letterSpacing: "0.2em", zIndex: 2, background: "rgba(0,0,0,0.6)",
              padding: "3px 8px", borderRadius: 2,
            }}>● LIVE</div>
            <div style={{
              position: "absolute", top: 10, right: 12,
              fontFamily: "var(--mono)", fontSize: 10, color: "var(--grey-text)",
              letterSpacing: "0.15em", zIndex: 2, background: "rgba(0,0,0,0.6)",
              padding: "3px 8px", borderRadius: 2,
            }}>MJPEG · USB CAM</div>

            {connected ? (
              <img
                src={streamUrl}
                alt="Live MJPEG feed"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            ) : (
              <div style={{
                width: "100%", height: "100%", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 12,
                background: "repeating-linear-gradient(45deg,#0d0d0d,#0d0d0d 10px,#111 10px,#111 20px)",
              }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="12" width="30" height="24" rx="3" stroke="var(--grey)" strokeWidth="1.5" fill="none"/>
                  <path d="M34 19l10-6v22l-10-6V19z" stroke="var(--grey)" strokeWidth="1.5" fill="none"/>
                  <line x1="14" y1="24" x2="24" y2="24" stroke="var(--grey)" strokeWidth="1" strokeDasharray="3 3"/>
                </svg>
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--grey-text)" }}>NO SIGNAL — CONNECT TO VIEW FEED</span>
              </div>
            )}
          </div>

          {/* D-Pad */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--grey)",
            borderRadius: 4, padding: 24,
          }}>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 11, color: "var(--grey-text)",
              letterSpacing: "0.2em", marginBottom: 20, textAlign: "center",
            }}>D-PAD CONTROLS</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <DPadBtn dir="forward" icon="▲"/>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <DPadBtn dir="left" icon="◀"/>
                <button
                  onMouseDown={() => sendCommand("stop")}
                  style={{
                    width: 64, height: 64, background: "var(--surface3)",
                    border: "1px solid var(--grey)", borderRadius: 4, cursor: "pointer",
                    fontFamily: "var(--mono)", fontSize: 10, color: "var(--grey-text)",
                    letterSpacing: "0.1em", lineHeight: 1.3,
                  }}>STOP</button>
                <DPadBtn dir="right" icon="▶"/>
              </div>
              <DPadBtn dir="backward" icon="▼"/>
            </div>

            <div style={{
              marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: 8, paddingTop: 16, borderTop: "1px solid var(--grey)",
            }}>
              {[["▲/W","Forward"],["▼/S","Backward"],["◀/A","Left"],["▶/D","Right"],["SPACE","Emergency Stop"]].map(([k,v]) => (
                <div key={k} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{
                    fontFamily: "var(--mono)", fontSize: 10, background: "var(--surface2)",
                    border: "1px solid var(--grey)", padding: "2px 6px", borderRadius: 2,
                    color: "var(--white)", minWidth: 48, textAlign: "center",
                  }}>{k}</span>
                  <span style={{ fontSize: 12, color: "var(--grey-text)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: log + telemetry */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Signal log */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--grey)",
            borderRadius: 4, overflow: "hidden",
          }}>
            <div style={{
              padding: "10px 16px", borderBottom: "1px solid var(--grey)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--grey-text)", letterSpacing: "0.15em" }}>SIGNAL LOG</span>
              <button onClick={() => setLog([])} style={{
                background: "none", border: "none", color: "var(--grey-text)",
                fontFamily: "var(--mono)", fontSize: 10, cursor: "pointer",
              }}>CLEAR</button>
            </div>
            <div ref={logRef} style={{
              height: 280, overflowY: "auto", padding: "8px 0", fontFamily: "var(--mono)", fontSize: 11,
            }}>
              {log.length === 0 ? (
                <div style={{ textAlign: "center", color: "var(--grey-text)", marginTop: 40, fontSize: 12 }}>
                  No activity yet
                </div>
              ) : log.map((entry, i) => (
                <div key={i} style={{
                  padding: "3px 16px", borderLeft: `2px solid ${
                    entry.type === "tx" ? "var(--red)" :
                    entry.type === "rx" ? "#22C55E" :
                    entry.type === "ok" ? "#22C55E" :
                    entry.type === "error" ? "var(--red)" :
                    entry.type === "warn" ? "#FACC15" : "var(--grey)"}`,
                  marginLeft: 8, marginBottom: 2,
                  color: entry.type === "error" ? "var(--red)" : entry.type === "tx" ? "#F87171" : "var(--white-dim)",
                }}>
                  <span style={{ color: "var(--grey-text)", marginRight: 8 }}>{entry.ts}</span>
                  {entry.msg}
                </div>
              ))}
            </div>
          </div>

          {/* Quick telemetry readout */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--grey)",
            borderRadius: 4, padding: 16,
          }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--grey-text)", letterSpacing: "0.15em", marginBottom: 16 }}>TELEMETRY</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["STATUS", connected ? "ONLINE" : "OFFLINE", connected ? "var(--red)" : "var(--grey-text)"],
                ["STREAM", connected ? "ACTIVE" : "INACTIVE", connected ? "#22C55E" : "var(--grey-text)"],
                ["TRANSPORT", "WebSocket", "var(--white-dim)"],
                ["VIDEO", "MJPEG", "var(--white-dim)"],
              ].map(([label, val, col]) => (
                <div key={label} style={{
                  background: "var(--surface2)", borderRadius: 2, padding: "10px 12px",
                }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--grey-text)", letterSpacing: "0.2em", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: col, fontWeight: 600 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency stop */}
          <button
            onMouseDown={() => sendCommand("stop")}
            style={{
              width: "100%", padding: "16px", background: "rgba(232,35,42,0.12)",
              border: "1px solid var(--red)", borderRadius: 4, cursor: "pointer",
              fontFamily: "var(--display)", fontWeight: 900, fontSize: 20,
              letterSpacing: "0.15em", color: "var(--red)", textTransform: "uppercase",
              transition: "all 0.1s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(232,35,42,0.25)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(232,35,42,0.12)"}
          >⬛ EMERGENCY STOP</button>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

// ─── ABOUT SCREEN ─────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: "What WebSocket port does the Pi use?", a: "By default the backend listens on port 8765. You can change this in the Config panel of the Control Interface before connecting." },
  { q: "What software serves the MJPEG stream?", a: "We recommend mjpeg-streamer or motion on the Raspberry Pi 4B. It streams the USB webcam over HTTP on port 8080 with minimal latency (typically under 100ms on a local network)." },
  { q: "Why WebSocket instead of raw TCP from the browser?", a: "Browsers don't support raw TCP sockets for security reasons. Our backend runs a WebSocket-to-TCP bridge on the Pi, so the frontend sends WebSocket messages which are forwarded directly to the RC control server." },
  { q: "What commands does the frontend send?", a: 'JSON payloads in the form { "action": "forward" | "backward" | "left" | "right" | "stop", "timestamp": <ms> }. These are fully configurable.' },
  { q: "Can I use this on mobile?", a: "Yes — the D-pad controls use touch events and work on mobile browsers. Keyboard shortcuts are only available on desktop." },
  { q: "What's the minimum latency I can expect?", a: "On a local WiFi network, command latency is typically under 20ms. Video feed latency with MJPEG is typically 80–150ms depending on resolution and network congestion." },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--grey)", overflow: "hidden" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center",
        textAlign: "left", gap: 16, color: "inherit",
      }}>
        <span style={{ fontFamily: "var(--body)", fontWeight: 500, fontSize: 15 }}>{q}</span>
        <span style={{
          color: "var(--red)", fontSize: 18, transition: "transform 0.2s",
          transform: open ? "rotate(45deg)" : "none", flexShrink: 0,
        }}>+</span>
      </button>
      {open && (
        <div style={{
          padding: "0 0 16px", color: "var(--white-dim)", fontSize: 14,
          lineHeight: 1.7, fontWeight: 300,
        }}>{a}</div>
      )}
    </div>
  );
}

function AboutScreen() {
  const sections = [
    {
      tag: "01 — THE PROJECT", title: "Remote RC Control\nOver TCP + WebSocket",
      body: "RocketHacks 2026 is a real-time remote-controlled vehicle platform built on a Raspberry Pi 4B. The system bridges browser-based controls to physical RC hardware through a lightweight TCP server, delivering live video feedback via a USB webcam MJPEG stream — all with sub-100ms latency on a local network.",
    },
    {
      tag: "02 — HOW IT WORKS", title: "Architecture\nOverview",
      body: "The browser frontend connects via WebSocket to a Python bridge running on the Raspberry Pi. The bridge translates WebSocket messages into TCP signals consumed by the RC controller process, which drives the vehicle's motors and steering. A separate MJPEG stream server broadcasts the USB webcam feed at low latency directly to the browser's video player — no plugins required.",
    },
    {
      tag: "03 — INSPIRATION", title: "Applications &\nMotivation",
      body: "Inspired by search-and-rescue robotics, remote inspection drones, and FPV racing, this project explores how affordable single-board computers can bridge the gap between consumer RC hardware and professional teleoperation systems. The goal: a platform anyone can build, extend, and deploy.",
    },
  ];

  return (
    <div className="screen" style={{ minHeight: "100vh", padding: "80px 24px 64px", maxWidth: 900, margin: "0 auto" }}>
      {/* Hero */}
      <div style={{ marginBottom: 64, borderBottom: "1px solid var(--grey)", paddingBottom: 48 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--red)", letterSpacing: "0.3em", marginBottom: 16 }}>
          ROCKETHACKS 2026
        </div>
        <h1 style={{
          fontFamily: "var(--display)", fontWeight: 900, fontSize: "clamp(40px,8vw,72px)",
          lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: 24,
        }}>ABOUT THE<br/><span style={{ color: "var(--red)" }}>PROJECT</span></h1>
        <p style={{ color: "var(--white-dim)", fontSize: 16, lineHeight: 1.8, maxWidth: 600, fontWeight: 300 }}>
          A hackathon-built remote control vehicle platform powered by Raspberry Pi 4B, real-time WebSocket telemetry, and live MJPEG video streaming.
        </p>
      </div>

      {/* Info sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 48, marginBottom: 64 }}>
        {sections.map(({ tag, title, body }) => (
          <div key={tag} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 32, alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--red)", letterSpacing: "0.2em", marginBottom: 8 }}>{tag}</div>
              <h3 style={{
                fontFamily: "var(--display)", fontWeight: 700, fontSize: 22,
                textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.2,
                whiteSpace: "pre-line",
              }}>{title}</h3>
            </div>
            <p style={{ color: "var(--white-dim)", fontSize: 15, lineHeight: 1.85, fontWeight: 300 }}>{body}</p>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div style={{
        background: "var(--surface)", border: "1px solid var(--grey)",
        borderRadius: 4, padding: 32, marginBottom: 64,
      }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--grey-text)", letterSpacing: "0.2em", marginBottom: 24 }}>TECH STACK</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
          {[
            ["HARDWARE","Raspberry Pi 4B"],["CAMERA","USB Webcam"],
            ["VIDEO","MJPEG Stream"],["PROTOCOL","WebSocket + TCP"],
            ["FRONTEND","React + Vite"],["LANGUAGE","Python / JS"],
          ].map(([k,v]) => (
            <div key={k} style={{ background: "var(--surface2)", padding: "14px 16px", borderRadius: 2 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--red)", letterSpacing: "0.2em", marginBottom: 6 }}>{k}</div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 15 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--grey-text)", letterSpacing: "0.2em", marginBottom: 24 }}>THE TEAM</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          {[
            { name: "Jude Lingan", role: "Lead Developer" },
            { name: "Team Member 2", role: "Coming soon" },
            { name: "Team Member 3", role: "Coming soon" },
          ].map(({ name, role }) => (
            <div key={name} style={{
              background: "var(--surface)", border: "1px solid var(--grey)",
              borderRadius: 4, padding: "20px 16px", display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", background: "var(--red-glow)",
                border: "1px solid var(--red-border)", display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--display)", fontWeight: 700, fontSize: 14, color: "var(--red)", flexShrink: 0,
              }}>{name.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{name}</div>
                <div style={{ fontSize: 12, color: "var(--grey-text)", marginTop: 2 }}>{role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--grey-text)", letterSpacing: "0.2em", marginBottom: 24 }}>FAQ</div>
        <div style={{ border: "1px solid var(--grey)", borderRadius: 4, padding: "0 20px" }}>
          {FAQ_ITEMS.map((item, i) => <FAQItem key={i} {...item}/>)}
        </div>
      </div>
    </div>
  );
}

// ─── DEMO SCREEN ─────────────────────────────────────────────────────────────
const GALLERY = [
  {
    id: 1, type: "image", label: "HARDWARE SETUP",
    caption: "Raspberry Pi 4B mounted on the RC chassis with USB webcam",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Raspberry_Pi_4_Model_B_-_Side.jpg/1280px-Raspberry_Pi_4_Model_B_-_Side.jpg",
    tag: "HARDWARE",
  },
  {
    id: 2, type: "image", label: "PI 4B BOARD",
    caption: "The Raspberry Pi 4B — the brain of the entire system",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Raspberry_Pi_4_Model_B_01.svg/1280px-Raspberry_Pi_4_Model_B_01.svg.png",
    tag: "HARDWARE",
  },
  {
    id: 3, type: "image", label: "RC VEHICLE",
    caption: "Typical RC platform used for the chassis",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Tamiya_TT-02_chassis.jpg/1280px-Tamiya_TT-02_chassis.jpg",
    tag: "VEHICLE",
  },
  {
    id: 4, type: "image", label: "WEBCAM FEED",
    caption: "Low-latency MJPEG stream from USB webcam at 720p",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Logitech_C270_webcam.jpg/1280px-Logitech_C270_webcam.jpg",
    tag: "CAMERA",
  },
  {
    id: 5, type: "image", label: "WEBSOCKET ARCH",
    caption: "WebSocket bridge running on the Pi, forwarding to TCP server",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Raspberry_Pi_2_Model_B_v1.1_top_new_(bg_cut_out).jpg/1280px-Raspberry_Pi_2_Model_B_v1.1_top_new_(bg_cut_out).jpg",
    tag: "NETWORK",
  },
  {
    id: 6, type: "image", label: "CONTROL INTERFACE",
    caption: "Browser-based D-pad and keyboard control panel",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Keyboard_noletters.jpg/1280px-Keyboard_noletters.jpg",
    tag: "SOFTWARE",
  },
];

const SPECS = [
  { label: "BOARD", value: "Raspberry Pi 4B — 4GB RAM" },
  { label: "OS", value: "Raspberry Pi OS Lite" },
  { label: "CAMERA", value: "USB Webcam — 720p @ 30fps" },
  { label: "VIDEO", value: "MJPEG · ~80ms latency" },
  { label: "COMMS", value: "WebSocket → TCP bridge" },
  { label: "CONTROL", value: "Browser D-pad + Keyboard" },
  { label: "RANGE", value: "WiFi LAN · ~50m typical" },
  { label: "POWER", value: "USB-C PD · 5V 3A" },
];

function DemoScreen() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const tags = ["ALL", "HARDWARE", "VEHICLE", "CAMERA", "NETWORK", "SOFTWARE"];
  const filtered = filter === "ALL" ? GALLERY : GALLERY.filter(g => g.tag === filter);

  return (
    <div className="screen" style={{ minHeight: "100vh", padding: "72px 0 64px" }}>

      {/* — Hero banner — */}
      <div style={{
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid var(--grey)", marginBottom: 56,
        padding: "56px 40px 48px",
      }}>
        {/* Subtle diagonal lines bg */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.035 }} aria-hidden>
          <defs>
            <pattern id="diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#E8232A" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag)"/>
        </svg>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--red)", letterSpacing: "0.3em", marginBottom: 14 }}>
            ROCKETHACKS 2026 — SYSTEM DEMO
          </div>
          <h1 style={{
            fontFamily: "var(--display)", fontWeight: 900,
            fontSize: "clamp(44px,8vw,80px)", lineHeight: 0.95,
            textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: 20,
          }}>
            IN<span style={{ color: "var(--red)" }}>-</span>ACTION<br/>
            <span style={{
              WebkitTextStroke: "1.5px var(--grey-light)",
              WebkitTextFillColor: "transparent",
            }}>FOOTAGE</span>
          </h1>
          <p style={{
            color: "var(--white-dim)", fontSize: 16, lineHeight: 1.75,
            maxWidth: 520, fontWeight: 300,
          }}>
            Watch the system in action — live video feed, real-time controls,
            and on-board footage from the RC vehicle platform.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* — Embedded Demo Video — */}
        <div style={{ marginBottom: 72 }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 20, flexWrap: "wrap", gap: 12,
          }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--red)", letterSpacing: "0.25em", marginBottom: 6 }}>
                01 — DEMO VIDEO
              </div>
              <h2 style={{
                fontFamily: "var(--display)", fontWeight: 700, fontSize: 26,
                textTransform: "uppercase", letterSpacing: "0.05em",
              }}>Project Walkthrough</h2>
            </div>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 11, color: "var(--grey-text)",
              background: "var(--surface)", border: "1px solid var(--grey)",
              padding: "6px 14px", borderRadius: 2,
            }}>REPLACE URL WITH YOUR VIDEO</div>
          </div>

          {/* Video embed — YouTube placeholder; swap ?v= ID for your video */}
          <div style={{
            position: "relative", width: "100%", aspectRatio: "16/9",
            background: "var(--surface)", border: "1px solid var(--grey)",
            borderRadius: 4, overflow: "hidden",
          }}>
            {/* Red corner accents */}
            {[
              { top: 0, left: 0, borderTop: "2px solid var(--red)", borderLeft: "2px solid var(--red)" },
              { top: 0, right: 0, borderTop: "2px solid var(--red)", borderRight: "2px solid var(--red)" },
              { bottom: 0, left: 0, borderBottom: "2px solid var(--red)", borderLeft: "2px solid var(--red)" },
              { bottom: 0, right: 0, borderBottom: "2px solid var(--red)", borderRight: "2px solid var(--red)" },
            ].map((s, i) => (
              <div key={i} style={{
                position: "absolute", width: 18, height: 18, zIndex: 2, ...s
              }}/>
            ))}
            <iframe
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&color=red"
              title="RocketHacks 2026 Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p style={{
            marginTop: 12, fontFamily: "var(--mono)", fontSize: 11, color: "var(--grey-text)",
            letterSpacing: "0.08em",
          }}>
            ↑ Replace the YouTube video ID in the iframe src with your actual demo footage
          </p>
        </div>

        {/* — Spec strip — */}
        <div style={{
          marginBottom: 72, background: "var(--surface)",
          border: "1px solid var(--grey)", borderRadius: 4,
          padding: "24px 28px",
        }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--red)", letterSpacing: "0.25em", marginBottom: 20 }}>
            02 — SYSTEM SPECS
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 0,
          }}>
            {SPECS.map(({ label, value }, i) => (
              <div key={label} style={{
                padding: "14px 0",
                borderRight: (i + 1) % 4 !== 0 ? "1px solid var(--grey)" : "none",
                paddingLeft: i % 4 !== 0 ? 20 : 0,
                paddingRight: 20,
              }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--grey-text)", letterSpacing: "0.2em", marginBottom: 5 }}>
                  {label}
                </div>
                <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 14, color: "var(--white)" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* — Photo Gallery — */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            marginBottom: 20, flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--red)", letterSpacing: "0.25em", marginBottom: 6 }}>
                03 — GALLERY
              </div>
              <h2 style={{
                fontFamily: "var(--display)", fontWeight: 700, fontSize: 26,
                textTransform: "uppercase", letterSpacing: "0.05em",
              }}>Hardware &amp; System Photos</h2>
            </div>
            {/* Filter pills */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {tags.map(t => (
                <button key={t} onClick={() => setFilter(t)} style={{
                  background: filter === t ? "var(--red)" : "var(--surface2)",
                  border: `1px solid ${filter === t ? "var(--red)" : "var(--grey)"}`,
                  color: filter === t ? "#fff" : "var(--grey-text)",
                  fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.15em",
                  padding: "5px 12px", cursor: "pointer", borderRadius: 2,
                  transition: "all 0.15s",
                }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Masonry-style grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 12,
          }}>
            {filtered.map((item, i) => (
              <div
                key={item.id}
                onClick={() => setLightboxImg(item)}
                style={{
                  position: "relative", cursor: "pointer",
                  background: "var(--surface)", border: "1px solid var(--grey)",
                  borderRadius: 4, overflow: "hidden",
                  gridRow: i === 0 ? "span 2" : "span 1",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--red)";
                  e.currentTarget.querySelector(".overlay").style.opacity = "1";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--grey)";
                  e.currentTarget.querySelector(".overlay").style.opacity = "0";
                }}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  style={{
                    width: "100%", height: i === 0 ? 420 : 200,
                    objectFit: "cover", display: "block",
                    filter: "grayscale(30%) brightness(0.85)",
                    transition: "filter 0.3s",
                  }}
                  onMouseEnter={e => e.target.style.filter = "grayscale(0%) brightness(1)"}
                  onMouseLeave={e => e.target.style.filter = "grayscale(30%) brightness(0.85)"}
                />
                {/* Overlay */}
                <div className="overlay" style={{
                  position: "absolute", inset: 0, opacity: 0,
                  background: "linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 60%)",
                  transition: "opacity 0.25s", padding: "16px",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--red)", letterSpacing: "0.2em", marginBottom: 4 }}>
                    {item.tag}
                  </div>
                  <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--white-dim)", fontWeight: 300 }}>
                    {item.caption}
                  </div>
                </div>
                {/* Tag badge */}
                <div style={{
                  position: "absolute", top: 10, left: 10,
                  background: "rgba(10,10,10,0.75)", border: "1px solid var(--grey)",
                  fontFamily: "var(--mono)", fontSize: 9, color: "var(--grey-text)",
                  letterSpacing: "0.15em", padding: "3px 8px", borderRadius: 2,
                }}>{item.tag}</div>
                {/* Expand icon */}
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  background: "rgba(10,10,10,0.75)", border: "1px solid var(--grey)",
                  width: 28, height: 28, display: "flex", alignItems: "center",
                  justifyContent: "center", borderRadius: 2, color: "var(--grey-text)", fontSize: 13,
                }}>⤢</div>
              </div>
            ))}
          </div>
          <p style={{
            marginTop: 16, fontFamily: "var(--mono)", fontSize: 11, color: "var(--grey-text)",
            letterSpacing: "0.08em",
          }}>
            ↑ Click any photo to expand · Replace placeholder images with your own project photos
          </p>
        </div>

        {/* — Build highlights — */}
        <div style={{
          marginTop: 72, paddingTop: 48, borderTop: "1px solid var(--grey)",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16,
        }}>
          {[
            { num: "~80ms", label: "VIDEO LATENCY", sub: "MJPEG over local WiFi" },
            { num: "<20ms", label: "COMMAND LATENCY", sub: "WebSocket round-trip" },
            { num: "720p", label: "STREAM RESOLUTION", sub: "USB webcam @ 30fps" },
            { num: "50m+", label: "OPERATING RANGE", sub: "802.11n WiFi" },
          ].map(({ num, label, sub }) => (
            <div key={label} style={{
              background: "var(--surface)", border: "1px solid var(--grey)",
              borderRadius: 4, padding: "28px 24px",
              borderTop: "2px solid var(--red)",
            }}>
              <div style={{
                fontFamily: "var(--display)", fontWeight: 900,
                fontSize: 44, color: "var(--red)", lineHeight: 1, marginBottom: 8,
              }}>{num}</div>
              <div style={{
                fontFamily: "var(--display)", fontWeight: 700, fontSize: 14,
                letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6,
              }}>{label}</div>
              <div style={{ fontSize: 12, color: "var(--grey-text)", fontWeight: 300 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* — Lightbox — */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(5,5,5,0.93)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24, cursor: "zoom-out",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 880, width: "100%",
              background: "var(--surface)", border: "1px solid var(--grey)",
              borderRadius: 4, overflow: "hidden", cursor: "default",
            }}
          >
            <img
              src={lightboxImg.src}
              alt={lightboxImg.label}
              style={{ width: "100%", maxHeight: "65vh", objectFit: "cover", display: "block" }}
            />
            <div style={{
              padding: "20px 24px", display: "flex",
              alignItems: "flex-start", justifyContent: "space-between", gap: 16,
            }}>
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--red)", letterSpacing: "0.2em", marginBottom: 6 }}>
                  {lightboxImg.tag}
                </div>
                <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 22, marginBottom: 6 }}>
                  {lightboxImg.label}
                </div>
                <div style={{ fontSize: 14, color: "var(--white-dim)", fontWeight: 300 }}>
                  {lightboxImg.caption}
                </div>
              </div>
              <button onClick={() => setLightboxImg(null)} style={{
                background: "var(--surface2)", border: "1px solid var(--grey)",
                color: "var(--grey-text)", width: 36, height: 36, borderRadius: 2,
                cursor: "pointer", fontSize: 18, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <style>{GLOBAL_STYLE}</style>
      <TopBar page={page} setPage={setPage}/>
      {page === "home" && <HomeScreen setPage={setPage}/>}
      {page === "control" && <ControlScreen/>}
      {page === "demo" && <DemoScreen/>}
      {page === "about" && <AboutScreen/>}
    </>
  );
}
