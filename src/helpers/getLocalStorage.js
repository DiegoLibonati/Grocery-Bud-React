export const getLocalStorage = () => {
  if (localStorage.getItem("list")) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
