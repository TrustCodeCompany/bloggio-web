import parse from 'html-react-parser'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import mainImage from '../assets/images/img1.webp'
import { CommentsSection } from '../components'
import {
  MainTitleDetailPostPage,
  MenuBottomDetailPost,
  RelatedPostsDetailPostPage
} from './../sections'
import './DetailPost.css'
import { ENDPOINTS } from '../api/apiEndpoints.js'

export const DetailPost = () => {
  const { id } = useParams() // Extrae el ID de los parámetros de la URL
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(ENDPOINTS.findPostById + '/' + id)
        const data = await response.json()
        setPost(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching post:', error)
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!post) {
    return <div>Error loading post</div>
  }

  return (
    <>
      <div className='mt-16 transition-all duration-500 ease-in-out'>

        <section className='mb-5 flex flex-col md:flex-row gap-2 lg:gap-4'>
          <article className='md:w-[70%]'>

            <MainTitleDetailPostPage title={post.postTitle} description={post.postDescription} />

            <img
              className=' mb-6 border border-gray-400 rounded-xl p-4 md:h-[300px] lg:w-[500px] md:w-full md:object-cover md:object-top lg:object-center lg:mx-auto'
              src={post.postImage || mainImage}
              alt={post.postTitle}
            />

            {parse(post.postContent)} {/* Aquí usamos html-react-parser */}
            <MenuBottomDetailPost />
          </article>
          <section className='md:w-[30%] md:pt-16'>
            <CommentsSection
              author={post.user.userNickname}
              category={post.categoryDesc}
              date={post.postCreated}
              imgUser={post.user.userPhoto}
              postId={id}
            />
          </section>
        </section>
        <hr className='bg-slate-500' />
        <section className='mt-5 mb-6'>
          <RelatedPostsDetailPostPage post={post} />
        </section>
      </div>
      <hr className='mb-6 bg-slate-500' />
    </>
  )
}
