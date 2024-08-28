import { useEffect, useState, useCallback } from 'react'
import userAvatar from '../../assets/images/user-male-avatar.png'
import { useUserStore } from '../../store/userStore.js'
import { ENDPOINTS } from '../../api/apiEndpoints.js'

// eslint-disable-next-line react/prop-types
export const CommentsSection = ({ author, category, date, postId, imgUser }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [replyingToCommentId, setReplyingToCommentId] = useState(null)
  const [replyContent, setReplyContent] = useState('')

  const { id, userName } = useUserStore()

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(ENDPOINTS.commentByPostId + '?postId=' + postId)
      const data = await response.json()
      console.log('data comments ', data)
      setComments(data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }, [postId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleCommentSubmit = async () => {
    const dataFormatted = {
      commentContent: newComment,
      commentId: '',
      commentIdReply: '',
      commentLikes: 0,
      commentState: 1,
      commentTimestampCreate: null,
      commentTimestampUpdate: null,
      postId,
      userId: id
    }

    try {
      const response = await fetch(ENDPOINTS.createComment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataFormatted)
      })

      if (response.ok) {
        setNewComment('')
        fetchComments()
      } else {
        console.error('Error al publicar el comentario:', response.statusText)
      }
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  const handleReplySubmit = async (parentCommentId) => {
    const dataFormatted = {
      commentContent: replyContent,
      commentId: '', // En este caso, este es el ID del nuevo comentario que se está creando, normalmente se deja vacío para el backend.
      commentIdReply: parentCommentId, // ID del comentario al que se está respondiendo.
      commentLikes: 0,
      commentState: 1,
      commentTimestampCreate: null,
      commentTimestampUpdate: null,
      postId,
      userId: id
    }

    try {
      const response = await fetch(ENDPOINTS.createComment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataFormatted)
      })

      if (response.ok) {
        setReplyContent('')
        setReplyingToCommentId(null)
        fetchComments()
      } else {
        console.error('Error al publicar la respuesta:', response.statusText)
      }
    } catch (error) {
      console.error('Error posting reply:', error)
    }
  }

  return (
    <div className='comments-section border border-gray-400 rounded-lg p-4 text-sm lg:text-xs'>
      <div className='flex gap-3 mb-4'>
        <img
          src={imgUser || userAvatar}
          className='author-photo w-10 h-10 rounded-full p-1'
        />
        <div>
          <p className='font-bold'>{author}</p>
          <p className='text-gray-500'>Publicado en <span className='font-bold'>{category}</span></p>
          <p>{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className='responses'>
        <h3 className='font-bold'>COMENTARIOS :</h3>
        {comments.length > 0
          ? (
              comments.map((comment, index) => (
                <div key={index} className='comment'>
                  <div className='flex items-center gap-2 mb-3 p-2'>
                    <img
                      src={comment.usersDTO?.userPhoto || userAvatar}
                      className='author-photo w-10 h-10 rounded-full p-1'
                    />
                    <div className='w-full'>
                      <span className='font-bold'>{comment.usersDTO?.userNickname || 'Anónimo'}</span>
                      <p className='bg-slate-300 w-full rounded-lg p-2 text-sm lg:text-xs'>{comment.commentContent}</p>
                      <button
                        className='text-blue-500 mt-2 block'
                        onClick={() => setReplyingToCommentId(comment.commentId)}
                      >
                        Responder
                      </button>
                      {console.log(replyingToCommentId === comment.commentId)}
                      {comment.commentsReply.map((commentReply, indexReply) => (
                        <div key={indexReply} className='reply-section mt-2'>
                          <textarea
                            placeholder='Escribe una respuesta...'
                            value={commentReply.commentContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className='w-full rounded-lg border border-gray-400 p-2 text-sm lg:text-xs'
                          />
                          <button
                            className='bg-secondary text-white rounded-lg p-2 text-sm lg:text-xs mt-2'
                            onClick={() => handleReplySubmit(comment.commentId)}
                          >
                            Enviar respuesta
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )
          : (
            <p>No hay comentarios aún.</p>
            )}
        <div className='new-comment'>
          <textarea
            placeholder='Escribe un comentario...'
            id='new-comment'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className='w-full rounded-lg border border-gray-400 p-2 text-sm lg:text-xs mt-4'
          />
          {/* console.log(newComment) */}
          <button
            className='bg-secondary text-white rounded-lg p-2 text-sm lg:text-xs mt-4 px-4 font-bold'
            onClick={handleCommentSubmit}
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  )
}
