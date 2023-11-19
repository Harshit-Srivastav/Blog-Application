import './App.css';
import Header from './Header';
import Layout from './Layout';
import Post from './Post';
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddBlog from './pages/AddBlog';
import Posts from './Posts';
import SinglePost from './Post';
import EditPost from './pages/EditPost';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={
        <Posts/>
       }>
      </Route>
      <Route path='/edit/post/:id' element={<EditPost/>}></Route>
      <Route path='login' element={<LoginPage/>}></Route>
      <Route path='register' element={<RegisterPage/>}></Route>
      <Route path='addBlog' element={<AddBlog/>}></Route>
      <Route path='/post/:id' element={<SinglePost/>}></Route>
      </Route>  
    </Routes>
  )
}

export default App;
