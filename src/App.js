import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import Footer from "./components/footer";
import { Header } from "./components/Header";
import { DiplayStyle } from "./components/DiplayStyle";
import { AddItemIcon } from "./components/AddItemIcon";
import { AddItemForm } from "./components/AddItemForm";
import { DeleteAllItems } from "./DeleteAllItems";

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
  const [sortBy, setSortBy] = useState("input");

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
      currList.filter((item) => item.id !== obj.id)
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

    isArchiveOpen
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
    if (objToEdit?.isArchived) {
      setArchivedItems((currItems) =>
        currItems.map((item) =>
          item.id === objToEdit?.id ? { ...item, ...obj } : item
        )
      );
    } else {
      setShoppingList((currItems) =>
        currItems.map((item) =>
          item.id === objToEdit?.id ? { ...item, ...obj } : item
        )
      );
    }

    // Ensure objToEdit is reset after updating
    setObjToEdit(null);
  }

  return (
    <>
      <Header onThemeToggle={HandleThemeToggle} isDarkMode={isDarkMode} />

      <main>
        <div className="filter-div">
          <Button onClick={() => setIsArchiveBtnShowing((prev) => !prev)}>
            {isArchiveBtnShowing ? (
              <>
                <img src="./images/delete.svg" alt="archive icon" />
                <span>Delete Mode</span>
              </>
            ) : (
              <>
                <img src="./images/archive.svg" alt="archive icon" />
                <span>Archive Mode</span>
              </>
            )}
          </Button>

          <select
            className="select-filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="inupt">By Input</option>
            <option value="purchased">By Purchased</option>
            <option value="quantity">By Quantity</option>
          </select>

          <DiplayStyle
            gridDisplay={gridDisplay}
            onStyleDisplayToggle={handleStyleDisplayToggle}
          />
        </div>

        {!isArchiveOpen && (
          <>
            <ShoppingList
              shoppingList={shoppingList}
              onSetShoppingList={setShoppingList}
              onDeleteItem={handleDeleteItem}
              onEditItem={handleEditItem}
              gridDisplay={gridDisplay}
              isArchiveBtnShowing={isArchiveBtnShowing}
              onAddItemToAchive={handleAddItemToAchive}
              isArchiveOpen={isArchiveOpen}
              archivedItems={archivedItems}
              sortBy={sortBy}
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
            onArchivedItems={setArchivedItems}
            sortBy={sortBy}
          />
        )}
      </main>

      <Footer
        onIsArchiveOpen={setIsArchiveOpen}
        isArchiveOpen={isArchiveOpen}
      />
      {(shoppingList.length > 1 || archivedItems.length > 1) && (
        <DeleteAllItems
          onShoppingList={setShoppingList}
          onArchiveItems={setArchivedItems}
          isArchiveOpen={isArchiveOpen}
        />
      )}
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
  onArchivedItems,
  sortBy,
}) {
  // Handles toggleing an item that has been purchased or not
  function handlePurchaseToggle(obj) {
    isArchiveOpen
      ? onArchivedItems((lists) =>
          lists.map((item) =>
            item.id === obj.id ? { ...item, purchased: !obj.purchased } : item
          )
        )
      : onSetShoppingList((lists) =>
          lists.map((item) =>
            item.id === obj.id ? { ...item, purchased: !item.purchased } : item
          )
        );
  }

  // spreading the children so as to get a copy and not mutate directly
  let sortedList = [...children];

  // no need for an if statement for input cos if its input it just falls back to sortedList

  if (sortBy === "purchased")
    sortedList = sortedList.sort(
      (a, b) => Number(a.purchased) - Number(b.purchased)
    );

  if (sortBy === "quantity")
    sortedList = sortedList.sort((a, b) => b.quantity - a.quantity);

  return (
    <ul className={gridDisplay ? "item-container-grid" : "item-container"}>
      {sortedList.map((list) => (
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
  onArchivedItems,
  onEditItem,
  onDeleteItem,
  gridDisplay,
  isArchiveBtnShowing,
  isArchiveOpen,
  onRemoveItemFromArchive,
  sortBy,
}) {
  return (
    <ShoppingList
      onEditItem={onEditItem}
      onArchivedItems={onArchivedItems}
      onDeleteItem={onDeleteItem}
      gridDisplay={gridDisplay}
      isArchiveBtnShowing={isArchiveBtnShowing}
      isArchiveOpen={isArchiveOpen}
      onRemoveItemFromArchive={onRemoveItemFromArchive}
      sortBy={sortBy}
    >
      {archivedItems}
    </ShoppingList>
  );
}
