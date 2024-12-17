import { Button, Form, Input, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostWithComments, addComment, deleteComment } from '../../services/redux/slices/comments/commentsThunks';

export const Post = () => {
  const { post, status } = useSelector((state) => state.comments)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [form] = Form.useForm()

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

  if (status === 'loading') return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <h2>{post.content}</h2>

      <h3>Comments</h3>


      <Form form={form} name="comment_form" onFinish={handleCommentSubmit}>
        <Form.Item
          name="content"
          rules={[{ required: true, message: 'Please write something!' }]}
        >
          <Input.TextArea placeholder="Write a comment..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Comment
          </Button>
        </Form.Item>
      </Form>


        <ul>
            {post.comments.map((comment) => (
              <div>
                <li key={comment.id}>{comment.content}</li>
                <Button onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </Button>
              </div>
            ))}
          </ul>
    </div>
  );
};