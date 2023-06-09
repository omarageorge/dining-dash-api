import { join } from 'path';
import { unlink } from 'fs/promises';
import Restaurant from '../models/Restaurant.js';

/* Controller method for creating new restaurant */
const createRestaurant = async (req, res) => {
  const { name, location, cuisine } = req.body;

  try {
    const restaurant = new Restaurant({
      name,
      location,
      imageSrc: req.file.filename,
      cuisine,
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/* Controller method for retrieving all restaurants */
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve restaurants' });
  }
};

/* Controller method for retrieving a restaurant by id */
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/* Controller method to update restaurant details */
const updateRestaurant = async (req, res) => {
  const { name, location, cuisine } = req.body;

  try {
    let updatedData = {
      name,
      location,
      cuisine,
    };

    if (req.file) {
      const previousRestaurant = await Restaurant.findById(req.params.id);

      // Deleted old image from file system
      if (previousRestaurant.imageSrc) {
        const imagePath = join('public/uploads/', previousRestaurant.imageSrc);
        unlink(imagePath);
      }
      updatedData.imageSrc = req.file.filename; // replace old image path with new one
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

/* Controller method to delete restaurant */
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (restaurant.imageSrc) {
      const imagePath = join('public/uploads/', restaurant.imageSrc);
      unlink(imagePath);
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

/* Controller method to add dish to restaurant menu */
const addDishToMenu = async (req, res) => {
  const { name, description, ingredients, price } = req.body;

  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    restaurant.menu.push({ name, description, ingredients, price });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

/* Controller method to add dish to restaurant menu */
const deleteDishFromMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const menuIndex = restaurant.menu.findIndex(
      (item) => item._id.toString() === req.params.itemId
    );

    if (menuIndex === -1) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    restaurant.menu.splice(menuIndex, 1);
    await restaurant.save();
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

export default {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  addDishToMenu,
  deleteDishFromMenu,
};
