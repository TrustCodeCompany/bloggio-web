/* eslint-disable react/prop-types */
import { useState } from 'react'
import Swal from 'sweetalert2'
import { ShowErrorAlert, ShowSuccessAlert } from '../../utils'
import { useUserStore } from '../../store/userStore'

export const MyProfileEditModal = ({ userData, setUserData, setModalOpen }) => {
  const { id } = useUserStore()
  const [imageSelected, setImageSelected] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  const urlUpdateProfile = 'https://bloggio-api-zc58.onrender.com/auth/update-profile'

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleChangeUserData = (key, value) => {
    setUserData({
      ...userData,
      [key]: value || '' // Asegura que no sea null
    })
  }

  const handleSaveUserData = async () => {
    if (userData.nickname.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo de Nickname no puede estar vacío!'
      })
      return
    }

    const dataFormatted = {
      userId: id,
      userNickname: userData.nickname,
      userShortBio: userData.shortbio
    }
    const formData = new FormData()
    formData.append('user', new Blob([JSON.stringify(dataFormatted)], { type: 'application/json' }))
    formData.append('file', imageFile || '')

    try {
      const response = await fetch(urlUpdateProfile, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Hubo un problema con la petición: ' + response.status)
      }

      ShowSuccessAlert('Datos actualizados correctamente')
    } catch (error) {
      console.error('Error al enviar la petición:', error)
      ShowErrorAlert('Error al enviar la petición: ' + error.message)
    }
    setModalOpen(false)
  }

  const handleSetImage = (image) => {
    setImageFile(image)
    setImageSelected(URL.createObjectURL(image))
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-4 rounded-lg shadow-lg w-96'>
        <h2 className='text-xl font-semibold mb-4'>Edit Profile</h2>
        <input
          type='text'
          placeholder='Nickname'
          value={userData.nickname}
          onChange={(e) => handleChangeUserData('nickname', e.target.value)}
          className='w-full p-2 border border-gray-300 rounded mb-2'
        />
        <input
          type='text'
          placeholder='Short Bio'
          value={userData.shortbio}
          onChange={(e) => handleChangeUserData('shortbio', e.target.value)}
          className='w-full p-2 border border-gray-300 rounded mb-2'
        />
        {userData.avatar && (
          <img
            className='h-auto w-24 ml-2'
            src={userData.avatar}
            alt='Avatar'
          />
        )}
        <input
          type='file'
          onChange={(e) => handleSetImage(e.target.files[0])}
          className='w-full p-2 border border-gray-300 rounded mb-2'
        />
        <div className='flex justify-end'>
          <button onClick={handleCloseModal} className='mr-2 p-2 border rounded'>Cancel</button>
          <button onClick={handleSaveUserData} className='p-2 border rounded bg-blue-500 text-white'>Save</button>
        </div>
      </div>
    </div>
  )
}
