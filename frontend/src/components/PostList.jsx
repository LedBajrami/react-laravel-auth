import { Button } from "antd"
import { Link } from "react-router-dom"


export const PostList = ({posts, handleDelete}) => {
    return (
        <ul>
            {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.content}</Link>
                <Button onClick={() => handleDelete(post.id)}>Delete</Button>
              </li>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </ul>
        
    )
}