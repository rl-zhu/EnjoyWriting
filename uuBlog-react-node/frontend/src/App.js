// import logo from './logo.svg';
import './App.css';
import { unstable_HistoryRouter as HistoryRouter, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { history } from './utils/history';
import { AuthComponent } from '@/components/AuthComponent'
import Login from '@/pages/Login';
import Layout from '@/pages/Layout';
import Publish from './pages/Layout/Publish';
import Profile from './pages/Layout/Profile';
import Article from './pages/Layout/Article/index'

import Register from './pages/register';

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        {/* <Button type="dashed">Dashed Button</Button> */}
        <Routes>
          <Route path='/' element={<Login />}> </Route>
          <Route path='/register' element={<Register />}> </Route>

          <Route path='/my' element={
            <AuthComponent>
              <Layout />
            </AuthComponent>
          }>
            <Route path='profile' element={<Profile />}> </Route>
            <Route path='article' element={<Article />}> </Route>
            <Route path='publish' element={<Publish />}> </Route>
          </Route>
        </Routes>
      </div>

    </HistoryRouter>

  );
}

export default App;
