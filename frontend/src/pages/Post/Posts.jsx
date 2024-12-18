import { Button, Form, Input, Spin } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { deletePost, getPosts, uploadPost } from "../../services/redux/slices/post/postThunks"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { CostumButton } from '../../components/CostumButton';
import { CostumInput } from '../../components/CostumInput';
import { useTranslation } from 'react-i18next';

export const Posts = () => {
  const dispatch = useDispatch()
  const { posts, status } = useSelector((state) => state.post)
  const { t } = useTranslation()


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
    <Spin spinning={status === 'loading'}>
      <h2>{t("user.posts")}</h2>

      {error && <Alert message={error} type="error" showIcon />}

      <div>
        <Form form={form} name="post_form" onFinish={handleSubmit}>
        
          <CostumInput
            name="content"
            rules={[{ required: true, message: 'Please write something!' }]}
          />

          <CostumButton htmlType="submit">
            Post
          </CostumButton>
        </Form>
      </div>
      
          <PostList posts={posts} handleDelete={handleDelete} />
      </Spin>
  )
}