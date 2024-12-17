import { Button, Form, Input, Spin } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { deletePost, getPosts, uploadPost } from "../../services/redux/slices/post/postThunks"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export const Posts = () => {
  const dispatch = useDispatch()
  const { posts, status } = useSelector((state) => state.post)

  const [form] = Form.useForm();


  const handleSubmit = async ({ content }) => {
    try {
      await dispatch(uploadPost({ content }))
      form.resetFields()
    } catch (error) {
      console.error('Failed to upload post:', error);
    }
  }

  const handleDelete = async(id) => {
    try {
      await dispatch(deletePost(id))
      dispatch(getPosts())
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  }

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <div>
      <h2>Posts</h2>

      <div>
        <Form form={form} name="post_form" onFinish={handleSubmit}>

          <Form.Item name='content'  rules={[{required: true, message: "Please write something!"}]}>
            <Input.TextArea placeholder="Write a post..."/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>Post</Button>
          </Form.Item>
        </Form>
      </div>

      <Spin spinning={status === 'loading'}>
      <ul>
         {posts.length > 0 ? (
            posts.map((post) =>
               <li key={post.id}>
                  <Link to={`/posts/${post.id}`}>{post.content}</Link>
                  <Button onClick={() => handleDelete(post.id)}>Delete</Button>
                </li>
          )
          ) : (
            <p>No posts available.</p>
          )}
      </ul>
      </Spin>
      

    </div>
  )
}