/* eslint-disable react/prop-types */
import { useState } from 'react'

export const ModalFindCategoriesByDate = ({ setShowFiltersModal, onApplyFilters }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleApplyFilters = () => {
    onApplyFilters(startDate, endDate)
    setShowFiltersModal(false)
  }

  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-30'>
      <div className='bg-white p-4 rounded-lg w-96'>
        <h2 className='text-lg font-semibold mb-4'>Filtros</h2>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Fecha de inicio</label>
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Fecha de fin</label>
          <input
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'
          onClick={handleApplyFilters}
        >
          Aplicar Filtros
        </button>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded-md mt-4 ml-2'
          onClick={() => setShowFiltersModal(false)}
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
