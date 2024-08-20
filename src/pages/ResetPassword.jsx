import { useState } from 'react'

export const ResetPassword = () => {
  // Estado para las contraseñas y mensajes
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Maneja el cambio en el campo de nueva contraseña
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
    setError('') // Limpia el error cuando el usuario comienza a escribir
    setSuccessMessage('') // Limpia el mensaje de éxito
  }

  // Maneja el cambio en el campo de confirmación de contraseña
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    setError('') // Limpia el error cuando el usuario comienza a escribir
    setSuccessMessage('') // Limpia el mensaje de éxito
  }

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validación de las contraseñas
    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    try {
      // Reemplaza con la URL de tu endpoint para restablecer la contraseña
      const response = await fetch('https://tu-backend-api.com/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword })
      })

      const result = await response.json()

      if (response.ok) {
        // Muestra un mensaje de éxito si la contraseña se restableció correctamente
        setSuccessMessage(result.message || 'Su contraseña ha sido restablecida con éxito.')
      } else {
        // Muestra un mensaje de error en caso de que haya algún problema
        setError(result.message || 'Hubo un problema al restablecer la contraseña.')
      }
    } catch (error) {
      console.error('Error al enviar la petición:', error)
      setError('Hubo un problema al enviar la solicitud. Inténtelo de nuevo más tarde.')
    }

    // Limpia los campos después del envío
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className='flex items-center justify-center mt-8 mb-8'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-14'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label htmlFor='new-password' className='block text-sm font-medium text-gray-700'>
              Nueva Contraseña
            </label>
            <input
              type='password'
              id='new-password'
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder='Nueva contraseña'
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <div className='mb-8'>
            <label htmlFor='confirm-password' className='block text-sm font-medium text-gray-700'>
              Confirmar Nueva Contraseña
            </label>
            <input
              type='password'
              id='confirm-password'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder='Confirmar nueva contraseña'
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
          {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
          {successMessage && <p className='text-green-500 text-sm mb-4'>{successMessage}</p>}
          <button
            type='submit'
            className='w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600'
          >
            Restablecer Contraseña
          </button>
        </form>
      </div>
    </div>
  )
}
