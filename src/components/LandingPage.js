import React, { useState } from 'react';
import '../styles/Footer.css';
import '../styles/Landingpage.css';

import landingpage from '../assets/images/landingpage.jpeg';
import landingpage1 from '../assets/images/landingpage1.jpeg';
import landingpage2 from '../assets/images/landingpage2.jpeg';
import landingpage3 from '../assets/images/landingpage3.jpeg';
import landingpage4 from '../assets/images/landingpage4.jpeg';

const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <div>
      <header style={{ marginTop: '-5px' }}>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === activeSlide ? 'active' : ''}
                aria-current={index === activeSlide ? 'true' : 'false'}
                aria-label={`Slide ${index}`}
                onClick={() => handleSlideChange(index)}
              ></button>
            ))}
          </div>

          {/* Carousel Inner */}
          <div className="carousel-inner">
            {/* Slide One */}
            <div className={`carousel-item ${activeSlide === 0 ? 'active' : ''}`}>
              <img src={landingpage} alt="img1" className="d-block w-100" height="654px" />
              <div className="carousel-caption d-none d-md-block">
                <h3>EXQUISITE</h3>
              </div>
            </div>
            {/* Slide Two */}
            <div className={`carousel-item ${activeSlide === 1 ? 'active' : ''}`}>
              <img src={landingpage1} alt="img2" className="d-block w-100" height="654px" />
              <div className="carousel-caption d-none d-md-block">
                <h3>Singing Management</h3>
              </div>
            </div>
            {/* Slide Three */}
            <div className={`carousel-item ${activeSlide === 2 ? 'active' : ''}`}>
              <img src={landingpage2} alt="img3" className="d-block w-100" height="654px" />
              <div className="carousel-caption d-none d-md-block">
                <h3>Dancing Management</h3>
              </div>
            </div>
            {/* Slide Four */}
            <div className={`carousel-item ${activeSlide === 3 ? 'active' : ''}`}>
              <img src={landingpage3} alt="img4" className="d-block w-100" height="654px" />
              <div className="carousel-caption d-none d-md-block">
                <h3>Shipwreck Solve the Puzzle</h3>
              </div>
            </div>
            {/* Slide Five */}
            <div className={`carousel-item ${activeSlide === 4 ? 'active' : ''}`}>
              <img src={landingpage4} alt="img5" className="d-block w-100" height="654px" />
              <div className="carousel-caption d-none d-md-block">
                <h3>Many more You are Looking for</h3>
              </div>
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" onClick={() => handleSlideChange((activeSlide - 1 + 5) % 5)}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" onClick={() => handleSlideChange((activeSlide + 1) % 5)}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </header>

      {/* Rest of the code... */}


      <section id="service-section" className="mt-5 mb-5 pr-3">
    <div className="container marketing text-center">
      {/* Three columns of text below the carousel */}
      <div className="row">
        <div className="col-lg-4">
          <img className="rounded-circle" src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Generic placeholder image1" width="240" height="240" />
          <h2>Auditorium</h2>
        </div>
        <div className="col-lg-4">
          <img className="rounded-circle" src="https://images.unsplash.com/photo-1578269174936-2709b6aeb913?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" alt="Generic placeholder image2" width="240" height="240" />
          <h2>Competition</h2>
        </div>
        <div className="col-lg-4">
          <img className="rounded-circle" src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" alt="Generic placeholder image3" width="240" height="240" />
          <h2>Management</h2>
        </div>
      </div>
      <br />
      <button className="get-started-button" id="getstart">
        <b>Get Started...</b>
      </button>
    </div>
    </section>
    <section className="footer-section">
    <footer className="footer">
      <p>&#169; 2023 copyright all right reserved</p>
    </footer>
    </section>





    </div>
  );
};

export default LandingPage;
