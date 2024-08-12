/* eslint-disable react/prop-types */
import { CardType1 } from '../../components/shared/CardType1'

export const ResultFindCategories = ({ posts }) => {
  console.log(posts)
  return (
    <div className='mt-4'>
      <h3 className='text-lg font-semibold mb-4'>Resultados de búsqueda</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {posts.map((post) => (
          <CardType1
            key={post.postId}
            img={post.postImage}
            title={post.postTitle}
            userNickName={post.userNickname}
            postCreated={post.postCreated}
            description={post.postDescription}
            postId={post.postId}
            category={post.categoryName}
          />
        ))}

      </div>
    </div>
  )
}
