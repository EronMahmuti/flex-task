import type { Category, CategoryItem, CategoryItemInput, Jobsite } from '../../lib/types/types';
import apiClient from '../axios';

export const Service = {
  getAllJobsites: async (): Promise<Jobsite[]> => {
    try {
      const response = await apiClient.get<Jobsite[]>('/jobs');
      return response.data;
    } catch (error) {
      console.error('Error fetching jobsites:', error);
      throw error;
    }
  },
  createJobsite: async (jobsite: Omit<Jobsite, 'id'>): Promise<Jobsite> => {
    try {
      const response = await apiClient.post<Jobsite>('/jobs', jobsite);
      return response.data;
    } catch (error) {
      console.error('Error creating jobsite:', error);
      throw error;
    }
  },
  getJobsiteById: async (id: string): Promise<Jobsite> => {
    try {
      const response = await apiClient.get<Jobsite>(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching jobsite by ID:', error);
      throw error;
    }
  },
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const response = await apiClient.get<Category[]>('/jobs/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  createCategoryItem: async (itemInput: CategoryItemInput): Promise<CategoryItem> => {
    try {
      const response = await apiClient.post<CategoryItem>('/jobs/category-items', itemInput);
      return response.data;
    } catch (error) {
      console.error('Error creating category item:', error);
      throw error;
    }
  },
  getCategoryItemsByCategoryId: async (categoryId: string): Promise<CategoryItem[]> => {
    try {
      const response = await apiClient.get<CategoryItem[]>(`/jobs/categories/${categoryId}/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category items:', error);
      throw error;
    }
  },
  editCategoryItem: async (itemId: string, itemInput: Partial<CategoryItemInput>): Promise<CategoryItem> => {
    try {
      const response = await apiClient.put<CategoryItem>(`/jobs/category-items/${itemId}`, itemInput);
      return response.data;
    } catch (error) {
      console.error('Error updating category item:', error);
      throw error;
    }
  }
};