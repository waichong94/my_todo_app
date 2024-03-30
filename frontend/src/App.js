import './App.css';
import LoginForm from './component/LoginSignup';
import TaskWrapper from './component/TaskWrapper';
import { doPost } from './utils'; 
import Navbar from './component/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const signup = async (username, email, password) => {
    let params = {
      username,
      password,
      email
    }
    let response = await doPost("/signup", params)
    if(!response.status){
      alert(response.msg);
      return;
    }
    
    localStorage.setItem('uid', response.data.id);
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('token', response.token);
    window.location.reload(false);
  }
  const login = async (username, password) => {
    let params = {
      username,
      password
    }
    let response = await doPost("/login", params)
    if(!response.status){
      alert(response.msg);
      return;
    }
    localStorage.setItem('uid', response.data.id);
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('token', response.token);
    window.location.reload(false);
  }
  const logout = async (id, name) => {
    localStorage.clear();
    window.location.reload(false);
  }

  return (
    <div className="App" style={{height:"100%"}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={localStorage.getItem('uid') !== null ? <><Navbar logout={logout} />
            <TaskWrapper /></> : <LoginForm login={login}  signup={signup}/> }>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
