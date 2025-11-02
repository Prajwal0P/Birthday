import React from "react";

const BirthdaySpecial = () =>{
  return(
    <div>
    <h1>Hi</h1>
    </div>
  )
}
export default BirthdaySpecial

// import React, { useState, useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Import image arrays directly from JS files
// import { childhoodImages } from "../images/childhood.js";
// import { schoolImages } from "../images/school.js";
// import { funImages } from "../images/fun.js";
// import { specialImages } from "../images/special.js";
// import { journeyImages } from "../images/journey.js";

// gsap.registerPlugin(ScrollTrigger);

// const BirthdaySpecial = ({ onBack }) => {
//   const [musicPlaying, setMusicPlaying] = useState(false);
//   const [wishText, setWishText] = useState("");
//   const [showSecret, setShowSecret] = useState(false);
//   const [letterOpened, setLetterOpened] = useState(false);
//   const [showLetterContent, setShowLetterContent] = useState(false);
//   const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
//   const [activeSurprise, setActiveSurprise] = useState(null);

//   // Refs for all sections
//   const heroRef = useRef(null);
//   const memoryWallRef = useRef(null);
//   const timelineRef = useRef(null);
//   const musicRef = useRef(null);
//   const letterRef = useRef(null);
//   const interactiveRef = useRef(null);
//   const galleryRef = useRef(null);
//   const wishesRef = useRef(null);
//   const giftRef = useRef(null);
//   const starsRef = useRef(null);
//   const finaleRef = useRef(null);

//   // Individual timeline item refs
//   const timelineItemRefs = useRef([]);

//   const containerRef = useRef(null);
//   const particlesRef = useRef(null);
//   const envelopeRef = useRef(null);
//   const letterPaperRef = useRef(null);
//   const letterContentRef = useRef(null);

//   // Enhanced image gallery with categories using imported images
//   const memoryCategories = [
//     {
//       title: "Childhood Magic 👶",
//       description: "Those precious early years",
//       images: childhoodImages || [],
//       color: "from-pink-400 to-purple-500"
//     },
//     {
//       title: "School Days 📚",
//       description: "Learning and growing together",
//       images: schoolImages || [],
//       color: "from-blue-400 to-cyan-500"
//     },
//     {
//       title: "Fun Times 😄",
//       description: "Laughter and joy-filled moments",
//       images: funImages || [],
//       color: "from-yellow-400 to-orange-500"
//     },
//     {
//       title: "Special Moments 🌟",
//       description: "Unforgettable memories together",
//       images: specialImages || [],
//       color: "from-green-400 to-emerald-500"
//     }
//   ];

//   // Enhanced timeline with image support using journey images
//   const lifeTimeline = [
//     {
//       year: "The Beginning 🌈",
//       age: "Baby Years",
//       description: "When you first filled our lives with joy and wonder",
//       emoji: "👶",
//       color: "from-pink-400 to-rose-500",
//       images: journeyImages && journeyImages.length > 0 ? [journeyImages[0]] : []
//     },
//     {
//       year: "Little Explorer 🎒",
//       age: "Toddler Days",
//       description: "Discovering the world with curious eyes and happy steps",
//       emoji: "🚀",
//       color: "from-blue-400 to-cyan-500",
//       images: journeyImages && journeyImages.length > 1 ? [journeyImages[1]] : []
//     },
//     {
//       year: "School Star 📖",
//       age: "School Years",
//       description: "Shining bright in classrooms and making wonderful friends",
//       emoji: "⭐",
//       color: "from-purple-400 to-indigo-500",
//       images: journeyImages && journeyImages.length > 2 ? [journeyImages[2]] : []
//     },
//     {
//       year: "Growing Magic 🌸",
//       age: "Pre-Teen",
//       description: "Developing your unique personality and amazing talents",
//       emoji: "🎨",
//       color: "from-green-400 to-teal-500",
//       images: journeyImages && journeyImages.length > 3 ? [journeyImages[3]] : []
//     },
//     {
//       year: "Amazing Teen 🌟",
//       age: "Teen Years",
//       description: "Becoming the incredible, smart, and kind person you are today",
//       emoji: "👑",
//       color: "from-orange-400 to-red-500",
//       images: journeyImages && journeyImages.length > 4 ? [journeyImages[4]] : []
//     },
//     {
//       year: "Today's Queen 🎊",
//       age: "Now",
//       description: "Celebrating the wonderful person you've become!",
//       emoji: "💫",
//       color: "from-purple-500 to-pink-500",
//       images: journeyImages && journeyImages.length > 5 ? [journeyImages[5]] : []
//     }
//   ];

//   // Initialize timeline item refs
//   useEffect(() => {
//     timelineItemRefs.current = timelineItemRefs.current.slice(0, lifeTimeline.length);
//   }, [lifeTimeline.length]);

//   // Enhanced letter content with proper formatting
//   const letterContent = `My Dearest Sister,

// Happy Birthday to the most amazing little sister in the entire universe! 🌟

// From the moment you came into this world, you've brought nothing but joy, laughter, and magic into our lives. Watching you grow has been the greatest privilege and the most beautiful journey I could ever imagine.

// Remember when you were little and believed you could talk to animals? Well, I think you actually can - because even the birds seem to sing happier when you're around. Your connection with everything living is truly magical.

// You're not just growing older - you're growing into this incredible, kind, smart, and wonderful human being who makes everyone around you better. Your smile can light up the darkest room, and your laughter is more beautiful than any symphony.

// These past years have been incredible to watch:
// • Your kindness that knows no bounds
// • Your intelligence that surprises us daily
// • Your creativity that brings beauty everywhere
// • Your courage that inspires everyone
// • Your humor that keeps us laughing
// • Your heart that loves so deeply

// Remember that time when you were little and you thought you could fly with a towel as a cape? Well, guess what? You can fly! You're soaring higher every day, reaching for stars and making dreams come true. You have this incredible ability to turn ordinary moments into extraordinary memories.

// This year is going to be your most magical yet. I can feel it in my bones. You're destined for amazing things, and I'll be here cheering you on every step of the way - through the triumphs, the challenges, and all the beautiful moments in between.

// Never stop believing in yourself. Never stop being your wonderful, unique, magical self. The world needs your light, your laughter, your kindness, and your incredible spirit. And I need my amazing sister - the one who makes every day better just by being in it.

// You are loved more than you can possibly imagine. You are appreciated more than words can express. You are celebrated today and every day.

// All my love forever and always,

// Your incredibly proud and lucky sibling 💖

// P.S. You're doing amazing, and I'm so proud of you! Keep shining, superstar! 🎉`;

//   // Interactive functions
//   const createStars = () => {
//     const starContainer = document.createElement('div');
//     starContainer.className = 'fixed inset-0 pointer-events-none z-50';
//     document.body.appendChild(starContainer);

//     for (let i = 0; i < 25; i++) {
//       const star = document.createElement('div');
//       star.innerHTML = '⭐';
//       star.style.position = 'absolute';
//       star.style.left = `${Math.random() * 100}%`;
//       star.style.top = `${Math.random() * 100}%`;
//       star.style.fontSize = `${Math.random() * 30 + 20}px`;
//       star.style.opacity = '0';
      
//       starContainer.appendChild(star);

//       gsap.to(star, {
//         duration: 3,
//         scale: 2,
//         rotation: 360,
//         opacity: 1,
//         ease: "power2.out",
//         onComplete: () => {
//           gsap.to(star, {
//             duration: 2,
//             opacity: 0,
//             onComplete: () => star.remove()
//           });
//         }
//       });
//     }

//     setTimeout(() => starContainer.remove(), 5000);
//   };

//   const createConfetti = () => {
//     const confettiContainer = document.createElement('div');
//     confettiContainer.className = 'fixed inset-0 pointer-events-none z-50';
//     document.body.appendChild(confettiContainer);

//     for (let i = 0; i < 40; i++) {
//       const confetti = document.createElement('div');
//       confetti.innerHTML = ['🎉', '🎊', '⭐', '✨', '🎈'][Math.floor(Math.random() * 5)];
//       confetti.style.position = 'absolute';
//       confetti.style.left = `${Math.random() * 100}%`;
//       confetti.style.top = '0%';
//       confetti.style.fontSize = `${Math.random() * 25 + 15}px`;
//       confetti.style.opacity = '0';
      
//       confettiContainer.appendChild(confetti);

//       gsap.to(confetti, {
//         duration: Math.random() * 3 + 2,
//         y: window.innerHeight,
//         x: Math.random() * 200 - 100,
//         rotation: Math.random() * 720,
//         opacity: 1,
//         ease: "power2.out",
//         onComplete: () => confetti.remove()
//       });
//     }

//     setTimeout(() => confettiContainer.remove(), 5000);
//   };

//   const createHearts = () => {
//     const heartContainer = document.createElement('div');
//     heartContainer.className = 'fixed inset-0 pointer-events-none z-50';
//     document.body.appendChild(heartContainer);

//     for (let i = 0; i < 25; i++) {
//       const heart = document.createElement('div');
//       heart.innerHTML = '💖';
//       heart.style.position = 'absolute';
//       heart.style.left = `${Math.random() * 100}%`;
//       heart.style.top = `${Math.random() * 100}%`;
//       heart.style.fontSize = `${Math.random() * 30 + 20}px`;
//       heart.style.opacity = '0';
      
//       heartContainer.appendChild(heart);

//       gsap.to(heart, {
//         duration: 2.5,
//         scale: 3,
//         opacity: 1,
//         ease: "power2.out",
//         onComplete: () => {
//           gsap.to(heart, {
//             duration: 1.5,
//             opacity: 0,
//             onComplete: () => heart.remove()
//           });
//         }
//       });
//     }

//     setTimeout(() => heartContainer.remove(), 4000);
//   };

//   const createBalloons = () => {
//     const balloonContainer = document.createElement('div');
//     balloonContainer.className = 'fixed inset-0 pointer-events-none z-50';
//     document.body.appendChild(balloonContainer);

//     for (let i = 0; i < 20; i++) {
//       const balloon = document.createElement('div');
//       balloon.innerHTML = '🎈';
//       balloon.style.position = 'absolute';
//       balloon.style.left = `${Math.random() * 100}%`;
//       balloon.style.bottom = '-50px';
//       balloon.style.fontSize = `${Math.random() * 40 + 30}px`;
//       balloon.style.opacity = '0';
      
//       balloonContainer.appendChild(balloon);

//       gsap.to(balloon, {
//         duration: Math.random() * 4 + 3,
//         y: -window.innerHeight - 100,
//         x: Math.random() * 100 - 50,
//         rotation: Math.random() * 360,
//         opacity: 1,
//         ease: "power1.out",
//         onComplete: () => balloon.remove()
//       });
//     }

//     setTimeout(() => balloonContainer.remove(), 7000);
//   };

//   const createSparkles = () => {
//     const sparkleContainer = document.createElement('div');
//     sparkleContainer.className = 'fixed inset-0 pointer-events-none z-50';
//     document.body.appendChild(sparkleContainer);

//     for (let i = 0; i < 30; i++) {
//       const sparkle = document.createElement('div');
//       sparkle.innerHTML = '✨';
//       sparkle.style.position = 'absolute';
//       sparkle.style.left = `${Math.random() * 100}%`;
//       sparkle.style.top = `${Math.random() * 100}%`;
//       sparkle.style.fontSize = `${Math.random() * 25 + 15}px`;
//       sparkle.style.opacity = '0';
      
//       sparkleContainer.appendChild(sparkle);

//       gsap.to(sparkle, {
//         duration: 2,
//         scale: 1.5,
//         opacity: 1,
//         ease: "power2.out",
//         onComplete: () => {
//           gsap.to(sparkle, {
//             duration: 1,
//             opacity: 0,
//             onComplete: () => sparkle.remove()
//           });
//         }
//       });
//     }

//     setTimeout(() => sparkleContainer.remove(), 3000);
//   };

//   const createFireworks = () => {
//     const fireworkContainer = document.createElement('div');
//     fireworkContainer.className = 'fixed inset-0 pointer-events-none z-50';
//     document.body.appendChild(fireworkContainer);

//     for (let i = 0; i < 8; i++) {
//       setTimeout(() => {
//         const firework = document.createElement('div');
//         firework.innerHTML = '🎇';
//         firework.style.position = 'absolute';
//         firework.style.left = `${Math.random() * 80 + 10}%`;
//         firework.style.top = `${Math.random() * 60 + 20}%`;
//         firework.style.fontSize = '60px';
//         firework.style.opacity = '0';
        
//         fireworkContainer.appendChild(firework);

//         gsap.to(firework, {
//           duration: 0.5,
//           scale: 2,
//           opacity: 1,
//           ease: "power2.out",
//           onComplete: () => {
//             gsap.to(firework, {
//               duration: 1,
//               opacity: 0,
//               onComplete: () => firework.remove()
//             });
//           }
//         });
//       }, i * 300);
//     }

//     setTimeout(() => fireworkContainer.remove(), 4000);
//   };

//   // Interactive surprises
//   const magicalSurprises = [
//     {
//       name: "Starry Night",
//       description: "Fill the sky with twinkling stars",
//       emoji: "🌠",
//       action: createStars,
//       color: "from-blue-500 to-purple-500"
//     },
//     {
//       name: "Confetti Rain",
//       description: "Make it rain celebration",
//       emoji: "🎉",
//       action: createConfetti,
//       color: "from-yellow-500 to-orange-500"
//     },
//     {
//       name: "Hearts Everywhere",
//       description: "Spread love all around",
//       emoji: "💖",
//       action: createHearts,
//       color: "from-pink-500 to-rose-500"
//     },
//     {
//       name: "Balloon Party",
//       description: "Release colorful balloons",
//       emoji: "🎈",
//       action: createBalloons,
//       color: "from-green-500 to-emerald-500"
//     },
//     {
//       name: "Sparkle Magic",
//       description: "Add extra sparkle to everything",
//       emoji: "✨",
//       action: createSparkles,
//       color: "from-cyan-500 to-blue-500"
//     },
//     {
//       name: "Firework Show",
//       description: "Launch amazing fireworks",
//       emoji: "🎇",
//       action: createFireworks,
//       color: "from-red-500 to-orange-500"
//     }
//   ];

//   // Birthday wishes from imaginary friends
//   const friendWishes = [
//     {
//       name: "Sparkle Fairy",
//       message: "May your day be filled with magical moments and endless joy! ✨",
//       avatar: "🧚‍♀️",
//       role: "Magic Manager"
//     },
//     {
//       name: "Cosmic Bear",
//       message: "You shine brighter than all the stars in the galaxy! 🌟",
//       avatar: "🐻",
//       role: "Starlight Guardian"
//     },
//     {
//       name: "Rainbow Unicorn",
//       message: "Wishing you a day as colorful and wonderful as you are! 🌈",
//       avatar: "🦄",
//       role: "Joy Specialist"
//     },
//     {
//       name: "Giggling Dragon",
//       message: "May your laughter echo through the mountains today! 😄",
//       avatar: "🐲",
//       role: "Happiness Director"
//     }
//   ];

//   // Fixed letter opening animation
//   const openLetter = () => {
//     if (letterOpened) return;
    
//     setLetterOpened(true);
//     createSparkles();
    
//     if (envelopeRef.current) {
//       gsap.to(envelopeRef.current, {
//         duration: 1,
//         rotationX: -120,
//         transformOrigin: "top center",
//         ease: "back.inOut(1.7)",
//         onComplete: () => {
//           setTimeout(() => {
//             setShowLetterContent(true);
//             // Animate letter content after state update
//             setTimeout(() => {
//               if (letterContentRef.current) {
//                 gsap.fromTo(letterContentRef.current,
//                   { y: 50, opacity: 0 },
//                   { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
//                 );
//               }
//             }, 100);
//           }, 500);
//         }
//       });
//     }
//   };

//   const toggleMusic = () => {
//     setMusicPlaying(!musicPlaying);
//     createConfetti();
//   };

//   const handleWishSubmit = () => {
//     if (wishText.trim()) {
//       createStars();
//       createHearts();
//       setWishText("");
//     }
//   };

//   const unwrapGift = () => {
//     setShowSecret(true);
//     createFireworks();
//     createConfetti();
//   };

//   const triggerSurprise = (surprise) => {
//     setActiveSurprise(surprise.name);
//     surprise.action();
//     setTimeout(() => setActiveSurprise(null), 2000);
//   };

//   // Simplified Image Container component - only accepts base64 src
//   const ImageContainer = ({ image, className = "", onClick = null }) => {
//     // Handle both object format and direct base64 string
//     const imageSrc = typeof image === 'string' ? image : image?.src;
    
//     return (
//       <div 
//         className={`group relative bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${className}`}
//         onClick={onClick}
//       >
//         <div className="aspect-square bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center overflow-hidden">
//           {imageSrc ? (
//             <img 
//               src={imageSrc} 
//               alt="Memory"
//               className="w-full h-full object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-500"
//             />
//           ) : (
//             <div className="text-4xl text-white/60">
//               📸
//             </div>
//           )}
//         </div>
        
//         <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <span className="text-white text-sm">✨</span>
//         </div>
//       </div>
//     );
//   };

//   // Safe GSAP animation helper
//   const safeGsapAnimation = (target, animationProps, scrollTriggerProps = null) => {
//     if (!target) return null;
    
//     const animation = gsap.fromTo(target, 
//       animationProps.from, 
//       {
//         ...animationProps.to,
//         scrollTrigger: scrollTriggerProps
//       }
//     );
    
//     return animation;
//   };

//   // Setup advanced scroll animations
//   useEffect(() => {
//     // Only run animations if refs are available
//     if (!heroRef.current) return;

//     // Hero section
//     safeGsapAnimation(heroRef.current, 
//       { from: { y: 100, opacity: 0 }, to: { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" } },
//       {
//         trigger: heroRef.current,
//         start: "top 80%",
//         end: "bottom 20%",
//         toggleActions: "play reverse play reverse"
//       }
//     );

//     // Memory Wall - wait for elements to be available
//     setTimeout(() => {
//       const memoryCategories = document.querySelectorAll('.memory-category');
//       if (memoryCategories.length > 0) {
//         gsap.fromTo(memoryCategories,
//           { y: 100, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 1,
//             stagger: 0.3,
//             ease: "back.out(1.7)",
//             scrollTrigger: {
//               trigger: memoryWallRef.current,
//               start: "top 70%",
//               end: "bottom 30%",
//               toggleActions: "play reverse play reverse"
//             }
//           }
//         );
//       }
//     }, 100);

//     // Timeline items with individual refs
//     setTimeout(() => {
//       timelineItemRefs.current.forEach((ref, index) => {
//         if (ref) {
//           gsap.fromTo(ref,
//             { x: -100, opacity: 0, rotationY: -90 },
//             {
//               x: 0,
//               opacity: 1,
//               rotationY: 0,
//               duration: 1,
//               delay: index * 0.2,
//               ease: "back.out(1.7)",
//               scrollTrigger: {
//                 trigger: timelineRef.current,
//                 start: "top 70%",
//                 end: "bottom 30%",
//                 toggleActions: "play reverse play reverse"
//               }
//             }
//           );
//         }
//       });
//     }, 100);

//     // Music section
//     if (musicRef.current) {
//       safeGsapAnimation(musicRef.current,
//         { from: { scale: 0.8, opacity: 0, rotation: -5 }, to: { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.8)" } },
//         {
//           trigger: musicRef.current,
//           start: "top 80%",
//           end: "bottom 20%",
//           toggleActions: "play reverse play reverse"
//         }
//       );
//     }

//     // Letter section
//     if (letterRef.current) {
//       safeGsapAnimation(letterRef.current,
//         { from: { y: 150, opacity: 0, rotation: 10 }, to: { y: 0, opacity: 1, rotation: 0, duration: 1.5, ease: "back.out(1.7)" } },
//         {
//           trigger: letterRef.current,
//           start: "top 80%",
//           end: "bottom 20%",
//           toggleActions: "play reverse play reverse"
//         }
//       );
//     }

//     // Interactive surprises
//     setTimeout(() => {
//       const surpriseCards = document.querySelectorAll('.surprise-card');
//       if (surpriseCards.length > 0) {
//         gsap.fromTo(surpriseCards,
//           { scale: 0.8, opacity: 0, y: 50 },
//           {
//             scale: 1,
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             stagger: 0.1,
//             ease: "back.out(1.7)",
//             scrollTrigger: {
//               trigger: interactiveRef.current,
//               start: "top 70%",
//               end: "bottom 30%",
//               toggleActions: "play reverse play reverse"
//             }
//           }
//         );
//       }
//     }, 100);

//     // Friend wishes
//     setTimeout(() => {
//       const friendWishes = document.querySelectorAll('.friend-wish');
//       if (friendWishes.length > 0) {
//         gsap.fromTo(friendWishes,
//           { x: 100, opacity: 0 },
//           {
//             x: 0,
//             opacity: 1,
//             duration: 1,
//             stagger: 0.2,
//             ease: "back.out(1.7)",
//             scrollTrigger: {
//               trigger: wishesRef.current,
//               start: "top 70%",
//               end: "bottom 30%",
//               toggleActions: "play reverse play reverse"
//             }
//           }
//         );
//       }
//     }, 100);

//     // Gift section
//     if (giftRef.current) {
//       safeGsapAnimation(giftRef.current,
//         { from: { scale: 0.5, opacity: 0, rotation: -180 }, to: { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)" } },
//         {
//           trigger: giftRef.current,
//           start: "top 80%",
//           end: "bottom 20%",
//           toggleActions: "play reverse play reverse"
//         }
//       );
//     }

//     // Star wish section
//     if (starsRef.current) {
//       safeGsapAnimation(starsRef.current,
//         { from: { y: 100, opacity: 0 }, to: { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" } },
//         {
//           trigger: starsRef.current,
//           start: "top 80%",
//           end: "bottom 20%",
//           toggleActions: "play reverse play reverse"
//         }
//       );
//     }

//     // Finale
//     if (finaleRef.current) {
//       safeGsapAnimation(finaleRef.current,
//         { from: { scale: 0.3, opacity: 0, rotationY: 180 }, to: { scale: 1, opacity: 1, rotationY: 0, duration: 1.5, ease: "back.out(1.7)" } },
//         {
//           trigger: finaleRef.current,
//           start: "top 80%",
//           end: "bottom 20%",
//           toggleActions: "play reverse play reverse"
//         }
//       );
//     }

//     // Continuous particles
//     const createParticles = () => {
//       if (!particlesRef.current) return;
      
//       for (let i = 0; i < 20; i++) {
//         const particle = document.createElement('div');
//         particle.innerHTML = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
//         particle.className = 'particle absolute pointer-events-none z-0';
//         particle.style.left = `${Math.random() * 100}%`;
//         particle.style.top = `${Math.random() * 100}%`;
//         particle.style.fontSize = `${Math.random() * 20 + 10}px`;
//         particle.style.opacity = Math.random() * 0.6 + 0.2;
        
//         particlesRef.current.appendChild(particle);

//         gsap.to(particle, {
//           y: -100,
//           x: Math.random() * 100 - 50,
//           rotation: Math.random() * 360,
//           duration: Math.random() * 10 + 10,
//           ease: "none",
//           repeat: -1,
//           delay: Math.random() * 5
//         });
//       }
//     };

//     createParticles();

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 overflow-hidden">
      
//       {/* Animated Background Particles */}
//       <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0" />
      
//       {/* Floating Stars Background */}
//       <div className="fixed inset-0 z-0">
//         {[...Array(80)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-white animate-twinkle"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               width: `${Math.random() * 3 + 1}px`,
//               height: `${Math.random() * 3 + 1}px`,
//               opacity: Math.random() * 0.7 + 0.3,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${Math.random() * 3 + 2}s`
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10">
//         {/* Hero Section */}
//         <section ref={heroRef} className="min-h-screen flex items-center justify-center p-8">
//           <div className="text-center max-w-6xl mx-auto">
//             <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
//               <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                 Happy Birthday! 🎉
//               </h1>
//               <p className="text-2xl md:text-3xl text-pink-100 mb-8">
//                 Welcome to your magical birthday adventure!
//               </p>
//               <p className="text-xl text-cyan-100 mb-12">
//                 Scroll down to discover surprises, memories, and lots of love! ✨
//               </p>
//               <div className="text-4xl animate-bounce">👇</div>
//             </div>
//           </div>
//         </section>

//         {/* Memory Wall Section */}
//         <section ref={memoryWallRef} className="min-h-screen py-20 px-8">
//           <div className="max-w-7xl mx-auto">
//             <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
//               Memory Wall 🖼️
//             </h2>
//             <p className="text-xl text-pink-100 text-center mb-16 max-w-3xl mx-auto">
//               A journey through your most precious moments and beautiful memories
//             </p>
            
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//               {memoryCategories.map((category, categoryIndex) => (
//                 <div key={categoryIndex} className="memory-category">
//                   <div className={`bg-gradient-to-r ${category.color} rounded-2xl p-6 mb-6`}>
//                     <h3 className="text-2xl font-bold text-white text-center">{category.title}</h3>
//                     <p className="text-white/90 text-center">{category.description}</p>
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     {category.images && category.images.length > 0 ? (
//                       category.images.map((image, imageIndex) => (
//                         <ImageContainer 
//                           key={imageIndex}
//                           image={image}
//                           onClick={createSparkles}
//                         />
//                       ))
//                     ) : (
//                       // Show placeholder if no images
//                       <>
//                         <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center">
//                           <span className="text-4xl text-white/40">📸</span>
//                         </div>
//                         <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center">
//                           <span className="text-4xl text-white/40">📸</span>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Life Timeline Section */}
//         <section ref={timelineRef} className="min-h-screen py-20 px-8">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
//               Your Beautiful Journey 📅
//             </h2>
//             <p className="text-xl text-pink-100 text-center mb-16">
//               From precious beginnings to the amazing today
//             </p>
            
//             <div className="relative">
//               <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 rounded-full" />
              
//               <div className="space-y-16">
//                 {lifeTimeline.map((milestone, index) => (
//                   <div 
//                     key={index} 
//                     ref={el => timelineItemRefs.current[index] = el}
//                     className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
//                   >
//                     <div className={`w-full lg:w-5/12 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl transform transition-all duration-500 hover:scale-105 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
//                       <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center text-2xl mb-4 mx-auto`}>
//                         {milestone.emoji}
//                       </div>
//                       <h3 className="text-2xl font-bold text-white text-center mb-2">{milestone.year}</h3>
//                       <p className="text-yellow-300 text-center mb-2">{milestone.age}</p>
//                       <p className="text-pink-100 text-center mb-4">{milestone.description}</p>
                      
//                       {/* Timeline Images */}
//                       <div className="grid grid-cols-1 gap-3 mt-4">
//                         {milestone.images && milestone.images.length > 0 ? (
//                           milestone.images.map((image, imgIndex) => (
//                             <ImageContainer 
//                               key={imgIndex}
//                               image={image}
//                               className="aspect-video"
//                             />
//                           ))
//                         ) : (
//                           <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center">
//                             <span className="text-4xl text-white/40">📸</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Music Section */}
//         <section ref={musicRef} className="min-h-screen flex items-center justify-center p-8">
//           <div className="text-center max-w-2xl mx-auto">
//             <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
//               <div className="text-8xl mb-8">🎵</div>
//               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Birthday Symphony</h2>
//               <p className="text-xl text-pink-100 mb-8">Press play to add magical music to your celebration!</p>
//               <button
//                 onClick={toggleMusic}
//                 className="px-12 py-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-xl shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white/30"
//               >
//                 {musicPlaying ? '⏸️ Pause Magic Music' : '🎵 Play Birthday Symphony'}
//               </button>
//               {musicPlaying && (
//                 <div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/20">
//                   <p className="text-white font-semibold text-lg">🎶 Now playing: Your Special Birthday Melody!</p>
//                   <div className="w-full h-3 bg-white/20 rounded-full mt-4 overflow-hidden">
//                     <div className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Letter Section */}
//         <section ref={letterRef} className="min-h-screen flex items-center justify-center p-8">
//           <div className="text-center max-w-4xl mx-auto w-full">
//             <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
//               A Special Letter For You 💌
//             </h2>
//             <p className="text-xl text-pink-100 mb-12">A heartfelt message filled with love and magic</p>
            
//             {!letterOpened ? (
//               <div 
//                 ref={envelopeRef}
//                 className="envelope cursor-pointer transform transition-transform duration-500 hover:scale-110 mx-auto max-w-md"
//                 onClick={openLetter}
//               >
//                 <div className="relative w-80 h-60 mx-auto">
//                   <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl shadow-2xl border-4 border-white/30">
//                     <div className="absolute top-0 left-0 w-0 h-0 border-l-40 border-l-transparent border-r-40 border-r-transparent border-t-40 border-t-red-300 transform -translate-y-1/2"></div>
//                     <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-6xl">
//                       💌
//                     </div>
//                     <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold bg-black/30 px-4 py-2 rounded-full">
//                       Click to Open Your Letter!
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="letter-content w-full">
//                 {showLetterContent && (
//                   <div 
//                     ref={letterPaperRef}
//                     className="bg-yellow-50 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-yellow-200 w-full max-w-4xl mx-auto"
//                   >
//                     <div 
//                       ref={letterContentRef}
//                       className="font-serif text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line text-left max-h-[70vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-yellow-100"
//                     >
//                       {letterContent}
//                     </div>
//                     <div className="mt-8 pt-6 border-t border-yellow-300 text-center">
//                       <div className="text-4xl mb-4">💖</div>
//                       <p className="text-gray-600 italic">With all the love in my heart</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Interactive Magic Section */}
//         <section ref={interactiveRef} className="min-h-screen py-20 px-8">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
//               Magic Creator 🪄
//             </h2>
//             <p className="text-xl text-pink-100 text-center mb-16">
//               Click any card to create instant birthday magic!
//             </p>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//               {magicalSurprises.map((surprise, index) => (
//                 <div
//                   key={index}
//                   className={`surprise-card group relative bg-white/10 backdrop-blur-lg rounded-2xl p-4 border-2 border-white/20 shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-110 ${
//                     activeSurprise === surprise.name ? 'ring-4 ring-yellow-400 scale-110' : ''
//                   }`}
//                   onClick={() => triggerSurprise(surprise)}
//                 >
//                   <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${surprise.color} flex items-center justify-center text-2xl mb-3 mx-auto group-hover:scale-125 transition-transform duration-300`}>
//                     {surprise.emoji}
//                   </div>
//                   <h3 className="text-white font-bold text-center text-sm mb-2">{surprise.name}</h3>
//                   <p className="text-pink-100 text-center text-xs">{surprise.description}</p>
                  
//                   <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Friend Wishes Section */}
//         <section ref={wishesRef} className="min-h-screen py-20 px-8">
//           <div className="max-w-4xl mx-auto">
//             <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
//               Magical Wishes 🧚
//             </h2>
//             <p className="text-xl text-pink-100 text-center mb-16">
//               Special messages from your magical friends
//             </p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {friendWishes.map((friend, index) => (
//                 <div
//                   key={index}
//                   className="friend-wish bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500"
//                 >
//                   <div className="flex items-center mb-4">
//                     <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-2xl mr-4">
//                       {friend.avatar}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-white">{friend.name}</h3>
//                       <p className="text-cyan-200 text-sm">{friend.role}</p>
//                     </div>
//                   </div>
//                   <p className="text-pink-100 text-lg">{friend.message}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Star Wish Section */}
//         <section ref={starsRef} className="min-h-screen flex items-center justify-center p-8">
//           <div className="text-center max-w-2xl mx-auto">
//             <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
//               <div className="text-8xl mb-8">🌠</div>
//               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Make a Wish Upon a Star</h2>
//               <p className="text-xl text-pink-100 mb-8">Type your birthday wish and send it to the universe!</p>
              
//               <div className="space-y-6">
//                 <textarea
//                   value={wishText}
//                   onChange={(e) => setWishText(e.target.value)}
//                   placeholder="What is your special birthday wish? ✨"
//                   className="w-full h-40 p-6 rounded-2xl bg-white/20 border-2 border-white/30 text-white placeholder-pink-200 focus:outline-none focus:border-pink-400 resize-none text-lg"
//                   maxLength={200}
//                 />
                
//                 <button
//                   onClick={handleWishSubmit}
//                   disabled={!wishText.trim()}
//                   className={`px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl transform transition-all duration-300 border-2 ${
//                     wishText.trim() 
//                       ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:scale-105 border-white/30 cursor-pointer'
//                       : 'bg-white/10 text-white/50 border-white/20 cursor-not-allowed'
//                   }`}
//                 >
//                   Send Wish to the Stars! ⭐
//                 </button>
                
//                 <p className="text-pink-100 text-lg">
//                   {wishText.length}/200 characters
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Final Grand Finale */}
//         <section ref={finaleRef} className="min-h-screen flex items-center justify-center p-8">
//           <div className="text-center max-w-4xl mx-auto">
//             <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-12 border-4 border-white/30 shadow-2xl">
//               <div className="text-8xl mb-8">🎊</div>
              
//               <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
//                 Happy Birthday, Superstar! 🌟
//               </h2>
              
//               <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 mb-8">
//                 <p className="text-white text-2xl leading-relaxed font-medium mb-6">
//                   You are the most amazing, wonderful, and magical person in the universe! 
//                   Thank you for being you and for making every day brighter. ✨
//                 </p>
                
//                 <div className="text-4xl space-x-6 mb-6">
//                   {['🌟', '💫', '🎊', '🎉', '💖', '✨', '🎈', '🎁'].map((emoji, index) => (
//                     <span key={index} className="animate-bounce inline-block" style={{ animationDelay: `${index * 0.1}s` }}>
//                       {emoji}
//                     </span>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="bg-black/30 rounded-2xl p-6 border border-white/20">
//                 <p className="text-white text-xl font-bold mb-2">
//                   Made with infinite love and magic 💖
//                 </p>
//                 <p className="text-pink-200 text-lg">
//                   By your incredibly proud sibling who loves you more than all the stars in the sky! 😊
//                 </p>
//               </div>
              
//               {onBack && (
//                 <button
//                   onClick={onBack}
//                   className="mt-8 px-8 py-4 bg-white/20 backdrop-blur-lg text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300 border-2 border-white/30 hover:bg-white/30"
//                 >
//                   ← Back to Countdown
//                 </button>
//               )}
//             </div>
//           </div>
//         </section>
//       </div>

//       <style>{`
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.2); }
//         }
//         .animate-twinkle {
//           animation: twinkle 3s ease-in-out infinite;
//         }
//         .envelope {
//           transform-style: preserve-3d;
//         }
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 6px;
//         }
//         .scrollbar-thumb-yellow-300::-webkit-scrollbar-thumb {
//           background-color: #fcd34d;
//           border-radius: 3px;
//         }
//         .scrollbar-track-yellow-100::-webkit-scrollbar-track {
//           background-color: #fef3c7;
//           border-radius: 3px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BirthdaySpecial;
