import React from 'react';

const WhyChooseUs = () => {
    return (
        <div className="mx-auto">
      <div className="flex flex-col-reverse md:flex-row gap-10 justify-between items-center my-15">
        <div className="flex flex-col gap-5">
          <h1 className=" text-gray-600 text-3xl font-bold">
            Why Book Your Tickets With Us?
          </h1>
          <p className="text-gray-600 text-xl">
            We are more than just a booking site. <br /> <span className="font-bold">TicketBari</span>{" "}
           connects you to thousands of routes with verified operators, ensuring your journey is safe, affordable, and on time.
          </p>
        </div>
        
          <img className="rounded-md md:w-130 w-full" src="https://media.istockphoto.com/id/2161855658/photo/woman-listening-music-on-smartphone-in-public-transport.jpg?s=612x612&w=0&k=20&c=BcrGXcsC3P_Y9DmkcqaLJN0R0vENUp74JcZLlDztBb0=" alt="image" />
        
      </div>

      <div className="flex flex-col md:flex-row gap-7 justify-between items-center my-7">
        <img className="rounded-md md:w-130 w-full" src="https://media.istockphoto.com/id/2208462604/photo/public-transportation-in-modern-city-bus-parked-at-bus-stop-with-skyline-in-the-background.jpg?s=612x612&w=0&k=20&c=tr_pcTz8-x4TufrfcfUe7YgX-lnujK17NSRZhknfdMk=" alt="image" />
        <div className="flex flex-col gap-5">
          <h1 className="text-gray-600 text-3xl font-bold">The TicketBari Advantage</h1>

          <ul className="steps steps-vertical text-gray-600 text-lg">
            <li className="step step-primary">
              Real-time seat availability & instant confirmation
            </li>
            <li className="step step-primary">
              Secure payment gateways with multiple options
            </li>
            <li className="step step-primary">
              customer support for booking assistance
            </li>
            <li className="step step-primary">
              Easy cancellation and instant refund policy
            </li>
            <li className="step step-primary">
              Exclusive discounts for frequent travelers
            </li>
          </ul>
        </div>
      </div>

      {/* <div className='text-center my-10'>
             <Link to="/transaction" className='button'>Add Your Transaction</Link>
           </div> */}

    </div>
    );
};

export default WhyChooseUs;