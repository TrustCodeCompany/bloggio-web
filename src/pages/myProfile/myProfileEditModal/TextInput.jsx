/* eslint-disable react/prop-types */
// Componente TextInput: Componente reutilizable para entradas de texto
export const TextInput = ({ placeholder, value, onChange }) => {
  return (
    <input
      type='text'
      placeholder={placeholder} // Placeholder para mostrar una sugerencia de entrada
      value={value || ''} // Asegura que el valor nunca sea null, usando una cadena vacía como fallback
      onChange={onChange} // Maneja el cambio en el valor del input
      className='w-full p-2 border border-gray-300 rounded mb-2' // Estilos aplicados al input
    />
  )
}
