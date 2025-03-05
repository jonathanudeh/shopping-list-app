export function AddItemIcon({ onIsAddItemFormOpen }) {
  return (
    <button className="add-item" onClick={onIsAddItemFormOpen}>
      <img src="./images/add-item.svg" alt="plus sign" />
    </button>
  );
}
