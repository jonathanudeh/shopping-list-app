import { Button } from "./components/Button";

export function DeleteAllItems({
  onShoppingList,
  onArchiveItems,
  isArchiveOpen,
}) {
  //handles deleting all items
  function handleDeleteAllItem() {
    const confirm = window.confirm(
      "Are you sure you want to delete all Items?"
    );
    if (!confirm) return;

    isArchiveOpen ? onArchiveItems([]) : onShoppingList([]);
  }

  return (
    <Button onClick={handleDeleteAllItem} className="delete-all-btn">
      <img src="./images/delete-all.svg" alt="Delete all items" />
    </Button>
  );
}
