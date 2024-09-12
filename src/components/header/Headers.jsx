import { useState, useEffect } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { Logo } from './Logo'
import { Navbar } from './Navbar'

export const Headers = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className='flex justify-between items-center mb-24'>
      <Logo />
      <Navbar />
      <button
        onClick={toggleDarkMode}
        className='bg-gray-200 dark:bg-gray-700 p-3 rounded-full transition-colors duration-300 md:ml-4'
        aria-label='Toggle Dark Mode'
      >
        {darkMode ? <FaSun className='text-yellow-500' /> : <FaMoon className='text-blue-500' />}
      </button>
    </header>
  )
}
