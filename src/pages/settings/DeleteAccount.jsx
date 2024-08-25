import { FaInfoCircle } from 'react-icons/fa'
import React from 'react'
import Swal from 'sweetalert2'
import { ENDPOINTS } from '../../api/apiEndpoints.js'
import { useUserStore } from '../../store/userStore.js'
import { ShowSuccessAlert } from '../../utils/index.js'
import { useNavigate } from 'react-router-dom'

export const DeleteAccount = () => {
  const navigate = useNavigate()
  const { id, logoutUser } = useUserStore()

  const handleClic = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro que deseas dar de baja su cuenta?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí!'
    })

    if (result.isConfirmed) {
      try {
        await fetch(ENDPOINTS.disabledAccount + '?uuid=' + id, {
          method: 'GET'
        })
        ShowSuccessAlert('Su cuenta ha sido dado de baja correctamente')
        logoutUser()
        navigate('/', { replace: true })
      } catch (error) {
        console.error('Error dando de baja la cuenta:', error)
        Swal.fire(
          'Error!',
          'Hubo un problema en la baja de la cuenta.',
          'error'
        )
      }
    }
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Dar de baja Cuenta</h2>
      <div className='flex items-center justify-center bg-red-500 p-2 rounded-md'>
        <FaInfoCircle size={43} className='text-slate-100 mx-3'/>
        <p className='ml-2 text-slate-100'>Al dar de baja su cuenta, se desactivarán sus posts y comentarios
          automáticamente
        </p>
      </div>
      <button
        onClick={handleClic}
        className='mt-2 text-blue-500 hover:underline'
      >
        Dar de Baja
      </button>
    </div>
  )
}
