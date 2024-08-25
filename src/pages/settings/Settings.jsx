import { Link, Outlet } from 'react-router-dom'

export const Settings = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-100'>
      {/* Menú lateral */}
      <div className='bg-white rounded-lg shadow-md p-4'>
        <ul className='space-y-4'>
          <li>
            <Link
              to='delete-account'
              className='text-blue-600 hover:text-blue-800'
            >
              Dar de baja Cuenta
            </Link>
          </li>
          <li>
            <Link
              to='change-password'
              className='text-blue-600 hover:text-blue-800'
            >
              Cambiar contraseña
            </Link>
          </li>
        </ul>
      </div>

      {/* Contenido de la opción seleccionada */}
      <div className='bg-white md:col-span-2 rounded-lg shadow-md p-6'>
        <Outlet />
      </div>
    </div>
  )
}
