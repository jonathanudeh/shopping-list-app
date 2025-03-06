export function Button({ children, className, bgColor, btnWidth, onClick }) {
  return (
    <button
      className={className}
      style={{ backgroundColor: bgColor, width: btnWidth }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
