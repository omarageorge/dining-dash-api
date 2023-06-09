import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    imageSrc: { type: String },
    cuisine: { type: String },
    menu: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        ingredients: { type: String, required: true },
        price: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
