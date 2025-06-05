
import { useState, useEffect } from 'react';
import {
  fetchJobsites,
  selectAllJobsites,
  selectJobsitesLoading,
  selectJobsitesError,
} from '../../redux/slices/jobSlice';
import type { JobData } from '../types/types';
import { useAppDispatch, useAppSelector } from './useReduxHooks';

export const useJobSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<JobData[]>([]);

  const dispatch = useAppDispatch();
  const allJobsites = useAppSelector(selectAllJobsites);
  const error = useAppSelector(selectJobsitesError);
  const loading = useAppSelector(selectJobsitesLoading);


  useEffect(() => {
    dispatch(fetchJobsites());
  }, [dispatch]);

  useEffect(() => {
    const mappedAndFiltered = (allJobsites ?? [])
      .map(jobsite => ({
        key: jobsite.id,
        jobsiteName: jobsite.jobsiteName,
        status: jobsite.status,
        category: jobsite.categories,
        id: jobsite.id,
      }))
      .filter((job) =>
        job.jobsiteName.toLowerCase().includes(searchText.toLowerCase())
      );
    setFilteredData(mappedAndFiltered as JobData[]);
  }, [allJobsites, searchText]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return {
    data: filteredData,
    searchText,
    setSearchText: handleSearch,
    totalJobs: filteredData.length,
    loading,
    error,   
  };
};