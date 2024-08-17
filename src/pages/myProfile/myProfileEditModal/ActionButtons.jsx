/* eslint-disable react/prop-types */

// Componente ActionButtons: Botones para cancelar o guardar los cambios
export const ActionButtons = ({ onCancel, onSave }) => {
  return (
    <div className='flex justify-end'> {/* Contenedor flex para alinear los botones a la derecha */}
      <button onClick={onCancel} className='mr-2 p-2 border rounded'>
        Cancel {/* Botón de cancelar, llama a la función onCancel al hacer clic */}
      </button>
      <button onClick={onSave} className='p-2 border rounded bg-blue-500 text-white'>
        Save {/* Botón de guardar, llama a la función onSave al hacer clic */}
      </button>
    </div>
  )
}
