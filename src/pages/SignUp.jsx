import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MutatingDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { ShowErrorAlert } from '../utils/ShowErrorAlert'
import { ShowSuccessAlert } from '../utils/ShowSuccessAlert'
import { ENDPOINTS } from '../api/apiEndpoints.js'

export const SignUp = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) // Estado para el spinner

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  // const { setUser, setLogged } = useUserStore()

  const onSubmit = async ({ username, email, password }) => {
    const dataFormated = {
      roles: ['ROLE_USER'],
      userEmail: email,
      userNickname: username,
      userPassword: password
    }

    setLoading(true) // Mostrar spinner
    try {
      const response = await fetch(ENDPOINTS.signup, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataFormated)
      })

      if (response.ok) {
        ShowSuccessAlert('Usuario creado exitosamente')
        navigate('/login', { replace: true })
      } else {
        ShowErrorAlert('Error en la creación de nuevo usuario')
      }
    } catch (error) {
      console.error('Error en la solicitud de login:', error)
      ShowErrorAlert('Ocurrió un error. Por favor, intenta de nuevo más tarde.')
    } finally {
      setLoading(false) // Ocultar spinner
    }
  }

  return (
    <>

      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30'>
          <MutatingDots
            visible
            height='100'
            width='100'
            color='#172A99'
            secondaryColor='#69141B'
            radius='12.5'
            ariaLabel='mutating-dots-loading'
          />
        </div>
      )}

      <div className='flex flex-col justify-between mt-20'>
        <div className='flex flex-col justify-center items-center '>
          <h1 className='text-2xl font-extrabold mb-4 md:text-3xl md:mb-8'>
            Crear Usuario
          </h1>
          <form
            className='w-[90%] md:w-2/3 lg:w-1/3'
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Input nombre de usuario */}
            <div className='mb-6'>
              <label className='block text-sm'>Nombre usuario</label>
              <input
                type='text'
                name='username'
                {...register('username', {
                  required: true,
                  maxLength: 15
                })}
                className='w-full border rounded-lg px-3 py-2 ring-1 ring-slate-400 text-sm ring:border-secondary focus:outline-secondary transition-all'
              />
              {errors.username?.type === 'required' && (
                <p className='text-sm text-red-700 font-bold transition-all'>
                  El campo Nombre de usuario es requerido.
                </p>
              )}
              {errors.username?.type === 'maxLength' && (
                <p className='text-sm text-red-700 font-bold transition-all'>
                  El campo Nombre de usuario debe tener máximo 15 caracteres.
                </p>
              )}
            </div>

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

            {/* Input contraseña */}
            <div className='mb-6'>
              <label className='block text-sm'>Contraseña</label>
              <input
                type='password'
                {...register('password', {
                  required: true,
                  minLength: 6
                })}
                className='w-full border rounded-lg px-3 py-2 ring-1 ring-slate-400 text-sm ring:border-secondary focus:outline-secondary transition-all'
              />
              {errors.password?.type === 'minLength' && (
                <p className='text-sm text-red-700 font-bold transition-all'>
                  La contraseña debe tener mínimo 6 caracteres.
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
      </div>
    </>
  )
}
