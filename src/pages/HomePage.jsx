/* eslint-disable react/prop-types */
import { AllPosts, HeroHome, RecentPosts } from '../sections'
import { ScrollToTop } from '../components/ScrollToTop' // Importa el componente

export const HomePage = () => {
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
