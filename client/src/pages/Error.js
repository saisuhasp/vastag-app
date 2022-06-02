import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Error.css"

const Error = () => {
  return (
    <div className='error-page'>
        <div className='error-content'>
            <div className='error-heading'>
                <h1>404</h1>
            </div>
            <h2> We are sorry , page not found!</h2>
            <p className='mb-5'>the page you are looking for is not available</p>
            
            <Link
              to='/'
              className='error-link'
              
            >
              Click to home page
            </Link>
          
        </div>
        
    </div>
  )
}

export default Error