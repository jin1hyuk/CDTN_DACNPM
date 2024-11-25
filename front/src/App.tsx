import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import DigiForumThreads from './pages/DigiForumHome';
import WrapUser from './WrapUser';
import Profile from './pages/Profile';
import CreateProst from './pages/CreateProst';
import ThreadDetail from './pages/ThreadDetail';
import TopLeader from './pages/TopLeader';
import ErrorPage from './pages/ErrorPage';
import WelcomePage from './pages/WelcomePage';
import AuthWrapper from './AuthWrapper';
import LayoutAdmin from './LayoutAdmin';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Post from './pages/admin/Post';
import User from './pages/admin/User';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={ 
          <WrapUser>
              <WelcomePage/>
          </WrapUser>

        } />
        <Route path="/home" element={ 
          <WrapUser>
              <DigiForumThreads/>
          </WrapUser>

        } />
        <Route path="/profile" element={ 
          // <AuthWrapper>
          <WrapUser>
              <Profile/>
          </WrapUser>
          // </AuthWrapper>

        } />
        <Route path="/create" element={ 
          <AuthWrapper>
          <WrapUser>
              <CreateProst/>
          </WrapUser>
          </AuthWrapper>

        } />
        <Route path="/detail/:id" element={ 
          <WrapUser>
              <ThreadDetail/>
          </WrapUser>

        } />
        <Route path="/top-leader" element={ 
          <WrapUser>
              <TopLeader/>
          </WrapUser>

        } />
        <Route path="/admin/post" element={ 
          <LayoutAdmin>
            <Post/>
          </LayoutAdmin>

        } />

        <Route path="/admin/user" element={ 
          <LayoutAdmin>
            <User/>
          </LayoutAdmin>

        } />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </BrowserRouter>
    </>
  )
}

export default App
