import React, {useState} from 'react';

const LoginForm = ( {login, signup} ) => {
    const [username, setUsername]       = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword]   = useState("");

    const [state, setState] = useState("Login");
    const handleSubmit = e => {
        e.preventDefault(); // prevent reload page default function
        if(state == 'Login'){
            login(username, password);
        }else{
            signup(username, email, password)
        }
    }
    return ( 
        <div className='Login' onSubmit={handleSubmit}>
            
            {state == "Sign up" ? <>
            <form className='loginForm'>
            <label className='login-label'>{state}</label><br></br>
            <input type="text" className='login-input' id="login-email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input><br></br>
            <input type="text" className='login-input' id="login-username" placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input><br></br>
            <input type="password" className='login-input' id="login-password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input><br></br>
            <button type='submit' className='login-btn'> Sign up </button>
            </form><p className='signup' >Already have an account? <span className='signup-link' onClick={() => {setState("Login");}}>Login</span></p> 
            </>
            : <>
            <form className='loginForm'>
            <label className='login-label'>{state}</label><br></br>
            <input type="text" className='login-input' id="login-username" placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input><br></br>
            <input type="password" className='login-input' id="login-password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input><br></br>
            <button type='submit' className='login-btn'> Login </button>
            </form>
            <p className='signup-link' onClick={() => {setState("Sign up");}}>Sign up</p>
            </>}
        </div>
        
    );
}

 
export default LoginForm;