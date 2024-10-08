import { FooterCopyright } from './FooterCopyright'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className='text-sm mt-24'>
      <section className='lg:flex lg:mb-11'>
        <div className='flex gap-4 mb-12 md:items-center md:justify-center lg:flex-col lg:items-start lg:basis-[25%]'>
          <Link to='/' className='text-3xl font-bold dark:text-dark-accent'>Bloggio</Link>
          <p className='text-end lg:text-start'>
            Un espacio donde puedes expresar tus ideas con libertad
          </p>
        </div>
        <div className='md:flex md:justify-between lg:w-[75%]'>
          <div className='flex justify-around mb-10 md:w-1/2'>
            <ul className=''>
              <li className='text-slate-900 font-bold text-base underline mb-4 dark:text-dark-accent'>Empresa</li>
              <Link
                to='/about'
                className='text-sm hover:text-secondary md:hover:text-secondary'
              >
                Nosotros
              </Link>
              <li
                className='list-none'
              >
                <Link
                  to='/contact'
                  className='text-sm hover:text-secondary md:hover:text-secondary'
                >
                  Contacto
                </Link>
              </li>
            </ul>

            {/* <ul>
              <li className='text-slate-400'>Recursos</li>
              <li>Blog</li>
              <li>Boletin</li>
              <li>Publicidad</li>
              <li>Soporte</li>
            </ul> */}
          </div>
          {/* <div className='flex justify-around mb-10 md:w-1/2'>
            <ul className=''>
              <li className='text-slate-400'>Redes Sociales</li>
              <li>Twitter</li>
              <li>Linkeding</li>
              <li>Facebook</li>
              <li>Instagram</li>
            </ul>

            <ul>
              <li className='text-slate-400'>Legal</li>
              <li>Términos</li>
              <li>Privacidad</li>
              <li>Licencias</li>
            </ul>
          </div> */}
        </div>
      </section>

      <hr className=' border-slate-300 dark:border-dark-accent/15' />

      <FooterCopyright />
    </div>
  )
}
