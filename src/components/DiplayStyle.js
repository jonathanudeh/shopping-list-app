export function DiplayStyle({ gridDisplay, onStyleDisplayToggle }) {
  return (
    <button onClick={onStyleDisplayToggle} className="display-btn">
      <img
        src={
          gridDisplay
            ? "./images/grid-display.svg"
            : "./images/list-display.svg"
        }
        alt="grid or list icon"
      />
    </button>
  );
}
