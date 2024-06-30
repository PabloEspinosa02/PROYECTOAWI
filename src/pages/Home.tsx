import React from 'react';
import Header from '../components/Layout/Header';

const Home: React.FC = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://i.postimg.cc/50FxwxWF/portada.jpg')" }}>
      <Header />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start text-white p-8 z-10">
        <h1 className="text-8xl font-bold mb-4 ml-80 leading-tight">
          UT <br />
          BIS <br />
          SHOP
        </h1>
        <div className="flex space-x-4 ml-80">
          <button className="transition ease-in-out delay-150 bg-transparent border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black duration-300">
            Book Now
          </button>
          <button className="transition ease-in-out delay-150 bg-transparent border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black duration-300">
            Watch Video
          </button>
        </div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <video 
          className="w-2/3 h-2/3" 
          autoPlay 
          muted 
          loop 
          controls={false} 
        >
          <source src={`${process.env.PUBLIC_URL}/videos/mivideo.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Home;
