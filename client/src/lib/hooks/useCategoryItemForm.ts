import { useState, useCallback, useMemo, useEffect } from 'react';
import { Form } from 'antd';
import {
  useAppDispatch,
  useAppSelector,
} from '../../lib/hooks/useReduxHooks';
import {
  editCategoryItem,
  selectEditingCategoryItem,
  selectEditCategoryItemError,
  selectEditedCategoryItem,
  clearEditedCategoryItem,
  clearEditCategoryItemError,
} from '../../redux/slices/categorySlice';
import type { CategoryItem, CategoryItemFormValues, UseCategoryItemFormHook } from '../types/types';



export function useCategoryItemForm(): UseCategoryItemFormHook {
  const [form] = Form.useForm<CategoryItemFormValues>();
  const [modalState, setModalState] = useState<{
    isVisible: boolean;
    selectedItem: CategoryItem | null;
  }>({
    isVisible: false,
    selectedItem: null,
  });

  const dispatch = useAppDispatch();

  const editing = useAppSelector(selectEditingCategoryItem);
  const editError = useAppSelector(selectEditCategoryItemError);
  const editedItem = useAppSelector(selectEditedCategoryItem);

  const selectors = useMemo(
    () => ({
      editing,
      editError,
      editedItem,
    }),
    [editing, editError, editedItem]
  );

  const handleRowDoubleClick = useCallback(
    (record: CategoryItem) => {
     
      form.setFieldsValue({
        item: record.item,
        quantity: record.quantity,
        description: record.description ?? '',
        notes: record.notes ?? '',
      });
      dispatch(clearEditedCategoryItem());
      setModalState({ isVisible: true, selectedItem: record });
      dispatch(clearEditCategoryItemError());
    },
    [form, dispatch]
  );

  const handleModalOk = useCallback(async () => {
    if (!modalState.selectedItem) return;
  
    try {
      const values = await form.validateFields();

      await dispatch(
        editCategoryItem({
          itemId: modalState.selectedItem.id,
          itemInput: values as Partial<CategoryItem>,
        })
      ).unwrap();
      
      setModalState({ isVisible: false, selectedItem: null });
    } catch (error) {
      console.error('Form validation or submission failed:', error);
    }
  }, [form, dispatch, modalState.selectedItem]);

  const handleModalCancel = useCallback(() => {
    setModalState({ isVisible: false, selectedItem: null });
    form.resetFields();
    dispatch(clearEditedCategoryItem());
    dispatch(clearEditCategoryItemError());
  }, [form, dispatch]);

  useEffect(() => {
    if (selectors.editError) {
      console.error('Edit error:', selectors.editError);
    }
  }, [selectors.editError]);

  return useMemo(
    () => ({
      form,
      isModalVisible: modalState.isVisible,
      selectedItem: modalState.selectedItem,
      editing: selectors.editing,
      editError: selectors.editError,
      handleRowDoubleClick,
      handleModalOk,
      handleModalCancel,
    }),
    [
      form,
      modalState.isVisible,
      modalState.selectedItem,
      selectors.editing,
      selectors.editError,
      handleRowDoubleClick,
      handleModalOk,
      handleModalCancel,
    ]
  );
}