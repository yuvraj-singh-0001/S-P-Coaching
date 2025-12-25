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
            entry.target.classList.remove('opacity-0', '-translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
          
          // Cards animation
          if (cardsRef.current.includes(entry.target)) {
            const index = cardsRef.current.indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.remove('opacity-0');
              if (index === 0) {
                entry.target.classList.remove('-translate-x-20');
                entry.target.classList.add('translate-x-0');
              } else if (index === 1) {
                entry.target.classList.remove('translate-y-20');
                entry.target.classList.add('translate-y-0');
              } else if (index === 2) {
                entry.target.classList.remove('translate-x-20');
                entry.target.classList.add('translate-x-0');
              }
            }, index * 200);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe title
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    // Observe cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const cards = [
    { 
      img: schoolImg, 
      title: "School Classes 9th to 12th", 
      subtitle: "Biology & Mathematics",
      bgColor: "bg-blue-700",
      fromLeft: true
    },
    { 
      img: bscImg, 
      title: "B.Sc Coaching", 
      subtitle: "Zoology • Botany • Chemistry • Physics • Mathematics",
      bgColor: "bg-indigo-700",
      fromBottom: true
    },
    { 
      img: itiImg, 
      title: "ITI Courses", 
      subtitle: "Technical & Vocational Training",
      bgColor: "bg-indigo-700",
      fromRight: true
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
        className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center mb-12 opacity-0 -translate-y-8 transition-all duration-700"
      >
        Welcome to SP Coaching Center
      </h2>
      
      <div className="container mx-auto px-4 mt-8">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`
                rounded-xl overflow-hidden shadow-xl bg-white/95 
                transition-all duration-700
                transform
                ${card.fromLeft ? '-translate-x-20' : ''}
                ${card.fromRight ? 'translate-x-20' : ''}
                ${card.fromBottom ? 'translate-y-20' : ''}
                opacity-0
                hover:shadow-2xl hover:-translate-y-2
              `}
              style={{
                transitionDelay: `${index * 100}ms`,
                transitionProperty: 'transform, opacity, box-shadow'
              }}
            >
              {/* Image Container - NO ZOOM EFFECT */}
              <div className="overflow-hidden">
                <img
                  src={card.img}
                  className="w-full aspect-[4/3] object-cover"
                  alt={card.title}
                />
              </div>
              
              {/* Card Content */}
              <div className={`${card.bgColor} text-white text-center py-4 relative overflow-hidden group`}>
                {/* Simple shine effect - no animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <h3 className="text-xl font-bold mb-2 relative z-10">
                  {card.title}
                </h3>
                <p className="text-sm opacity-90 relative z-10">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;