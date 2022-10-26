import React from "react";
import { BsTrash, BsPencil } from "react-icons/bs";

export const ItemGrocery = ({ id, title, removeItem, editItem }) => {
  return (
    <article className="grocery_item">
      <h2>{title}</h2>

      <div className="grocery_item_btns">
        <BsPencil
          className="btn-edit"
          onClick={() => editItem(id, title)}
        ></BsPencil>
        <BsTrash
          className="btn-delete"
          onClick={() => removeItem(id)}
        ></BsTrash>
      </div>
    </article>
  );
};
