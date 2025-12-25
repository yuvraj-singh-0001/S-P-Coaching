import { useEffect, useRef } from 'react';

const aboutBg = new URL('/images/About-bg.png', import.meta.url).href;
const schoolImg = new URL('/images/school.png', import.meta.url).href;
const bscImg = new URL('/images/bsc.png', import.meta.url).href;
const itiImg = new URL('/images/iti.png', import.meta.url).href;

const AboutBanner = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Title animation
          if (entry.target === titleRef.current) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
          
          // Cards animation
          if (cardsRef.current.includes(entry.target)) {
            const index = cardsRef.current.indexOf(entry.target);
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateX(0)';
            }, index * 200); // Stagger effect
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe title
    if (titleRef.current) {
      titleRef.current.style.opacity = '0';
      titleRef.current.style.transform = 'translateY(-30px)';
      titleRef.current.style.transition = 'all 0.6s ease-out';
      observer.observe(titleRef.current);
    }

    // Observe cards with different directions
    cardsRef.current.forEach((card, index) => {
      if (card) {
        // Card 1: Slide from left
        if (index === 0) {
          card.style.opacity = '0';
          card.style.transform = 'translateX(-100px)';
        }
        // Card 2: Slide from bottom
        else if (index === 1) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(100px)';
        }
        // Card 3: Slide from right
        else if (index === 2) {
          card.style.opacity = '0';
          card.style.transform = 'translateX(100px)';
        }
        
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Hover animation using CSS
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
  };

  const cards = [
    { 
      img: schoolImg, 
      title: "School Classes 9th to 12th", 
      subtitle: "Biology & Mathematics",
      bgColor: "bg-blue-700"
    },
    { 
      img: bscImg, 
      title: "B.Sc Coaching", 
      subtitle: "Zoology • Botany • Chemistry • Physics • Mathematics",
      bgColor: "bg-indigo-700"
    },
    { 
      img: itiImg, 
      title: "ITI Courses", 
      subtitle: "Technical & Vocational Training",
      bgColor: "bg-indigo-700"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-14 md:py-22 bg-no-repeat bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      <h2 
        ref={titleRef}
        className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center mb-12"
      >
        Welcome to SP Coaching Center
      </h2>
      
      <div className="container mx-auto px-4 mt-8">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="rounded-xl overflow-hidden shadow-xl bg-white/95 transition-all duration-300"
              style={{
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Image Container */}
              <div className="overflow-hidden">
                <img
                  src={card.img}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-110"
                  alt={card.title}
                />
              </div>
              
              {/* Card Content */}
              <div className={`${card.bgColor} text-white text-center py-4 relative overflow-hidden`}>
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <h3 className="text-xl font-bold mb-2 relative z-10">
                  {card.title}
                </h3>
                <p className="text-sm opacity-90 relative z-10">
                  {card.subtitle}
                </p>
                
                {/* Animated underline */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;