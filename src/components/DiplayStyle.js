export function DiplayStyle({ gridDisplay, onStyleDisplayToggle }) {
  return (
    <button onClick={onStyleDisplayToggle} className="display-btn">
      <img
        src={
          gridDisplay
            ? "./images/list-display.svg"
            : "./images/grid-display.svg"
        }
        alt="grid or list icon"
      />
    </button>
  );
}
