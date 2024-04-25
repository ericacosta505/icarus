const Header = ({
  toggleDropdown,
  showDropdown,
  toggleDarkMode,
  isDarkMode,
  logout,
  username,
}) => {
  return (
    <div className="header">
      <div className="menu" onClick={toggleDropdown}>
        ☰
      </div>
      {showDropdown && (
        <div className="sidebar">
          <button onClick={toggleDarkMode}>
            {isDarkMode ? "LightMode" : "DarkMode"}
          </button>
          <button onClick={logout}>LOGOUT</button>
        </div>
      )}
      <p className="username">{username}</p>
    </div>
  );
};

export default Header;
