import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import Footer from "./components/footer";
import { Header } from "./components/Header";
import { DiplayStyle } from "./components/DiplayStyle";
import { AddItemIcon } from "./components/AddItemIcon";
import { AddItemForm } from "./components/AddItemForm";

export default function App() {
  const saveToLocalStorage = (
    items,
    isDarkMode,
    gridDisplay,
    archivedItems
  ) => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    localStorage.setItem("gridDisplay", JSON.stringify(gridDisplay));
    localStorage.setItem("archivedItems", JSON.stringify(archivedItems));
  };

  const LoadFromLocalStorage = () => {
    const storedItems = localStorage.getItem("shoppingList");
    return storedItems ? JSON.parse(storedItems) : [];
  };

  // The light or dark mode toggle
  const LoadDarkModeFromLocalStorage = () => {
    const storedDarkMode = localStorage.getItem("isDarkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  };

  const LoadDisplayStyleFromLocalStorage = () => {
    const storedDisplay = localStorage.getItem("gridDisplay");
    return storedDisplay ? JSON.parse(storedDisplay) : false;
  };

  const LoadArchivedItemsFromLocalStorage = () => {
    const storedArchivedList = localStorage.getItem("archivedItems");
    return storedArchivedList ? JSON.parse(storedArchivedList) : [];
  };

  const [isAddItemFormOpen, setIsAddItemFormOpen] = useState(false);
  const [shoppingList, setShoppingList] = useState(LoadFromLocalStorage);
  const [objToEdit, setObjToEdit] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(LoadDarkModeFromLocalStorage);
  const [gridDisplay, setGridDisplay] = useState(
    LoadDisplayStyleFromLocalStorage
  );
  const [isArchiveBtnShowing, setIsArchiveBtnShowing] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [archivedItems, setArchivedItems] = useState(
    LoadArchivedItemsFromLocalStorage
  );

  //Handles Archiving of items

  function handleAddItemToAchive(obj) {
    const archivedObj = { ...obj, isArchived: true };
    setArchivedItems((currList) => [...currList, archivedObj]);
    setShoppingList((currList) =>
      currList.filter((item) => item.id !== obj.id)
    );
  }

  function handleRemoveItemFromArchive(obj) {
    const unArchivedObj = { ...obj, isArchived: false };
    setShoppingList((currList) => [...currList, unArchivedObj]);
    setArchivedItems((currList) =>
      currList.filter((item) => item.isArchived !== obj.isArchived)
    );
  }

  function HandleThemeToggle() {
    setIsDarkMode((prev) => !prev);
  }

  function handleStyleDisplayToggle() {
    setGridDisplay((prev) => !prev);
  }

  useEffect(() => {
    saveToLocalStorage(shoppingList, isDarkMode, gridDisplay, archivedItems);
  }, [shoppingList, isDarkMode, gridDisplay, archivedItems]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  function handleIsAddItemFormOpen(booleon) {
    setIsAddItemFormOpen(booleon ? (curr) => !curr : false);
    if (!booleon) setObjToEdit(null);
  }

  function handleAddToShoppingLIst(newList) {
    setShoppingList((prevList) => [...prevList, newList]);
  }

  // Handles delete action
  function handleDeleteItem(obj) {
    const confirm = window.confirm(`Do you want to delete ${obj.item}?`);
    if (!confirm) return;

    return isArchiveOpen
      ? setArchivedItems((currList) =>
          currList.filter((item) => item.id !== obj.id)
        )
      : setShoppingList((currList) =>
          currList.filter((item) => item.id !== obj.id)
        );
  }

  // Handles editing actions
  function handleEditItem(itemObj) {
    setObjToEdit(itemObj);
    setIsAddItemFormOpen(true);
  }

  function handleActualEditingOfItems(obj) {
    objToEdit?.isArchived
      ? setArchivedItems((currItems) =>
          currItems.map((item) => (item.id === objToEdit?.id ? obj : item))
        )
      : setShoppingList((currItems) =>
          currItems.map((item) => (item.id === objToEdit?.id ? obj : item))
        );

    setObjToEdit(null);
  }

  return (
    <>
      <Header onThemeToggle={HandleThemeToggle} isDarkMode={isDarkMode} />

      <main>
        <div className="filter-div">
          <Button onClick={() => setIsArchiveBtnShowing((prev) => !prev)}>
            <img src="./images/archive.svg" alt="archive icon" /> Archive
          </Button>

          <button>Select</button>

          <DiplayStyle
            gridDisplay={gridDisplay}
            onStyleDisplayToggle={handleStyleDisplayToggle}
          />
        </div>

        {!isArchiveOpen && (
          <>
            <ShoppingList
              // shoppingList={shoppingList}
              onSetShoppingList={setShoppingList}
              onDeleteItem={handleDeleteItem}
              onEditItem={handleEditItem}
              gridDisplay={gridDisplay}
              isArchiveBtnShowing={isArchiveBtnShowing}
              onAddItemToAchive={handleAddItemToAchive}
              isArchiveOpen={isArchiveOpen}
              archivedItems={archivedItems}
            >
              {shoppingList}
            </ShoppingList>
            <AddItemIcon onIsAddItemFormOpen={handleIsAddItemFormOpen} />
          </>
        )}

        {isArchiveOpen && (
          <ArchivedItems
            archivedItems={archivedItems}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            gridDisplay={gridDisplay}
            isArchiveBtnShowing={isArchiveBtnShowing}
            isArchiveOpen={isArchiveOpen}
            onRemoveItemFromArchive={handleRemoveItemFromArchive}
          />
        )}
      </main>

      <Footer
        onIsArchiveOpen={setIsArchiveOpen}
        isArchiveOpen={isArchiveOpen}
      />
      {isAddItemFormOpen && (
        <AddItemForm
          onIsAddItemFormOpen={handleIsAddItemFormOpen}
          onAddToShoppingLIst={handleAddToShoppingLIst}
          objToEdit={objToEdit}
          onActualEditingOfItems={handleActualEditingOfItems}
        />
      )}
    </>
  );
}

function ShoppingList({
  children,
  shoppingList,
  onSetShoppingList,
  onDeleteItem,
  onEditItem,
  gridDisplay,
  isArchiveBtnShowing,
  onAddItemToAchive,
  isArchiveOpen,
  archivedItems,
  onRemoveItemFromArchive,
}) {
  function handlePurchaseToggle(obj) {
    onSetShoppingList((lists) =>
      lists.map((item) =>
        item.id === obj.id ? { ...item, purchased: !item.purchased } : item
      )
    );
  }

  return (
    <ul className={gridDisplay ? "item-container-grid" : "item-container"}>
      {children.map((list) => (
        <Item
          listObj={list}
          key={list.id}
          onDeleteItem={onDeleteItem}
          onEditItem={onEditItem}
          onPurchaseToggle={handlePurchaseToggle}
          gridDisplay={gridDisplay}
          isArchiveBtnShowing={isArchiveBtnShowing}
          onAddItemToAchive={onAddItemToAchive}
          isArchiveOpen={isArchiveOpen}
          archivedItems={archivedItems}
          onRemoveItemFromArchive={onRemoveItemFromArchive}
        />
      ))}
    </ul>
  );
}

function Item({
  listObj,
  onDeleteItem,
  onEditItem,
  onPurchaseToggle,
  gridDisplay,
  isArchiveBtnShowing,
  onAddItemToAchive,
  isArchiveOpen,
  archivedItems,
  onRemoveItemFromArchive,
}) {
  return (
    <li className={gridDisplay ? "item-grid" : "item"}>
      <span className="item-span">
        <h2 style={{ textDecoration: listObj.purchased ? "line-through" : "" }}>
          {listObj.item}
          <input
            type="checkbox"
            checked={listObj.purchased}
            onChange={() => onPurchaseToggle(listObj)}
          />
        </h2>
        <p style={{ textDecoration: listObj.purchased ? "line-through" : "" }}>
          Quantity: {listObj.quantity}
        </p>
      </span>

      <span className="btn-span">
        <Button
          bgColor="#2c2c2c"
          btnWidth="70px"
          onClick={() => onEditItem(listObj)}
        >
          <img src="./images/edit-item.svg" alt="edit note icon" />
        </Button>

        {!isArchiveBtnShowing && (
          <Button
            bgColor="#fd100e"
            btnWidth="70px"
            onClick={() => onDeleteItem(listObj)}
          >
            <img src="./images/delete.svg" alt="Delete icon" />
          </Button>
        )}

        {isArchiveBtnShowing && (
          <Button
            bgColor="#fd100e"
            btnWidth="70px"
            onClick={() =>
              isArchiveOpen
                ? onRemoveItemFromArchive(listObj)
                : onAddItemToAchive(listObj)
            }
          >
            {isArchiveOpen ? (
              <img src="./images/unarchive.svg" alt="unarchive" />
            ) : (
              <img src="./images/archive.svg" alt="archive" />
            )}
          </Button>
        )}
      </span>
    </li>
  );
}

function ArchivedItems({
  archivedItems,
  onEditItem,
  onDeleteItem,
  gridDisplay,
  isArchiveBtnShowing,
  isArchiveOpen,
  onRemoveItemFromArchive,
}) {
  return (
    <ShoppingList
      onEditItem={onEditItem}
      onDeleteItem={onDeleteItem}
      gridDisplay={gridDisplay}
      isArchiveBtnShowing={isArchiveBtnShowing}
      isArchiveOpen={isArchiveOpen}
      onRemoveItemFromArchive={onRemoveItemFromArchive}
    >
      {archivedItems}
    </ShoppingList>
  );
}
