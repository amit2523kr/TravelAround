
import React, { useState ,useEffect} from "react";
import './BookingForm.css';
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
const BookingForm=(props)=>{
  const [isOpen, setIsOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    numPersons: "",
    numRooms: ""
    
  });
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const price = props.price;
    const numRooms = bookingData.numRooms;
    if (price && numRooms) {
      setAmount(price * numRooms * 100);
    }
  }, [props.price, bookingData.numRooms]);
  const onToken=(token)=>{
  console.log(token);
 } 
  async function handleSubmit(e){
    e.preventDefault();
    const { name, startDate, endDate,numPersons, numRooms } = bookingData;
    const price = props.price;
    try {
      const response = await axios.post("http://localhost:8000/platinum/", {
        name,
        startDate,
        endDate,
        numPersons,
        numRooms,
        price
      });
      console.log("Server response:", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingData({ ...bookingData, [name]: value });
  };
  
 
  return (
    <div>
      <button className="book" onClick={() => setIsOpen(true)}>Book Now</button>
      {isOpen && (
        <div className="form-popup">
          <p className="close-button" onClick={() => setIsOpen(false)}>
            X
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input className="form-control"
                type="text"
                name="name"
                value={bookingData.name}
                onChange={handleChange}
              />
            </label><br/>
            <label>
              Start Date:
              <input className="form-control mx-1"
                type="date"
                name="startDate"
                value={bookingData.startDate}
                onChange={handleChange}
              />
            </label>
            <label>
              End Date:
              <input className="form-control mx-3"
                type="date"
                name="endDate"
                value={bookingData.endDate}
                onChange={handleChange}
              />
            </label><br/>
            <label>
              Number of Persons:
              <input className="form-control"
                type="number"
                name="numPersons"
                value={bookingData.numPersons}
                onChange={handleChange}
              />
            </label><br/>
            <label>
              Number of Rooms:
              <input className="form-control"
                type="number"
                name="numRooms"
                value={bookingData.numRooms}
                onChange={handleChange}
              />
            </label><br/>
            <label>
              Price:
              <input className="form-control"
                type="number"
                name="price"
                value={props.price}
              />
            </label><br/>
            
            <StripeCheckout
            name="Book your Hotel"
            currency="usd"
            token={onToken}
            amount={amount}
            onClick={handleSubmit}
            stripeKey="pk_test_51N64ktSFjaOjTvLHvtGvpsfUND2VKXlL6uf3a33Y4jhPpUVjswE4BUTi6AMu2SkEtJGktXopdQy6rnnUWBVnzavj00vsh9SXF6"
          />
          </form>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
