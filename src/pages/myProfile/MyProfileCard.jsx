/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import imgUserAvatarDefault from '../../../src/assets/images/user-male-avatar.png'
import { ShowConfirmationDeleteAlert } from '../../utils/ShowConfirmationDeleteAlert'
import { RiMenu5Fill } from 'react-icons/ri'

export const MyProfileCard = ({ image, title, description, date, postId, onDelete }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const handleDeleteConfirm = async () => {
    ShowConfirmationDeleteAlert(
      `https://bloggio-api-zc58.onrender.com/Post/${postId}`,
      onDelete,
      setDropdownVisible
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-4 flex flex-col'>
      <img src={image || imgUserAvatarDefault} alt={title} className='w-full h-32 object-cover rounded-t-lg' />
      <div className='mt-2 flex-1'>
        <h2 className='text-xl font-semibold'>
          <Link to={`/detail-post/${postId}`}>
            {title}
          </Link>
        </h2>
        <p className='text-gray-600'>{description}</p>
      </div>
      <div className='mt-2 flex justify-between items-center'>
        <span className='text-gray-500 text-sm'>{date}</span>
        <div className='relative'>
          <button
            className='text-gray-500 hover:text-gray-700'
            onClick={toggleDropdown}
          >
            <RiMenu5Fill />
          </button>
          {dropdownVisible && (
            <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
              <Link to={`/edit-post/${postId}`} className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100'>
                Edit Post
              </Link>
              <button onClick={handleDeleteConfirm} className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100'>
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
