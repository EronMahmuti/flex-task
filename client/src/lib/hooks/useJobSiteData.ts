import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useReduxHooks';
import {
  fetchJobsiteById,
  selectJobsitesLoading,
  selectJobsiteById,
} from '../../redux/slices/jobSlice';
import {
  fetchCategories,
  selectCategories,
  selectCategoriesLoading,
} from '../../redux/slices/categorySlice';

const useJobsiteData = (id: string) => {
  const dispatch = useAppDispatch();

  const jobsite = useAppSelector((state) => selectJobsiteById(state, id));
  const jobsiteLoading = useAppSelector(selectJobsitesLoading);
  const allCategories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);

  useEffect(() => {
    if (id) dispatch(fetchJobsiteById(id));
    if (allCategories.length === 0 && !categoriesLoading) {
      dispatch(fetchCategories());
    }
  }, [id, dispatch, allCategories.length, categoriesLoading]);

  return {
    jobsite,
    isLoading: jobsiteLoading,
    allCategories,
    categoriesLoading,
  };
};

export default useJobsiteData;
