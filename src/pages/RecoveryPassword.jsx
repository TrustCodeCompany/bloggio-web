import { useState } from 'react'
import { Link } from 'react-router-dom'

export const RecoveryPassword = () => {
  // Estado para el correo y mensajes
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Expresión regular para validar el correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Maneja el cambio en el campo de correo electrónico
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setError('') // Limpia el error cuando el usuario comienza a escribir
    setSuccessMessage('') // Limpia el mensaje de éxito
  }

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validación del correo electrónico
    if (!emailRegex.test(email)) {
      setError('Por favor, ingrese un correo electrónico válido.')
      return
    }

    try {
      // Reemplaza con la URL de tu endpoint para recuperar contraseña
      const response = await fetch('https://tu-backend-api.com/recover-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const result = await response.json()

      if (response.ok) {
        // Muestra un mensaje de éxito si el correo existe
        setSuccessMessage(result.message || 'En breve se le enviará un correo para restablecer su contraseña.')
      } else {
        // Muestra un mensaje de error si el correo no existe
        setError(result.message || 'El correo electrónico aún no está registrado.')
      }
    } catch (error) {
      console.error('Error al enviar la petición:', error)
      setError('Hubo un problema al enviar la solicitud. Inténtelo de nuevo más tarde.')
    }

    // Limpia el campo de correo electrónico después del envío
    setEmail('')
  }

  return (
    <div className='flex items-center justify-center mt-8 mb-8'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-14'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-8'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Correo Electrónico
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={handleEmailChange}
              placeholder='tu-email@ejemplo.com'
              className='w-full p-2 border border-gray-300 rounded'
            />
            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            {successMessage && <p className='text-green-500 text-sm mt-2'>{successMessage}</p>}
          </div>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600'
          >
            Restablecer Contraseña
          </button>

          <Link
            to='/reset-password'
            className='block w-full mt-10 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600'
          >
            Boton temporal ver Reset Password
          </Link>
        </form>
      </div>
    </div>
  )
}
