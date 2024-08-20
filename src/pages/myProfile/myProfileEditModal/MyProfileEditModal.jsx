/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { ShowErrorAlert, ShowSuccessAlert } from '../../../utils'
import { useUserStore } from '../../../store/userStore'
import { TextInput } from './TextInput'
import { ImagePreview } from './ImagePreview'
import { FileInput } from './FileInput'
import { ActionButtons } from './ActionButtons'
import { ENDPOINTS } from '../../../api/apiEndpoints.js'

// Componente principal MyProfileEditModal: Modal para editar el perfil del usuario
export const MyProfileEditModal = ({ userData, setUserData, setModalOpen }) => {
  // Extrae valores y funciones del store global (Zustand)
  const { id, userAvatar, setUserAvatar } = useUserStore()

  // Estado local para la imagen seleccionada y el archivo de imagen
  const [imageSelected, setImageSelected] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  // useEffect para establecer la imagen actual del avatar al abrir el modal
  useEffect(() => {
    setImageSelected(userAvatar)
  }, [userAvatar])

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  // Función para manejar cambios en los datos del usuario
  const handleChangeUserData = (key, value) => {
    setUserData({
      ...userData,
      [key]: value || '' // Asegura que el valor nunca sea null
    })
  }

  // Función para guardar los datos del usuario y actualizar el perfil
  const handleSaveUserData = async () => {
    console.log(userData)
    console.log(imageFile)

    // Validación para el campo Nickname (es obligatorio)
    if (userData.nickname.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo de Nickname no puede estar vacío!'
      })
      return
    }

    // Formateo de los datos para enviarlos al servidor
    const dataFormatted = {
      userId: id,
      userNickname: userData.nickname,
      userShortBio: userData.shortbio || '' // Short Bio es opcional
    }
    const formData = new FormData()
    formData.append('user', new Blob([JSON.stringify(dataFormatted)], { type: 'application/json' }))

    // La imagen de usuario es opcional
    if (imageFile) {
      formData.append('file', new Blob([imageFile], { type: 'application/octet-stream' }))
    }

    try {
      const response = await fetch(ENDPOINTS.updateProfile, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Hubo un problema con la petición: ' + response.status)
      }

      ShowSuccessAlert('Datos actualizados correctamente')

      // Si se subió una nueva imagen, actualiza el avatar en el store global
      if (imageFile) {
        setUserAvatar(imageSelected)
      }
    } catch (error) {
      console.error('Error al enviar la petición:', error)
      ShowErrorAlert('Error al enviar la petición: ' + error.message)
    }
    setModalOpen(false) // Cierra el modal después de guardar
  }

  // Función para manejar la selección de imagen
  const handleSetImage = (image) => {
    setImageFile(image)
    setImageSelected(URL.createObjectURL(image)) // Muestra una vista previa de la imagen seleccionada
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-4 rounded-lg shadow-lg w-96'>
        <h2 className='text-xl font-semibold mb-4'>Edit Profile</h2>
        <TextInput
          placeholder='Nickname'
          value={userData.nickname}
          onChange={(e) => handleChangeUserData('nickname', e.target.value)}
        />
        <TextInput
          placeholder='Short Bio'
          value={userData.shortbio}
          onChange={(e) => handleChangeUserData('shortbio', e.target.value)}
        />
        <ImagePreview src={imageSelected} />
        <FileInput onChange={handleSetImage} />
        <ActionButtons
          onCancel={handleCloseModal}
          onSave={handleSaveUserData}
        />
      </div>
    </div>
  )
}
