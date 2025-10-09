import Blog from "./Blog";
import UserInfo from "./UserInfo";

const Blogs = ({
  blogs,
  name,
  handleLogout,
  increaseLikes,
  handleBlogDeletion,
}) => (
  <>
    <h2>blogs</h2>
    <UserInfo name={name} handleLogout={handleLogout} />
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        increaseLikes={increaseLikes}
        handleBlogDeletion={handleBlogDeletion}
      />
    ))}
  </>
);

export default Blogs;
