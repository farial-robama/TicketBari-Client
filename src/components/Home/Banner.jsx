import React from "react";

const Banner = () => {
  return (
    <div className="carousel w-full pt-20">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://media.istockphoto.com/id/1154151207/photo/white-bus-traveling-on-the-asphalt-road-around-line-of-trees-in-rural-landscape-at-sunset.jpg?s=612x612&w=0&k=20&c=NLXHp8-e5glAM7t-30Flvcl8R0S_ch8cE5gKghfFbVI="
          className="w-full h-80 brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <h2 className="text-3xl font-bold mb-4">
            Seamless Travel, Every Time
          </h2>
          <p>
            Book your tickets in seconds. Whether it's a daily commute or a
            cross-country adventure, <br />
            we provide the most reliable routes at the best prices.
          </p>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://media.istockphoto.com/id/669839722/photo/passenger-train-close-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=Jw1cuXEjZ7QRWoIlNMvDABxrBUEIEGp56125d0HJPZQ="
          className="w-full h-80 brightness-40"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <h2 className="text-3xl font-bold mb-4">
            Premium Comfort on Every Route
          </h2>
          <p>
            experience top-tier amenities and punctuality. <br />
            Join over 1 million happy travelers who trust our platform for their
            journey.
          </p>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://images.unsplash.com/photo-1679400441308-c20e93746bd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEElMjBwbGFuZXxlbnwwfHwwfHx8MA%3D%3D"
          className="w-full h-80 brightness-45"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <h2 className="text-3xl font-bold mb-4">Explore New Horizons</h2>
          <p>
            Don't just deam about it-get there. From hidden gems to popular city
            hubs, <br />
            our extensive network connects you to the places that matter most.
          </p>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
