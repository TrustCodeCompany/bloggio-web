import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userAvatarDefault from '../../assets/images/user-male-avatar.png'
import { useUserStore } from '../../store/userStore'

export const LoggedInAvatarMenu = () => {
  const navigate = useNavigate()
  const [photoClicked, setPhotoClicked] = useState(false)
  const { logoutUser, userName, userAvatar } = useUserStore()

  const menuRef = useRef(null)
  const imgRef = useRef(null)

  const handlePhotoClick = () => {
    setPhotoClicked((prev) => !prev)
  }

  const handleLogoutClick = (event) => {
    event.preventDefault()
    logoutUser()
    navigate('/', { replace: true })
    setPhotoClicked(false) // Oculta el menú después de cerrar sesión
  }

  const handleClickOutside = (event) => {
    if (
      menuRef.current && !menuRef.current.contains(event.target) &&
      imgRef.current && !imgRef.current.contains(event.target)
    ) {
      setPhotoClicked(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='object-cover relative flex justify-center'>
      <img
        ref={imgRef}
        className='w-14 h-14 object-cover rounded-full object-top border-2 border-slate-950 cursor-pointer'
        onClick={handlePhotoClick}
        src={userAvatar || userAvatarDefault}
        alt=''
      />

      <div
        ref={menuRef}
        className={`transition-all bg-slate-950 text-slate-200 text-sm absolute top-16 md:right-0 py-4 px-4 rounded-lg text-center w-[200px] 
                    ${photoClicked ? 'block' : 'hidden'}`}
      >
        <p className='text-[10px] text-secondary font-bold border-b border-b-secondary text-center mb-4'>
          {`Hola ${userName}`}
        </p>
        <ul className='leading-8'>
          <li className='hover:text-secondary'>
            <Link className='' to='/create-post' onClick={handlePhotoClick}>
              Crear Post
            </Link>
          </li>
          <li className='hover:text-secondary'>
            <Link className='' to='/my-profile' onClick={handlePhotoClick}>
              Mi Perfil
            </Link>
          </li>
          <li className='hover:text-secondary'>
            <a href='#' onClick={handlePhotoClick}>Configuración</a>
          </li>
          <li className='text-orange-700 uppercase font-bold text-xs'>
            <Link
              className='hover:bg-orange-700 hover:text-slate-300 block w-full mt-2 py-2 rounded-md transition-all'
              onClick={handleLogoutClick}
            >
              Cerrar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
