import { Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'


function HomePage() {
    return (
        <div>
            <div style={{ textAlign: 'center', fontSize: '40px' }}>Tutorial Online Courses</div>
            <Link to="/">Homepage</Link>
            <div className='col-md-3'>
                <Login />
            </div>
            <div className='col-md-9'>
                <Register />
            </div>
        </div>
    )
}

export default HomePage