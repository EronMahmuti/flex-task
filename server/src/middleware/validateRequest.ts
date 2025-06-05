import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const jobSchema = Joi.object({
  jobsiteName: Joi.string().trim().max(100).required(),
  status: Joi.string().valid('completed', 'on hold', 'on road').required(),
  categories: Joi.array().items(Joi.string().uuid()).required(),
});

export const validateJob = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = jobSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({
      errors: error.details.map((err) => ({
        message: err.message,
        path: err.path,
      })),
    });
    return;
  }

  next();
};
