import { useEffect, useState } from "react";
import { ItemGrocery } from "./components/ItemGrocery";
import { getLocalStorage } from "./helpers/getLocalStorage.ts";
import "./App.css";
import { Alert, Item } from "./entities/entities";

function App(): JSX.Element {
  const [items, setItems] = useState<Item[]>(getLocalStorage());
  const [name, setName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [alert, setAlert] = useState<Alert>({
    type: "",
    message: "",
    show: false,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!name) {
      setAlert({ type: "error", message: "Invalid entry", show: true });
      return;
    }

    // Editing
    if (name && isEditing) {
      setAlert({ type: "success", message: "Edit successfully", show: true });
      setItems(
        items.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }

          return item;
        })
      );

      setName("");
      setEditId("");
      setIsEditing(false);
      return;
    }

    // New Item
    setAlert({ type: "success", message: "Added successfully", show: true });
    const newItem = { id: new Date().getTime().toString(), title: name };

    setItems([...items, newItem]);
    setName("");
  };

  const handleDeleteItem = (id: string) => {
    const newArray = items.filter((item) => item.id !== id);
    setAlert({ type: "error", message: "Removed successfully", show: true });
    setItems(newArray);
  };

  const handleEditItem = (id: string, title: string) => {
    setIsEditing(true);
    setEditId(id);
    setName(title);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ type: "", message: "", show: false });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [alert.show]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  return (
    <main className="grocery_container">
      <section className="grocery_header">
        <h2>Grocery Bud</h2>

        {alert.show && <h3 className={`${alert.type}`}>{alert.message}</h3>}

        <form className="grocery_form" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={name}
            placeholder="Build a desk"
            onChange={(e) => setName(e.target.value)}
          ></input>
          {isEditing ? (
            <button type="submit">EDIT</button>
          ) : (
            <button type="submit">SUBMIT</button>
          )}
        </form>
      </section>

      <section className="grocery_items_container">
        {items.map((item) => (
          <ItemGrocery
            key={item.id}
            {...item}
            removeItem={handleDeleteItem}
            editItem={handleEditItem}
          ></ItemGrocery>
        ))}
        {!(items.length === 0) ? (
          <button className="clear-items" onClick={() => setItems([])}>
            Clear Items
          </button>
        ) : (
          <></>
        )}
      </section>
    </main>
  );
}

export default App;
