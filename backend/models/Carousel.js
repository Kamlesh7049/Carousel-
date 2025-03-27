import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  bankName: String,
  offerTitle: String,
  shortDescription: String,
  discountProcessingFee: String,
  houslyCashback: String,
  validTill: String,
  imageUrl: String,
});

const Carousel = mongoose.model("Carousel", carouselSchema);
export default Carousel;
