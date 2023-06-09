import { Router } from 'express';
import multer from 'multer';
import { readdir } from 'fs/promises';
import restaurantController from '../controllers/restaurantController.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// Multer storage config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
  async fileFilter(req, file, cb) {
    const files = await readdir('public/uploads/');

    if (files.includes(file.originalname)) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  },
});

const upload = multer({ storage });

/* Protect all routes */
// router.use(authenticate);

/* 
    @route  POST /api/v1/restaurants
    @desc   Create new restaurant
    @access Private
*/
router.post(
  '/',
  upload.single('imageSrc'),
  restaurantController.createRestaurant
);

/* 
@route  GET /api/v1/restaurants
@desc   Retrieve all restaurants
@access Private
*/
router.get('/', restaurantController.getRestaurants);

/* 
@route  GET /api/v1/restaurants/:id
@desc   Retrieve restaurant by id
@access Private
*/
router.get('/:id', restaurantController.getRestaurantById);

/* 
@route  PUT /api/v1/restaurants/:id
@desc   Retrieve restaurant by id
@access Private
*/
router.put(
  '/:id',
  upload.single('imageSrc'),
  restaurantController.updateRestaurant
);

/* 
@route  DELETE /api/v1/restaurants/:id
@desc   Delete a restaurant
@access Private
*/
router.delete('/:id', restaurantController.deleteRestaurant);

/* ##########   Menu endpoints    ########## */

/* 
@route  POST /api/v1/restaurants/:id/menu
@desc   Add dish to restaurant menu
@access Private
*/
router.post('/:id/menu', restaurantController.addDishToMenu);

/* 
@route  POST /api/v1/restaurants/:restaurantId/menu/:itemId
@desc   Delete dish from restaurant menu
@access Private
*/
router.delete('/:id/menu/:itemId', restaurantController.deleteDishFromMenu);

export default router;
