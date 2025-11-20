import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const HotelReviewroom = () => {
  return (
    <div>
         <Carousel className='' >
                <div>
                    <img className='w-full' src="https://images.unsplash.com/photo-1724525647096-116d4bacbd5f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='img' />
                </div>
              
                <div>
                    <img className='w-full' src="https://images.unsplash.com/photo-1725113114036-a64884d3f055?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='img' />
                </div>
                <div>
                    <img className='w-full' src="https://images.unsplash.com/photo-1725113160838-9efa2a25aa0b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='img' />
                </div>
                <div>
                    <img className='w-full' src="https://images.unsplash.com/photo-1501966077470-d1ebf6cd871a?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='img' />
                </div>
              
            </Carousel>
    </div>
  )
}

export default HotelReviewroom