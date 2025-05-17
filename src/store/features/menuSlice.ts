import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem, Category } from "src/interface/types";
import { v4 as uuidv4 } from "uuid";

interface MenuState {
  items: MenuItem[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const defaultCategories: Category[] = [
  { id: uuidv4(), name: "Appetizers" },
  { id: uuidv4(), name: "Main Course" },
  { id: uuidv4(), name: "Desserts" },
  { id: uuidv4(), name: "Beverages" },
  { id: uuidv4(), name: "Soups" },
  { id: uuidv4(), name: "Salads" },
];

const initialState: MenuState = {
  items: JSON.parse(localStorage.getItem("menuItems") || "[]"),
  categories: JSON.parse(localStorage.getItem("categories") || JSON.stringify(defaultCategories)),
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenuItem: (state, action: PayloadAction<Omit<MenuItem, "id">>) => {
      const newItem = { ...action.payload, id: uuidv4() };
      state.items.push(newItem);
      localStorage.setItem("menuItems", JSON.stringify(state.items));
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem("menuItems", JSON.stringify(state.items));
      }
    },
    deleteMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("menuItems", JSON.stringify(state.items));
    },
    addCategory: (state, action: PayloadAction<Omit<Category, "id">>) => {
      const newCategory = { ...action.payload, id: uuidv4() };
      state.categories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },
  },
});

export const {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  addCategory,
  deleteCategory,
} = menuSlice.actions;

export default menuSlice.reducer;