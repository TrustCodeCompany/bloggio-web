import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa' // Icono de react-icons

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Mostrar el botón cuando se hace scroll hacia abajo
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className='fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-all'
        >
          <FaArrowUp size={20} />
        </div>
      )}
    </div>
  )
}
