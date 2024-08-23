// const API_BASE_URL = 'https://bloggio-api-ziu0.onrender.com'
const API_BASE_URL = 'https://bloggio-api-s2r5.onrender.com'
// const API_BASE_URL = 'http://localhost:8085'

export const ENDPOINTS = {

  // url de login
  login: `${API_BASE_URL}/auth/signin`,

  // url de crear usuario
  signup: `${API_BASE_URL}/auth/signup`,

  // obtener todos los posts desde el más reciente usando paginación
  getAllPostsByDateAndPage: `${API_BASE_URL}/Post/GetAllPostByDateAndPage`,

  // obtener todas las categorias
  getAllCategories: `${API_BASE_URL}/api/v1/Category/GetAll`,

  // crear un nuevo post
  createPost: `${API_BASE_URL}/Post/Create-v2`,

  // obtener todos los posts de la categoría Viajes, usando paginación
  getAllPostByViajesCategory: `${API_BASE_URL}/Post/find-all-by-filters`,

  // obtener todos los posts de la categoría Salud, usando paginación
  getAllPostBySaludCategory: `${API_BASE_URL}/Post/find-all-by-filters`,

  // obtener todos los posts de la categoría Cocina, usando paginacion
  getAllPostByCocinaCategory: `${API_BASE_URL}/Post/find-all-by-filters`,

  // obtener todos los posts de la categoría Tecnología, usando paginación
  getAllPostByTecnologiaCategory: `${API_BASE_URL}/Post/find-all-by-filters`,

  // obtener todos los posts de la categoria Paternidad, usando paginación
  getAllPostByPaternidadCategory: `${API_BASE_URL}/Post/find-all-by-filters`,

  // obtener todos los posts de la categoria Deportes, usando paginación
  getAllPostByDeportesCategory: `${API_BASE_URL}/Post/find-all-by-filters`,

  // crear un nuevo post
  editPost: `${API_BASE_URL}/Post/edit-post`,

  // recuperar un post por id
  findPostById: `${API_BASE_URL}/Post`,

  // GetTop4Post
  getTop4Post: `${API_BASE_URL}/Post/GetTop4Post`,

  // get comments by postId
  commentByPostId: `${API_BASE_URL}/Comment`,

  // Comment Create
  createComment: `${API_BASE_URL}/Comment/Create`,

  // Post/get-by-user/
  getPostsByUserId: `${API_BASE_URL}/Post/get-by-user`,

  // auth/update-profile
  updateProfile: `${API_BASE_URL}/auth/update-profile`,

  // Post/recommended-post
  recommendedPost: `${API_BASE_URL}/Post/recommended-post`,

  // recuperar un post por id
  deletePostById: `${API_BASE_URL}/Post`
}
