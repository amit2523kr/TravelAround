import React from "react";
// import '../customerReview/Review.css';
import fimage  from '../assets/pic1.jpeg';
import fimage1 from '../assets/pic2.jpeg';
import newyork from "../assets/newYork.jpeg";
import '../customerReview/Review.css';
const Review=()=>{
    return(
      <>
        <div className="cardBody">
        <div className="cardCarousel">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner mb-5">
          <div className="carousel-item active">
            <img className="d-block w-100" src={fimage} alt="First slide" />
            <div className="carousel-caption mt-0">
                 <h5>Customer Reviews</h5>
                <h1>THE PEOPLE WHO KNOWS BEST</h1>
                <p>This tour website exceeded my expectations with their impeccable 
                  organization and unforgettable experiences - a truly remarkable adventure!
                </p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={newyork} alt="Second slide" />
            <div className="carousel-caption  mt-0">
                 <h5>Customer Reviews</h5>
                <h1>THE PEOPLE WHO KNOWS BEST</h1>
                <p>This tour website exceeded my expectations with their impeccable 
                  organization and unforgettable experiences - a truly remarkable adventure!
                </p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={fimage1} alt="Third slide" />
            <div className="carousel-caption mt-0">
                 <h5>Customer Reviews</h5>
                <h1>THE PEOPLE WHO KNOWS BEST</h1>
                <p>This tour website exceeded my expectations with their impeccable 
                  organization and unforgettable experiences - a truly remarkable adventure!
                </p>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      </div>
      </div>

      </>
    );
}
export default Review;