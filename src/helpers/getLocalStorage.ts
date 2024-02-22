import { Item } from "../entities/entities";

export const getLocalStorage = (): Item[] => {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list")!)
    : [{ id: "id123", title: "Build a monitor" }];
};
