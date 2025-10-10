const UserInfo = ({ name, handleLogout }) => (
  <div data-testid='userinfo'>
    {name + ' logged in '}
    <button onClick={() => handleLogout()}>logout</button>
  </div>
)

export default UserInfo
