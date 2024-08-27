import React, { useEffect, useState } from 'react'
import { MyProfileCard } from './myProfile/MyProfileCard.jsx'
import { ENDPOINTS } from '../api/apiEndpoints.js'
import { useUserStore } from '../store/userStore.js'

export const MyPosts = () => {
  const [posts, setPosts] = useState([])
  const [reloadPosts, setReloadPosts] = useState(false)
  const { id } = useUserStore()

  const API_URL = ENDPOINTS.getPostsByUserId + '/' + id + '?limit=30&offset=1'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        setPosts(data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [API_URL, reloadPosts])

  const handleDeletePost = () => {
    setReloadPosts(!reloadPosts)
  }

  return (
    <div>
      <div className='md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {posts.map((post, index) => (
          <MyProfileCard
            key={index}
            image={post.postImage}
            title={post.postTitle}
            description={post.postDescription}
            date={post.postDate}
            postId={post.postId}
            onDelete={handleDeletePost}
          />
        ))}
      </div>
    </div>
  )
}
