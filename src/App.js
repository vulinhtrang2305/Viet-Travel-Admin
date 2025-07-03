import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        {/* <Route path="/tutorials/:id/comments" element={<ListCommnetByTuto />} /> */}
      </Routes>
    </div>
  )
}

export default App