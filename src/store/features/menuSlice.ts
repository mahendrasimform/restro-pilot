import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem, SelectOption } from "src/interface/types";
import { v4 as uuidv4 } from "uuid";

interface MenuState {
  items: MenuItem[];
  categories: SelectOption[];
  ingredients: SelectOption[];
  loading: boolean;
  error: string | null;
}

const defaultCategories: SelectOption[] = [
  { id: uuidv4(), name: "Appetizers" },
  { id: uuidv4(), name: "Main Course" },
  { id: uuidv4(), name: "Desserts" },
  { id: uuidv4(), name: "Beverages" },
  { id: uuidv4(), name: "Soups" },
  { id: uuidv4(), name: "Salads" },
];

const defaultIngredients: SelectOption[] = [
  { id: uuidv4(), name: "Tomato" },
  { id: uuidv4(), name: "Onion" },
  { id: uuidv4(), name: "Potato" },
  { id: uuidv4(), name: "Spinach" },
  { id: uuidv4(), name: "Cauliflower" },
  { id: uuidv4(), name: "Green Peas" },
  { id: uuidv4(), name: "Coriander" },
  { id: uuidv4(), name: "Ginger" },
  { id: uuidv4(), name: "Garlic" },
  { id: uuidv4(), name: "Chili" },
  { id: uuidv4(), name: "Turmeric" },
  { id: uuidv4(), name: "Cumin" },
  { id: uuidv4(), name: "Mustard Seeds" },
  { id: uuidv4(), name: "Fenugreek" },
  { id: uuidv4(), name: "Curry Leaves" },
];

const initialState: MenuState = {
  items: JSON.parse(localStorage.getItem("menuItems") || "[]"),
  categories: JSON.parse(
    localStorage.getItem("categories") || JSON.stringify(defaultCategories)
  ),
  ingredients: JSON.parse(
    localStorage.getItem("ingredients") || JSON.stringify(defaultIngredients)
  ),
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
      const index = state.items.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem("menuItems", JSON.stringify(state.items));
      }
    },
    deleteMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item: any) => item.id !== action.payload);
      localStorage.setItem("menuItems", JSON.stringify(state.items));
    },
  },
});

export const { addMenuItem, updateMenuItem, deleteMenuItem } =
  menuSlice.actions;

export default menuSlice.reducer;
