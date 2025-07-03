import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/tutorials/:id/comments" element={<ListCommnetByTuto />} /> */}
      </Routes>
    </div>
  )
}

export default App