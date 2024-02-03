import React from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Search from './pages/Search'
import PrivateRoute from "./components/PrivateRoute"
import OnlyAdmin from './components/OnlyAdmin'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'


function App() {
  return (
       <BrowserRouter>
             <Header/>
           <Routes>
                 <Route path="/" element={<Home/>}></Route>
                 <Route path="/about" element={<About/>}></Route>
                 <Route path="/register" element={<SignUp/>}></Route>
                 <Route path="/login" element={<SignIn/>}></Route>
                 <Route path='/search' element={<Search />} />

                  <Route element={<OnlyAdmin/>}>
                       <Route path='/create-post' element={<CreatePost />} />
                       <Route path='/update-post/:postId' element={<UpdatePost />} />
                     </Route>

                 <Route element={<PrivateRoute/>}>
                     <Route path="/dashboard" element={<Dashboard/>}></Route>
                 </Route>

                 <Route path="/projects" element={<Projects/>}></Route>
                 <Route path='/post/:postSlug' element={<PostPage />} />

           </Routes>
           <Footer/>
       </BrowserRouter>
  )
}

export default App
