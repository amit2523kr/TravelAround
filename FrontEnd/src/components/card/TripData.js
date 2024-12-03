import '../card/Trip.css';
const TripData=(props)=>{
    return(<>
    <div className='t-card'>
    <div className='t-image'>
    <img alt='tripImage' src={props.imgSrc} />
    </div>
    <h4>{props.heading}</h4>
    <p>{props.text}</p>
    <br></br>
 </div>
    </>)
 
}
export default TripData;