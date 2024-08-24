import { useForm } from 'react-hook-form'
import { ShowSuccessAlert } from '../utils/index.js'
import { useNavigate } from 'react-router-dom'

export const Contac = () => {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onSubmit = async ({ username, email, message }) => {
    ShowSuccessAlert(
      'Tu correo fue enviado satisfactoriamente.'
    )
    navigate('/', { replace: true })
  }

  return (
    <div className='container mx-auto px-4 py-12'>
      {/* Título Principal */}
      <h1 className='text-4xl font-bold text-center mb-12'>Contactanos</h1>

      {/* Sección 1: subtitulo */}
      <h3 className='text-2xl font-bold'>
        Nos encantaría saber de usted, por favor póngase en contacto.
      </h3>

      {/* Formulario */}
      <div className='flex flex-wrap justify-center mt-10 mb-10'>
        <div className='flex flex-wrap justify-center items-center '>
          <form className='w-full max-w-lg' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-first-name'
                >
                  Nombre
                </label>
                <input
                  name='username'
                  {...register('username', {
                    required: true,
                    maxLength: 70
                  })}
                  className='w-full border rounded-lg px-3 py-2 ring-1 ring-slate-400 text-sm ring:border-secondary focus:outline-secondary transition-all'
                  id='grid-first-name' type='text'
                />
                {errors.username?.type === 'required' && (
                  <p className='text-sm text-red-700 font-bold transition-all'>
                    El Nombre es requerido.
                  </p>
                )}
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-last-name'
                >
                  Correo
                </label>
                <input
                  name='email'
                  {...register('email', {
                    required: true,
                    maxLength: 50
                  })}
                  className='w-full border rounded-lg px-3 py-2 ring-1 ring-slate-400 text-sm ring:border-secondary focus:outline-secondary transition-all'
                  id='grid-last-name' type='text'
                />
                {errors.email?.type === 'required' && (
                  <p className='text-sm text-red-700 font-bold transition-all'>
                    El email es requerido.
                  </p>
                )}
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-last-name'
                >
                  Mensaje
                </label>
                <textarea
                  id='message' rows='4'
                  name='message'
                  {...register('message', {
                    required: true,
                    maxLength: 1000
                  })}
                  className='w-full border rounded-lg px-3 py-2 ring-1 ring-slate-400 text-sm ring:border-secondary focus:outline-secondary transition-all'
                />
                {errors.message?.type === 'required' && (
                  <p className='text-sm text-red-700 font-bold transition-all'>
                    El Mensaje es requerido.
                  </p>
                )}
              </div>
            </div>
            <input
              type='submit'
              value='Enviar'
              className='bg-slate-950 text-slate-300 px-5 py-2 rounded-lg block w-[100%] shadow-2xl md:mt-10 md:py-4 cursor-pointer hover:scale-105 transition-all'
            />
          </form>
        </div>
      </div>
    </div>
  )
}
