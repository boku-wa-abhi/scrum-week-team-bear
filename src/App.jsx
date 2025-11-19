import { useEffect, useMemo, useRef, useState } from 'react'

const projectOptions = [
  { id: 'PRJ-248', name: 'Lunar CRM Overhaul' },
  { id: 'PRJ-310', name: 'Mobile Growth Sprint' },
  { id: 'PRJ-427', name: 'Infrastructure Upgrade' },
  { id: 'PRJ-509', name: 'Deep Research Pod' }
]

const quickPresets = [
  { label: '15m', value: '15m' },
  { label: '30m', value: '30m' },
  { label: '1h', value: '1h' },
  { label: 'Deep Work Block (90m)', value: 'Deep Work Block (90m)' }
]

const timePattern = /^\d+(\.\d+)?\s*(m|h)$/i

const App = () => {
  const [selectedProject, setSelectedProject] = useState('')
  const [duration, setDuration] = useState('')
  const [entries, setEntries] = useState([])
  const [errors, setErrors] = useState({})
  const [isPresetOpen, setIsPresetOpen] = useState(false)
  const presetRef = useRef(null)

  const projectLookup = useMemo(() => {
    return projectOptions.reduce((acc, option) => {
      acc[option.id] = option.name
      return acc
    }, {})
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (presetRef.current && !presetRef.current.contains(event.target)) {
        setIsPresetOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isDurationValid = (value) => {
    const trimmed = value.trim()
    if (!trimmed) return false

    if (trimmed.toLowerCase().includes('deep work')) {
      return true
    }

    return timePattern.test(trimmed)
  }

  const validateInputs = () => {
    const validationErrors = {}

    if (!selectedProject) {
      validationErrors.project = 'Select a project ID before logging time.'
    }

    if (!duration.trim()) {
      validationErrors.duration = 'Add a duration such as 30m or 1.5h.'
    } else if (!isDurationValid(duration)) {
      validationErrors.duration = 'Use m/h format (e.g., 45m, 1.5h) or Deep Work Block.'
    }

    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0
  }

  const handleAddEntry = () => {
    if (!validateInputs()) return

    const entry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      projectId: selectedProject,
      duration: duration.trim()
    }

    setEntries((previous) => [entry, ...previous])
    setDuration('')
    setErrors({})
  }

  const handlePresetSelection = (value) => {
    setDuration(value)
    setIsPresetOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-100 to-slate-200 px-4 pb-16 pt-12 text-slate-700">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">Time Pilot</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-800">Floating desktop widget</h1>
          <p className="mt-2 text-base text-slate-500">Log focused work in seconds with a pill-shaped control surface.</p>
        </header>

        <section className="space-y-2">
          <div className="w-full rounded-[32px] border border-white/60 bg-white/90 p-3 shadow-widget backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div
                className={`group flex flex-1 items-center gap-3 rounded-2xl border bg-slate-50/70 px-4 py-3 transition focus-within:bg-white focus-within:border-blue-200 ${
                  errors.project ? 'border-rose-200' : 'border-transparent'
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-inner">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path
                      d="M5 7.5h14l-1.2 11.1a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M8 7.5V6a4 4 0 0 1 8 0v1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="relative flex-1">
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Project</label>
                  <select
                    className="w-full appearance-none border-none bg-transparent text-lg font-medium text-slate-700 outline-none"
                    value={selectedProject}
                    onChange={(event) => setSelectedProject(event.target.value)}
                    aria-label="Select project"
                  >
                    <option value="">Select Project ID</option>
                    {projectOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.id} · {option.name}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-400"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div
                className={`relative flex flex-1 items-center gap-3 rounded-2xl border bg-slate-50/70 px-4 py-3 transition focus-within:bg-white focus-within:border-blue-200 ${
                  errors.duration ? 'border-rose-200' : 'border-transparent'
                }`}
                ref={presetRef}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-inner">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 8v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex-1">
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Duration</label>
                  <input
                    type="text"
                    className="w-full border-none bg-transparent text-lg font-medium text-slate-700 placeholder:text-slate-400 outline-none"
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                    placeholder="e.g. 30m"
                  />
                </div>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-inner transition hover:text-slate-800"
                  onClick={() => setIsPresetOpen((open) => !open)}
                  aria-label="Open duration presets"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {isPresetOpen && (
                  <div className="absolute right-0 top-[calc(100%+12px)] z-10 w-56 rounded-2xl border border-white/60 bg-white p-2 shadow-xl">
                    {quickPresets.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                        onClick={() => handlePresetSelection(preset.value)}
                      >
                        <span>{preset.label}</span>
                        <span className="text-xs text-slate-400">{preset.value}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleAddEntry}
                className="flex h-14 w-14 flex-none items-center justify-center rounded-[22px] bg-midnight text-white shadow-lg transition hover:scale-[1.02] hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M7 12h10" strokeLinecap="round" />
                  <path d="m12 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                className="flex h-14 w-14 flex-none items-center justify-center rounded-[22px] border border-slate-200 bg-white text-slate-500 shadow-inner transition hover:border-slate-300 hover:text-slate-700"
                aria-label="Settings"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path
                    d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.4 15a1 1 0 0 0 .2-1.1l-.4-1a1 1 0 0 1 .1-.9l.2-.3a1 1 0 0 0-.1-1.2l-1.2-1.2a1 1 0 0 0-1.2-.1l-.3.2a1 1 0 0 1-.9.1l-1-.4a1 1 0 0 0-1.1.2l-.3.3a1 1 0 0 1-1.2 0l-.3-.3a1 1 0 0 0-1.1-.2l-1 .4a1 1 0 0 1-.9-.1l-.3-.2a1 1 0 0 0-1.2.1L4.4 10a1 1 0 0 0-.1 1.2l.2.3a1 1 0 0 1 .1.9l-.4 1A1 1 0 0 0 4.2 15l.3.3a1 1 0 0 1 .2 1.1l-.2.5a1 1 0 0 0 .3 1.1l1.2 1.2a1 1 0 0 0 1.1.3l.5-.2a1 1 0 0 1 1.1.2l.3.3a1 1 0 0 0 1.2 0l.3-.3a1 1 0 0 1 1.1-.2l.5.2a1 1 0 0 0 1.1-.3l1.2-1.2a1 1 0 0 0 .3-1.1l-.2-.5a1 1 0 0 1 .2-1.1z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          {(errors.project || errors.duration) && (
            <div className="rounded-2xl border border-rose-100 bg-rose-50/60 px-4 py-3 text-sm text-rose-500">
              <p>{errors.project || errors.duration}</p>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-widget">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Preview log</p>
              <h2 className="text-xl font-semibold text-slate-800">Entries ({entries.length})</h2>
            </div>
            {entries.length > 0 && (
              <button
                type="button"
                className="text-sm font-semibold text-blue-500 transition hover:text-blue-600"
                onClick={() => setEntries([])}
              >
                Clear
              </button>
            )}
          </div>

          {entries.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-5 text-center text-sm text-slate-500">
              No entries yet. Add one to preview how the widget records time.
            </p>
          ) : (
            <ul className="mt-6 space-y-3">
              {entries.map((entry, index) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between rounded-2xl border border-white/80 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-600 shadow-inner"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-xs font-bold text-slate-500 shadow">
                      {entries.length - index}
                    </span>
                    <div>
                      <p className="text-slate-500">{entry.projectId}</p>
                      <p className="text-xs text-slate-400">{projectLookup[entry.projectId]}</p>
                    </div>
                  </div>
                  <span className="text-base text-slate-900">{entry.duration}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
