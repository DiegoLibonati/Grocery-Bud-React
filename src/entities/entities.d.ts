// Types

export type Alert = {
  type: string;
  message: string;
  show: boolean;
};

export type Item = {
  id: string;
  title: string;
};

// Interfaces

export interface ItemGroceryProps {
  id: string;
  title: string;
  removeItem: (id: string) => void;
  editItem: (id: string, title: string) => void;
}
