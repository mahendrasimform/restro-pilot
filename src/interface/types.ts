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
  images: string[];
  ingredients: string[];
  available: boolean;
  createdAt: string;
}

export interface SelectOption {
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

export interface MenuItemTableProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

export interface MenuItemFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Partial<MenuItem>) => void;
  initialValues?: MenuItem;
  categories: SelectOption[];
  ingredients: SelectOption[];
}
