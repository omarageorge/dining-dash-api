import Restaurant from '../models/Restaurant.js';

// Controller method for creating new Restaurant
export const createRestaurant = async (req, res) => {
  const { name, location, imageSrc, cuisine } = req.body;

  try {
    const restaurant = new Restaurant({
      name,
      location,
      imageSrc,
      cuisine,
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400);
    throw new Error('Failed to create restaurant');
  }
};
