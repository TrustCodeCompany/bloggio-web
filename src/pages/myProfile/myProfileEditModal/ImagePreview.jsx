/* eslint-disable react/prop-types */

// Componente ImagePreview: Muestra la imagen de avatar seleccionada o actual
export const ImagePreview = ({ src }) => {
  return src
    ? (
      <img
        className='h-auto w-24 ml-2' // Estilos aplicados a la imagen
        src={src} // La fuente de la imagen
        alt='Avatar'
      />
      )
    : null // Si no hay imagen seleccionada, no se muestra nada
}
