import { useEffect } from 'react'
import { AllPosts, HeroHome, RecentPosts } from '../sections'
import { useUserStore } from '../store/userStore'
import { toast } from 'react-toastify' // Puedes usar cualquier librería de notificaciones

export const HomePage = () => {
  const { reactiveAccount, setUser } = useUserStore()

  useEffect(() => {
    if (reactiveAccount) {
      // Mostrar mensaje de bienvenida por reactivación
      toast.success('¡Bienvenido nuevamente! Tu cuenta ha sido reactivada.')

      // Cambiar reactiveAccount a false
      setUser(
        (prevState) => ({
          ...prevState,
          reactiveAccount: false
        })
      )
    }
  }, [reactiveAccount, setUser])

  return (
    <>
      <HeroHome />
      <RecentPosts />
      <hr className='bg-gray-600 m-auto mt-6 mb-6 lg:mt-10 lg:mb-10' />
      <AllPosts />
      <hr className='bg-gray-600 m-auto mt-6 mb-6 lg:mt-10 lg:mb-10' />
    </>
  )
}
