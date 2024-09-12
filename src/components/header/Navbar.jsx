/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useUserStore } from '../../store/userStore'

import burgerMenu from '../../assets/icons/icon-hamburger.svg'
import closeMenu from '../../assets/icons/icon-menu-close.svg'

import { MainMenuHeader } from './MainMenuHeader'
import { LoggedInAvatarMenu } from './LoggedInAvatarMenu'
import { LoggedOutAvatarMenu } from './LoggedOutAvatarMenu'

export const Navbar = () => {
  const [menuClicked, setMenuClicked] = useState(false)

  const handleClick = () => {
    setMenuClicked(() => !menuClicked)
  }

  const { logged } = useUserStore()

  return (
    <>
      <ul
        className={`bg-amber-400 h-[100vh] w-[100vw] right-full absolute top-0 mt-0 pl-0 transition-all z-30 md:right-0 md:bg-bgColor md:static md:h-auto ${menuClicked ? '!right-0' : ''} dark:bg-dark-bgColor dark:text-dark-textColor`}
      >
        <div className='flex justify-end'>
          <div className='p-6 md:hidden' onClick={handleClick}>
            <img className='w-12 h-12' src={closeMenu} alt='' />
          </div>
        </div>

        <div className='flex flex-col mt-10 items-center h-full md:flex-row md:mt-0 md:h-auto md:justify-end'>
          {/* aca va el menu principal */}
          <MainMenuHeader />
          {logged
            ? (
              // aca va el menu cuando esta logueado el usuario
              <LoggedInAvatarMenu />
              )
            : (
              // aca va el menu cuando NO esta logueado el usuario
              <LoggedOutAvatarMenu />
              )}
        </div>
      </ul>

      <div>
        <img
          className={`${menuClicked ? '' : ''
            } w-10 h-10 cursor-pointer sm:hidden`}
          src={burgerMenu}
          onClick={handleClick}
          alt='icon-hamburger'
        />
      </div>
    </>
  )
}
