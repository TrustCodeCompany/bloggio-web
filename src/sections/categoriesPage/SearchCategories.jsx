import { useState, useEffect } from 'react'
import { CardType1 } from '../../components/shared/CardType1'

export const SearchCategories = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [posts, setPosts] = useState([])
  const [showFiltersModal, setShowFiltersModal] = useState(false)
  console.log(posts)

  useEffect(() => {
    const fetchPosts = async () => {
      if (searchTerm.trim() === '') {
        setPosts([])
        return
      }

      try {
        const response = await fetch('https://bloggio-api-ziu0.onrender.com/Post/find-all-by-filters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            categoryName: '',
            date_end: '',
            date_start: '',
            limit: 10,
            offset: 1,
            postTitle: searchTerm,
          }),
        })

        if (!response.ok) {
          console.error('Network response was not ok:', response.statusText)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        console.log('Data received from API:', data) // Verifica la estructura de la respuesta
        setPosts(data.data) // Ajusta esto según la estructura de la respuesta de tu API
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [searchTerm])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica adicional si decides tener un botón de búsqueda
  }

  const handleOpenFiltersModal = () => {
    setShowFiltersModal(true)
  }

  const handleCloseFiltersModal = () => {
    setShowFiltersModal(false)
  }

  return (
    <div className='flex flex-col w-full mb-6'>
      <section className='w-full mb-4'>
        <form onSubmit={handleSubmit} className='w-full flex justify-between'>
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
            className='bg-amber-400 rounded-lg ml-2 py-2 px-4 font-bold'
            onClick={handleOpenFiltersModal}
          >
            Filtros
          </button>
        </form>
      </section>

      {/* Ventana modal de filtros */}
      {showFiltersModal && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-30'>
          <div className='bg-white p-4 rounded-lg w-96'>
            <h2 className='text-lg font-semibold mb-4'>Filtros</h2>
            {/* Aquí puedes agregar filtros adicionales */}
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'
              onClick={handleCloseFiltersModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Mostrar resultados de búsqueda */}
      {posts.length > 0 ? (
        <div className='mt-4'>
          <h3 className='text-lg font-semibold mb-4'>Resultados de búsqueda</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {posts.map((post) => (
              <CardType1
                key={post.postId}
                img={post.postImage}
                title={post.postTitle}
                userNickName={post.userNickname}
                postCreated={post.postCreated}
                description={post.postDescription}
                postId={post.postId}
                category={post.categoryName}
              />
            ))}
          </div>
        </div>
      ) : (
        searchTerm && (
          <div className='mt-4'>
            <p>No se encontraron resultados para "{searchTerm}"</p>
          </div>
        )
      )}
    </div>
  )
}
