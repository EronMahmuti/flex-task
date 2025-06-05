import { createAsyncThunk, createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Service } from '../../api/endpoints/services';
import type { Category, RootState, CategoryItemInput, CategoryItem, CategoriesState } from '../../lib/types/types';

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
  creatingCategoryItem: false,
  createCategoryItemError: null,
  createdCategoryItem: null,
  categoryItemsByCategoryId: {},
  fetchingCategoryItems: false,
  fetchCategoryItemsError: null,
  selectedCategoryId: '',
  editingCategoryItem: false,
  editCategoryItemError: null,
  editedCategoryItem: null,
};

export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await Service.getAllCategories();
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch categories');
    }
  }
);

export const createCategoryItem = createAsyncThunk<CategoryItem, CategoryItemInput, { rejectValue: string }>(
  'categoryItems/create',
  async (itemInput, { rejectWithValue }) => {
    try {
      return await Service.createCategoryItem(itemInput);
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create category item');
    }
  }
);

export const fetchCategoryItemsByCategoryId = createAsyncThunk<
  CategoryItem[],
  string,
  { rejectValue: string }
>(
  'categoryItems/fetchByCategoryId',
  async (categoryId, { rejectWithValue }) => {
    try {
      return await Service.getCategoryItemsByCategoryId(categoryId);
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch category items'
      );
    }
  }
);

export const editCategoryItem = createAsyncThunk<
  CategoryItem,
  { itemId: string; itemInput: Partial<CategoryItemInput> },
  { rejectValue: string }
>(
  'categoryItems/edit',
  async ({ itemId, itemInput }, { rejectWithValue }) => {
    try {
      return await Service.editCategoryItem(itemId, itemInput);
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update category item');
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCreatedCategoryItem: (state) => {
      state.createdCategoryItem = null;
    },
    clearCreateCategoryItemError: (state) => {
      state.createCategoryItemError = null;
    },
    setSelectedCategoryId: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload;
    },
    clearEditedCategoryItem: (state) => {
      state.editedCategoryItem = null;
    },
    clearEditCategoryItemError: (state) => {
      state.editCategoryItemError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch categories';
      })
      .addCase(createCategoryItem.pending, (state) => {
        state.creatingCategoryItem = true;
        state.createCategoryItemError = null;
        state.createdCategoryItem = null;
      })
      .addCase(createCategoryItem.fulfilled, (state, action: PayloadAction<CategoryItem>) => {
        state.creatingCategoryItem = false;
        state.createdCategoryItem = action.payload;
        const categoryId = action.payload.categoryId;
        if (state.categoryItemsByCategoryId[categoryId]) {
          state.categoryItemsByCategoryId[categoryId].push(action.payload);
        } else {
          state.categoryItemsByCategoryId[categoryId] = [action.payload];
        }
      })
      .addCase(createCategoryItem.rejected, (state, action) => {
        state.creatingCategoryItem = false;
        state.createCategoryItemError = action.payload || 'Failed to create category item';
      })
      .addCase(fetchCategoryItemsByCategoryId.pending, (state) => {
        state.fetchingCategoryItems = true;
        state.fetchCategoryItemsError = null;
      })
      .addCase(fetchCategoryItemsByCategoryId.fulfilled, (state, action) => {
        state.fetchingCategoryItems = false;
        const categoryId = action.meta.arg;
        state.categoryItemsByCategoryId[categoryId] = action.payload;
      })
      .addCase(fetchCategoryItemsByCategoryId.rejected, (state, action) => {
        state.fetchingCategoryItems = false;
        state.fetchCategoryItemsError = action.payload || 'Failed to fetch category items';
      })
      .addCase(editCategoryItem.pending, (state) => {
        state.editingCategoryItem = true;
        state.editCategoryItemError = null;
        state.editedCategoryItem = null;
      })
      .addCase(editCategoryItem.fulfilled, (state, action: PayloadAction<CategoryItem>) => {
        state.editingCategoryItem = false;
        state.editedCategoryItem = action.payload;
        const categoryId = action.payload.categoryId;
        if (state.categoryItemsByCategoryId[categoryId]) {
          state.categoryItemsByCategoryId[categoryId] = state.categoryItemsByCategoryId[categoryId].map(
            (item) => (item.id === action.payload.id ? action.payload : item)
          );
        }
      })
      .addCase(editCategoryItem.rejected, (state, action) => {
        state.editingCategoryItem = false;
        state.editCategoryItemError = action.payload || 'Failed to update category item';
      });
  },
});

export const {
  clearCreatedCategoryItem,
  clearCreateCategoryItemError,
  setSelectedCategoryId,
  clearEditedCategoryItem,
  clearEditCategoryItemError
} = categorySlice.actions;

export default categorySlice.reducer;

const selectCategoriesState = (state: RootState) => state.categories;

export const selectCategories = createSelector(
  selectCategoriesState,
  (state) => state.categories
);
export const selectCategoriesLoading = createSelector(
  selectCategoriesState,
  (state) => state.loading
);
export const selectCategoriesError = createSelector(
  selectCategoriesState,
  (state) => state.error
);

export const selectCreatingCategoryItem = createSelector(
  selectCategoriesState,
  (state) => state.creatingCategoryItem
);
export const selectCreateCategoryItemError = createSelector(
  selectCategoriesState,
  (state) => state.createCategoryItemError
);
export const selectCreatedCategoryItem = createSelector(
  selectCategoriesState,
  (state) => state.createdCategoryItem
);

// Memoized selector for category items by ID
export const selectCategoryItemsByCategoryId = createSelector(
  [
    (state: RootState) => state.categories.categoryItemsByCategoryId,
    (categoryId: string) => categoryId 
  ],
  (categoryItemsMap, categoryId) => {
    return categoryItemsMap[categoryId] || []; 
  }
);


export const selectFetchingCategoryItems = createSelector(
  selectCategoriesState,
  (state) => state.fetchingCategoryItems
);
export const selectFetchCategoryItemsError = createSelector(
  selectCategoriesState,
  (state) => state.fetchCategoryItemsError
);
export const selectSelectedCategoryId = createSelector(
  selectCategoriesState,
  (state) => state.selectedCategoryId
);

export const selectEditingCategoryItem = createSelector(
  selectCategoriesState,
  (state) => state.editingCategoryItem
);
export const selectEditCategoryItemError = createSelector(
  selectCategoriesState,
  (state) => state.editCategoryItemError
);
export const selectEditedCategoryItem = createSelector(
  selectCategoriesState,
  (state) => state.editedCategoryItem
);