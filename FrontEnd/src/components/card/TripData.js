import '../card/Trip.css';
import fallbackTripImage from "../assets/hotel1.jpeg";

const TripData=(props)=>{
    const handleImageError = (event) => {
        event.currentTarget.src = fallbackTripImage;
    };

    return(<>
    <div className={`t-card ${props.reveal ? "reveal" : ""}`} style={{ animationDelay: props.delay || "0ms" }}>
    <div className='t-image'>
    <img alt='tripImage' src={props.imgSrc || fallbackTripImage} onError={handleImageError} />
    </div>
    <h4>{props.heading}</h4>
    <p>{props.text}</p>
    <br></br>
 </div>
    </>)
 
}
export default TripData;
