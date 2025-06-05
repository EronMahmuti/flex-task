import { Job, JobInput } from '../types/jobTypes';
import pool from '../db';

export class JobModel {
  static async create(jobInput: JobInput): Promise<Job> {
    const { jobsiteName, status, categories } = jobInput;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const insertJobsiteQuery = `
        INSERT INTO JobSites (jobsite_name, status)
        VALUES ($1, $2)
        RETURNING id, jobsite_name AS "jobsiteName", status, created_at AS "createdAt"
      `;
      const jobResult = await client.query(insertJobsiteQuery, [jobsiteName, status]);
      const job = jobResult.rows[0];

      const insertCategoryQuery = `
        INSERT INTO JobSiteCategories (jobsite_id, category_id)
        VALUES ($1, $2)
      `;
      for (const categoryId of categories) {
        await client.query(insertCategoryQuery, [job.id, categoryId]);
      }

      await client.query('COMMIT');
      return { ...job, categories: categories };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async findAll(): Promise<Job[]> {
    const query = `
      SELECT js.id, js.jobsite_name AS "jobsiteName", js.status, js.created_at AS "createdAt",
        ARRAY_AGG(jsc.category_id) AS categories
      FROM JobSites js
      LEFT JOIN JobSiteCategories jsc ON js.id = jsc.jobsite_id
      GROUP BY js.id
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: string): Promise<Job | undefined> {
    const query = `
      SELECT js.id, js.jobsite_name AS "jobsiteName", js.status, js.created_at AS "createdAt",
        ARRAY_AGG(jsc.category_id) AS categories
      FROM JobSites js
      LEFT JOIN JobSiteCategories jsc ON js.id = jsc.jobsite_id
      WHERE js.id = $1
      GROUP BY js.id
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || undefined;
  }

  static async findAllCategories(): Promise<{ id: string; name: string }[]> {
    const query = `
      SELECT id, name
      FROM Categories
      ORDER BY name
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}
