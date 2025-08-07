import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Registration from './pages/Registration';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Protectedroute><HomePage /></Protectedroute>} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
//check in localstorage kay user ka data hay ya nahi
export function Protectedroute(props){
if(localStorage.getItem('user')){
  return props.children;
}
else{
  return <Navigate to='/login'/>
}
}

export default App;