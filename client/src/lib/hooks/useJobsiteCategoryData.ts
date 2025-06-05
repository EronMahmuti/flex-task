import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from './useReduxHooks';
import useJobsiteData from './useJobSiteData';
import { getJobsiteCategories } from '../utils/utils';
import type { Category, Jobsite, RootState } from '../types/types';
import { selectFetchCategoryItemsError, selectFetchingCategoryItems, selectSelectedCategoryId } from '../../redux/slices/categorySlice';
import { createSelector } from '@reduxjs/toolkit';

export const useJobsiteCategoryData = () => {
  const { id = '' } = useParams<{ id: string }>();

  const { jobsite, isLoading, allCategories, categoriesLoading } =
    useJobsiteData(id);

  const jobsiteCategories = getJobsiteCategories(
    jobsite as Jobsite,
    allCategories
  );
  const selectCategoryItemsByCategoryId = (categoryId: string) =>
    createSelector(
      [(state: RootState) => state.categories.categoryItemsByCategoryId],
      (categoryItemsMap) => {
        return categoryItemsMap[categoryId] || [];
      }
    );

  const selectedCategoryId = useAppSelector(selectSelectedCategoryId);
  const categoryItems = useAppSelector(
    selectCategoryItemsByCategoryId(selectedCategoryId || '')
  );
  const fetchingCategoryItems = useAppSelector(selectFetchingCategoryItems);
  const fetchCategoryItemsError = useAppSelector(selectFetchCategoryItemsError);

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategoryId) return 'Select a Category';
    const category = allCategories.find(
      (cat: Category) => cat.id === selectedCategoryId
    );
    return category ? category.name : 'Category Not Found';
  }, [selectedCategoryId, allCategories]);

  const loading = isLoading || categoriesLoading;

  return {
    jobsite,
    jobsiteCategories,
    selectedCategoryId,
    categoryItems,
    selectedCategoryName,
    loading,
    fetchingCategoryItems,
    fetchCategoryItemsError,
  };
};
