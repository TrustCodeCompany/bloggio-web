import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'

export const HeroHome = () => {
  const { logged } = useUserStore()

  return (
    <div className=' mb-28'>
      <h1 className='text-2xl md:text-3xl font-bold font-Oswald text-center mx-auto mt-28'>
        Blog con Libertad: Historias y entrevistas
      </h1>
      <p className='text-gray-700 text-sm text-center mb-4'>
        Suscribete para aprender acerca de nuevos productos y últimas
        tecnologías
      </p>
      <div className='flex md:justify-center md:items-center mx-auto '>
        <p className='mr-4 font-bold w-[70%] md:w-fit'>Comienza a plasmar tus ideas en un nuevo Post</p>
        <Link
          to={logged ? '/create-post' : '/login-by-createPost'}
          className=' flex justify-center items-center font-bold hover:text-slate-900 hover:bg-orange-400 py-2 px-4 bg-slate-900 text-slate-100 transition-all text-xs rounded-xl shadow-xl'
        >
          Crear Post
        </Link>
      </div>
    </div>
  )
}
