import type { FormInstance, FormItemProps, InputNumberProps, ModalProps, SelectProps, TableProps } from "antd";
import type { Rule, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import type { store } from "../../redux/store";
import type { ReactNode } from "react";


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface JobFormValues {
    jobsite: string;
    category: string | string[];
    status: string;
 }


 export interface HeaderProps {
  jobsite: Jobsite;
  isLoading?: boolean;
}

export interface BaseTableProps<T> extends TableProps<T> {
  onRowDoubleClick?: (record: T) => void;
}


export interface JobsiteCategoryMenuProps {
  categories: CategoryMenu['categories'];
  selectedKey: string;
  onSelect: (key: string) => void;
}

export interface CategoryItemsTableProps {
  data: CategoryItem[];
  categoryId?: string;
}


export interface GenericModalProps
  extends Omit<ModalProps, 'open' | 'styles'> {
  isOpen: boolean;
  title: string;
  children: ReactNode;
}

export interface UseCategoryItemFormHook {
  form: FormInstance<CategoryItemFormValues>;
  isModalVisible: boolean;
  selectedItem: CategoryItem | null;
  editing: boolean;
  editError: string | null;
  handleRowDoubleClick: (record: CategoryItem) => void;
  handleModalOk: () => Promise<void>;
  handleModalCancel: () => void;
  isSubmitting?: boolean;
}

export type RuleName =
  | 'quantity'
  | 'item'
  | 'description'
  | 'notes'
  | 'jobsite'
  | 'category'
  | 'status';

export interface InputRules {
  quantity: Rule[];
  item: Rule[];
  description: Rule[];
  notes: Rule[];
  jobsite: Rule[];
  category: Rule[];
  status: Rule[];
}

export interface UseModalFormProps<T> {
  onSubmit: (values: T) => Promise<void> | void;
  onCancel?: () => void;
}

export interface CategoryItemFormValues {
  item: string;
  quantity: number;
  description?: string;
  notes?: string;
}

export interface PropsSubset {
  isLoading: boolean;
  categories: CategoryMenuItem[];
  selectedKey: string;
  onSelectKey: (key: string) => void;
  showModal: () => void;
  jobsite: Jobsite;
}

 export interface CategoryItemModalProps {
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: FormInstance<CategoryItemFormValues>;
  creatingCategoryItem: boolean;
  onFinish: (values: CategoryItemFormValues) => void;
  onFinishFailed: (errorInfo: unknown) => void;
}

export interface OptionType {
  label: string;
  value: string | number;
}


export interface UseCreateJobModalReturn {
    isModalOpen: boolean;
    form: FormInstance;
    showModal: () => void;
    handleOk: () => void;
    handleCancel: () => void;
    onFinish: (values: JobFormValues) => void;
    onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
  }

  export interface CategoryItemFormValues {
    item: string;
    quantity: number;
    description?: string;
    notes?: string;
  }

  export interface FormTextAreaProps {
    name: string;
    label: string;
    placeholder?: string;
    rows?: number;
    rules?: FormItemProps['rules'];
  };
  
  export interface FormTextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  rules?: FormItemProps['rules'];
};


  export type FormNumberInputProps = {
    name: string;
    label: string;
    rules?: FormItemProps['rules'];
  } & InputNumberProps;

  export interface CategoryItemFormProps {
    form: FormInstance<CategoryItemFormValues>;
    onFinish?: (values: CategoryItemFormValues) => void;
    onFinishFailed?: (errorInfo: unknown) => void;
    initialValues?: CategoryItemFormValues;
    isEditing?: boolean;
  }

export interface JobsState {
    jobsites: Jobsite[];
    loading: boolean;
    error: string | null;
  }

  export interface Jobsite {
    id: string;
    jobsiteName: string;
    status: string;
    categories: string | string[]; 
  }
  
  export interface CategoryMenuItem {
    key: string;
    label: string;
    style?: React.CSSProperties;
  }

  export interface CategoryItemInput {
    categoryId: string;
    item: string;
    quantity: number;
    description?: string;
    notes?: string;
  }
  
  export interface CategoryItem {
    id: string;
    categoryId: string;
    item: string;
    quantity: number;
    description?: string;
    notes?: string;
    createdAt: string; 
  }

  export interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    creatingCategoryItem: boolean;
    createCategoryItemError: string | null;
    createdCategoryItem: CategoryItem | null;
    categoryItemsByCategoryId: Record<string, CategoryItem[]>;
    fetchingCategoryItems: boolean;
    fetchCategoryItemsError: string | null;
    selectedCategoryId: string;
    editingCategoryItem: boolean;
    editCategoryItemError: string | null;
    editedCategoryItem: CategoryItem | null;
  }
  
  export interface EditCategoryItemModalProps {
    isOpen: boolean;
    onOk: () => void;
    onCancel: () => void;
    form: FormInstance<CategoryItemFormValues>;
    selectedItem: CategoryItem | null;
    confirmLoading: boolean;
    editError: string | null;
  }


  export interface SidebarTypes {
    jobsite: Jobsite | null;
    isLoading: boolean;
    categories: CategoryMenuItem[];
  }

  export interface CategoryMenu {
    categories: Array<{
      key: string;
      label?: string;
      style?: React.CSSProperties;
    }>;
  }
  export interface JobsiteCategoryMenuProps {
    categories: CategoryMenu['categories'];
    selectedKey: string;
    onSelect: (key: string) => void;
  }

export interface Category {
    id: string;
    name: string;
    createdAt?: string;
  }
  

export interface CreateJobModalProps {
    isOpen: boolean;
    form: FormInstance;
    onOk: () => void;
    onCancel: () => void;
    onFinish: (values: JobFormValues) => void;
    onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
}  

export interface CreateJobFormProps {
    form?: FormInstance;
    onFinish: (values: JobFormValues) => void;
    onFinishFailed: (errorInfo: ValidateErrorEntity) => void;
}

export interface JobModalFooterProps {
    onCancel?: () => void;
    onOk: () => void;
}
  
  export interface JobData {
    key: string; 
    jobsiteName: string; 
    status: 'on hold' | 'on road' | 'completed';
    category: string | string[];
    id: string;
  }
  
export interface TableData {
    data: JobData[];
}

export interface TableHeader {
    searchText: string;
    onSearchChange: (value: string) => void;
    totalJobs: number;
}


export interface FormSelectProps {
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
  rules?: Rule[];
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  mode?: SelectProps['mode'];
  allowClear?: boolean;
  clickableOnly?: boolean;
}

export interface OptionProps {
  value: string | number;
  label: string;
  isSelected: boolean;
  color: { className: string; css: string };
}

export interface TagItemProps {
  value: string | number;
  label: string;
  color: string;
  onRemove: (value: string | number) => void;
}

export type SelectValue = string | number;

export interface UseFormSelectProps {
  name: string;
}
export type ColorType = 'status' | 'category';