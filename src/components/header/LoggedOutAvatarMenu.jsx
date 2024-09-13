import { Link } from 'react-router-dom'

export const LoggedOutAvatarMenu = () => {
  return (
    <>
      <Link
        className='bg-slate-900 text-slate-200 font-bold px-4 py-4 rounded-xl transition-all dark:bg-bgDarkGrayColor dark:hover:bg-dark-secondary dark:border-gray-400 border dark:text-dark-textColor dark:hover:text-dark-textColor hover:text-secondary hover:shadow-xl md:ml-2 mb-6 mt-10 md:mt-0 md:mb-0 w-2/3 md:w-fit text-center uppercase text-lg md:text-xs md:py-2 md:px-8'
        to='/login'
      >
        Login
      </Link>
    </>
  )
}
