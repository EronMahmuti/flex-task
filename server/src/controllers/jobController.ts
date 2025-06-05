import { Request, Response } from 'express';
import { JobModel } from '../models/jobModel';
import { JobInput } from '../types/jobTypes';

export class JobController {
  static async getAllJobs(req: Request, res: Response): Promise<void> {
    try {
      const jobs = await JobModel.findAll();
      res.status(200).json(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ message: 'Error fetching jobs' });
    }
  }

  static async getJobById(req: Request, res: Response): Promise<void> {
    try {
      const job = await JobModel.findById(req.params.id);
      if (!job) {
        res.status(404).json({ message: 'Job not found' });
        return;
      }
      res.status(200).json(job);
    } catch (error) {
      console.error('Error fetching job:', error);
      res.status(500).json({ message: 'Error fetching job' });
    }
  }

  static async createJob(req: Request, res: Response): Promise<void> {
    try {
      const jobInput: JobInput = req.body;
      const job = await JobModel.create(jobInput);
      res.status(201).json(job);
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({ message: 'Error creating job' });
    }
  }

  static async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await JobModel.findAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Error fetching categories' });
    }
  }
  
}