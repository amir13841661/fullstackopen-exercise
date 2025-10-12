import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)

  return response
}

const create = async (newObject) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (blogId, likes) => {
  const response = await axios.put(`/api/blogs/${blogId}`, {
    data: { likes: likes },
  })
  return response
}
const deleteBlog = async (blogId) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`/api/blogs/${blogId}`, config)
}

export default { getAll, create, setToken, update, deleteBlog }
