// models/categoryModel.ts
import pool from '../db';
import { CategoryItemInput, CategoryItem } from '../types/jobTypes';

export class CategoryModel {
  static async createCategoryItem(itemInput: CategoryItemInput): Promise<CategoryItem> {
    const { categoryId, item, quantity, description, notes } = itemInput;

    const query = `
      INSERT INTO CategoryItems (category_id, item, quantity, description, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, category_id AS "categoryId", item, quantity, description, notes, created_at AS "createdAt"
    `;

    try {
      const result = await pool.query(query, [categoryId, item, quantity, description, notes]);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating category item:', error);
      throw error;
    }
  }

  static async getCategoryItemsByCategoryId(categoryId: string): Promise<CategoryItem[]> {
    const query = `
      SELECT id, category_id AS "categoryId", item, quantity, description, notes, created_at AS "createdAt"
      FROM CategoryItems
      WHERE category_id = $1
      ORDER BY created_at DESC
    `;
    try {
      const result = await pool.query(query, [categoryId]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching category items:', error);
      throw error;
    }
  }

  static async editCategoryItem(itemId: string, itemInput: Partial<CategoryItemInput>): Promise<CategoryItem | null> {
    const { item, quantity, description, notes } = itemInput;

    // Build dynamic query based on provided fields
    const updates: string[] = [];
    const values: (string | number)[] = [];
    let paramCount = 1;

    if (item !== undefined) {
      updates.push(`item = $${paramCount}`);
      values.push(item);
      paramCount++;
    }
    if (quantity !== undefined) {
      updates.push(`quantity = $${paramCount}`);
      values.push(quantity);
      paramCount++;
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount}`);
      values.push(description);
      paramCount++;
    }
    if (notes !== undefined) {
      updates.push(`notes = $${paramCount}`);
      values.push(notes);
      paramCount++;
    }

    if (updates.length === 0) {
      return null;
    }

    const query = `
      UPDATE CategoryItems
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, category_id AS "categoryId", item, quantity, description, notes, created_at AS "createdAt"
    `;

    try {
      values.push(itemId);
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error updating category item:', error);
      throw error;
    }
  }
}