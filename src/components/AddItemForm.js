import { useState } from "react";
import { Button } from "./Button";

export function AddItemForm({
  onIsAddItemFormOpen,
  onAddToShoppingLIst,
  objToEdit,
  onActualEditingOfItems,
}) {
  const [itemName, setItemName] = useState(
    objToEdit?.item ? objToEdit?.item : ""
  );
  const [itemQuantity, setItemQuantity] = useState(
    objToEdit?.quantity ? objToEdit?.quantity : 1
  );
  const [itemCategory, setItemCategory] = useState(
    objToEdit?.category ? objToEdit?.category : "#ffffff"
  );

  function handleAddItemSubmission(e) {
    e.preventDefault();

    if (!itemName || !itemCategory) return;

    const newList = {
      id: objToEdit?.id ? objToEdit?.id : Date.now(),
      item: itemName,
      quantity: itemQuantity || 1,
      category: itemCategory,
      purchased: objToEdit?.purchased ? objToEdit?.purchased : false,
      isArchived: false,
    };

    if (!objToEdit) {
      onAddToShoppingLIst(newList);
    } else {
      onActualEditingOfItems(newList);
    }
    onIsAddItemFormOpen(false);
  }

  return (
    <div className="add-item-form-underlay" onClick={onIsAddItemFormOpen}>
      <form
        className="add-item-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleAddItemSubmission}
      >
        <label>Item Name</label>
        <input
          type="text"
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <label>Quantity</label>
        <input
          type="number"
          placeholder="Item quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(Number(e.target.value))}
        />
        <label>Item Category (Optional)</label>
        <input
          type="color"
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        />
        <Button bgColor="#fd100e" btnWidth="100%">
          Add
        </Button>
      </form>
    </div>
  );
}
