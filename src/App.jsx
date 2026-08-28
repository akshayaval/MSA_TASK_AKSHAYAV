import { useState, useEffect } from 'react'
import './App.css'

const initialMembers = [
  { id: 1, name: 'Priya', status: 'On track' },
  { id: 2, name: 'Rohan', status: 'Blocked' },
  { id: 3, name: 'Ananya', status: 'On track' },
]

function App() {
  const [members, setMembers] = useState(initialMembers)
  const [newName, setNewName] = useState('')
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')   // tracks the live search text
  const [activeFilter, setActiveFilter] = useState('All') // tracks the selected status filter

  // Apply search (case-insensitive) and status filter together to produce the visible list
  const visibleMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'On Track' && m.status === 'On track') ||
      (activeFilter === 'Blocked' && m.status === 'Blocked')
    return matchesSearch && matchesFilter
  })

  // "Seconds since last update" ticker
  useEffect(() => {
    const interval = setInterval(() => {
      // Stale closure was causing the captured `secondsSinceUpdate` value to always be 0; use functional update to always read the latest state.
      setSecondsSinceUpdate(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  function addMember() {
    if (!newName.trim()) return
    setMembers([...members, { id: Date.now(), name: newName, status: 'On track' }])
    setNewName('')
    setSecondsSinceUpdate(0)
  }

  function removeMember(id) {
    setMembers(members.filter((m) => m.id !== id))
    setSecondsSinceUpdate(0)
  }

  function toggleStatus(id) {
    setMembers(
      members.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'On track' ? 'Blocked' : 'On track' }
          : m
      )
    )
    setSecondsSinceUpdate(0)
  }

  return (
    <div className="app">
      <header className="header-bar">
        <h1>Standup Tracker</h1>
        <span className="ticker">Last update: {secondsSinceUpdate}s ago</span>
      </header>

      <div className="add-row">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Add a team member"
        />
        <button onClick={addMember}>Add</button>
      </div>

      {/* Search input – labelled for accessibility */}
      <div className="search-row">
        <label htmlFor="member-search" className="search-label">Search</label>
        <input
          id="member-search"
          className="search-input"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search members…"
        />
      </div>

      {/* Filter buttons – keyboard accessible via Tab / Enter / Space */}
      <div className="filter-row" role="group" aria-label="Filter by status">
        {['All', 'On Track', 'Blocked'].map((f) => (
          <button
            key={f}
            className={`filter-btn${activeFilter === f ? ' filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="member-list">
        {/* Render filtered list; show empty-state message when nothing matches */}
        {visibleMembers.length === 0 ? (
          <li className="no-results">No members found</li>
        ) : (
          visibleMembers.map((member) => (
            <li key={member.id} className="member-row">
              <span className="member-name">{member.name}</span>
              <button
                className={`status-pill ${member.status === 'On track' ? 'ok' : 'blocked'}`}
                onClick={() => toggleStatus(member.id)}
              >
                {member.status}
              </button>
              <div className="remove-icon" onClick={() => removeMember(member.id)}>
                ✕
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App
