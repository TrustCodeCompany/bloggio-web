import { useEffect } from 'react'
import { AllPosts, HeroHome, RecentPosts } from '../sections'
import { useUserStore } from '../store/userStore'
import { toast } from 'react-toastify'

export const HomePage = () => {
  const { reactiveAccount, setUser } = useUserStore()

  useEffect(() => {
    if (reactiveAccount) {
      toast.success('¡Bienvenido nuevamente! Tu cuenta ha sido reactivada.')
      setUser((prevState) => ({
        ...prevState,
        reactiveAccount: false
      }))
    }
  }, [reactiveAccount, setUser])

  return (
    <div className='bg-bgColor text-textColor dark:bg-dark-bgColor dark:text-dark-textColor transition-colors duration-300'>
      <HeroHome />
      <RecentPosts />
      <hr className=' m-auto mt-6 mb-6 lg:mt-10 lg:mb-10 dark:border-dark-accent/15' />
      <AllPosts />
      <hr className=' m-auto mt-6 mb-6 lg:mt-10 lg:mb-10 dark:border-dark-accent/15' />
    </div>
  )
}
