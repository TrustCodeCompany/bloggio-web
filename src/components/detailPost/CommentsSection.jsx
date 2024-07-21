import { useEffect, useState } from 'react'
import { FaCommentDots } from 'react-icons/fa'
import userAvatar from '../../assets/images/user-male-avatar.png'

export const CommentsSection = ({ author, category, date, postId }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  console.log(postId)
  console.log(comments)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://bloggio-api.onrender.com/Comment?postId=${postId}`)
        const data = await response.json()
        console.log(data)
        setComments(data)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }

    fetchComments()
  }, [postId])

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`https://bloggio-api.onrender.com/Comment?postId=${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newComment })
      })
      const data = await response.json()
      setComments(data)
      setNewComment('')
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  return (
    <div className='comments-section'>
      <div className='flex gap-3 mb-4'>
        <img src={userAvatar} alt={author.name} className='author-photo max-w-24 rounded-full' />
        <div>
          <p className='font-bold'>{author}</p>
          <p>Publicado en {category}</p>
          <p>{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className='responses'>
        <h3 className='font-bold'>RESPUESTAS</h3>
        {comments.length > 0
          ? (
              comments.map((comment, index) => (
                <div key={index} className='comment'>
                  <p>{comment.commentContent}</p>
                </div>
              ))
            )
          : (
            <p>No hay comentarios aún.</p>
            )}
        <div className='new-comment'>
          <label htmlFor='new-comment'>Deja un comentario:</label>
          <textarea
            id='new-comment'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>
            <FaCommentDots />
          </button>
        </div>
      </div>
    </div>
  )
}
