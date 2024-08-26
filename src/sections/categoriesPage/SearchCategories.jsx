import { useState, useEffect, useCallback } from 'react'
import { ModalFindCategoriesByDate } from './ModalFindCategoriesByDate'
import { ResultFindCategories } from './ResultFindCategories'
import { ENDPOINTS } from '../../api/apiEndpoints.js'

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const SearchCategories = () => {
  const [searchTerm, setSearchTerm] = useState(undefined)
  const [posts, setPosts] = useState([])
  const [showFiltersModal, setShowFiltersModal] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const debouncedStartDate = useDebounce(startDate, 500)
  const debouncedEndDate = useDebounce(endDate, 500)

  const fetchPosts = useCallback(async () => {
    // Verificar si hay un término de búsqueda o filtros de fecha antes de hacer la solicitud
    if (debouncedSearchTerm === undefined && !debouncedStartDate && !debouncedEndDate) {
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
          date_end: debouncedEndDate,
          date_start: debouncedStartDate,
          limit: 20,
          offset: 1,
          postTitle: debouncedSearchTerm || ''
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
      setPosts([])
    }
  }, [debouncedSearchTerm, debouncedStartDate, debouncedEndDate])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleSearchChange = (e) => {
    const value = e.target.value.trim()
    setSearchTerm(value === '' ? undefined : value)

    if (value === '') {
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
          onSubmit={(e) => e.preventDefault()}
          className='w-full flex justify-between'
        >
          <input
            type='text'
            name='searchCategories'
            id='searchCategories'
            placeholder='Ingresa categoría o título'
            className='p-2 w-full rounded-lg text-sm ring-1 ring-slate-400'
            value={searchTerm ?? ''}
            onChange={handleSearchChange}
          />
          <button
            type='button'
            className='bg-amber-400 rounded-lg ml-2 py-2 px-4 font-bold'
            onClick={handleOpenFiltersModal}
          >
            Filtros
          </button>
        </form>
      </section>

      {showFiltersModal && (
        <ModalFindCategoriesByDate
          setShowFiltersModal={setShowFiltersModal}
          onApplyFilters={handleApplyFilters}
        />
      )}

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
