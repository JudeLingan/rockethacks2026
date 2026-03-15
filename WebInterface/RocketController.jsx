import { useState, useEffect, useRef, useCallback } from "react";

// ─── Global Styles ────────────────────────────────────────────────────────────
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  @font-face {
    font-family: '3270NF';
    src: url('https://cdn.jsdelivr.net/gh/ryanoasis/nerd-fonts@master/patched-fonts/3270/Regular/3270NerdFont-Regular.ttf') format('truetype');
    font-weight: 400;
    font-display: swap;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red:        #E8232A;
    --red-dim:    #9B1117;
    --red-glow:   rgba(232,35,42,0.18);
    --red-border: rgba(232,35,42,0.45);
    --black:      #0A0A0A;
    --surface:    #111113;
    --surface2:   #18181B;
    --surface3:   #222227;
    --grey:       #3A3A42;
    --grey-light: #5A5A65;
    --grey-text:  #9090A0;
    --white:      #F0EEE8;
    --white-dim:  rgba(240,238,232,0.62);
    --f: '3270NF', 'Share Tech Mono', monospace;
  }

  body {
    background: var(--black);
    color: var(--white);
    font-family: var(--f);
    min-height: 100vh;
    overflow-x: hidden;
    font-size: 14px;
  }

  body::after {
    content: '';
    position: fixed; inset: 0;
    background: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.045) 2px,rgba(0,0,0,0.045) 4px);
    pointer-events: none;
    z-index: 9999;
  }

  .screen { animation: fadeIn 0.28s ease; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(7px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.35} }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb { background: var(--grey); border-radius: 3px; }

  button, input, a { font-family: var(--f); }
`;

// ─── Shared ───────────────────────────────────────────────────────────────────
function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function StatusBadge({ connected }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ width:8, height:8, borderRadius:"50%", background: connected?"#22C55E":"var(--red)", boxShadow: connected?"0 0 8px #22C55E60":"0 0 8px var(--red-glow)", animation:"pulse 2s infinite" }}/>
      <span style={{ fontSize:11, color:"var(--grey-text)", letterSpacing:"0.14em" }}>{connected?"CONNECTED":"OFFLINE"}</span>
    </div>
  );
}

function TopBar({ page, setPage }) {
  return (
    <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:"rgba(10,10,10,0.94)", backdropFilter:"blur(14px)", borderBottom:"1px solid var(--grey)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", height:54 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={()=>setPage("home")}>
        <img src="Logo.png" alt="RocketHacks logo" style={{ width:36, height:36, objectFit:"contain", imageRendering:"pixelated" }}/>
        <span style={{ fontSize:14, letterSpacing:"0.14em" }}>ROCKETHACKS<span style={{ color:"var(--red)" }}>2026</span></span>
      </div>
      <nav style={{ display:"flex", gap:3 }}>
        {[["home","HOME"],["control","CTRL"],["demo","DEMO"],["about","ABOUT"]].map(([id,label])=>(
          <button key={id} onClick={()=>setPage(id)} style={{ background: page===id?"var(--red-glow)":"transparent", border: page===id?"1px solid var(--red-border)":"1px solid transparent", color: page===id?"var(--red)":"var(--grey-text)", fontSize:11, letterSpacing:"0.12em", padding:"6px 14px", cursor:"pointer", borderRadius:2, transition:"all 0.18s" }}>{label}</button>
        ))}
        <a href="https://github.com/JudeLingan/rockethacks2026/tree/main/ControllerApp" target="_blank" rel="noreferrer" style={{ background:"transparent", border:"1px solid var(--grey)", color:"var(--grey-text)", fontSize:11, letterSpacing:"0.12em", padding:"6px 14px", cursor:"pointer", borderRadius:2, textDecoration:"none", display:"flex", alignItems:"center", gap:6 }}>
          <GithubIcon size={13}/> GITHUB
        </a>
      </nav>
    </header>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({ setPage }) {
  return (
    <div className="screen" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 24px 40px", position:"relative", overflow:"hidden" }}>
      <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.04 }} aria-hidden>
        <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8232A" strokeWidth="0.5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
      <img src="Logo.png" alt="" aria-hidden style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-54%)",width:320,height:320,objectFit:"contain",imageRendering:"pixelated",opacity:0.07,pointerEvents:"none" }}/>
      <div style={{ position:"absolute",top:"30%",left:"50%",transform:"translate(-50%,-50%)",width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,rgba(232,35,42,0.07) 0%,transparent 70%)",pointerEvents:"none" }}/>

      <div style={{ textAlign:"center", maxWidth:720, position:"relative", zIndex:1 }}>
        <div style={{ fontSize:10, color:"var(--red)", letterSpacing:"0.35em", marginBottom:18 }}>ROCKETHACKS 2026 — RASPBERRY PI RC PLATFORM</div>
        <h1 style={{ fontSize:"clamp(48px,10vw,90px)", lineHeight:0.92, letterSpacing:"-0.01em", marginBottom:28 }}>
          MISSION<br/>
          <span style={{ color:"var(--red)", WebkitTextStroke:"2px var(--red)", WebkitTextFillColor:"transparent" }}>CONTROL</span>
        </h1>
        <p style={{ color:"var(--white-dim)", fontSize:13, lineHeight:1.85, maxWidth:460, margin:"0 auto 46px" }}>
          Real-time remote vehicle control over WebSocket, live MJPEG video feed,
          and full keyboard + D-pad interface — all from your browser.
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:12, marginBottom:44 }}>
          {[
            { icon:"◈", label:"CONTROL", desc:"D-pad & keyboard live control", action:()=>setPage("control"), accent:true },
            { icon:"▶", label:"DEMO",    desc:"Gallery, footage & highlights",  action:()=>setPage("demo") },
            { icon:"◎", label:"ABOUT",   desc:"Team, tech & how it works",      action:()=>setPage("about") },
            { icon:"⌥", label:"SOURCE",  desc:"View on GitHub", action:()=>window.open("https://github.com/JudeLingan/rockethacks2026/tree/main/ControllerApp","_blank") },
          ].map(({ icon,label,desc,action,accent })=>(
            <button key={label} onClick={action} style={{ background: accent?"rgba(232,35,42,0.08)":"var(--surface)", border: accent?"1px solid var(--red-border)":"1px solid var(--grey)", borderRadius:3, padding:"20px 16px", cursor:"pointer", textAlign:"left", transition:"all 0.18s", color:"inherit", display:"flex", flexDirection:"column", gap:8 }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--red)"; e.currentTarget.style.background="rgba(232,35,42,0.12)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=accent?"var(--red-border)":"var(--grey)"; e.currentTarget.style.background=accent?"rgba(232,35,42,0.08)":"var(--surface)"; }}
            >
              <span style={{ fontSize:20, color:"var(--red)" }}>{icon}</span>
              <div style={{ fontSize:12, letterSpacing:"0.1em" }}>{label}</div>
              <div style={{ fontSize:11, color:"var(--grey-text)" }}>{desc}</div>
            </button>
          ))}
        </div>

        <div style={{ display:"flex", gap:28, justifyContent:"center", borderTop:"1px solid var(--grey)", paddingTop:28, flexWrap:"wrap" }}>
          {[["PLATFORM","Raspberry Pi 4B"],["CAMERA","USB Webcam MJPEG"],["COMMS","WebSocket / TCP"],["TEAM","RocketHacks 2026"]].map(([k,v])=>(
            <div key={k} style={{ textAlign:"center" }}>
              <div style={{ fontSize:9, color:"var(--red)", letterSpacing:"0.25em" }}>{k}</div>
              <div style={{ fontSize:13, marginTop:5 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONTROL ──────────────────────────────────────────────────────────────────
function ControlScreen() {
  const [wsUrl, setWsUrl]       = useState("ws://raspberrypi.local:8765");
  const [streamUrl, setStreamUrl] = useState("http://raspberrypi.local:8080/stream");
  const [connected, setConnected] = useState(false);
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [log, setLog]           = useState([]);
  const [configOpen, setConfigOpen] = useState(false);
  const wsRef  = useRef(null);
  const logRef = useRef(null);

  const addLog = useCallback((msg,type="info")=>{
    const ts = new Date().toLocaleTimeString("en-US",{hour12:false});
    setLog(prev=>[...prev.slice(-49),{ts,msg,type}]);
  },[]);

  const sendCommand = useCallback((action)=>{
    if (!wsRef.current||wsRef.current.readyState!==WebSocket.OPEN){ addLog(`Cannot send [${action}] — not connected`,"error"); return; }
    wsRef.current.send(JSON.stringify({action,timestamp:Date.now()}));
    addLog(`TX → ${action.toUpperCase()}`,"tx");
  },[addLog]);

  const connect = useCallback(()=>{
    if (wsRef.current) wsRef.current.close();
    addLog(`Connecting to ${wsUrl}...`,"info");
    try {
      const ws = new WebSocket(wsUrl); wsRef.current = ws;
      ws.onopen  = ()=>{ setConnected(true);  addLog("WebSocket connected","ok"); };
      ws.onclose = ()=>{ setConnected(false); addLog("WebSocket closed","warn"); };
      ws.onerror = ()=>addLog("Connection error","error");
      ws.onmessage = e=>addLog(`RX ← ${e.data}`,"rx");
    } catch { addLog("Invalid WebSocket URL","error"); }
  },[wsUrl,addLog]);

  const disconnect = useCallback(()=>{ wsRef.current?.close(); setConnected(false); },[]);

  useEffect(()=>{
    const km={ArrowUp:"forward",ArrowDown:"backward",ArrowLeft:"left",ArrowRight:"right",w:"forward",s:"backward",a:"left",d:"right"," ":"stop"};
    const dn=e=>{ const a=km[e.key]; if(!a)return; e.preventDefault(); if(!activeKeys.has(e.key)){ setActiveKeys(p=>new Set([...p,e.key])); sendCommand(a); } };
    const up=e=>{ const a=km[e.key]; if(!a)return; setActiveKeys(p=>{const n=new Set(p);n.delete(e.key);return n;}); if(a!=="stop")sendCommand("stop"); };
    window.addEventListener("keydown",dn); window.addEventListener("keyup",up);
    return()=>{ window.removeEventListener("keydown",dn); window.removeEventListener("keyup",up); };
  },[sendCommand,activeKeys]);

  useEffect(()=>{ if(logRef.current)logRef.current.scrollTop=logRef.current.scrollHeight; },[log]);

  const isActive=dir=>({forward:["ArrowUp","w"],backward:["ArrowDown","s"],left:["ArrowLeft","a"],right:["ArrowRight","d"]}[dir]||[]).some(k=>activeKeys.has(k));

  const DPadBtn=({dir,icon})=>{
    const active=isActive(dir);
    return(
      <button onMouseDown={()=>sendCommand(dir)} onMouseUp={()=>sendCommand("stop")}
        onTouchStart={e=>{e.preventDefault();sendCommand(dir);}} onTouchEnd={e=>{e.preventDefault();sendCommand("stop");}}
        style={{ width:64,height:64,background:active?"var(--red)":"var(--surface2)",border:`1px solid ${active?"var(--red)":"var(--grey)"}`,borderRadius:3,cursor:"pointer",fontSize:20,color:active?"#fff":"var(--grey-text)",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.07s",transform:active?"scale(0.92)":"scale(1)",userSelect:"none" }}
      >{icon}</button>
    );
  };

  return (
    <div className="screen" style={{ minHeight:"100vh", padding:"68px 16px 32px" }}>
      <div style={{ maxWidth:1200,margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
        <div>
          <h2 style={{ fontSize:20,letterSpacing:"0.06em" }}>CONTROL <span style={{ color:"var(--red)" }}>INTERFACE</span></h2>
          <div style={{ fontSize:10,color:"var(--grey-text)",marginTop:5,letterSpacing:"0.14em" }}>ARROW KEYS / WASD · SPACE = STOP · OR TAP D-PAD</div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <StatusBadge connected={connected}/>
          <button onClick={()=>setConfigOpen(o=>!o)} style={{ background:"var(--surface2)",border:"1px solid var(--grey)",color:"var(--grey-text)",fontSize:11,padding:"6px 12px",cursor:"pointer",borderRadius:2,letterSpacing:"0.1em" }}>⚙ CONFIG</button>
          <button onClick={connected?disconnect:connect} style={{ background:connected?"rgba(232,35,42,0.14)":"rgba(34,197,94,0.1)",border:`1px solid ${connected?"var(--red)":"#22C55E"}`,color:connected?"var(--red)":"#22C55E",fontSize:11,padding:"6px 14px",cursor:"pointer",borderRadius:2,letterSpacing:"0.1em" }}>{connected?"DISCONNECT":"CONNECT"}</button>
        </div>
      </div>

      {configOpen&&(
        <div style={{ maxWidth:1200,margin:"0 auto 16px",background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,padding:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
          {[["WEBSOCKET URL",wsUrl,setWsUrl,"ws://raspberrypi.local:8765"],["MJPEG STREAM URL",streamUrl,setStreamUrl,"http://raspberrypi.local:8080/stream"]].map(([label,val,setter,ph])=>(
            <div key={label}>
              <label style={{ fontSize:9,color:"var(--grey-text)",display:"block",marginBottom:6,letterSpacing:"0.15em" }}>{label}</label>
              <input value={val} onChange={e=>setter(e.target.value)} placeholder={ph} style={{ width:"100%",background:"var(--surface2)",border:"1px solid var(--grey)",color:"var(--white)",fontSize:11,padding:"7px 10px",borderRadius:2,outline:"none" }}/>
            </div>
          ))}
        </div>
      )}

      <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 310px",gap:12,alignItems:"start" }}>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          {/* Video */}
          <div style={{ background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,overflow:"hidden",position:"relative",aspectRatio:"16/9" }}>
            <div style={{ position:"absolute",top:9,left:11,fontSize:10,color:"var(--red)",letterSpacing:"0.18em",zIndex:2,background:"rgba(0,0,0,0.65)",padding:"3px 8px",borderRadius:2 }}>● LIVE</div>
            <div style={{ position:"absolute",top:9,right:11,fontSize:10,color:"var(--grey-text)",letterSpacing:"0.1em",zIndex:2,background:"rgba(0,0,0,0.65)",padding:"3px 8px",borderRadius:2 }}>MJPEG · USB CAM</div>
            {connected ? (
              <img src={streamUrl} alt="Live MJPEG feed" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} onError={e=>e.target.style.display="none"}/>
            ) : (
              <div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,background:"repeating-linear-gradient(45deg,#0d0d0d,#0d0d0d 10px,#111 10px,#111 20px)" }}>
                <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="12" width="30" height="24" rx="3" stroke="var(--grey)" strokeWidth="1.5" fill="none"/>
                  <path d="M34 19l10-6v22l-10-6V19z" stroke="var(--grey)" strokeWidth="1.5" fill="none"/>
                  <line x1="14" y1="24" x2="24" y2="24" stroke="var(--grey)" strokeWidth="1" strokeDasharray="3 3"/>
                </svg>
                <span style={{ fontSize:11,color:"var(--grey-text)",letterSpacing:"0.14em" }}>NO SIGNAL — CONNECT TO VIEW FEED</span>
              </div>
            )}
          </div>

          {/* D-Pad */}
          <div style={{ background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,padding:20 }}>
            <div style={{ fontSize:9,color:"var(--grey-text)",letterSpacing:"0.2em",marginBottom:16,textAlign:"center" }}>D-PAD CONTROLS</div>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
              <DPadBtn dir="forward" icon="▲"/>
              <div style={{ display:"flex",gap:4,alignItems:"center" }}>
                <DPadBtn dir="left" icon="◀"/>
                <button onMouseDown={()=>sendCommand("stop")} style={{ width:64,height:64,background:"var(--surface3)",border:"1px solid var(--grey)",borderRadius:3,cursor:"pointer",fontSize:10,color:"var(--grey-text)",letterSpacing:"0.1em" }}>STOP</button>
                <DPadBtn dir="right" icon="▶"/>
              </div>
              <DPadBtn dir="backward" icon="▼"/>
            </div>
            <div style={{ marginTop:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,paddingTop:12,borderTop:"1px solid var(--grey)" }}>
              {[["▲/W","Forward"],["▼/S","Backward"],["◀/A","Left"],["▶/D","Right"],["SPC","E-Stop"]].map(([k,v])=>(
                <div key={k} style={{ display:"flex",gap:6,alignItems:"center" }}>
                  <span style={{ fontSize:9,background:"var(--surface2)",border:"1px solid var(--grey)",padding:"2px 5px",borderRadius:2,color:"var(--white)",minWidth:38,textAlign:"center" }}>{k}</span>
                  <span style={{ fontSize:10,color:"var(--grey-text)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          {/* Log */}
          <div style={{ background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,overflow:"hidden" }}>
            <div style={{ padding:"8px 13px",borderBottom:"1px solid var(--grey)",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <span style={{ fontSize:9,color:"var(--grey-text)",letterSpacing:"0.18em" }}>SIGNAL LOG</span>
              <button onClick={()=>setLog([])} style={{ background:"none",border:"none",color:"var(--grey-text)",fontSize:9,cursor:"pointer",letterSpacing:"0.1em" }}>CLEAR</button>
            </div>
            <div ref={logRef} style={{ height:260,overflowY:"auto",padding:"5px 0",fontSize:11 }}>
              {log.length===0 ? <div style={{ textAlign:"center",color:"var(--grey-text)",marginTop:34,fontSize:11 }}>No activity yet</div>
              : log.map((e,i)=>(
                <div key={i} style={{ padding:"3px 12px",borderLeft:`2px solid ${e.type==="tx"?"var(--red)":e.type==="rx"||e.type==="ok"?"#22C55E":e.type==="error"?"var(--red)":e.type==="warn"?"#FACC15":"var(--grey)"}`,marginLeft:6,marginBottom:2,color:e.type==="error"?"var(--red)":e.type==="tx"?"#F87171":"var(--white-dim)" }}>
                  <span style={{ color:"var(--grey-text)",marginRight:7 }}>{e.ts}</span>{e.msg}
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry */}
          <div style={{ background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,padding:13 }}>
            <div style={{ fontSize:9,color:"var(--grey-text)",letterSpacing:"0.18em",marginBottom:12 }}>TELEMETRY</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
              {[["STATUS",connected?"ONLINE":"OFFLINE",connected?"var(--red)":"var(--grey-text)"],["STREAM",connected?"ACTIVE":"INACTIVE",connected?"#22C55E":"var(--grey-text)"],["TRANSPORT","WebSocket","var(--white-dim)"],["VIDEO","MJPEG","var(--white-dim)"]].map(([l,v,c])=>(
                <div key={l} style={{ background:"var(--surface2)",borderRadius:2,padding:"8px 10px" }}>
                  <div style={{ fontSize:8,color:"var(--grey-text)",letterSpacing:"0.2em",marginBottom:4 }}>{l}</div>
                  <div style={{ fontSize:12,color:c }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* E-Stop */}
          <button onMouseDown={()=>sendCommand("stop")} style={{ width:"100%",padding:13,background:"rgba(232,35,42,0.1)",border:"1px solid var(--red)",borderRadius:3,cursor:"pointer",fontSize:15,letterSpacing:"0.18em",color:"var(--red)",transition:"all 0.1s" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(232,35,42,0.24)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(232,35,42,0.1)"}
          >⬛ EMERGENCY STOP</button>
        </div>
      </div>
    </div>
  );
}

// ─── DEMO ─────────────────────────────────────────────────────────────────────
const GALLERY = [
  { id:1, label:"RASPBERRY PI 4B — SIDE",  caption:"The brain of the system. 4GB RAM, dual-band WiFi, USB 3.0 for the webcam feed.", src:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Raspberry_Pi_4_Model_B_-_Side.jpg/1280px-Raspberry_Pi_4_Model_B_-_Side.jpg", tag:"HARDWARE" },
  { id:2, label:"PI 4B BOARD — TOP VIEW",  caption:"GPIO header used to interface directly with the RC ESC and steering servo via PWM.", src:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Raspberry_Pi_4_Model_B_01.svg/1280px-Raspberry_Pi_4_Model_B_01.svg.png",    tag:"HARDWARE" },
  { id:3, label:"RC CHASSIS PLATFORM",     caption:"Off-the-shelf RC chassis — motors and steering adapted for Raspberry Pi GPIO control.", src:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Tamiya_TT-02_chassis.jpg/1280px-Tamiya_TT-02_chassis.jpg",               tag:"VEHICLE"  },
  { id:4, label:"USB WEBCAM",              caption:"Logitech-class USB cam streaming MJPEG over HTTP at 720p / 30fps with ~80ms latency.", src:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Logitech_C270_webcam.jpg/1280px-Logitech_C270_webcam.jpg",               tag:"CAMERA"   },
  { id:5, label:"PI PORTS — USB & HDMI",   caption:"USB 3.0 used for the webcam; micro-HDMI for initial headless setup and debugging.", src:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Raspberry_Pi_2_Model_B_v1.1_top_new_(bg_cut_out).jpg/1280px-Raspberry_Pi_2_Model_B_v1.1_top_new_(bg_cut_out).jpg", tag:"HARDWARE" },
  { id:6, label:"KEYBOARD CONTROL",        caption:"Full WASD + arrow key support — the browser talks directly to the Pi over local WiFi.", src:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Keyboard_noletters.jpg/1280px-Keyboard_noletters.jpg",               tag:"SOFTWARE" },
  { id:7, label:"GPIO PIN LAYOUT",         caption:"PWM output pins on the GPIO header drive the ESC (throttle) and servo (steering).", src:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Raspberry_Pi_GPIO_Layout_Model_B_Plus.svg/1280px-Raspberry_Pi_GPIO_Layout_Model_B_Plus.svg.png", tag:"HARDWARE" },
  { id:8, label:"WiFi — 802.11ac",         caption:"Dual-band WiFi built into the Pi 4B provides ~50m outdoor range for RC operation.", src:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/WiFi_Logo.svg/1280px-WiFi_Logo.svg.png", tag:"NETWORK" },
];

const SPECS = [
  { label:"BOARD",   value:"Raspberry Pi 4B — 4GB" },
  { label:"OS",      value:"RPi OS Lite 64-bit"     },
  { label:"CAMERA",  value:"USB Webcam 720p@30fps"  },
  { label:"VIDEO",   value:"MJPEG ~80ms latency"    },
  { label:"COMMS",   value:"WebSocket → TCP bridge" },
  { label:"CONTROL", value:"Browser D-pad + KB"     },
  { label:"RANGE",   value:"WiFi LAN ~50m typical"  },
  { label:"POWER",   value:"USB-C PD 5V 3A"         },
];

function DemoScreen() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const tags = ["ALL","HARDWARE","VEHICLE","CAMERA","NETWORK","SOFTWARE"];
  const filtered = filter==="ALL" ? GALLERY : GALLERY.filter(g=>g.tag===filter);

  return (
    <div className="screen" style={{ minHeight:"100vh", padding:"54px 0 72px" }}>

      {/* Hero */}
      <div style={{ position:"relative",overflow:"hidden",borderBottom:"1px solid var(--grey)",marginBottom:52,padding:"50px 40px 42px" }}>
        <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.03 }} aria-hidden>
          <defs><pattern id="diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><line x1="0" y1="0" x2="0" y2="40" stroke="#E8232A" strokeWidth="1"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#diag)"/>
        </svg>
        <div style={{ position:"relative",zIndex:1,maxWidth:1100,margin:"0 auto" }}>
          <div style={{ fontSize:9,color:"var(--red)",letterSpacing:"0.35em",marginBottom:14 }}>ROCKETHACKS 2026 — SYSTEM DEMO</div>
          <h1 style={{ fontSize:"clamp(38px,8vw,72px)",lineHeight:0.9,marginBottom:18 }}>
            IN<span style={{ color:"var(--red)" }}>-</span>ACTION<br/>
            <span style={{ WebkitTextStroke:"1.5px var(--grey-light)",WebkitTextFillColor:"transparent" }}>FOOTAGE</span>
          </h1>
          <p style={{ color:"var(--white-dim)",fontSize:13,lineHeight:1.85,maxWidth:500 }}>
            Watch the system in action — live video feed, real-time controls, and on-board footage from the RC vehicle platform.
          </p>
        </div>
      </div>

      <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 24px" }}>

        {/* ── Demo Video ── */}
        <div style={{ marginBottom:64 }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:12 }}>
            <div>
              <div style={{ fontSize:9,color:"var(--red)",letterSpacing:"0.3em",marginBottom:7 }}>01 — DEMO VIDEO</div>
              <h2 style={{ fontSize:20,letterSpacing:"0.05em" }}>Project Walkthrough</h2>
            </div>
            <div style={{ fontSize:10,color:"var(--grey-text)",background:"var(--surface)",border:"1px solid var(--grey)",padding:"5px 12px",borderRadius:2,letterSpacing:"0.1em" }}>↑ REPLACE YOUTUBE ID</div>
          </div>
          <div style={{ position:"relative",width:"100%",aspectRatio:"16/9",background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,overflow:"hidden" }}>
            {[{top:0,left:0,borderTop:"2px solid var(--red)",borderLeft:"2px solid var(--red)"},{top:0,right:0,borderTop:"2px solid var(--red)",borderRight:"2px solid var(--red)"},{bottom:0,left:0,borderBottom:"2px solid var(--red)",borderLeft:"2px solid var(--red)"},{bottom:0,right:0,borderBottom:"2px solid var(--red)",borderRight:"2px solid var(--red)"}].map((s,i)=>(
              <div key={i} style={{ position:"absolute",width:20,height:20,zIndex:2,...s }}/>
            ))}
            <iframe style={{ width:"100%",height:"100%",border:"none",display:"block" }}
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&color=red"
              title="RocketHacks 2026 Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen/>
          </div>
          <p style={{ marginTop:9,fontSize:10,color:"var(--grey-text)",letterSpacing:"0.1em" }}>Replace the YouTube video ID in the iframe src with your actual demo footage</p>
        </div>

        {/* ── Performance stats ── */}
        <div style={{ marginBottom:64,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12 }}>
          {[{num:"~80ms",label:"VIDEO LATENCY",sub:"MJPEG over local WiFi"},{num:"<20ms",label:"CMD LATENCY",sub:"WebSocket round-trip"},{num:"720p",label:"STREAM RES",sub:"USB webcam @ 30fps"},{num:"50m+",label:"RANGE",sub:"802.11ac WiFi"}].map(({ num,label,sub })=>(
            <div key={label} style={{ background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,padding:"24px 20px",borderTop:"2px solid var(--red)" }}>
              <div style={{ fontSize:40,color:"var(--red)",lineHeight:1,marginBottom:8 }}>{num}</div>
              <div style={{ fontSize:11,letterSpacing:"0.12em",marginBottom:5 }}>{label}</div>
              <div style={{ fontSize:11,color:"var(--grey-text)" }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* ── Specs ── */}
        <div style={{ marginBottom:64,background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,padding:"20px 24px" }}>
          <div style={{ fontSize:9,color:"var(--red)",letterSpacing:"0.3em",marginBottom:16 }}>02 — SYSTEM SPECS</div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:0 }}>
            {SPECS.map(({ label,value },i)=>(
              <div key={label} style={{ padding:"11px 0",borderRight:(i+1)%4!==0?"1px solid var(--grey)":"none",paddingLeft:i%4!==0?16:0,paddingRight:16 }}>
                <div style={{ fontSize:8,color:"var(--grey-text)",letterSpacing:"0.2em",marginBottom:5 }}>{label}</div>
                <div style={{ fontSize:12 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Gallery ── */}
        <div>
          <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:12 }}>
            <div>
              <div style={{ fontSize:9,color:"var(--red)",letterSpacing:"0.3em",marginBottom:7 }}>03 — GALLERY</div>
              <h2 style={{ fontSize:20,letterSpacing:"0.05em" }}>Hardware &amp; System Photos</h2>
            </div>
            <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
              {tags.map(t=>(
                <button key={t} onClick={()=>setFilter(t)} style={{ background:filter===t?"var(--red)":"var(--surface2)",border:`1px solid ${filter===t?"var(--red)":"var(--grey)"}`,color:filter===t?"#fff":"var(--grey-text)",fontSize:9,letterSpacing:"0.16em",padding:"5px 10px",cursor:"pointer",borderRadius:2,transition:"all 0.14s" }}>{t}</button>
              ))}
            </div>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:9 }}>
            {filtered.map((item,i)=>(
              <div key={item.id} onClick={()=>setLightboxImg(item)}
                style={{ position:"relative",cursor:"pointer",background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,overflow:"hidden",gridRow:i===0?"span 2":"span 1",transition:"border-color 0.18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--red)"; e.currentTarget.querySelector(".ov").style.opacity="1"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--grey)"; e.currentTarget.querySelector(".ov").style.opacity="0"; }}
              >
                <img src={item.src} alt={item.label}
                  style={{ width:"100%",height:i===0?410:190,objectFit:"cover",display:"block",filter:"grayscale(22%) brightness(0.82)",transition:"filter 0.28s" }}
                  onMouseEnter={e=>e.target.style.filter="grayscale(0%) brightness(1)"}
                  onMouseLeave={e=>e.target.style.filter="grayscale(22%) brightness(0.82)"}
                />
                <div className="ov" style={{ position:"absolute",inset:0,opacity:0,background:"linear-gradient(to top,rgba(10,10,10,0.9) 0%,transparent 55%)",transition:"opacity 0.2s",padding:13,display:"flex",flexDirection:"column",justifyContent:"flex-end" }}>
                  <div style={{ fontSize:8,color:"var(--red)",letterSpacing:"0.2em",marginBottom:4 }}>{item.tag}</div>
                  <div style={{ fontSize:13,marginBottom:4 }}>{item.label}</div>
                  <div style={{ fontSize:11,color:"var(--white-dim)" }}>{item.caption}</div>
                </div>
                <div style={{ position:"absolute",top:8,left:8,background:"rgba(10,10,10,0.72)",border:"1px solid var(--grey)",fontSize:8,color:"var(--grey-text)",letterSpacing:"0.14em",padding:"2px 7px",borderRadius:2 }}>{item.tag}</div>
                <div style={{ position:"absolute",top:8,right:8,background:"rgba(10,10,10,0.72)",border:"1px solid var(--grey)",width:25,height:25,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:2,color:"var(--grey-text)",fontSize:12 }}>⤢</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop:12,fontSize:10,color:"var(--grey-text)",letterSpacing:"0.1em" }}>Click any photo to expand · Replace placeholders with your own project photos</p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg&&(
        <div onClick={()=>setLightboxImg(null)} style={{ position:"fixed",inset:0,zIndex:1000,background:"rgba(5,5,5,0.94)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,cursor:"zoom-out" }}>
          <div onClick={e=>e.stopPropagation()} style={{ maxWidth:840,width:"100%",background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,overflow:"hidden",cursor:"default" }}>
            <img src={lightboxImg.src} alt={lightboxImg.label} style={{ width:"100%",maxHeight:"60vh",objectFit:"cover",display:"block" }}/>
            <div style={{ padding:"16px 20px",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:14 }}>
              <div>
                <div style={{ fontSize:8,color:"var(--red)",letterSpacing:"0.2em",marginBottom:7 }}>{lightboxImg.tag}</div>
                <div style={{ fontSize:17,marginBottom:7 }}>{lightboxImg.label}</div>
                <div style={{ fontSize:12,color:"var(--white-dim)" }}>{lightboxImg.caption}</div>
              </div>
              <button onClick={()=>setLightboxImg(null)} style={{ background:"var(--surface2)",border:"1px solid var(--grey)",color:"var(--grey-text)",width:32,height:32,borderRadius:2,cursor:"pointer",fontSize:15,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  { q:"What WebSocket port does the Pi use?",               a:"By default the backend listens on port 8765. You can change this in the Config panel of the Control Interface before connecting." },
  { q:"What software serves the MJPEG stream?",             a:"We recommend mjpeg-streamer or motion on the Raspberry Pi 4B. It streams the USB webcam over HTTP on port 8080 with minimal latency — typically under 100ms on a local network." },
  { q:"Why WebSocket instead of raw TCP from the browser?", a:"Browsers can't open raw TCP sockets for security reasons. Our backend runs a WebSocket-to-TCP bridge on the Pi, so the frontend sends WebSocket messages which are forwarded directly to the RC control server." },
  { q:"What commands does the frontend send?",              a:'JSON payloads: { "action": "forward" | "backward" | "left" | "right" | "stop", "timestamp": <ms> }. Fully configurable on the Pi side.' },
  { q:"Can I use this on mobile?",                          a:"Yes — the D-pad uses touch events and works on mobile browsers. Keyboard shortcuts are desktop only." },
  { q:"What latency should I expect?",                      a:"Command round-trip over local WiFi: typically under 20ms. MJPEG video feed latency: 80–150ms depending on resolution and congestion." },
];

const TOOLS_USED = [
  { name:"Python 3",          icon:"🐍", role:"Backend language — WebSocket bridge + TCP client running on the Pi" },
  { name:"websockets",        icon:"⚡", role:"Python async library — WebSocket server accepting browser connections" },
  { name:"mjpeg-streamer",    icon:"📷", role:"Streams the USB webcam as MJPEG over HTTP for the browser video feed" },
  { name:"GPIO Zero / RPi.GPIO", icon:"🔌", role:"Python library — PWM signals to ESC (throttle) and servo (steering)" },
  { name:"React + Vite",      icon:"⚛", role:"Frontend framework — fast SPA with zero-reload screen navigation" },
  { name:"Raspberry Pi OS",   icon:"🐧", role:"Lite 64-bit headless OS running on the Pi 4B" },
  { name:"WebSocket API",     icon:"🌐", role:"Browser-native WS client — no dependencies, instant command delivery" },
  { name:"Git / GitHub",      icon:"🐙", role:"Version control and public project hosting for the hackathon repo" },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid var(--grey)" }}>
      <button onClick={()=>setOpen(o=>!o)} style={{ width:"100%",background:"none",border:"none",cursor:"pointer",padding:"14px 0",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left",gap:14,color:"inherit" }}>
        <span style={{ fontSize:12 }}>{q}</span>
        <span style={{ color:"var(--red)",fontSize:18,transition:"transform 0.18s",transform:open?"rotate(45deg)":"none",flexShrink:0 }}>+</span>
      </button>
      {open&&<div style={{ padding:"0 0 14px",color:"var(--white-dim)",fontSize:12,lineHeight:1.8 }}>{a}</div>}
    </div>
  );
}

function AboutScreen() {
  const sections = [
    { tag:"01 — THE PROJECT",  title:"Remote RC Control\nOver TCP + WebSocket",  body:"RocketHacks 2026 is a real-time remote-controlled vehicle platform built on a Raspberry Pi 4B. The system bridges browser-based controls to physical RC hardware through a lightweight TCP server, delivering live video feedback via a USB webcam MJPEG stream — all with sub-100ms latency on a local network." },
    { tag:"02 — HOW IT WORKS", title:"Architecture\nOverview",                   body:"The browser frontend connects via WebSocket to a Python bridge running on the Raspberry Pi. The bridge translates WebSocket messages into TCP signals consumed by the RC controller process, which drives the vehicle's motors and steering. A separate MJPEG stream server broadcasts the USB webcam feed at low latency directly to the browser's video player — no plugins required." },
    { tag:"03 — INSPIRATION",  title:"Applications &\nMotivation",               body:"Inspired by search-and-rescue robotics, remote inspection drones, and FPV racing, this project explores how affordable single-board computers can bridge the gap between consumer RC hardware and professional teleoperation systems. The goal: a platform anyone can build, extend, and deploy." },
  ];

  return (
    <div className="screen" style={{ minHeight:"100vh",padding:"74px 24px 64px",maxWidth:920,margin:"0 auto" }}>

      {/* Hero */}
      <div style={{ marginBottom:52,borderBottom:"1px solid var(--grey)",paddingBottom:42 }}>
        <div style={{ fontSize:9,color:"var(--red)",letterSpacing:"0.35em",marginBottom:16 }}>ROCKETHACKS 2026</div>
        <h1 style={{ fontSize:"clamp(36px,8vw,66px)",lineHeight:0.94,marginBottom:20 }}>
          ABOUT THE<br/><span style={{ color:"var(--red)" }}>PROJECT</span>
        </h1>
        <p style={{ color:"var(--white-dim)",fontSize:13,lineHeight:1.9,maxWidth:560 }}>
          A hackathon-built remote control vehicle platform powered by Raspberry Pi 4B,
          real-time WebSocket telemetry, and live MJPEG video streaming.
        </p>
      </div>

      {/* Info sections */}
      <div style={{ display:"flex",flexDirection:"column",gap:42,marginBottom:56 }}>
        {sections.map(({ tag,title,body })=>(
          <div key={tag} style={{ display:"grid",gridTemplateColumns:"180px 1fr",gap:26,alignItems:"start" }}>
            <div>
              <div style={{ fontSize:9,color:"var(--red)",letterSpacing:"0.2em",marginBottom:9 }}>{tag}</div>
              <h3 style={{ fontSize:18,letterSpacing:"0.04em",lineHeight:1.28,whiteSpace:"pre-line" }}>{title}</h3>
            </div>
            <p style={{ color:"var(--white-dim)",fontSize:12,lineHeight:1.95 }}>{body}</p>
          </div>
        ))}
      </div>

      {/* ── Tools Used ── */}
      <div style={{ marginBottom:56 }}>
        <div style={{ fontSize:9,color:"var(--grey-text)",letterSpacing:"0.22em",marginBottom:20 }}>TOOLS USED</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))",gap:9 }}>
          {TOOLS_USED.map(({ name,icon,role })=>(
            <div key={name}
              style={{ background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,padding:"13px 15px",display:"flex",gap:13,alignItems:"flex-start",transition:"border-color 0.18s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="var(--red)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="var(--grey)"}
            >
              <div style={{ width:36,height:36,borderRadius:2,background:"var(--surface2)",border:"1px solid var(--grey)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{icon}</div>
              <div>
                <div style={{ fontSize:13,marginBottom:5 }}>{name}</div>
                <div style={{ fontSize:11,color:"var(--grey-text)",lineHeight:1.65 }}>{role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div style={{ background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,padding:"24px 26px",marginBottom:56 }}>
        <div style={{ fontSize:9,color:"var(--grey-text)",letterSpacing:"0.22em",marginBottom:18 }}>TECH STACK</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(138px,1fr))",gap:10 }}>
          {[["HARDWARE","Raspberry Pi 4B"],["CAMERA","USB Webcam"],["VIDEO","MJPEG Stream"],["PROTOCOL","WebSocket + TCP"],["FRONTEND","React + Vite"],["LANGUAGE","Python / JS"]].map(([k,v])=>(
            <div key={k} style={{ background:"var(--surface2)",padding:"11px 13px",borderRadius:2 }}>
              <div style={{ fontSize:8,color:"var(--red)",letterSpacing:"0.22em",marginBottom:5 }}>{k}</div>
              <div style={{ fontSize:12 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={{ marginBottom:56 }}>
        <div style={{ fontSize:9,color:"var(--grey-text)",letterSpacing:"0.22em",marginBottom:18 }}>THE TEAM</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:9 }}>
          {[{ name:"Jude Lingan",role:"Lead Developer" },{ name:"Team Member 2",role:"Coming soon" },{ name:"Team Member 3",role:"Coming soon" }].map(({ name,role })=>(
            <div key={name} style={{ background:"var(--surface)",border:"1px solid var(--grey)",borderRadius:3,padding:"16px 14px",display:"flex",alignItems:"center",gap:12 }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:"var(--red-glow)",border:"1px solid var(--red-border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"var(--red)",flexShrink:0 }}>{name.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
              <div>
                <div style={{ fontSize:13,marginBottom:3 }}>{name}</div>
                <div style={{ fontSize:11,color:"var(--grey-text)" }}>{role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <div style={{ fontSize:9,color:"var(--grey-text)",letterSpacing:"0.22em",marginBottom:18 }}>FAQ</div>
        <div style={{ border:"1px solid var(--grey)",borderRadius:3,padding:"0 17px" }}>
          {FAQ_ITEMS.map((item,i)=><FAQItem key={i} {...item}/>)}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  return (
    <>
      <style>{GLOBAL_STYLE}</style>
      <TopBar page={page} setPage={setPage}/>
      {page==="home"    && <HomeScreen setPage={setPage}/>}
      {page==="control" && <ControlScreen/>}
      {page==="demo"    && <DemoScreen/>}
      {page==="about"   && <AboutScreen/>}
    </>
  );
}
