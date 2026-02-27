import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { createItem, deleteItem, getItem, listItems, updateItem } from '../controllers/itemController.js';
import { validate } from '../middleware/validate.js';
import { createItemSchema, updateItemSchema } from '../validators/itemValidators.js';

const router = Router();

router.use(authenticate);
router.route('/').get(listItems).post(validate(createItemSchema), createItem);
router.route('/:id').get(getItem).put(validate(updateItemSchema), updateItem).delete(deleteItem);

export default router;
