import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../index.css';
import Footer from '../components/Layout/Footer';

const Home: React.FC = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div>
      <div className="relative h-screen bg-cover bg-center slide-down" style={{ backgroundImage: "url('https://i.postimg.cc/50FxwxWF/portada.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start text-white p-8 z-10">
          {showText && (
            <>
              <h1 className="text-8xl font-bold mb-4 ml-80 leading-tight slide-in-left">
                UT <br />
                BIS <br />
                SHOP
              </h1>
              <div className="flex space-x-4 ml-80 slide-in-left" style={{ animationDelay: '1.7s' }}>
                <button className="transition ease-in-out delay-150 bg-transparent border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black duration-300">
                  Book Now
                </button>
                <button className="transition ease-in-out delay-150 bg-transparent border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black duration-300">
                  Watch Video
                </button>
              </div>
            </>
          )}
        </div>
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <video 
            className="w-2/3 h-2/3" 
            autoPlay 
            muted 
            loop 
            controls={false} 
          >
            <source src="/videos/mivideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Sección de productos */}
      <div className="p-8">
        <h2 className="title text-4xl font-bold mb-8">Productos Nuevos</h2>
        <Slider {...settings}>
          {/* Productos */}
          <div className="text-center">
            <img src="https://i.postimg.cc/QdbzkzSs/Playera-logo-UT-BIS.jpg" alt="Reusable Cups" />
            <p className="mt-2">Playera Cuello Redondo</p>
          </div>
          <div className="text-center">
            <img src="https://i.postimg.cc/QdbzkzSs/Playera-logo-UT-BIS.jpg" alt="Glass Bottles" />
            <p className="mt-2">Playera Cuello Redondo</p>
          </div>
          <div className="text-center">
            <img src="https://i.postimg.cc/QdbzkzSs/Playera-logo-UT-BIS.jpg" alt="Insulated Bottles" />
            <p className="mt-2">Playera Cuello Redondo</p>
          </div>
          <div className="text-center">
            <img src="https://i.postimg.cc/QdbzkzSs/Playera-logo-UT-BIS.jpg" alt="Reusable Cups" />
            <p className="mt-2">Playera Cuello Redondo</p>
          </div>
          {/* Agrega más productos según sea necesario */}
        </Slider>
      </div>

      {/* Nueva Sección Testimonial */}
      <div className="testimonial-section">
        <blockquote>
        Desde botes hasta mochilas, muestra tu espíritu universitario con nuestros productos.
        </blockquote>
        <p>- UT cancun</p>
      </div>

      {/* Sección adicional */}
      <div className="flex justify-center items-center bg-gray-100 p-8">
        <div className="w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">VEN Y UBÍCANOS</h2>
          <p className="mb-4">Nos encotramos en el edificio B, junto al departamento de actividades culturales y deportivas. Ven y conoce nuestros productos, a un precio accesible, te esperamos.  </p>
          <button className="transition ease-in-out delay-150 bg-transparent border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white duration-300">
            Learn more
          </button>
        </div>
        <div className="w-1/2 p-4">
          <img src="https://i.postimg.cc/vm7ZzbkT/edificio-b.jpg" alt="Plastic retrieval" className="w-full h-full object-cover" />
        </div>
      </div>

    </div>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{ ...style }}
      onClick={onClick}
    >
      <img src="/path/to/next-arrow-icon.png" alt="Next" />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{ ...style }}
      onClick={onClick}
    >
      <img src="/path/to/prev-arrow-icon.png" alt="Previous" />
    </div>
  );
};

export default Home;
