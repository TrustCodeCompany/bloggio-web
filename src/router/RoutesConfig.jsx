import { Route, Routes } from 'react-router-dom'
import { EditPost, Layout } from '../components'
import { useUserStore } from '../store/userStore'
import {
  AboutUs,
  Categories,
  CocinaPage,
  Contac,
  CreatePost,
  DeportesPage,
  DetailPost,
  HomePage,
  LoginByCreatePost,
  LoginPage,
  MyProfile,
  OtrosCategoriesPage,
  PaternidadPage,
  RecoveryPassword,
  ResetPassword,
  SaludPage,
  Settings,
  SignUp,
  TecnologiaPage,
  ViajesPage
} from './../pages'
import { ProtectedRoutes } from './../utils/ProtectedRoutes'

export const RoutesConfig = () => {
  const { logged } = useUserStore()
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/login-by-createPost' element={<LoginByCreatePost />} />
        <Route path='/create-user' element={<SignUp />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/detail-post/:id' element={<DetailPost />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category-viajes' element={<ViajesPage />} />
        <Route path='/category-salud' element={<SaludPage />} />
        <Route path='/category-cocina' element={<CocinaPage />} />
        <Route path='/category-tecnologia' element={<TecnologiaPage />} />
        <Route path='/category-paternidad' element={<PaternidadPage />} />
        <Route path='/category-deportes' element={<DeportesPage />} />
        <Route path='/category-otros' element={<OtrosCategoriesPage />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contac />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/recovery-password' element={<RecoveryPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='*' element={<HomePage />} />

        <Route element={<ProtectedRoutes canActivate={logged} />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/edit-post/:id' element={<EditPost />} /> {/* Nueva ruta protegida para editar post */}
        </Route>
      </Route>
    </Routes>
  )
}
