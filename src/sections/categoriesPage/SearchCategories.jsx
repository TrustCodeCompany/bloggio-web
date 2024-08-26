import { useState, useEffect } from 'react'
import { ModalFindCategoriesByDate } from './ModalFindCategoriesByDate'
import { ResultFindCategories } from './ResultFindCategories'
import { ENDPOINTS } from '../../api/apiEndpoints.js'

export const SearchCategories = () => {
  const [searchTerm, setSearchTerm] = useState(undefined)
  const [posts, setPosts] = useState([])
  const [showFiltersModal, setShowFiltersModal] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      // Si el término de búsqueda está vacío, no se realiza ninguna solicitud
      if (searchTerm === '' && !startDate && !endDate) {
        // setPosts([]) // Limpia los posts si no hay búsqueda ni fechas
        setSearchTerm(undefined)
        return
      }

      try {
        const response = await fetch(ENDPOINTS.getAllPostByPostTitle, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            categoryName: '',
            date_end: endDate,
            date_start: startDate,
            limit: 20,
            offset: 1,
            postTitle: searchTerm
          })
        })

        if (!response.ok) {
          console.error('Network response was not ok:', response.statusText)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        console.log('Data received from API:', data)
        setPosts(data.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setPosts([]) // Limpia los posts en caso de error
      }
    }

    fetchPosts()
  }, [searchTerm, startDate, endDate])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    // Si el input está vacío, limpiar los resultados
    if (value.trim() === '') {
      setPosts([])
    }
  }

  const handleOpenFiltersModal = () => {
    setShowFiltersModal(true)
  }

  const handleApplyFilters = (start, end) => {
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <div className='flex flex-col w-full mb-6'>
      <section className='w-full mb-4'>
        <form
          onSubmit={(e) => e.preventDefault()} // Evita el comportamiento predeterminado del formulario
          className='w-full flex justify-between'
        >
          <input
            type='text'
            name='searchCategories'
            id='searchCategories'
            placeholder='Ingresa categoría o título'
            className='p-2 w-full rounded-lg text-sm ring-1 ring-slate-400'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            type='button' // Asegúrate de que el botón no actúe como un botón de submit
            className='bg-amber-400 rounded-lg ml-2 py-2 px-4 font-bold'
            onClick={handleOpenFiltersModal}
          >
            Filtros
          </button>
        </form>
      </section>

      {/* Ventana modal de filtros */}
      {showFiltersModal && (
        <ModalFindCategoriesByDate
          setShowFiltersModal={setShowFiltersModal}
          onApplyFilters={handleApplyFilters}
        />
      )}

      {/* Mostrar resultados de búsqueda */}
      {posts.length > 0
        ? (
          <ResultFindCategories posts={posts} />
          )
        : (
            searchTerm && (
              <div className='mt-4'>
                <p>No se encontraron resultados para "{searchTerm}"</p>
              </div>
            )
          )}
    </div>
  )
}
