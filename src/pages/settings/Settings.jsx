import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../store/userStore.js'
import { MyProfileCard } from '../myProfile/MyProfileCard.jsx'
import imgUserAvatar from '../../assets/images/user-male-avatar.png'
export const Settings = () => {
  const { userShortBio, userName, id, userAvatar } = useUserStore()

  const [userData, setUserData] = useState({
    nickname: '',
    shortbio: '',
    avatar: null
  })

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
      <div className=' grid grid-cols-1 sm:grid-cols-1 gap-4 bg-black'>
        <button
          className='mt-2 text-blue-500 hover:underline'
        >
          Dar de baja Cuenta
        </button>
        <button
          className='mt-2 text-blue-500 hover:underline'
        >
          Canbiar contraseña
        </button>
      </div>
      <div className='bg-black md:col-span-2 rounded-lg shadow-md p-4 flex flex-col items-center'>
        sdasd
      </div>
    </div>
  )
}
