/* eslint-disable react/prop-types */

// Componente FileInput: Maneja la entrada de archivos (subida de imágenes)
export const FileInput = ({ onChange }) => {
  return (
    <input
      type='file' // Tipo de input para seleccionar archivos
      onChange={(e) => onChange(e.target.files[0])} // Maneja el archivo seleccionado
      className='w-full p-2 border border-gray-300 rounded mb-2' // Estilos aplicados al input de archivo
    />
  )
}
