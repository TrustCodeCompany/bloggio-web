/* eslint-disable react/prop-types */
export const ModalFindCategoriesByDate = (setShowFiltersModal) => {
  const handleCloseFiltersModal = () => {
    setShowFiltersModal(false)
  }

  return (
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
  )
}
