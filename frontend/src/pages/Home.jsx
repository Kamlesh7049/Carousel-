import React from "react";
import CarouselComponent from "../components/CarouselComponent";
import AddCarouselForm from "../components/AddCarousleForm";

const Home = () => {
  return (
    <>
      {/* <h2>Carousel Section</h2> */}
      <CarouselComponent />
          {/* <h2>Add Carousel Data</h2> */}
          
          <hr />
      <AddCarouselForm />
    </>
  );
};

export default Home;
