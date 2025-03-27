import Carousel from "../models/Carousel.js";

// ➤ Add Carousel Data
export const addCarouselItem = async (req, res) => {
  try {
    const newItem = new Carousel(req.body);
    await newItem.save();
    res.status(201).json({ message: "Carousel item added", data: newItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➤ Get All Carousel Data
export const getCarouselItems = async (req, res) => {
  try {
    const items = await Carousel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
