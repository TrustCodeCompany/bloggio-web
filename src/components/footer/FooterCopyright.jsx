import {
  RiGithubFill
} from 'react-icons/ri'

export const FooterCopyright = () => {
  return (
    <section className='mt-10 md:flex md:justify-between md:items-center lg:mb-7 '>
      <div className='text-center mb-6 md:mb-0'>
        <span className='font-bold dark:text-dark-accent'>TrustCode Company</span> - Todos los
        derechos reservados - 2024
      </div>
      <ul className='flex justify-evenly text-xl md:gap-4 md:text-2xl'>
        <li>
          <a href='#'>
            <RiGithubFill />
          </a>
        </li>
      </ul>
    </section>
  )
}
