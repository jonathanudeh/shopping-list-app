export function Header({ onThemeToggle, isDarkMode }) {
  return (
    <header className="header">
      <span className="logo-span">
        <img
          src="./images/trial-logo.svg"
          alt="Shopping cart icon"
          className="logo"
        />
        <h1 className="title">My Shopping Cart</h1>
      </span>
      <button className="theme-toggle-btn" onClick={onThemeToggle}>
        <img
          src={
            isDarkMode ? "./images/light-mode.svg" : "./images/dark-mode.svg"
          }
          alt="Theme Toggle"
        />
      </button>
    </header>
  );
}
