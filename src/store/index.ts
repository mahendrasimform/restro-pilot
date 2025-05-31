import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "src/store/features/counterSlice";
import menuSlice from "src/store/features/menuSlice";
import authSlice from "src/store/features/authSlice";
import { userApi } from "src/store/api/userApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    menu: menuSlice,
    auth: authSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;