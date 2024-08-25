import { useForm } from 'react-hook-form'
import { ENDPOINTS } from '../../api/apiEndpoints.js'
import { ShowErrorAlert, ShowSuccessAlert } from '../../utils/index.js'

export const ChangePassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onSubmit = async ({ email }) => {
    const dataFormated = {
      email
    }

    try {
      const response = await fetch(ENDPOINTS.resetRequest + '?email=' + email, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataFormated)
      })

      if (response.ok) {
        // ShowSuccessAlert('Usuario creado exitosamente')
        // navigate('/login', { replace: true })
      } else {
        ShowErrorAlert('Error en el envio de correo')
      }
    } catch (error) {
      console.error('Error en la solicitud de envio de correo:', error)
      ShowErrorAlert('Ocurrió un error. Por favor, intenta de nuevo más tarde.')
    }
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Cambiar Contraseña</h2>
      <p className='mb-6'>Aquí puedes cambiar tu contraseña...</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Input correo */}
        <div className='mb-6'>
          <label className='block text-sm'>Email</label>
          <input
            type='email'
            name='email'
            {...register('email', {
              required: true
            })}
            className='w-full border rounded-lg px-3 py-2 ring-1 ring-slate-400 text-sm ring:border-secondary focus:outline-secondary transition-all'
          />
          {errors.email?.type === 'required' && (
            <p className='text-sm text-red-700 font-bold transition-all'>
              El campo Email es requerido.
            </p>
          )}
        </div>
        <input
          type='submit'
          value='Enviar'
          className='bg-slate-950 text-slate-200 px-5 py-2 rounded-lg block w-[100%] shadow-2xl md:mt-10 md:py-4 cursor-pointer hover:scale-105 transition-all'
        />
      </form>
    </div>
  )
}
