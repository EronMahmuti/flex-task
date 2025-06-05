
import { Request, Response } from 'express';
import { CategoryModel } from '../models/categoryModel';
import { CategoryItemInput } from '../types/jobTypes';

export class CategoryItemController {
  static async createCategoryItem(req: Request, res: Response): Promise<void> {
    try {
      const itemInput: CategoryItemInput = req.body;

      if (!itemInput.categoryId || !itemInput.item || itemInput.quantity === undefined) {
        res.status(400).json({ message: 'Category ID, item, and quantity are required.' });
        return;
      }

      const newCategoryItem = await CategoryModel.createCategoryItem(itemInput);
      res.status(201).json(newCategoryItem);
    } catch (error) {
      console.error('Error creating category item:', error);
      res.status(500).json({ message: 'Error creating category item.' });
    }
  }

  static async getCategoryItemsByCategoryId(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;

      if (!categoryId) {
        res.status(400).json({ message: 'Category ID is required.' });
        return;
      }

      const categoryItems = await CategoryModel.getCategoryItemsByCategoryId(categoryId);
      res.status(200).json(categoryItems);
    } catch (error) {
      console.error('Error fetching category items:', error);
      res.status(500).json({ message: 'Error fetching category items.' });
    }
  }

  static async editCategoryItem(req: Request, res: Response): Promise<void> {
    try {
      const { itemId } = req.params;
      const itemInput: Partial<CategoryItemInput> = req.body;

      if (!itemId) {
        res.status(400).json({ message: 'Item ID is required.' });
        return;
      }

      if (!itemInput.item && itemInput.quantity === undefined && !itemInput.description && !itemInput.notes) {
        res.status(400).json({ message: 'At least one field (item, quantity, description, or notes) must be provided for update.' });
        return;
      }

      const updatedItem = await CategoryModel.editCategoryItem(itemId, itemInput);
      
      if (!updatedItem) {
        res.status(404).json({ message: 'Category item not found.' });
        return;
      }

      res.status(200).json(updatedItem);
    } catch (error) {
      console.error('Error updating category item:', error);
      res.status(500).json({ message: 'Error updating category item.' });
    }
  }
}