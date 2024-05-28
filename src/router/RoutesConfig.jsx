import { Routes, Route } from 'react-router-dom'
// import { useLocalStorage } from 'react-use'
import { useUserStore } from '../store/userStore'
import { HomePage, LoginPage, AboutUs, ViajesPage, SignUp, DetailPost, Categories, CreatePost } from './../pages'
import { ProtectedRoutes } from './../utils/ProtectedRoutes'
import { Layout } from '../components'

export const RoutesConfig = () => {
  const { logged } = useUserStore()
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create-user' element={<SignUp />} />
        <Route path='/detail-post/:id' element={<DetailPost />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category-viajes' element={<ViajesPage />} />
        <Route path='/about' element={<AboutUs />} />

        <Route element={<ProtectedRoutes canActivate={logged} />}>
          <Route path='/create-post' element={<CreatePost />} />
        </Route>
      </Route>
    </Routes>
  )
}
