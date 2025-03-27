import express from "express";
import {
  addCarouselItem,
  getCarouselItems,
} from "../controllers/carouselController.js";

const router = express.Router();

router.post("/add", addCarouselItem);
router.get("/all", getCarouselItems);

export default router;
