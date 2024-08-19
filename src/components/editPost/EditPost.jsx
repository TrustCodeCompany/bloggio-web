import 'animate.css'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaTrashCan, FaUpload } from 'react-icons/fa6'
import { IoSave } from 'react-icons/io5'
import { MutatingDots } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { ShowErrorAlert } from '../../utils/ShowErrorAlert'
import { Tooltip } from '../../utils/Tooltip.jsx'
import { ComboCategories } from '../categories/ComboCategories.jsx'
import { TextEditor } from '../createPost/TextEditor.jsx'
import { useUserStore } from '../../store/userStore.js'

export const EditPost = () => {
  const [mainContent, setMainContent] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [existingImage, setExistingImage] = useState(null)

  const navigate = useNavigate()
  const { id } = useUserStore()
  const { id: postId } = useParams() // Obtenemos el ID del post desde la URL
  console.log(postId)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`https://bloggio-api-zc58.onrender.com/Post/${postId}`)
        const post = await response.json()
        if (post) {
          setValue('title', post.postTitle)
          setValue('description', post.postDescription)
          setMainContent(post.postContent)
          setExistingImage(post.postImage) // Asigna la imagen existente
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching post data:', error)
        ShowErrorAlert('Error al cargar el post. Intente nuevamente.')
      }
    }

    fetchPostData()
  }, [postId, setValue])

  const onSubmit = async (data) => {
    setLoading(true)

    if (mainContent === null) {
      ShowErrorAlert('Es obligatorio contenido en el cuerpo del post.')
      return
    }

    data.mainContent = mainContent

    const dataFormatted = {
      postId,
      categoryId: data.category,
      postContent: data.mainContent,
      postDescription: data.description,
      postPriority: 1,
      postState: 1,
      postTitle: data.title,
      userId: id,
      mainImageUrl: imageFile ? '' : existingImage, // Usar la imagen existente si no se selecciona una nueva
      published: 1
    }

    const formData = new FormData()
    formData.append('post', new Blob([JSON.stringify(dataFormatted)], { type: 'application/json' }))
    if (imageFile) {
      formData.append('file', new Blob([imageFile], { type: 'application/octet-stream' }))
    }

    console.log(formData)

    try {
      await fetch(`https://bloggio-api-zc58.onrender.com/Post/${postId}`, {
        method: 'PUT',
        body: formData
      })
      setLoading(false)
      navigate(`/detail-post/${postId}`)
    } catch (error) {
      console.error('Error updating post:', error)
      ShowErrorAlert('Error al actualizar el post. Intente nuevamente.')
      setLoading(false)
    }
  }

  return (
    loading
      ? (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30'>
          <MutatingDots
            visible
            height='100'
            width='100'
            color='#172A99'
            secondaryColor='#69141B'
            radius='12.5'
            ariaLabel='mutating-dots-loading'
          />
        </div>
      )
      : (
        <div className='mb-32'>
          <h1 className='text-2xl text-center font-extrabold mb-10 pt-12 xl:pt-16 xl:mb-14'>
            EDITAR POST
          </h1>
          <div className='flex flex-col md:flex-row justify-between'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-[70%] mx-auto'>
              <div className='flex justify-end gap-8 text-xl bg-white rounded-md sticky top-0 py-4 right-0 z-10 md:text-base md:py-2'>
                <Tooltip text='Eliminar'>
                  <button className='p-4 rounded-full border-red-500 border-2 hover:text-slate-200 hover:scale-110 transition-all'>
                    <FaTrashCan className='text-red-500' />
                  </button>
                </Tooltip>
                <Tooltip text='Guardar cambios'>
                  <button
                    className='p-4 rounded-full border-sky-500 border-2 hover:text-slate-200 hover:scale-110 transition-all'
                    type='submit'
                  >
                    <IoSave className='text-sky-500' />
                  </button>
                </Tooltip>
                <Tooltip text='Publicar cambios'>
                  <button className='p-4 rounded-full border-green-600 border-2 hover:text-slate-200 hover:scale-110 transition-all'>
                    <FaUpload className='text-green-600' />
                  </button>
                </Tooltip>
              </div>
              <div className='px-4'>
                <div className='mb-6'>
                  <label htmlFor='title' className='block mb-1'>
                    Título Principal:
                  </label>
                  <input
                    type='text'
                    id='title'
                    {...register('title', { required: true })}
                    className='w-full border border-slate-300 rounded-lg px-3 py-2 text-sm tracking-wider focus:shadow-md focus:outline-none'
                  />
                  {errors.title && (
                    <span className='text-red-500'>
                      El título principal es requerido
                    </span>
                  )}
                </div>
                <div className='mb-6'>
                  <label htmlFor='description' className='block mb-1'>
                    Descripción Corta:
                  </label>
                  <textarea
                    id='description'
                    {...register('description', { required: true, maxLength: 255, minLength: 3 })}
                    className='w-full border border-slate-300 rounded-lg px-3 py-2 text-sm tracking-wider focus:shadow-md focus:outline-none'
                  />
                  {errors.description?.type === 'required' && (
                    <span className='text-red-500'>
                      La descripción corta es requerida
                    </span>
                  )}
                  {errors.description?.type === 'maxLength' && (
                    <span className='text-red-500'>
                      La descripción corta debe tener menos de 255 caracteres
                    </span>
                  )}
                  {errors.description?.type === 'minLength' && (
                    <span className='text-red-500'>
                      La descripción corta debe tener como mínimo 3 caracteres
                    </span>
                  )}
                </div>
                <div className='mb-6'>
                  <label htmlFor='image' className='block mb-1'>
                    Imagen Principal:
                  </label>
                  {existingImage && (
                    <div className='mb-4'>
                      <p>Imagen actual:</p>
                      <img src={existingImage} alt='Imagen actual del post' className='w-full max-w-sm' />
                    </div>
                  )}
                  <input
                    type='file'
                    id='image'
                    {...register('image')}
                    className='w-full border border-slate-300 rounded-lg px-3 py-2 text-sm tracking-wider focus:shadow-md focus:outline-none'
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>

                <div className='mb-6'>
                  <label htmlFor='body' className='block mb-1'>
                    Cuerpo del Post:
                  </label>
                  <TextEditor
                    mainContent={mainContent}
                    setMainContent={setMainContent}
                  />
                </div>
                <div className='mb-10'>
                  <p>Seleccione categoría del post</p>
                  <ComboCategories />
                </div>
              </div>
            </form>
          </div>
        </div>
      )
  )
}
