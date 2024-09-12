import { Outlet } from 'react-router-dom'
import { Footer } from '../footer/Footer'
import { Headers } from '../header/Headers'
import { ScrollToTop } from '../ScrollToTop'

export const Layout = () => {
  return (
    <div className='font-nunito p-6 md:max-w-[1200px] md:w-[90%] lg:w-[80%] md:m-auto min-h-screen bg-bgColor text-textColor dark:bg-dark-bgColor dark:text-dark-textColor transition-colors duration-300'>
      <Headers />
      <main className=''>
        <Outlet />
        <ScrollToTop />
      </main>
      <Footer />
    </div>
  )
}
