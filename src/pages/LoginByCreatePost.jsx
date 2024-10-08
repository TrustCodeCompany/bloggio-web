import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MutatingDots } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { fetchLogin } from './../api/api'
import { useUserStore } from './../store/userStore'

export const LoginByCreatePost = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) // Estado para el spinner

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const { setUser } = useUserStore()

  useEffect(() => {
    const notify = () => toast('Tienes que haber iniciado sesión para poder crear un post', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Bounce,
      type: 'info'
    })
    notify()
  }, [])

  const onSubmit = async ({ username, password }) => {
    const dataFormated = { userNickname: username, userPassword: password }

    setLoading(true) // Mostrar spinner
    try {
      const dataLogin = await fetchLogin(dataFormated)
      console.log('dataLogin', dataLogin)

      if (dataLogin === undefined) {
        throw new Error('Hubo un problema con la petición: ' + dataLogin.status)
      }

      setUser(
        dataLogin.userId,
        dataLogin.userNickname,
        dataLogin.userEmail,
        dataLogin.token,
        dataLogin.userPhoto
      )
      navigate('/create-post', { replace: true })
    } finally {
      setLoading(false) // Ocultar spinner
    }
  }

  return (
    <>
      <ToastContainer /> {/* Contenedor de Toastify */}
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

      <div className='flex flex-col justify-between mt-20 mb-20'>
        <div className='flex flex-col justify-center items-center '>
          <h1 className='text-2xl font-extrabold mb-4 md:text-3xl md:mb-8'>
            Login de Usuario
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
              className='bg-slate-950 text-slate-300 px-5 py-2 rounded-lg block w-[100%] shadow-2xl md:mt-10 md:py-4 cursor-pointer hover:scale-105 transition-all'
            />

            <Link
              to='/recovery-password'
              className='block text-center pt-2 pb-4 text-blue-900 text-sm'
            >
              ¿Olvidaste tu contraseña?
            </Link>

            <p className='mt-3'>
              No tienes cuenta?{' '}
              <Link
                to='/create-user'
                className='text-purple-700 hover:text-secondary transition-all'
              >
                Crear una cuenta
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
