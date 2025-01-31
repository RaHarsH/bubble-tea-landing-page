'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const slides = [
  {
    title: "Explore the World of Flavors",
    description: "Dive into a vibrant fusion of flavors with our handcrafted boba teas. Every sip is a new adventure for your taste buds.",
    image: "/images/image4.png",
    color: "from-pink-400 to-purple-500"
  },
  {
    title: "Signature Milk Tea Perfection",
    description: "Indulge in our smooth, creamy, and classic milk tea that sets the standard. Experience the perfect balance of tea and milk in every cup.",
    image: "/images/bubbleTea.jpg",
    color: "from-amber-300 to-orange-400"
  },
  {
    title: "Exotic Fruit Tea Delights",
    description: "Discover the freshness of our exotic fruit tea range, crafted with real fruit flavors that refresh and invigorate your senses.",
    image: "/images/image5.png",
    color: "from-green-400 to-emerald-500"
  },
  {
    title: "Customize Your Boba Experience",
    description: "Personalize your drink with our wide array of toppings. From classic tapioca pearls to fruity jellies, make your boba uniquely yours.",
    image: "/images/image4.png",
    color: "from-blue-400 to-emerald-500"
  },
  {
    title: "Refreshing Iced Teas & More",
    description: "Cool down with our selection of refreshing iced teas, available in a variety of flavors and styles to suit every mood.",
    image: "/images/boba.png",
    color: "from-blue-400 to-indigo-500"
  },
]


export default function BubbleTeaCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
    const slideRefs = useRef([]);
    const timeoutRef = useRef(null);
  
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  
    useEffect(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;
  
      gsap.set(slideRefs.current, { opacity: 0, x: '100%' });
      gsap.set(slideRefs.current[currentSlide], { opacity: 1, x: '0%' });
  
      const tl = gsap.timeline();
  
      tl.to(carousel, {
        duration: 0.5,
        opacity: 1,
        ease: "power2.inOut"
      });
  
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
  
      return () => {
        tl.kill();
        resetTimeout();
      }
    }, [currentSlide]);
  
    const goToSlide = (index) => {
      resetTimeout();
      const nextIndex = (index + slides.length) % slides.length;
      const currentSlideElement = slideRefs.current[currentSlide];
      const nextSlideElement = slideRefs.current[nextIndex];
  
      if (currentSlideElement && nextSlideElement) {
        gsap.to(currentSlideElement, {
          duration: 0.5,
          opacity: 0,
          x: '-100%',
          ease: "power2.inOut"
        });
  
        gsap.fromTo(nextSlideElement,
          { opacity: 0, x: '100%' },
          {
            duration: 0.5,
            opacity: 1,
            x: '0%',
            ease: "power2.inOut"
          }
        );
      }
  
      setCurrentSlide(nextIndex);
    }
  
    return (
      <div className="relative w-full h-[600px] overflow-hidden rounded-2xl" ref={carouselRef}>
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={el => slideRefs.current[index] = el}
            className={`absolute inset-0 flex items-center justify-center ${index === currentSlide ? 'z-10' : 'z-0'}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80`}></div>
            <div className="relative z-20 flex flex-col lg:flex-row w-full h-full">
              <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col justify-center text-white p-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl lg:text-2xl mb-8">{slide.description}</p>
                <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300 self-start">
                  Savor Every Sip
                </button>
              </div>
            </div>
          </div>
        ))}
  
        <button
          onClick={() => goToSlide(currentSlide - 1)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 z-30 transition duration-300"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => goToSlide(currentSlide + 1)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 z-30 transition duration-300"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
  
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    );
  }