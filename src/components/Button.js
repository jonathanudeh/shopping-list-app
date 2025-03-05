export function Button({ children, bgColor, btnWidth, onClick }) {
  return (
    <button
      style={{ backgroundColor: bgColor, width: btnWidth }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
