import { Link } from 'react-router-dom'

export const MainMenuHeader = () => {
  return (
    <>
      <li className='list-none mb-8 sm:mb-0 md:cursor-pointer border-b border-b-gray-500 w-[60%] text-center leading-loose md:leading-none md:text-start md:w-fit md:mr-2 md:border-none'>
        <Link
          to='/'
          className='text-2xl font-extrabold uppercase hover:text-secondary text-4 p-3 md:hover:text-secondary md:hover:border-b md:hover:border-secondary transition-all md:text-base'
        >
          Inicio
        </Link>
      </li>

      <li className='list-none mb-8 sm:mb-0 md:cursor-pointer border-b border-b-gray-500 w-[60%] text-center leading-loose md:leading-none md:text-start md:w-fit md:mr-2 md:border-none'>
        <Link
          to='/categories'
          className='text-2xl font-extrabold uppercase hover:text-secondary text-4 p-3 md:hover:text-secondary md:hover:border-b md:hover:border-secondary transition-all md:text-base'
        >
          Categorias
        </Link>
      </li>

      <li className='list-none mb-8 sm:mb-0 md:cursor-pointer border-b border-b-gray-500 w-[60%] text-center leading-loose md:leading-none md:text-start md:w-fit md:mr-2 md:border-none'>
        <Link
          to='/about'
          className='text-2xl font-extrabold uppercase hover:text-secondary text-4 p-3 md:hover:text-secondary md:hover:border-b md:hover:border-secondary transition-all md:text-base'
        >
          Nosotros
        </Link>
      </li>

      <li className='list-none mb-8 sm:mb-0 md:cursor-pointer border-b border-b-gray-500 w-[60%] text-center leading-loose md:leading-none md:text-start md:w-fit md:mr-2 md:border-none'>
        <Link
          to='/create-post'
          className='text-2xl font-extrabold uppercase hover:text-secondary text-4 p-3 md:hover:text-secondary md:hover:border-b md:hover:border-secondary transition-all md:text-base'
        >
          Crear Post
        </Link>
      </li>
    </>
  )
}
