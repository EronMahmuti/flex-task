import { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { useAppDispatch, useAppSelector } from './useReduxHooks';
import {
  createCategoryItem,
  selectCreatingCategoryItem,
  selectCreateCategoryItemError,
  clearCreatedCategoryItem,
  clearCreateCategoryItemError,
  fetchCategoryItemsByCategoryId,
  setSelectedCategoryId,
} from '../../redux/slices/categorySlice';
import type { CategoryItemFormValues } from '../types/types';



export const useJobsiteSidebar = () => {
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [form] = Form.useForm<CategoryItemFormValues>();
  const dispatch = useAppDispatch();
  const creatingCategoryItem = useAppSelector(selectCreatingCategoryItem);
  const createCategoryItemError = useAppSelector(selectCreateCategoryItemError);

  useEffect(() => {
    dispatch(setSelectedCategoryId(selectedKey));
  }, [selectedKey, dispatch]);

  useEffect(() => {
    if (selectedKey) {
      dispatch(fetchCategoryItemsByCategoryId(selectedKey))
        .unwrap()
        .catch((error) => {
          message.error(`Failed to fetch category items: ${error}`);
        });
    }
  }, [selectedKey, dispatch]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    dispatch(clearCreateCategoryItemError());
    dispatch(clearCreatedCategoryItem());
  };

  const onFinish = async (values: CategoryItemFormValues) => {
    const itemInput = {
      categoryId: selectedKey,
      item: values.item,
      quantity: values.quantity,
      description: values.description || '',
      notes: values.notes || '',
    };
    await dispatch(createCategoryItem(itemInput)).unwrap();
    message.success('Category item created successfully!');
    setIsModalVisible(false);
    form.resetFields();
    dispatch(clearCreatedCategoryItem());
    await dispatch(fetchCategoryItemsByCategoryId(selectedKey)).unwrap();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    message.error(
      createCategoryItemError || `${errorInfo} - Failed to create category item`
    );
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onFinish(values);
    } catch (error: unknown) {
      onFinishFailed(error);
    }
  };

  const onSelectKey = (key: string) => {
    setSelectedKey(key)
  }

  return {
    selectedKey,
    onSelectKey,
    isModalVisible,
    showModal,
    handleCancel,
    handleOk,
    form,
    creatingCategoryItem,
    onFinish,
    onFinishFailed,
  };
};