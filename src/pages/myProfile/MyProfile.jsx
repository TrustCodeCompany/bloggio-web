import React, { useState } from 'react'
import imgUserAvatar from '../../../src/assets/images/user-male-avatar.png'
import { useUserStore } from '../../store/userStore.js'
import { MyProfileEditModal } from './myProfileEditModal/MyProfileEditModal.jsx'
import { Link, NavLink, Outlet } from 'react-router-dom'

export const MyProfile = () => {
  const { userShortBio, userName, userAvatar } = useUserStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [userData, setUserData] = useState({
    nickname: '',
    shortbio: '',
    avatar: null
  })

  const handleEditProfileClick = () => {
    setUserData({
      nickname: userName,
      shortbio: userShortBio,
      avatar: userAvatar
    })
    setModalOpen(true)
  }

  return (
    <>
      {/*  */}
      <div>
        <div className='bg-white rounded-lg border border-slate-400 p-4'>
          <ul className='flex space-x-6'>
            <li>
              <NavLink
                to='my-posts'
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 hover:text-blue-800 font-bold border-b-blue-900 border-b-4' : 'text-blue-600 hover:text-blue-800'}
              >
                Mis Publicaciones
              </NavLink>
            </li>
            <li>
              <NavLink
                to='my-posts-draft'
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 hover:text-blue-800 font-bold border-b-blue-900 border-b-4' : 'text-blue-600 hover:text-blue-800'}
              >
                Mis Borradores
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/*  */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>

        {/* Contenido de la opción seleccionada */}
        <div className='md:col-span-2 rounded-lg shadow-md p-6'>
          <Outlet />
        </div>

        <div className='bg-white rounded-lg shadow-md p-4 flex flex-col items-center'>
          {userAvatar
            ? (
              <img
                src={userAvatar}
                alt='Profile'
                className='w-24 h-24 rounded-full'
              />
              )
            : (
              <img
                src={imgUserAvatar}
                alt='Profile'
                className='w-24 h-24 rounded-full'
              />
              )}
          <h2 className='text-xl font-semibold mt-4'>{userName}</h2>
          <p>{userShortBio}</p>
          <button
            onClick={handleEditProfileClick}
            className='mt-2 text-blue-500 hover:underline'
          >
            Edit Profile
          </button>
        </div>

        {modalOpen && (
          <MyProfileEditModal
            userData={userData}
            setUserData={setUserData}
            setModalOpen={setModalOpen}
          />
        )}
      </div>
    </>
  )
}
