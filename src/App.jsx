import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity, AudioLines, Bell, Check, ChevronDown, ChevronRight, CircleHelp,
  Clapperboard, Clock3, Download, FileVideo, Film, FolderOpen, Gauge,
  Headphones, Home, Languages, LayoutDashboard, Link2, Menu, Mic2, MoreHorizontal,
  Play, Plus, Search, Scissors, Settings, ShieldCheck, Sparkles, Subtitles,
  Upload, WandSparkles, Waves, X, Zap, ArrowUpRight, Pause, SlidersHorizontal,
  Trash2, ExternalLink, CheckCircle2, CircleDashed
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'My Projects', icon: FolderOpen },
  { label: 'Noise Remover', icon: AudioLines },
  { label: 'AI Shorts Generator', icon: Scissors },
  { label: 'Video Editor', icon: Clapperboard },
  { label: 'Exports', icon: Download },
]
const demoProjects = [
  { title: 'Podcast Episode 04', type: 'Clean Audio', duration: '24:18', date: '2 min ago', status: 'Completed', color: 'from-violet-600/70 via-indigo-500/30 to-slate-900', initials: 'P' },
  { title: 'The Future of AI', type: '12 Short Clips', duration: '48:32', date: 'Yesterday', status: 'Completed', color: 'from-cyan-500/50 via-blue-600/30 to-slate-900', initials: 'AI' },
  { title: 'Creator Interview', type: 'Full AI Processing', duration: '1:02:16', date: 'Oct 28', status: 'Processing', color: 'from-orange-500/40 via-rose-600/20 to-slate-900', initials: 'CI' },
]
const clips = [
  { title: 'The main point everyone misses', time: '00:42 – 01:18', duration: '36 sec', score: '98', color: 'from-violet-600/60 to-blue-500/20' },
  { title: 'A surprising lesson about success', time: '04:15 – 05:02', duration: '47 sec', score: '94', color: 'from-emerald-500/40 to-cyan-500/20' },
  { title: 'The moment things changed', time: '12:06 – 12:49', duration: '43 sec', score: '91', color: 'from-orange-500/40 to-pink-500/20' },
]

function cn(...classes) { return classes.filter(Boolean).join(' ') }

function Button({ children, variant = 'primary', className = '', ...props }) {
  return <button className={cn(variant === 'primary' ? 'btn-primary' : 'btn-secondary', className)} {...props}>{children}</button>
}

function Badge({ children, tone = 'green' }) {
  const tones = {
    green: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    purple: 'border-violet-400/20 bg-violet-400/10 text-violet-200',
    amber: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
    gray: 'border-white/10 bg-white/[0.05] text-slate-400',
  }
  return <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold', tones[tone])}><span className={cn('h-1.5 w-1.5 rounded-full', tone === 'green' ? 'bg-emerald-300' : tone === 'purple' ? 'bg-violet-300' : tone === 'amber' ? 'bg-amber-300' : 'bg-slate-500')} />{children}</span>
}

function SectionHeading({ eyebrow, title, description, action }) {
  return <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div><div className="eyebrow mb-2">{eyebrow}</div><h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>}</div>
    {action}
  </div>
}

function Waveform({ compact = false, active = true }) {
  const bars = Array.from({ length: compact ? 52 : 88 }, (_, i) => {
    const h = 12 + Math.abs(Math.sin(i * 1.73) * Math.cos(i * .31)) * 70 + (i % 7) * 2
    return Math.min(h, 88)
  })
  return <div className={cn('flex items-center justify-between gap-[2px]', compact ? 'h-10' : 'h-20')} aria-label="Decorative audio waveform">
    {bars.map((h, i) => <motion.span key={i} initial={false} animate={active ? { height: [`${h * .6}%`, `${h}%`, `${h * .75}%`] } : { height: `${h * .65}%` }} transition={active ? { duration: 1.15 + (i % 5) * .12, repeat: Infinity, repeatType: 'reverse', delay: i * .012, ease: 'easeInOut' } : { duration: .25 }} className={cn('min-w-[2px] flex-1 rounded-full', i < bars.length * .62 ? 'bg-violet-400' : 'bg-violet-400/25')} />)}
  </div>
}

function VideoThumb({ color = 'from-violet-600/70 to-blue-500/20', label = 'AI VIDEO', className = '' }) {
  return <div className={cn('relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br', color, className)}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,.18),transparent_45%)]" />
    <div className="absolute -bottom-10 left-1/3 h-24 w-24 rounded-full bg-violet-300/20 blur-2xl" />
    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur"><Play size={16} fill="currentColor" /></div>
    <span className="absolute bottom-2 left-2 rounded-md bg-black/45 px-2 py-1 text-[9px] font-bold tracking-widest text-white/80">{label}</span>
  </div>
}

function StatCard({ icon: Icon, label, value, note, tone = 'violet' }) {
  return <motion.div whileHover={{ y: -3 }} transition={{ duration: .2 }} className="surface rounded-2xl p-4 sm:p-5">
    <div className="mb-4 flex items-center justify-between"><div className={cn('flex h-10 w-10 items-center justify-center rounded-xl border', tone === 'mint' ? 'border-emerald-300/15 bg-emerald-300/10 text-emerald-300' : 'border-violet-300/15 bg-violet-300/10 text-violet-200')}><Icon size={18} /></div><ArrowUpRight size={15} className="text-slate-600" /></div>
    <div className="font-display text-2xl font-semibold text-white">{value}</div><div className="mt-1 text-xs text-slate-400">{label}</div><div className="mt-3 text-[10px] text-slate-500">{note}</div>
  </motion.div>
}

function Sidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  return <>
    {mobileOpen && <button aria-label="Close navigation overlay" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/65 lg:hidden" />}
    <aside className={cn('fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col border-r border-white/[0.07] bg-[#0b0f1b] px-4 py-5 transition-transform duration-300 lg:translate-x-0', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
      <div className="mb-9 flex items-center justify-between px-2">
        <button className="flex items-center gap-3" onClick={() => { setPage('Dashboard'); setMobileOpen(false) }}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 text-white shadow-lg shadow-violet-950/50"><AudioLines size={19} /></span>
          <span className="text-left"><span className="block font-display text-sm font-bold text-white">AI Video Studio</span><span className="mt-0.5 block text-[10px] tracking-wide text-slate-500">CREATE WITHOUT LIMITS</span></span>
        </button>
        <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-white/5 lg:hidden"><X size={17}/></button>
      </div>
      <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-600">Workspace</div>
      <nav className="space-y-1">
        {navItems.map(({ label, icon: Icon }) => {
          const active = page === label
          return <button key={label} onClick={() => { setPage(label); setMobileOpen(false) }} className={cn('group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-medium transition', active ? 'bg-violet-500/15 text-violet-200' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-100')}>
            {active && <motion.span layoutId="nav-active" className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-violet-400" />}
            <Icon size={17} className={active ? 'text-violet-300' : 'text-slate-500 group-hover:text-slate-300'} />{label}
            {label === 'AI Shorts Generator' && <span className="ml-auto rounded-md bg-violet-400/15 px-1.5 py-0.5 text-[9px] text-violet-200">AI</span>}
          </button>
        })}
      </nav>
      <div className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-600">Preferences</div>
      <button onClick={() => { setPage('Settings'); setMobileOpen(false) }} className={cn('flex items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-medium transition', page === 'Settings' ? 'bg-violet-500/15 text-violet-200' : 'text-slate-400 hover:bg-white/[0.04] hover:text-white')}><Settings size={17} className="text-slate-500"/>Settings</button>
      <div className="mt-auto">
        <div className="relative mb-4 overflow-hidden rounded-2xl border border-violet-300/15 bg-gradient-to-br from-violet-500/15 via-indigo-500/10 to-transparent p-4">
          <div className="absolute -right-5 -top-6 h-20 w-20 rounded-full bg-violet-500/15 blur-xl" />
          <div className="relative mb-2 flex items-center gap-2 text-violet-200"><Sparkles size={15}/><span className="text-xs font-semibold">Make more with AI</span></div>
          <p className="relative mb-3 text-[11px] leading-5 text-slate-400">Your creative workspace, all in one place.</p>
          <button onClick={() => setPage('AI Shorts Generator')} className="relative flex items-center gap-1 text-[11px] font-semibold text-violet-200 hover:text-white">Explore tools <ChevronRight size={13}/></button>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 text-xs font-bold text-white">AV</div>
          <div className="min-w-0 flex-1"><div className="truncate text-xs font-semibold text-slate-200">Creator workspace</div><div className="mt-1 text-[10px] text-slate-500">Free plan · Demo</div></div>
          <MoreHorizontal size={17} className="text-slate-500"/>
        </div>
      </div>
    </aside>
  </>
}

function Dashboard({ setPage, projects, notify }) {
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
    <div className="relative mb-7 overflow-hidden rounded-3xl border border-violet-300/15 bg-gradient-to-br from-[#1c1740] via-[#15152c] to-[#101522] p-6 sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-12 -top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-[85px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-32 w-56 rounded-full bg-indigo-500/10 blur-[65px]" />
      <div className="relative max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-violet-200"><Sparkles size={13}/> YOUR ALL-IN-ONE CREATIVE STUDIO</div>
        <h1 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[44px]">Make every video <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">work harder.</span></h1>
        <p className="mt-4 max-w-lg text-sm leading-6 text-slate-400 sm:text-[15px]">Clean up your audio. Find the moments that matter. Turn long videos into scroll-stopping shorts — all in one workspace.</p>
        <div className="mt-6 flex flex-wrap gap-3"><Button onClick={() => setPage('AI Shorts Generator')}><Scissors size={16}/> Create AI shorts</Button><Button variant="secondary" onClick={() => setPage('Noise Remover')}><AudioLines size={16}/> Clean audio</Button></div>
      </div>
      <div className="absolute bottom-5 right-7 hidden w-48 opacity-80 md:block lg:right-12 lg:w-64">
        <div className="relative rotate-[-4deg] rounded-2xl border border-white/15 bg-[#090c18]/80 p-3 shadow-2xl shadow-violet-950/50 backdrop-blur">
          <div className="mb-3 flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-400/20 text-violet-200"><Waves size={14}/></div><div><div className="text-[10px] font-semibold text-white">Audio enhancement</div><div className="text-[9px] text-slate-500">Voice clarity optimized</div></div><CheckCircle2 size={15} className="ml-auto text-emerald-300"/></div>
          <Waveform compact active/>
          <div className="mt-2 flex items-center justify-between text-[9px] text-slate-500"><span>Original → Clean</span><span className="text-emerald-300">Improved</span></div>
        </div>
      </div>
    </div>
    <div className="mb-3 flex items-center justify-between"><h2 className="font-display text-base font-semibold text-white">Your workspace</h2><span className="text-xs text-slate-500">Everything you need to create</span></div>
    <div className="mb-7 grid gap-4 md:grid-cols-2">
      <ToolCard icon={AudioLines} title="AI Noise Remover" tag="AUDIO ENHANCEMENT" description="Reduce background noise and make speech sound clearer." points={['Voice-focused cleanup','Adjustable noise reduction']} onClick={() => setPage('Noise Remover')} tone="violet"/>
      <ToolCard icon={Scissors} title="AI Shorts Generator" tag="SMART CLIP FINDER" description="Find key moments in long videos and create shareable clips." points={['AI-selected highlights','Captions in 3 languages']} onClick={() => setPage('AI Shorts Generator')} tone="blue"/>
    </div>
    <div className="mb-3 flex items-center justify-between"><h2 className="font-display text-base font-semibold text-white">Overview</h2><button onClick={() => setPage('My Projects')} className="text-xs font-semibold text-violet-300 hover:text-violet-200">View projects <ChevronRight size={13} className="inline"/></button></div>
    <div className="mb-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
      <StatCard icon={FileVideo} label="Total projects" value={String(projects.length).padStart(2, '0')} note="Across your workspace"/>
      <StatCard icon={Scissors} label="Clips generated" value="12" note="Demo project data" tone="mint"/>
      <StatCard icon={AudioLines} label="Audio cleaned" value="08" note="Demo project data"/>
      <StatCard icon={Clock3} label="Time saved" value="4.6 hrs" note="Estimated · Demo" tone="mint"/>
    </div>
    <ProjectSection projects={projects.slice(0, 3)} onViewAll={() => setPage('My Projects')} />
  </motion.div>
}

function ToolCard({ icon: Icon, title, tag, description, points, onClick, tone = 'violet' }) {
  return <motion.button whileHover={{ y: -4, scale: 1.005 }} whileTap={{ scale: .99 }} onClick={onClick} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101522] p-5 text-left transition hover:border-violet-300/30 hover:shadow-glow sm:p-6">
    <div className={cn('pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl transition group-hover:opacity-100', tone === 'blue' ? 'bg-cyan-500/10' : 'bg-violet-500/10')}/>
    <div className="relative flex items-start justify-between"><div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl border', tone === 'blue' ? 'border-cyan-300/15 bg-cyan-300/10 text-cyan-200' : 'border-violet-300/15 bg-violet-300/10 text-violet-200')}><Icon size={22}/></div><ArrowUpRight size={18} className="text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-200"/></div>
    <div className="relative mt-5 text-[9px] font-bold tracking-[.18em] text-slate-500">{tag}</div><h3 className="relative mt-1 font-display text-lg font-semibold text-white">{title}</h3><p className="relative mt-2 max-w-sm text-xs leading-5 text-slate-400">{description}</p>
    <div className="relative mt-4 flex flex-wrap gap-2">{points.map(p => <span key={p} className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-slate-400">{p}</span>)}</div>
  </motion.button>
}

function ProjectSection({ projects, onViewAll }) {
  return <section className="surface rounded-2xl p-4 sm:p-5">
    <div className="mb-4 flex items-center justify-between"><div><h3 className="text-sm font-semibold text-white">Recent projects</h3><p className="mt-1 text-[11px] text-slate-500">Pick up where you left off</p></div><button onClick={onViewAll} className="rounded-lg px-2 py-1.5 text-xs text-slate-400 hover:bg-white/5 hover:text-white">View all <ChevronRight size={13} className="inline"/></button></div>
    <div className="space-y-3">{projects.map((p, i) => <motion.div key={p.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .06 }} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-white/[0.035] sm:gap-4">
      <div className="w-24 shrink-0 sm:w-32"><VideoThumb color={p.color} label={p.initials}/></div>
      <div className="min-w-0 flex-1"><div className="truncate text-xs font-semibold text-slate-200 sm:text-sm">{p.title}</div><div className="mt-1.5 flex flex-wrap items-center gap-2 text-[10px] text-slate-500"><span>{p.type}</span><span>·</span><span>{p.duration}</span></div></div>
      <div className="hidden text-right sm:block"><Badge tone={p.status === 'Completed' ? 'green' : 'amber'}>{p.status}</Badge><div className="mt-2 text-[10px] text-slate-600">{p.date}</div></div>
      <button aria-label={`More options for ${p.title}`} className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"><MoreHorizontal size={17}/></button>
    </motion.div>)}</div>
  </section>
}

function UploadPanel({ onFile, fileName, setFileName, url, setUrl, onUrlSubmit, notify }) {
  const inputRef = useRef(null)
  const [mode, setMode] = useState('file')
  const [dragging, setDragging] = useState(false)
  const pickFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('video/') && !file.type.startsWith('audio/')) { notify('Choose a video or audio file.'); return }
    setFileName(file.name)
    onFile(file)
  }
  return <div className="grid gap-5 xl:grid-cols-[1.4fr_.8fr]">
    <div className="surface rounded-2xl p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-sm font-semibold text-white">Add your source video</h3><p className="mt-1 text-xs text-slate-500">Upload a local file or paste a video link.</p></div><div className="flex rounded-xl border border-white/10 bg-black/20 p-1"><button onClick={() => setMode('file')} className={cn('rounded-lg px-3 py-2 text-xs transition', mode === 'file' ? 'bg-violet-500/20 text-violet-200' : 'text-slate-500 hover:text-white')}><Upload size={13} className="mr-1.5 inline"/> Upload file</button><button onClick={() => setMode('link')} className={cn('rounded-lg px-3 py-2 text-xs transition', mode === 'link' ? 'bg-violet-500/20 text-violet-200' : 'text-slate-500 hover:text-white')}><Link2 size={13} className="mr-1.5 inline"/> Paste link</button></div></div>
      {mode === 'file' ? <button onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files?.[0]) }} className={cn('flex min-h-[230px] w-full flex-col items-center justify-center rounded-2xl border border-dashed px-4 text-center transition', dragging ? 'border-violet-300 bg-violet-400/10' : 'border-violet-300/30 bg-violet-400/[0.025] hover:border-violet-300/60 hover:bg-violet-400/[0.05]')}>
        <input ref={inputRef} type="file" accept="video/*,audio/*" className="hidden" onChange={(e) => pickFile(e.target.files?.[0])}/>
        <motion.div animate={dragging ? { scale: 1.08, y: -4 } : { scale: 1, y: 0 }} className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 text-violet-200"><Upload size={24}/></motion.div>
        <div className="text-sm font-semibold text-slate-200">{fileName || 'Drag and drop your video here'}</div>
        <p className="mt-2 text-xs text-slate-500">{fileName ? 'Selected for this frontend demo' : 'or click to browse files'}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2"><span className="rounded-md bg-white/[0.04] px-2 py-1 text-[9px] text-slate-500">MP4</span><span className="rounded-md bg-white/[0.04] px-2 py-1 text-[9px] text-slate-500">MOV</span><span className="rounded-md bg-white/[0.04] px-2 py-1 text-[9px] text-slate-500">WEBM</span><span className="rounded-md bg-white/[0.04] px-2 py-1 text-[9px] text-slate-500">MP3 / WAV</span></div>
      </button> : <div className="flex min-h-[230px] flex-col justify-center rounded-2xl border border-white/[0.08] bg-black/10 p-5"><label className="mb-2 text-xs font-medium text-slate-300">Video URL</label><div className="flex flex-col gap-2 sm:flex-row"><input className="field" placeholder="Paste a supported video URL…" value={url} onChange={(e) => setUrl(e.target.value)}/><Button onClick={onUrlSubmit} className="shrink-0"><Link2 size={15}/> Use link</Button></div><p className="mt-3 text-[11px] leading-5 text-slate-500">Link import is a UI demonstration only. Real URL fetching requires a backend and must respect the source platform's terms and access rules.</p></div>}
    </div>
    <div className="surface rounded-2xl p-5 sm:p-6"><div className="mb-4 flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-300"/><h3 className="text-sm font-semibold text-white">Source details</h3></div><div className="space-y-4"><div><div className="mb-1.5 text-[11px] text-slate-500">Supported media</div><div className="text-xs text-slate-300">Video and audio files</div></div><div className="h-px bg-white/[0.06]"/><div><div className="mb-1.5 text-[11px] text-slate-500">Spoken languages</div><div className="flex flex-wrap gap-2"><span className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-300">English</span><span className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-300">اردو · Urdu</span><span className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-300">हिन्दी · Hindi</span></div></div><div className="h-px bg-white/[0.06]"/><div className="rounded-xl border border-amber-300/10 bg-amber-300/[0.04] p-3"><div className="flex items-center gap-2 text-xs font-semibold text-amber-200"><CircleHelp size={14}/> Demo mode</div><p className="mt-1.5 text-[11px] leading-5 text-slate-500">The frontend can select a file, but uploading, transcription and AI processing need a backend connection.</p></div></div></div>
  </div>
}

function ProcessingOptions({ setPage, notify, sourceName }) {
  const [mode, setMode] = useState('full')
  const [language, setLanguage] = useState('Auto detect')
  const [subtitle, setSubtitle] = useState('English')
  const [style, setStyle] = useState('Bold highlight')
  const [duration, setDuration] = useState('30–60 seconds')
  const [count, setCount] = useState('5 clips')
  const [ratio, setRatio] = useState('9:16 · Vertical')
  const [running, setRunning] = useState(false)
  const modes = [
    { id: 'clean', icon: AudioLines, title: 'Clean audio', desc: 'Reduce background noise and improve voice clarity.' },
    { id: 'shorts', icon: Scissors, title: 'Generate shorts', desc: 'Find key moments and turn them into short clips.' },
    { id: 'full', icon: WandSparkles, title: 'Full AI processing', desc: 'Clean audio first, then create highlight clips.' },
  ]
  const start = () => {
    setRunning(true)
    notify('Demo processing started — no AI backend is connected yet.')
    setTimeout(() => { setRunning(false); setPage(mode === 'clean' ? 'Noise Remover' : mode === 'shorts' ? 'AI Shorts Generator' : 'AI Shorts Generator') }, 1000)
  }
  return <div className="space-y-5">
    <div className="surface rounded-2xl p-5 sm:p-6"><div className="mb-4"><h3 className="text-sm font-semibold text-white">Choose your workflow</h3><p className="mt-1 text-xs text-slate-500">Run one tool or combine both in a single project.</p></div><div className="grid gap-3 md:grid-cols-3">{modes.map(({ id, icon: Icon, title, desc }) => <button key={id} onClick={() => setMode(id)} className={cn('relative rounded-xl border p-4 text-left transition', mode === id ? 'border-violet-400/50 bg-violet-400/[0.08] shadow-glow' : 'border-white/[0.08] bg-black/10 hover:border-white/20')}><div className="flex items-center justify-between"><span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', mode === id ? 'bg-violet-400/15 text-violet-200' : 'bg-white/5 text-slate-400')}><Icon size={19}/></span>{mode === id && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-400 text-white"><Check size={12}/></span>}</div><div className="mt-4 text-sm font-semibold text-white">{title}</div><p className="mt-1.5 text-[11px] leading-5 text-slate-500">{desc}</p></button>)}</div></div>
    <div className="surface rounded-2xl p-5 sm:p-6"><div className="mb-5 flex items-center gap-2"><SlidersHorizontal size={17} className="text-violet-300"/><h3 className="text-sm font-semibold text-white">Output settings</h3></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Field label="Video language"><Select value={language} onChange={setLanguage} options={['Auto detect', 'English', 'Urdu', 'Hindi']}/></Field>
      <Field label="Subtitle language"><Select value={subtitle} onChange={setSubtitle} options={['English', 'Urdu', 'Hindi', 'No subtitles']}/></Field>
      <Field label="Subtitle style"><Select value={style} onChange={setStyle} options={['Bold highlight', 'Classic', 'Minimal', 'Karaoke']}/></Field>
      {mode !== 'clean' && <><Field label="Number of clips"><Select value={count} onChange={setCount} options={['3 clips', '5 clips', '10 clips', '15 clips']}/></Field><Field label="Clip duration"><Select value={duration} onChange={setDuration} options={['15–30 seconds', '30–60 seconds', '60–90 seconds', 'Custom']}/></Field><Field label="Aspect ratio"><Select value={ratio} onChange={setRatio} options={['9:16 · Vertical', '16:9 · Landscape', '1:1 · Square']}/></Field></>}
    </div><div className="mt-6 flex flex-col justify-between gap-3 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center"><div><div className="text-xs font-medium text-slate-300">Ready to start?</div><div className="mt-1 text-[11px] text-slate-500">Source: {sourceName || 'Demo video'} · settings are for preview only</div></div><Button onClick={start} disabled={running}>{running ? <><Activity size={15} className="animate-pulse"/> Preparing demo…</> : <><Sparkles size={15}/> Start processing <ChevronRight size={15}/></>}</Button></div></div>
  </div>
}

function Field({ label, children }) { return <label className="block"><span className="mb-2 block text-[11px] font-medium text-slate-400">{label}</span>{children}</label> }
function Select({ value, onChange, options }) { return <div className="relative"><select value={value} onChange={(e) => onChange(e.target.value)} className="field appearance-none pr-9">{options.map(o => <option key={o}>{o}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"/></div> }

function NoiseRemover({ notify, sourceName }) {
  const [strength, setStrength] = useState(70)
  const [enhance, setEnhance] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [processed, setProcessed] = useState(false)
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <SectionHeading eyebrow="AUDIO ENHANCEMENT" title="AI Noise Remover" description="Reduce distracting background noise and bring speech into focus." action={<Badge tone="purple"><Sparkles size={11}/> AI tool · Demo</Badge>}/>
    <div className="mb-5 grid gap-4 xl:grid-cols-[1.35fr_.8fr]">
      <div className="surface rounded-2xl p-5 sm:p-6"><div className="mb-4 flex items-center justify-between"><div><div className="text-sm font-semibold text-white">Video preview</div><div className="mt-1 max-w-[220px] truncate text-[11px] text-slate-500">{sourceName || 'Podcast Episode 04.mp4'}</div></div><button onClick={() => setPlaying(!playing)} className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/20 bg-violet-400/10 text-violet-200 hover:bg-violet-400/20">{playing ? <Pause size={17}/> : <Play size={17} fill="currentColor"/>}</button></div>
        <VideoThumb color="from-indigo-800/60 via-slate-800 to-violet-900/50" className="min-h-[190px]"/>
        <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500"><span>{playing ? 'Preview playing · demo' : '00:00'}</span><span>24:18</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div animate={{ width: playing ? '36%' : '8%' }} className="h-full rounded-full bg-violet-400"/></div>
      </div>
      <div className="surface rounded-2xl p-5 sm:p-6"><div className="mb-5 flex items-center gap-2"><Gauge size={17} className="text-violet-300"/><h3 className="text-sm font-semibold text-white">Cleanup settings</h3></div><div className="mb-6"><div className="mb-3 flex items-center justify-between"><label className="text-xs text-slate-300">Noise reduction strength</label><span className="rounded-lg bg-violet-400/10 px-2 py-1 text-xs font-semibold text-violet-200">{strength}%</span></div><input aria-label="Noise reduction strength" type="range" min="0" max="100" value={strength} onChange={(e) => setStrength(Number(e.target.value))} className="w-full accent-violet-400"/><div className="mt-2 flex justify-between text-[10px] text-slate-600"><span>Subtle</span><span>Aggressive</span></div></div><div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] p-3"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-400/10 text-violet-200"><Mic2 size={17}/></span><div><div className="text-xs font-medium text-slate-200">Voice enhancement</div><div className="mt-1 text-[10px] text-slate-500">Focus on spoken words</div></div></div><button aria-label="Toggle voice enhancement" onClick={() => setEnhance(!enhance)} className={cn('relative h-6 w-11 rounded-full transition', enhance ? 'bg-violet-500' : 'bg-slate-700')}><motion.span animate={{ x: enhance ? 20 : 3 }} className="absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow"/></button></div><Button className="mt-5 w-full" onClick={() => { setProcessed(true); notify('Preview updated. Connect an AI backend to process real audio.') }}><WandSparkles size={15}/> {processed ? 'Re-run cleanup preview' : 'Clean my audio'}</Button>{processed && <p className="mt-3 text-center text-[10px] text-emerald-300"><CheckCircle2 size={12} className="mr-1 inline"/> Demo cleanup state saved</p>}</div>
    </div>
    <div className="surface rounded-2xl p-5 sm:p-6"><div className="mb-5 flex flex-wrap items-center justify-between gap-2"><div><h3 className="text-sm font-semibold text-white">Audio comparison</h3><p className="mt-1 text-[11px] text-slate-500">Compare the source and cleaned waveform previews.</p></div><Badge tone={processed ? 'green' : 'gray'}>{processed ? 'Preview ready' : 'Awaiting cleanup'}</Badge></div><div className="space-y-5"><div><div className="mb-2 flex items-center gap-2 text-xs text-slate-400"><Waves size={14}/> Original audio</div><div className="rounded-xl border border-white/[0.06] bg-black/10 px-3 py-2"><Waveform active={playing}/></div></div><div><div className="mb-2 flex items-center gap-2 text-xs text-violet-200"><AudioLines size={14}/> Cleaned audio <span className="ml-auto text-[10px] text-slate-600">Illustrative waveform</span></div><div className="rounded-xl border border-violet-300/10 bg-violet-400/[0.035] px-3 py-2"><Waveform active={false} compact={false}/></div></div></div><div className="mt-5 flex justify-end"><Button variant="secondary" onClick={() => notify('Export is a demo action. Backend processing is not connected.')}><Download size={15}/> Export cleaned video</Button></div></div>
  </motion.div>
}

function ShortsGenerator({ setPage, notify, sourceName }) {
  const [language, setLanguage] = useState('Auto detect')
  const [subtitle, setSubtitle] = useState('English')
  const [count, setCount] = useState('5 clips')
  const [ratio, setRatio] = useState('9:16 Vertical')
  const [generated, setGenerated] = useState(false)
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <SectionHeading eyebrow="SMART CLIP FINDER" title="AI Shorts Generator" description="Find the most engaging moments in long videos and turn them into ready-to-edit short clips." action={<Badge tone="purple"><Sparkles size={11}/> AI powered · Demo</Badge>}/>
    <div className="mb-5 grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
      <div className="surface rounded-2xl p-5 sm:p-6"><div className="mb-4 flex items-center justify-between"><div><h3 className="text-sm font-semibold text-white">Source video</h3><p className="mt-1 max-w-[260px] truncate text-[11px] text-slate-500">{sourceName || 'The Future of AI — Full Interview'}</p></div><Button variant="secondary" className="!px-3 !py-2" onClick={() => notify('Upload screen is not connected to a backend.')}><Upload size={13}/> Change</Button></div><VideoThumb color="from-sky-700/40 via-indigo-900/60 to-violet-800/30" className="min-h-[190px]"/><div className="mt-4 grid grid-cols-3 gap-3"><div className="rounded-xl bg-white/[0.03] p-3"><div className="text-[10px] text-slate-500">Duration</div><div className="mt-1 text-xs font-semibold text-slate-200">48:32</div></div><div className="rounded-xl bg-white/[0.03] p-3"><div className="text-[10px] text-slate-500">Resolution</div><div className="mt-1 text-xs font-semibold text-slate-200">1080p</div></div><div className="rounded-xl bg-white/[0.03] p-3"><div className="text-[10px] text-slate-500">Audio</div><div className="mt-1 text-xs font-semibold text-slate-200">Detected</div></div></div></div>
      <div className="surface rounded-2xl p-5 sm:p-6"><div className="mb-5 flex items-center gap-2"><Sparkles size={17} className="text-violet-300"/><h3 className="text-sm font-semibold text-white">Generation settings</h3></div><div className="space-y-4"><Field label="Video language"><Select value={language} onChange={setLanguage} options={['Auto detect', 'English', 'Urdu', 'Hindi']}/></Field><Field label="Subtitle language"><Select value={subtitle} onChange={setSubtitle} options={['English', 'Urdu', 'Hindi', 'No subtitles']}/></Field><div className="grid grid-cols-2 gap-3"><Field label="Number of clips"><Select value={count} onChange={setCount} options={['3 clips', '5 clips', '10 clips', '15 clips']}/></Field><Field label="Aspect ratio"><Select value={ratio} onChange={setRatio} options={['9:16 Vertical', '16:9 Landscape', '1:1 Square']}/></Field></div><div className="rounded-xl border border-violet-300/10 bg-violet-400/[0.04] p-3"><div className="flex items-center gap-2 text-xs font-semibold text-violet-200"><Languages size={14}/> Multilingual captions</div><p className="mt-1.5 text-[11px] leading-5 text-slate-500">Designed for English, Urdu and Hindi. Urdu right-to-left layout needs careful subtitle rendering in the video pipeline.</p></div><Button className="w-full" onClick={() => { setGenerated(true); notify('Demo clips shown below. AI highlight detection is not connected.') }}><Sparkles size={15}/> Generate clips</Button></div></div>
    </div>
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><div className="eyebrow mb-1">AI HIGHLIGHTS</div><h2 className="font-display text-lg font-semibold text-white">{generated ? 'Your generated clips' : 'Suggested moments preview'}</h2><p className="mt-1 text-xs text-slate-500">Sample content to demonstrate how generated clips could appear.</p></div><Button variant="secondary" onClick={() => setPage('Video Editor')}><Clapperboard size={14}/> Open editor</Button></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{clips.slice(0, Number.parseInt(count) || 5).map((clip, i) => <motion.div key={clip.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .07 }} className="surface overflow-hidden rounded-2xl p-3.5"><div className="relative"><VideoThumb color={clip.color} label={`CLIP 0${i + 1}`} className="aspect-[4/3]"/><span className="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-1 text-[10px] text-white">{clip.duration}</span></div><div className="px-1 pb-1 pt-4"><div className="flex items-start justify-between gap-3"><h3 className="text-sm font-semibold leading-5 text-white">{clip.title}</h3><Badge tone="purple">{clip.score}%</Badge></div><div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500"><Clock3 size={12}/>{clip.time}</div><div className="mt-4 flex gap-2"><Button variant="secondary" className="flex-1 !py-2 !text-xs" onClick={() => notify(`Previewing demo clip ${i + 1}.`)}><Play size={13}/> Preview</Button><Button className="flex-1 !py-2 !text-xs" onClick={() => notify('Clip export requires backend rendering.')}><Download size={13}/> Export</Button></div></div></motion.div>)}</div>
  </motion.div>
}

function VideoEditor({ notify }) {
  const [activeClip, setActiveClip] = useState(0)
  const [caption, setCaption] = useState('The main point everyone misses.')
  const [style, setStyle] = useState('Bold highlight')
  const [ratio, setRatio] = useState('9:16 Vertical')
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <SectionHeading eyebrow="CREATOR WORKSPACE" title="Video Editor" description="Review your AI clips, adjust captions and prepare your next export." action={<Button onClick={() => notify('Export rendering is not connected yet.')}><Download size={15}/> Save & export</Button>}/>
    <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
      <div className="surface rounded-2xl p-4 sm:p-5"><div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold text-white">Preview canvas</h3><span className="text-[10px] text-slate-500">Demo timeline</span></div><div className="flex min-h-[350px] items-center justify-center rounded-xl bg-[#080a12] p-4"><div className="relative aspect-[9/16] max-h-[430px] w-auto overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-900 via-slate-900 to-violet-900/60" style={{height: 'min(65vh, 430px)'}}><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(167,139,250,.3),transparent_50%)]"/><div className="absolute inset-x-3 bottom-10 rounded-lg bg-black/65 px-3 py-2 text-center text-sm font-extrabold leading-snug text-white shadow-lg">{caption || 'Your captions appear here'}</div><div className="absolute bottom-3 left-0 right-0 text-center text-[8px] font-bold tracking-[.2em] text-white/50">AI VIDEO STUDIO</div><button onClick={() => notify('Video preview is illustrative; no real video is loaded.')} className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur"><Play size={18} fill="currentColor"/></button></div></div><div className="mt-5"><div className="mb-3 flex items-center justify-between"><span className="text-xs font-semibold text-slate-200">Clip timeline</span><span className="text-[10px] text-slate-500">3 clips · demo</span></div><div className="flex gap-2 overflow-x-auto pb-2">{clips.map((c, i) => <button key={c.title} onClick={() => { setActiveClip(i); setCaption(c.title) }} className={cn('min-w-[150px] flex-1 rounded-xl border p-2 text-left transition', activeClip === i ? 'border-violet-400/50 bg-violet-400/[0.08]' : 'border-white/[0.07] bg-black/10 hover:border-white/20')}><div className={cn('mb-2 h-12 rounded-lg bg-gradient-to-r', c.color)}/><div className="truncate text-[10px] font-semibold text-slate-200">Clip {String(i + 1).padStart(2, '0')}</div><div className="mt-1 text-[9px] text-slate-500">{c.duration}</div></button>)}</div><div className="mt-3 rounded-xl border border-white/[0.06] bg-black/10 p-3"><Waveform compact active={false}/><div className="mt-2 flex justify-between text-[9px] text-slate-600"><span>00:00</span><span>00:36</span></div></div></div></div>
      <div className="surface rounded-2xl p-5"><div className="mb-5 flex items-center gap-2"><Subtitles size={17} className="text-violet-300"/><h3 className="text-sm font-semibold text-white">Edit captions</h3></div><Field label="Caption text"><textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={4} className="field resize-y"/></Field><div className="mt-4"><Field label="Caption style"><Select value={style} onChange={setStyle} options={['Bold highlight', 'Classic', 'Minimal', 'Karaoke']}/></Field></div><div className="mt-4"><Field label="Export aspect ratio"><Select value={ratio} onChange={setRatio} options={['9:16 Vertical', '16:9 Landscape', '1:1 Square']}/></Field></div><div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3"><div className="text-[11px] font-semibold text-slate-300">Caption preview</div><div className="mt-3 rounded-lg bg-black/50 p-3 text-center text-xs font-extrabold text-white">{caption || 'Caption preview'}</div><p className="mt-2 text-[10px] text-slate-600">Style selection is for UI preview.</p></div><Button className="mt-5 w-full" onClick={() => notify('Caption changes are held in this browser session only.')}><Check size={15}/> Apply changes</Button></div>
    </div>
  </motion.div>
}

function Projects({ projects, setPage, notify }) {
  const [filter, setFilter] = useState('All projects')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => projects.filter(p => (filter === 'All projects' || (filter === 'Audio cleaned' ? p.type.includes('Audio') : filter === 'Short clips' ? p.type.includes('Clip') : p.status === 'Processing')) && p.title.toLowerCase().includes(query.toLowerCase())), [projects, filter, query])
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <SectionHeading eyebrow="YOUR LIBRARY" title="My Projects" description="All your video work, organized in one place." action={<Button onClick={() => setPage('Processing Options')}><Plus size={15}/> New project</Button>}/>
    <div className="mb-5 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your projects..." className="field pl-10"/></div><div className="flex gap-2 overflow-x-auto">{['All projects', 'Audio cleaned', 'Short clips', 'Processing'].map(f => <button key={f} onClick={() => setFilter(f)} className={cn('whitespace-nowrap rounded-xl border px-3 py-2 text-xs transition', filter === f ? 'border-violet-400/30 bg-violet-400/10 text-violet-200' : 'border-white/[0.07] text-slate-400 hover:bg-white/5')}>{f}</button>)}</div></div>
    {filtered.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((p, i) => <motion.div layout key={p.title} className="surface rounded-2xl p-3.5"><VideoThumb color={p.color} label={p.initials}/><div className="flex items-start justify-between gap-2 px-1 pt-4"><div className="min-w-0"><h3 className="truncate text-sm font-semibold text-white">{p.title}</h3><p className="mt-1.5 text-[10px] text-slate-500">{p.type} · {p.duration}</p></div><button onClick={() => notify(`Options for ${p.title} — demo only.`)} className="rounded-lg p-1.5 text-slate-500 hover:bg-white/5"><MoreHorizontal size={16}/></button></div><div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3"><Badge tone={p.status === 'Completed' ? 'green' : 'amber'}>{p.status}</Badge><button onClick={() => setPage(p.type.includes('Audio') ? 'Noise Remover' : 'AI Shorts Generator')} className="text-[11px] font-semibold text-violet-300 hover:text-violet-200">Open project <ChevronRight size={12} className="inline"/></button></div></motion.div>)}</div> : <div className="surface rounded-2xl py-16 text-center"><FolderOpen size={28} className="mx-auto text-slate-600"/><p className="mt-3 text-sm font-semibold text-slate-300">No projects found</p><p className="mt-1 text-xs text-slate-500">Try another search or filter.</p></div>}
  </motion.div>
}

function Exports({ projects, notify }) {
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <SectionHeading eyebrow="FINISHED FILES" title="Exports" description="Your completed videos and audio exports will appear here."/>
    <div className="surface overflow-hidden rounded-2xl"><div className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/[0.06] px-5 py-4 sm:grid-cols-[1fr_120px_100px_110px]"><span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">File</span><span className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:block">Type</span><span className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:block">Status</span><span className="text-right text-[10px] font-bold uppercase tracking-widest text-slate-500">Action</span></div>{projects.filter(p => p.status === 'Completed').map(p => <div key={p.title} className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-white/[0.04] px-5 py-4 last:border-0 sm:grid-cols-[1fr_120px_100px_110px]"><div className="flex min-w-0 items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-200"><FileVideo size={17}/></div><div className="min-w-0"><div className="truncate text-xs font-semibold text-slate-200">{p.title}</div><div className="mt-1 text-[10px] text-slate-500">{p.duration} · Demo item</div></div></div><span className="hidden text-xs text-slate-400 sm:block">{p.type}</span><span className="hidden sm:block"><Badge>Ready</Badge></span><button onClick={() => notify('Download is not available until backend export is connected.')} className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-violet-300 hover:text-white"><Download size={14}/> Download</button></div>)}</div><p className="mt-3 text-[11px] text-slate-600">Export rows are sample data. Real downloadable files require a processing backend.</p>
  </motion.div>
}

function SettingsPage({ notify }) {
  const [name, setName] = useState('Creator workspace')
  const [language, setLanguage] = useState('English')
  const [autoCaptions, setAutoCaptions] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <SectionHeading eyebrow="PREFERENCES" title="Settings" description="Customize your workspace experience."/>
    <div className="max-w-3xl space-y-4">
      <div className="surface rounded-2xl p-5 sm:p-6"><h3 className="text-sm font-semibold text-white">Workspace preferences</h3><p className="mt-1 text-xs text-slate-500">These controls are saved only in the current page session.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="Workspace name"><input className="field" value={name} onChange={(e) => setName(e.target.value)}/></Field><Field label="Interface language"><Select value={language} onChange={setLanguage} options={['English', 'Urdu', 'Hindi']}/></Field></div><div className="mt-5 space-y-3"><ToggleRow icon={Subtitles} title="Auto-generate captions" desc="Enable captions by default in the UI" value={autoCaptions} onChange={setAutoCaptions}/><ToggleRow icon={Activity} title="Reduce decorative motion" desc="Preference preview; full reduced-motion support can be added" value={reduceMotion} onChange={setReduceMotion}/></div><Button className="mt-5" onClick={() => notify('Preferences updated for this session.')}>Save preferences</Button></div>
      <div className="surface rounded-2xl p-5 sm:p-6"><h3 className="text-sm font-semibold text-white">Supported languages</h3><p className="mt-1 text-xs text-slate-500">Designed for multilingual video workflows.</p><div className="mt-4 grid gap-3 sm:grid-cols-3">{[{name:'English',sub:'Latin script',mark:'EN'},{name:'Urdu',sub:'Right-to-left',mark:'اردو'},{name:'Hindi',sub:'Devanagari',mark:'हिंदी'}].map(x => <div key={x.name} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"><div className="text-lg font-semibold text-violet-200">{x.mark}</div><div className="mt-2 text-xs font-semibold text-slate-200">{x.name}</div><div className="mt-1 text-[10px] text-slate-500">{x.sub}</div></div>)}</div></div>
    </div>
  </motion.div>
}

function ToggleRow({ icon: Icon, title, desc, value, onChange }) {
  return <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-slate-300"><Icon size={16}/></span><div className="min-w-0 flex-1"><div className="text-xs font-medium text-slate-200">{title}</div><div className="mt-1 text-[10px] text-slate-500">{desc}</div></div><button onClick={() => onChange(!value)} className={cn('relative h-6 w-11 shrink-0 rounded-full transition', value ? 'bg-violet-500' : 'bg-slate-700')}><motion.span animate={{ x: value ? 20 : 3 }} className="absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow"/></button></div>
}

function App() {
  const [page, setPage] = useState('Dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [url, setUrl] = useState('')
  const [projects, setProjects] = useState(demoProjects)
  const [toast, setToast] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const notify = (message) => { setToast(message); window.clearTimeout(window.__toastTimer); window.__toastTimer = window.setTimeout(() => setToast(''), 3200) }
  const go = (next) => { setPage(next); setMobileOpen(false) }
  const handleFile = (selected) => {
    setFile(selected)
    setProjects(old => [{ title: selected.name.replace(/\.[^/.]+$/, ''), type: 'New upload', duration: 'Unknown', date: 'Just now', status: 'Processing', color: 'from-violet-600/70 to-indigo-500/20', initials: 'NEW' }, ...old.filter(p => p.title !== selected.name.replace(/\.[^/.]+$/, ''))])
    notify('File selected for the UI demo. No upload has occurred.')
  }
  const handleUrl = () => {
    if (!url.trim()) { notify('Paste a video URL first.'); return }
    setFileName(url.trim())
    notify('Link added to the demo UI. Fetching video requires a backend.')
    setPage('Processing Options')
  }
  const filteredNav = navItems.filter(n => n.label.toLowerCase().includes(search.toLowerCase()))
  const renderPage = () => {
    if (page === 'Dashboard') return <Dashboard setPage={go} projects={projects} notify={notify}/>
    if (page === 'Upload Video') return <><SectionHeading eyebrow="START CREATING" title="Upload video or paste a link" description="Choose a source to begin your AI video workflow."/><UploadPanel onFile={handleFile} fileName={fileName} setFileName={setFileName} url={url} setUrl={setUrl} onUrlSubmit={handleUrl} notify={notify}/><div className="mt-5 flex justify-end"><Button onClick={() => go('Processing Options')}><Sparkles size={15}/> Continue to processing <ChevronRight size={15}/></Button></div></>
    if (page === 'Processing Options') return <><SectionHeading eyebrow="AI WORKFLOW" title="Processing options" description="Choose how you want to transform this video."/><ProcessingOptions setPage={go} notify={notify} sourceName={fileName}/></>
    if (page === 'Noise Remover') return <NoiseRemover notify={notify} sourceName={fileName}/>
    if (page === 'AI Shorts Generator') return <ShortsGenerator setPage={go} notify={notify} sourceName={fileName}/>
    if (page === 'Video Editor') return <VideoEditor notify={notify}/>
    if (page === 'My Projects') return <Projects projects={projects} setPage={go} notify={notify}/>
    if (page === 'Exports') return <Exports projects={projects} notify={notify}/>
    if (page === 'Settings') return <SettingsPage notify={notify}/>
    return <Dashboard setPage={go} projects={projects} notify={notify}/>
  }
  return <div className="min-h-screen bg-ink">
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden"><div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-900/10 blur-[120px]"/><div className="absolute -right-48 top-1/3 h-96 w-96 rounded-full bg-indigo-900/10 blur-[120px]"/></div>
    <Sidebar page={page} setPage={go} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
    <div className="relative min-h-screen lg:pl-[248px]">
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#080b14]/85 px-4 py-3 backdrop-blur-2xl sm:px-6 lg:px-8">
        <div className="flex h-10 items-center gap-3">
          <button aria-label="Open navigation" onClick={() => setMobileOpen(true)} className="rounded-xl border border-white/[0.08] p-2 text-slate-300 hover:bg-white/5 lg:hidden"><Menu size={17}/></button>
          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex"><Home size={13}/><ChevronRight size={12}/><span className="text-slate-300">{page}</span></div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {showSearch && <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 220, opacity: 1 }} className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/><input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Find a page..." className="field !py-2 !pl-9 !text-xs" onKeyDown={(e) => { if (e.key === 'Enter') { const found = navItems.find(n => n.label.toLowerCase().includes(search.toLowerCase())); if (found) go(found.label) } }}/></motion.div>}
            <button aria-label="Search pages" onClick={() => setShowSearch(!showSearch)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] text-slate-400 transition hover:bg-white/5 hover:text-white"><Search size={16}/></button>
            <div className="relative"><button aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)} className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] text-slate-400 transition hover:bg-white/5 hover:text-white"><Bell size={16}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400"/></button><AnimatePresence>{showNotifications && <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="absolute right-0 top-12 z-40 w-64 rounded-2xl border border-white/10 bg-[#111624] p-4 shadow-2xl"><div className="text-xs font-semibold text-white">Notifications</div><p className="mt-2 text-xs leading-5 text-slate-400">You're viewing demo content. Connect a backend to receive real processing updates.</p><button onClick={() => setShowNotifications(false)} className="mt-3 text-[11px] text-violet-300">Got it</button></motion.div>}</AnimatePresence></div>
            <div className="hidden h-7 w-px bg-white/10 sm:block"/>
            <div className="hidden items-center gap-2 sm:flex"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 text-[10px] font-bold text-white">AV</div><div className="hidden xl:block"><div className="text-[11px] font-semibold text-slate-200">Creator</div><div className="text-[9px] text-slate-500">Free plan</div></div></div>
            <Button className="!px-3 !py-2 !text-xs" onClick={() => go('Upload Video')}><Plus size={14}/> <span className="hidden sm:inline">New project</span><span className="sm:hidden">New</span></Button>
          </div>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
        <AnimatePresence mode="wait"><motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .2 }}>{renderPage()}</motion.div></AnimatePresence>
        <footer className="mt-12 flex flex-col justify-between gap-2 border-t border-white/[0.06] py-5 text-[10px] text-slate-600 sm:flex-row sm:items-center"><span>© 2026 AI Video Studio · Frontend concept</span><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-300"/> Demo mode — AI processing is not connected</span></footer>
      </main>
    </div>
    <AnimatePresence>{toast && <motion.div initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} className="fixed bottom-5 left-1/2 z-[100] flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-start gap-3 rounded-xl border border-white/10 bg-[#171c2b] px-4 py-3 shadow-2xl shadow-black/40 sm:left-auto sm:right-6 sm:translate-x-0"><div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-400/15 text-violet-200"><CircleHelp size={14}/></div><p className="text-xs leading-5 text-slate-200">{toast}</p><button aria-label="Dismiss notification" onClick={() => setToast('')} className="ml-1 text-slate-500 hover:text-white"><X size={14}/></button></motion.div>}</AnimatePresence>
  </div>
}

export default App
