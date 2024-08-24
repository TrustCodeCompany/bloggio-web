import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'

export const MainMenuHeader = () => {
  const { logged } = useUserStore()

  return (
    <>
      <li className='list-none mb-8 sm:mb-0 md:cursor-pointer border-b border-b-gray-500 text-center leading-loose md:leading-none md:text-start md:w-fit md:mr-2 md:border-none'>
        <Link
          to='/'
          className='text-2xl font-extrabold uppercase hover:text-secondary p-3 md:hover:text-secondary md:hover:border-b md:hover:border-secondary transition-all md:text-base'
        >
          Inicio
        </Link>
      </li>

      <li className='list-none mb-8 sm:mb-0 md:cursor-pointer border-b border-b-gray-500 text-center leading-loose md:leading-none md:text-start md:w-fit md:mr-2 md:border-none'>
        <Link
          to='/categories'
          className='text-2xl font-extrabold uppercase hover:text-secondary p-3 md:hover:text-secondary md:hover:border-b md:hover:border-secondary transition-all md:text-base'
        >
          Categorias
        </Link>
      </li>

      <li className='list-none mb-8 sm:mb-0 md:cursor-pointer border-b border-b-gray-500 text-center leading-loose md:leading-none md:text-start md:w-fit md:mr-2 md:border-none'>
        <Link
          to='/about'
          className='text-2xl font-extrabold uppercase hover:text-secondary p-3 md:hover:text-secondary md:hover:border-b md:hover:border-secondary transition-all md:text-base'
        >
          Nosotros
        </Link>
      </li>

      <li className='list-none mb-8 sm:mb-0 md:cursor-pointer border-b border-b-gray-500 text-center leading-loose md:leading-none md:text-start md:w-fit md:border-none md:ml-4'>
        <Link
          to={logged ? '/create-post' : '/login-by-createPost'}
          className='text-2xl font-extrabold uppercase hover:text-slate-900 hover:bg-orange-400 p-3 md:py-2 md:px-4 md:bg-blue-500 md:text-slate-100 transition-all md:text-xs md:rounded-xl'
        >
          Crear Post
        </Link>
      </li>
    </>
  )
}
