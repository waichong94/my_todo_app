import React from 'react'

function Navbar(props) {
  return (
    <div className="navbar">
        <div className='user-profile'>
            <img src="favicon.ico" alt="Avatar" className='user-img'></img>
            <div className='user-name'>{localStorage.getItem('username')}</div>
        </div>
        <div className='user-logout' onClick={() => {
        props.logout();
        }}>Logout</div>
    </div>
  )
}

export default Navbar