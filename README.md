# Grocery-Bud-App-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install node_modules with npm install
4. Use npm start to run the app page

## Description

I made a web application that serves as a notepad of items in a list. In this list we will be able to enter the items with any name we want, also we will be able to edit and delete them. If we want we can also delete all the items of the list touching in `Clear Items`. Every time we perform an action we will see an alert for success or error. In addition all the information is saved in the LocalStorage in this way, the values will persist.

## Technologies used

1. React JS
2. Typescript
3. CSS3

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/30`](https://www.diegolibonati.com.ar/#/project/30)

## Video

https://user-images.githubusercontent.com/99032604/199619905-58f86563-32cb-4de6-8b93-77001318959d.mp4

## Documentation

In the `App.tsx` file we find 5 different states. Here we have a state called `items` which will be the one where we are going to save our list items, `name` is the name of the items, `isEditing` is a state that will allow us to know when an item is being edited , in `editId` we are going to save the id of the item we are editing and finally `alert` will be an alert that will show what action we perform:

```
const [items, setItems] = useState<Item[]>(getLocalStorage());
const [name, setName] = useState<string>("");
const [isEditing, setIsEditing] = useState<boolean>(false);
const [editId, setEditId] = useState<string>("");
const [alert, setAlert] = useState<Alert>({
  type: "",
  message: "",
  show: false,
});
```

The `handleSubmit()` function will be executed once we touch the button to add an item, it will allow the same to add an item to the list:

```
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
```

The `handleDeleteItem()` function allows you to remove an item from the list:

```
const handleDeleteItem = (id: string) => {
  const newArray = items.filter((item) => item.id !== id);
  setAlert({ type: "error", message: "Removed successfully", show: true });
  setItems(newArray);
};
```

The `handleEditItem()` function allows you to edit an item from the list:

```
const handleEditItem = (id: string, title: string) => {
  setIsEditing(true);
  setEditId(id);
  setName(title);
};
```

In `getLocalStorage.ts` we will see that there is a function called `getLocalStorage()` that allows to return if there are items in LocalStorage, return those items otherwise create an empty array:

```
import { Item } from "../entities/entities";

export const getLocalStorage = (): Item[] => {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list")!)
    : [{ id: "id123", title: "Build a monitor" }];
};
```
