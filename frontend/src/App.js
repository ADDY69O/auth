
  import { BrowserRouter, Route, Routes } from 'react-router-dom';
  import './App.css';
  import Login from './components/Login'
  import Home from './components/Home'
  import SignUp from './components/SignUp'

  function App() {
    return <>
    <BrowserRouter>
  
  <Routes>

  <Route exact path='/' element={<Login/>} />
  <Route exact path='/SignUp' element={<SignUp/>} />
  <Route exact path='/home' element={<Home/>} />

  </Routes>

  </BrowserRouter>
    </>;
  }

  export default App;
