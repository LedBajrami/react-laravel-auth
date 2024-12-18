import { Button, Form, Input, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostWithComments, addComment, deleteComment } from '../../services/redux/slices/comments/commentsThunks';
import { CostumInput } from '../../components/CostumInput';
import { CostumButton } from '../../components/CostumButton';
import { PostList } from '../../components/PostList';
import { useTranslation } from 'react-i18next';


export const Post = () => {
  const { post, status } = useSelector((state) => state.comments)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [form] = Form.useForm()
  const { t } = useTranslation()


  useEffect(() => {
    dispatch(fetchPostWithComments(id))
  }, [dispatch, id])

  const handleCommentSubmit = async ({ content }) => {
    try {
      await dispatch(addComment({ postId: id, content }))
      form.resetFields()
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  };


  const handleDeleteComment = async (commentId) => {
    try {
      await dispatch(deleteComment({ postId: post.id, commentId })).unwrap();
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (!post) return <p>Post not found.</p>;

  return (
    <Spin spinning={status === 'loading'}>
      <h2><strong>Post: </strong>{post.content}</h2>

      <Form form={form} name="comment_form" onFinish={handleCommentSubmit}>
        
        <CostumInput name="content" rules={[{ required: true, message: 'Please write something!' }]}/>

        <CostumButton htmlType="submit">
          Comment
        </CostumButton>
        
      </Form>


        <ul>
            <h3>{t("user.comments")}</h3>
            <PostList posts={post.comments} handleDelete={handleDeleteComment} />
          </ul>
    </Spin>
  )
};