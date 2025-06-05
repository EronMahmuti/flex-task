import { Router } from 'express';
import { JobController } from '../controllers/jobController';
import { validateJob } from '../middleware/validateRequest';
import { CategoryItemController } from '../controllers/categoryItemController';

const router = Router();

router.get('/', JobController.getAllJobs);
router.post('/', validateJob, JobController.createJob); // No need for checkValidationResult
router.get('/categories', JobController.getAllCategories);

router.get('/categories', JobController.getAllCategories); // This is part of JobController, but good to keep it for category lookups
router.post('/category-items', CategoryItemController.createCategoryItem);
// with ids
router.get('/categories/:categoryId/items', CategoryItemController.getCategoryItemsByCategoryId);
router.get('/:id', JobController.getJobById);
router.put('/category-items/:itemId', CategoryItemController.editCategoryItem);


export default router;
