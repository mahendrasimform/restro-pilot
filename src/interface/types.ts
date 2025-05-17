export interface FormData {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  phone?: string;
}

export interface FormDataTableProps {
  dataSource: FormData[];
  handleDelete: (id: string) => void;
}

export interface FormContainerProps {
  formData: FormData[];
  updateFormData: (newFormData: FormData) => void;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    role: string;
  } | null;
}