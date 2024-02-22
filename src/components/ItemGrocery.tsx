import { BsTrash, BsPencil } from "react-icons/bs";
import { ItemGroceryProps } from "../entities/entities";

export const ItemGrocery = ({
  id,
  title,
  removeItem,
  editItem,
}: ItemGroceryProps): JSX.Element => {
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
