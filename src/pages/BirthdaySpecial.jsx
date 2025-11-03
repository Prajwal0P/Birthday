import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

// Import image arrays directly from JS files
import { images as childhoodImages } from "../child.js";
import { images as schoolImages } from "../school.js";
import { images as funImages } from "../fun.js";
import { images as specialImages } from "../special.js";
import { images as journeyImages } from "../journey.js";
import funnyVideo1 from "../video.mp4";

gsap.registerPlugin(ScrollTrigger);

const BirthdaySpecial = ({ onBack }) => {
  const navigate = useNavigate();
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [wishText, setWishText] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const [showLetterContent, setShowLetterContent] = useState(false);
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
  const [activeSurprise, setActiveSurprise] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Refs for all sections
  const heroRef = useRef(null);
  const memoryWallRef = useRef(null);
  const timelineRef = useRef(null);
  const musicRef = useRef(null);
  const letterRef = useRef(null);
  const interactiveRef = useRef(null);
  const galleryRef = useRef(null);
  const wishesRef = useRef(null);
  const giftRef = useRef(null);
  const starsRef = useRef(null);
  const finaleRef = useRef(null);
  const funnyVideoRef = useRef(null);

  // Individual timeline item refs
  const timelineItemRefs = useRef([]);

  const containerRef = useRef(null);
  const particlesRef = useRef(null);
  const envelopeRef = useRef(null);
  const letterPaperRef = useRef(null);
  const letterContentRef = useRef(null);
  const videoContainerRef = useRef(null);

  // Enhanced image gallery with categories using imported images
  const memoryCategories = [
    {
      title: "Childhood Magic 👶",
      description: "Those precious early years",
      images: childhoodImages || [],
      color: "from-pink-400 to-purple-500",
    },
    {
      title: "School Days 📚",
      description: "Learning and growing together",
      images: schoolImages || [],
      color: "from-blue-400 to-cyan-500",
    },
    {
      title: "Fun Times 😄",
      description: "Laughter and joy-filled moments",
      images: funImages || [],
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Special Moments 🌟",
      description: "Unforgettable memories together",
      images: specialImages || [],
      color: "from-green-400 to-emerald-500",
    },
  ];

  // Enhanced timeline with image support using journey images
  const lifeTimeline = [
    {
      year: "The Beginning 🌈",
      age: "Baby Years",
      description:
        "While other babies cried for toys, she just stared at people like, “Try harder.” Serving side-eye before she could even sit up. 😎",
      emoji: "👶",
      color: "from-pink-400 to-rose-500",
      images:
        journeyImages && journeyImages.length > 0 ? [journeyImages[0]] : [],
    },
    {
      year: "Little Explorer 🎒",
      age: "Toddler Days",
      description:
        "She didn’t walk; she investigated. Every cupboard, every drawer, every snack stash — nothing escaped her tiny hands and big questions. 🕵️‍♀️🍪",
      emoji: "🚀",
      color: "from-blue-400 to-cyan-500",
      images:
        journeyImages && journeyImages.length > 1 ? [journeyImages[1]] : [],
    },
    {
      year: "School Star 📖",
      age: "School Years",
      description:
        "Came to school just to eat other people’s lunch and complain about homework she never did. Still somehow managed to top the class. Suspicious. 😤🍱",
      emoji: "⭐",
      color: "from-purple-400 to-indigo-500",
      images:
        journeyImages && journeyImages.length > 2 ? [journeyImages[2]] : [],
    },
    {
      year: "Growing Magic 🌸",
      age: "Pre-Teen",
      description:
        "One buff and she thought she was on the cover of Vogue. The hairstyle did 90% of the talking — the other 10% was her saying “don’t touch my hair.” 💁‍♀️🔥",
      emoji: "🎨",
      color: "from-green-400 to-teal-500",
      images:
        journeyImages && journeyImages.length > 3 ? [journeyImages[3]] : [],
    },
    {
      year: "Amazing Teen 🌟",
      age: "Teen Years",
      description:
        "Every hallway was her runway, every locker a prop, and every glance a full-on cinematic moment. Drama: maximum. Chill: non-existent. 😎💥",
      emoji: "👑",
      color: "from-orange-400 to-red-500",
      images:
        journeyImages && journeyImages.length > 4 ? [journeyImages[4]] : [],
    },
    {
      year: "Today's Queen 🎊",
      age: "Now",
      description:
        "Sleeves rolled just right, signature poses on point, hair flicks timed to perfection… a full-time mini-me, with extra sass and zero chill. 💀💅",
      emoji: "💫",
      color: "from-purple-500 to-pink-500",
      images:
        journeyImages && journeyImages.length > 5 ? [journeyImages[5]] : [],
    },
  ];

  // Initialize timeline item refs
  useEffect(() => {
    timelineItemRefs.current = timelineItemRefs.current.slice(
      0,
      lifeTimeline.length
    );
  }, [lifeTimeline.length]);

  // Enhanced letter content with proper formatting
  const letterContent = `🎉🥳💖 Happy Birthday to my chotu, my kiddo, my babuchi, my one and only mini princess 👑😂❤️
Ayy babuchi 😏 can you calm down for one second? Who told you to grow up this fast huh? 😭 You were supposed to stay that tiny drama queen who used to follow me everywhere, break half my stuff, and then give that “I didn’t do anything” face 😇😂. Now you’re walking around acting all grown, like Miss Boss Lady 😎 while still crying over silly things 💀.
And don’t even get me started on how you try to copy me 😭😂. From my words to my attitude — girl, I see everything 👀. You can steal my style, but you’ll never steal my vibe 😌🔥. The original stays undefeated 😎💪. You’re like a “budget version” of me — cute, chaotic, and full of nonsense 😂😂.
But okay okay 😤 I’ll admit it once (and only once) — you’ve actually grown into someone amazing ❤️. You’re strong, stubborn in the best way, and way smarter than I give you credit for 🤭. You’ve got that same spark, that same madness, and that same fire I used to have — guess it runs in the family 😎✨.
Still, you’ll always be my little chotu — my mini princess 👸, my favorite headache 🤕, my comedy show on legs 💀, and the one person who can make me go from angry 😤 to laughing in seconds 😂. You’re the kid I roast 24/7 but would fight the whole world for 💪💖.
So on your big day — go laugh loud, party hard 🎉💃, eat like royalty 🍰🍫, and enjoy every moment! Just don’t act too cool, okay? I know the real you — the one who still pouts for attention 😏😭.
And listen babuchi — even when I act distant, or say things harshly, or roast you till you scream “Anna stop 😭,” you know it’s all love. You’re my little one forever 🫶. I’ve watched you grow, fall, rise, cry, and laugh your way through everything… and trust me, no matter what, I’ll always be right here — guiding you, trolling you, protecting you, and silently cheering for you ❤️🔥.
Because yeah, I might roast you like no one else — but I also love you like no one else ever could 💫🥹.
So, happy birthday my kiddo, my princess, my forever chotu 👑🎂💖
Keep being you — loud, crazy, confident, and full of life 🌈✨
And remember… no matter how big you get, I’m still the boss 😏😂
Love, your OG, your lifetime roaster, and your biggest fan — Anna 😎❤️`;

  // Interactive functions
  const createStars = () => {
    const starContainer = document.createElement("div");
    starContainer.className = "fixed inset-0 pointer-events-none z-50";
    document.body.appendChild(starContainer);

    for (let i = 0; i < 25; i++) {
      const star = document.createElement("div");
      star.innerHTML = "⭐";
      star.style.position = "absolute";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.fontSize = `${Math.random() * 30 + 20}px`;
      star.style.opacity = "0";

      starContainer.appendChild(star);

      gsap.to(star, {
        duration: 3,
        scale: 2,
        rotation: 360,
        opacity: 1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(star, {
            duration: 2,
            opacity: 0,
            onComplete: () => star.remove(),
          });
        },
      });
    }

    setTimeout(() => starContainer.remove(), 5000);
  };

  const createConfetti = () => {
    const confettiContainer = document.createElement("div");
    confettiContainer.className = "fixed inset-0 pointer-events-none z-50";
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 40; i++) {
      const confetti = document.createElement("div");
      confetti.innerHTML = ["🎉", "🎊", "⭐", "✨", "🎈"][
        Math.floor(Math.random() * 5)
      ];
      confetti.style.position = "absolute";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = "0%";
      confetti.style.fontSize = `${Math.random() * 25 + 15}px`;
      confetti.style.opacity = "0";

      confettiContainer.appendChild(confetti);

      gsap.to(confetti, {
        duration: Math.random() * 3 + 2,
        y: window.innerHeight,
        x: Math.random() * 200 - 100,
        rotation: Math.random() * 720,
        opacity: 1,
        ease: "power2.out",
        onComplete: () => confetti.remove(),
      });
    }

    setTimeout(() => confettiContainer.remove(), 5000);
  };

  const createHearts = () => {
    const heartContainer = document.createElement("div");
    heartContainer.className = "fixed inset-0 pointer-events-none z-50";
    document.body.appendChild(heartContainer);

    for (let i = 0; i < 25; i++) {
      const heart = document.createElement("div");
      heart.innerHTML = "💖";
      heart.style.position = "absolute";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.fontSize = `${Math.random() * 30 + 20}px`;
      heart.style.opacity = "0";

      heartContainer.appendChild(heart);

      gsap.to(heart, {
        duration: 2.5,
        scale: 3,
        opacity: 1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(heart, {
            duration: 1.5,
            opacity: 0,
            onComplete: () => heart.remove(),
          });
        },
      });
    }

    setTimeout(() => heartContainer.remove(), 4000);
  };

  const createBalloons = () => {
    const balloonContainer = document.createElement("div");
    balloonContainer.className = "fixed inset-0 pointer-events-none z-50";
    document.body.appendChild(balloonContainer);

    for (let i = 0; i < 20; i++) {
      const balloon = document.createElement("div");
      balloon.innerHTML = "🎈";
      balloon.style.position = "absolute";
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.bottom = "-50px";
      balloon.style.fontSize = `${Math.random() * 40 + 30}px`;
      balloon.style.opacity = "0";

      balloonContainer.appendChild(balloon);

      gsap.to(balloon, {
        duration: Math.random() * 4 + 3,
        y: -window.innerHeight - 100,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        opacity: 1,
        ease: "power1.out",
        onComplete: () => balloon.remove(),
      });
    }

    setTimeout(() => balloonContainer.remove(), 7000);
  };

  const createSparkles = () => {
    const sparkleContainer = document.createElement("div");
    sparkleContainer.className = "fixed inset-0 pointer-events-none z-50";
    document.body.appendChild(sparkleContainer);

    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement("div");
      sparkle.innerHTML = "✨";
      sparkle.style.position = "absolute";
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.fontSize = `${Math.random() * 25 + 15}px`;
      sparkle.style.opacity = "0";

      sparkleContainer.appendChild(sparkle);

      gsap.to(sparkle, {
        duration: 2,
        scale: 1.5,
        opacity: 1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(sparkle, {
            duration: 1,
            opacity: 0,
            onComplete: () => sparkle.remove(),
          });
        },
      });
    }

    setTimeout(() => sparkleContainer.remove(), 3000);
  };

  const createFireworks = () => {
    const fireworkContainer = document.createElement("div");
    fireworkContainer.className = "fixed inset-0 pointer-events-none z-50";
    document.body.appendChild(fireworkContainer);

    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const firework = document.createElement("div");
        firework.innerHTML = "🎇";
        firework.style.position = "absolute";
        firework.style.left = `${Math.random() * 80 + 10}%`;
        firework.style.top = `${Math.random() * 60 + 20}%`;
        firework.style.fontSize = "60px";
        firework.style.opacity = "0";

        fireworkContainer.appendChild(firework);

        gsap.to(firework, {
          duration: 0.5,
          scale: 2,
          opacity: 1,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(firework, {
              duration: 1,
              opacity: 0,
              onComplete: () => firework.remove(),
            });
          },
        });
      }, i * 300);
    }

    setTimeout(() => fireworkContainer.remove(), 4000);
  };

  // Interactive surprises
  const magicalSurprises = [
    {
      name: "Starry Night",
      description: "Fill the sky with twinkling stars",
      emoji: "🌠",
      action: createStars,
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "Confetti Rain",
      description: "Make it rain celebration",
      emoji: "🎉",
      action: createConfetti,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Hearts Everywhere",
      description: "Spread love all around",
      emoji: "💖",
      action: createHearts,
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Balloon Party",
      description: "Release colorful balloons",
      emoji: "🎈",
      action: createBalloons,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Sparkle Magic",
      description: "Add extra sparkle to everything",
      emoji: "✨",
      action: createSparkles,
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "Firework Show",
      description: "Launch amazing fireworks",
      emoji: "🎇",
      action: createFireworks,
      color: "from-red-500 to-orange-500",
    },
  ];

  // Birthday wishes from imaginary friends
  const friendWishes = [
    {
      name: "Sparkle Fairy",
      message:
        "May your day be filled with magical moments and endless joy! ✨",
      avatar: "🧚‍♀️",
      role: "Magic Manager",
    },
    {
      name: "Cosmic Bear",
      message: "You shine brighter than all the stars in the galaxy! 🌟",
      avatar: "🐻",
      role: "Starlight Guardian",
    },
    {
      name: "Rainbow Unicorn",
      message: "Wishing you a day as colorful and wonderful as you are! 🌈",
      avatar: "🦄",
      role: "Joy Specialist",
    },
    {
      name: "Giggling Dragon",
      message: "May your laughter echo through the mountains today! 😄",
      avatar: "🐲",
      role: "Happiness Director",
    },
  ];

  // FIXED letter opening animation
  const openLetter = () => {
    if (letterOpened) return;

    setLetterOpened(true);
    createSparkles();

    // Show letter content immediately
    setTimeout(() => {
      setShowLetterContent(true);

      // Animate letter content after a brief delay
      setTimeout(() => {
        if (letterPaperRef.current) {
          gsap.fromTo(
            letterPaperRef.current,
            { y: 100, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
          );
        }
      }, 100);
    }, 500);
  };

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
    createConfetti();
  };

  const handleWishSubmit = () => {
    if (wishText.trim()) {
      createStars();
      createHearts();
      setWishText("");
    }
  };

  const toggleVideo = () => {
    setVideoPlaying(!videoPlaying);
    if (!videoPlaying) {
      createConfetti();
    }
  };

  const unwrapGift = () => {
    setShowSecret(true);
    createFireworks();
    createConfetti();
  };

  const triggerSurprise = (surprise) => {
    setActiveSurprise(surprise.name);
    surprise.action();
    setTimeout(() => setActiveSurprise(null), 2000);
  };

  // Simplified Image Container component
  const ImageContainer = ({ image, className = "", onClick = null }) => {
    const imageSrc = typeof image === "string" ? image : image?.src;

    return (
      <div
        className={`group relative bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${className}`}
        onClick={onClick}
      >
        <div className="aspect-square bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Memory"
              className="w-full h-full object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="text-4xl text-white/60">📸</div>
          )}
        </div>

        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm">✨</span>
        </div>
      </div>
    );
  };

  // FIXED: Proper GSAP animation helper with ScrollTrigger
  const safeGsapAnimation = (
    target,
    animationProps,
    scrollTriggerProps = null
  ) => {
    if (!target) return null;

    const config = {
      ...animationProps.to,
      duration: animationProps.to?.duration || 1,
      ease: animationProps.to?.ease || "power2.out",
    };

    if (scrollTriggerProps) {
      config.scrollTrigger = {
        trigger: target,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        ...scrollTriggerProps,
      };
    }

    return gsap.fromTo(target, animationProps.from, config);
  };

  // FIXED: Setup scroll animations with proper ScrollTrigger
  useEffect(() => {
    // Refresh ScrollTrigger once to ensure it's properly initialized
    ScrollTrigger.refresh();

    // Hero section
    safeGsapAnimation(heroRef.current, {
      from: { y: 100, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
    });

    // Memory Wall
    setTimeout(() => {
      const memoryCategories = document.querySelectorAll(".memory-category");
      if (memoryCategories.length > 0) {
        gsap.fromTo(
          memoryCategories,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: memoryWallRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, 100);

    // Timeline items
    setTimeout(() => {
      timelineItemRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { x: -100, opacity: 0, rotationY: -90 },
            {
              x: 0,
              opacity: 1,
              rotationY: 0,
              duration: 1,
              delay: index * 0.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, 100);

    // Music section
    if (musicRef.current) {
      safeGsapAnimation(musicRef.current, {
        from: { scale: 0.8, opacity: 0, rotation: -5 },
        to: {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.8)",
        },
      });
    }

    // Letter section
    if (letterRef.current) {
      safeGsapAnimation(letterRef.current, {
        from: { y: 150, opacity: 0, rotation: 10 },
        to: {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
        },
      });
    }

    // Funny Video section
    if (funnyVideoRef.current) {
      safeGsapAnimation(funnyVideoRef.current, {
        from: { scale: 0.8, opacity: 0, y: 100 },
        to: {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
      });
    }

    // Interactive surprises
    setTimeout(() => {
      const surpriseCards = document.querySelectorAll(".surprise-card");
      if (surpriseCards.length > 0) {
        gsap.fromTo(
          surpriseCards,
          { scale: 0.8, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: interactiveRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, 100);

    // Friend wishes
    setTimeout(() => {
      const friendWishes = document.querySelectorAll(".friend-wish");
      if (friendWishes.length > 0) {
        gsap.fromTo(
          friendWishes,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: wishesRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, 100);

    // Gift section
    if (giftRef.current) {
      safeGsapAnimation(giftRef.current, {
        from: { scale: 0.5, opacity: 0, rotation: -180 },
        to: {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
      });
    }

    // Star wish section
    if (starsRef.current) {
      safeGsapAnimation(starsRef.current, {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
      });
    }

    // Finale
    if (finaleRef.current) {
      safeGsapAnimation(finaleRef.current, {
        from: { scale: 0.3, opacity: 0, rotationY: 180 },
        to: {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
        },
      });
    }

    // Simple background particles
    const createParticles = () => {
      if (!particlesRef.current) return;

      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");
        particle.innerHTML = ["✨", "⭐", "💫"][Math.floor(Math.random() * 3)];
        particle.className = "particle absolute pointer-events-none z-0";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.fontSize = `${Math.random() * 15 + 10}px`;
        particle.style.opacity = Math.random() * 0.4 + 0.2;

        particlesRef.current.appendChild(particle);

        gsap.to(particle, {
          y: -100,
          x: Math.random() * 50 - 25,
          rotation: Math.random() * 360,
          duration: Math.random() * 8 + 8,
          ease: "none",
          repeat: -1,
          delay: Math.random() * 5,
        });
      }
    };

    createParticles();

    // Refresh ScrollTrigger after all animations are set up
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      // Proper cleanup
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 overflow-hidden"
    >
      {/* Background Particles */}
      <div
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Floating Stars Background */}
      <div className="fixed inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center justify-center p-8"
        >
          <div className="text-center max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
              <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Happy Birthday! 🎉
              </h1>
              <p className="text-2xl md:text-3xl text-pink-100 mb-8">
                Welcome to your magical birthday adventure!
              </p>
              <p className="text-xl text-cyan-100 mb-12">
                Scroll down to discover surprises, memories, and lots of love!
                ✨
              </p>
              <div className="text-4xl animate-bounce">👇</div>
            </div>
          </div>
        </section>

        {/* Memory Wall Section */}
        <section ref={memoryWallRef} className="min-h-screen py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
              Memory Wall 🖼️
            </h2>
            <p className="text-xl text-pink-100 text-center mb-16 max-w-3xl mx-auto">
              A journey through your most precious moments and beautiful
              memories
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {memoryCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="memory-category">
                  <div
                    className={`bg-gradient-to-r ${category.color} rounded-2xl p-6 mb-6`}
                  >
                    <h3 className="text-2xl font-bold text-white text-center">
                      {category.title}
                    </h3>
                    <p className="text-white/90 text-center">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {category.images && category.images.length > 0 ? (
                      category.images.map((image, imageIndex) => (
                        <ImageContainer
                          key={imageIndex}
                          image={image}
                          onClick={createSparkles}
                        />
                      ))
                    ) : (
                      // Show placeholder if no images
                      <>
                        <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center">
                          <span className="text-4xl text-white/40">📸</span>
                        </div>
                        <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center">
                          <span className="text-4xl text-white/40">📸</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Life Timeline Section */}
        <section ref={timelineRef} className="min-h-screen py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
              Your Beautiful Journey 📅
            </h2>
            <p className="text-xl text-pink-100 text-center mb-16">
              From precious beginnings to the amazing today
            </p>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 rounded-full" />

              <div className="space-y-16">
                {lifeTimeline.map((milestone, index) => (
                  <div
                    key={index}
                    ref={(el) => (timelineItemRefs.current[index] = el)}
                    className={`relative flex ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-full lg:w-5/12 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl transform transition-all duration-500 hover:scale-105 ${
                        index % 2 === 0 ? "mr-auto" : "ml-auto"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center text-2xl mb-4 mx-auto`}
                      >
                        {milestone.emoji}
                      </div>
                      <h3 className="text-2xl font-bold text-white text-center mb-2">
                        {milestone.year}
                      </h3>
                      <p className="text-yellow-300 text-center mb-2">
                        {milestone.age}
                      </p>
                      <p className="text-pink-100 text-center mb-4">
                        {milestone.description}
                      </p>

                      {/* Timeline Images */}
                      <div className="grid grid-cols-1 gap-3 mt-4">
                        {milestone.images && milestone.images.length > 0 ? (
                          milestone.images.map((image, imgIndex) => (
                            <ImageContainer
                              key={imgIndex}
                              image={image}
                              className="aspect-video"
                            />
                          ))
                        ) : (
                          <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center">
                            <span className="text-4xl text-white/40">📸</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center p-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
              <div className="text-8xl mb-8">🎵</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Birthday Symphony
              </h2>
              <p className="text-xl text-pink-100 mb-8">
                Press play to add magical music to your celebration!
              </p>

              <button
                onClick={toggleMusic}
                className="px-12 py-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-xl shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white/30"
              >
                {musicPlaying
                  ? "⏸️ Pause Magic Music"
                  : "🎵 Play Birthday Symphony"}
              </button>

              {musicPlaying && (
                <iframe
                  width="0"
                  height="0"
                  src="https://www.youtube.com/embed/nAw2ooeubSQ?autoplay=1&loop=1&playlist=nAw2ooeubSQ"
                  title="Birthday Symphony"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="mt-8"
                ></iframe>
              )}
            </div>
          </div>
        </section>  

        {/* NEW: Funny Video Section */}
        <section ref={funnyVideoRef} className="min-h-screen py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
              Bloopers & Funny Moments 🎬
            </h2>
            <p className="text-xl text-pink-100 text-center mb-12">
              Because the best memories are the ones that make us laugh! 😂
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Your Hilarious Moments! 🤪
                </h3>
                <p className="text-pink-100 text-lg">
                  Watch this compilation of your funniest moments!
                </p>
              </div>

              <div
                ref={videoContainerRef}
                className="relative rounded-2xl overflow-hidden bg-black/40 border-2 border-white/20"
              >
                {!videoPlaying ? (
                  <div className="aspect-video flex flex-col items-center justify-center p-8">
                    <div className="text-8xl mb-4">🎥</div>
                    <p className="text-white text-xl mb-6 text-center">
                      Ready for some laughs? Press play! 😄
                    </p>
                    <button
                      onClick={toggleVideo}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-300 border-2 border-white/30"
                    >
                      🎬 Play Funny Video
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center p-4">
                    {/* FIXED: Video with proper sizing, loop, and sound */}
                    <video
                      src={funnyVideo1}
                      controls
                      autoPlay
                      loop
                      muted={false}
                      className="w-full h-auto max-w-full rounded-2xl object-contain"
                      style={{ maxHeight: "70vh" }}
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={toggleVideo}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform duration-300 border-2 border-white/30"
                      >
                        ⏸️ Pause
                      </button>
                      <button
                        onClick={createConfetti}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform duration-300 border-2 border-white/30"
                      >
                        🎉 More Fun!
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-pink-500/20 rounded-xl p-4 text-center border border-pink-500/30">
                  <div className="text-2xl mb-2">😂</div>
                  <p className="text-white font-semibold">Funny Moments</p>
                </div>
                <div className="bg-purple-500/20 rounded-xl p-4 text-center border border-purple-500/30">
                  <div className="text-2xl mb-2">🤪</div>
                  <p className="text-white font-semibold">Silly Faces</p>
                </div>
                <div className="bg-blue-500/20 rounded-xl p-4 text-center border border-blue-500/30">
                  <div className="text-2xl mb-2">🎭</div>
                  <p className="text-white font-semibold">Dramatic Acts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Letter Section - FIXED */}
        <section
          ref={letterRef}
          className="min-h-screen flex items-center justify-center p-8"
        >
          <div className="text-center max-w-4xl mx-auto w-full">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              A Special Letter For You 💌
            </h2>
            <p className="text-xl text-pink-100 mb-12">
              A heartfelt message filled with love and magic
            </p>

            {!letterOpened ? (
              <div
                ref={envelopeRef}
                className="envelope cursor-pointer transform transition-transform duration-500 hover:scale-110 mx-auto max-w-md"
                onClick={openLetter}
              >
                <div className="relative w-80 h-60 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl shadow-2xl border-4 border-white/30">
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-40 border-l-transparent border-r-40 border-r-transparent border-t-40 border-t-red-300 transform -translate-y-1/2"></div>
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-6xl">
                      💌
                    </div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold bg-black/30 px-4 py-2 rounded-full">
                      Click to Open Your Letter!
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="letter-content w-full">
                {showLetterContent && (
                  <div
                    ref={letterPaperRef}
                    className="bg-yellow-50 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-yellow-200 w-full max-w-4xl mx-auto"
                  >
                    <div className="font-serif text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line text-left max-h-[70vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-yellow-100">
                      {letterContent}
                    </div>
                    <div className="mt-8 pt-6 border-t border-yellow-300 text-center">
                      <div className="text-4xl mb-4">💖</div>
                      <p className="text-gray-600 italic">
                        With all the love in my heart
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Interactive Magic Section */}
        <section ref={interactiveRef} className="min-h-screen py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
              Magic Creator 🪄
            </h2>
            <p className="text-xl text-pink-100 text-center mb-16">
              Click any card to create instant birthday magic!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {magicalSurprises.map((surprise, index) => (
                <div
                  key={index}
                  className={`surprise-card group relative bg-white/10 backdrop-blur-lg rounded-2xl p-4 border-2 border-white/20 shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-110 ${
                    activeSurprise === surprise.name
                      ? "ring-4 ring-yellow-400 scale-110"
                      : ""
                  }`}
                  onClick={() => triggerSurprise(surprise)}
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${surprise.color} flex items-center justify-center text-2xl mb-3 mx-auto group-hover:scale-125 transition-transform duration-300`}
                  >
                    {surprise.emoji}
                  </div>
                  <h3 className="text-white font-bold text-center text-sm mb-2">
                    {surprise.name}
                  </h3>
                  <p className="text-pink-100 text-center text-xs">
                    {surprise.description}
                  </p>

                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Friend Wishes Section */}
        <section ref={wishesRef} className="min-h-screen py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
              Magical Wishes 🧚
            </h2>
            <p className="text-xl text-pink-100 text-center mb-16">
              Special messages from your magical friends
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {friendWishes.map((friend, index) => (
                <div
                  key={index}
                  className="friend-wish bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-2xl mr-4">
                      {friend.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {friend.name}
                      </h3>
                      <p className="text-cyan-200 text-sm">{friend.role}</p>
                    </div>
                  </div>
                  <p className="text-pink-100 text-lg">{friend.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Star Wish Section */}
        <section
          ref={starsRef}
          className="min-h-screen flex items-center justify-center p-8"
        >
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
              <div className="text-8xl mb-8">🌠</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Make a Wish Upon a Star
              </h2>
              <p className="text-xl text-pink-100 mb-8">
                Type your birthday wish and send it to the universe!
              </p>

              <div className="space-y-6">
                <textarea
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="What is your special birthday wish? ✨"
                  className="w-full h-40 p-6 rounded-2xl bg-white/20 border-2 border-white/30 text-white placeholder-pink-200 focus:outline-none focus:border-pink-400 resize-none text-lg"
                  maxLength={200}
                />

                <button
                  onClick={handleWishSubmit}
                  disabled={!wishText.trim()}
                  className={`px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl transform transition-all duration-300 border-2 ${
                    wishText.trim()
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:scale-105 border-white/30 cursor-pointer"
                      : "bg-white/10 text-white/50 border-white/20 cursor-not-allowed"
                  }`}
                >
                  Send Wish to the Stars! ⭐
                </button>

                <p className="text-pink-100 text-lg">
                  {wishText.length}/200 characters
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Grand Finale */}
        <section
          ref={finaleRef}
          className="min-h-screen flex items-center justify-center p-8"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-12 border-4 border-white/30 shadow-2xl">
              <div className="text-8xl mb-8">🎊</div>

              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Happy Birthday, Superstar! 🌟
              </h2>

              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 mb-8">
                <p className="text-white text-2xl leading-relaxed font-medium mb-6">
                  You are the most amazing, wonderful, and magical person in the
                  universe! Thank you for being you and for making every day
                  brighter. ✨
                </p>

                <div className="text-4xl space-x-6 mb-6">
                  {["🌟", "💫", "🎊", "🎉", "💖", "✨", "🎈", "🎁"].map(
                    (emoji, index) => (
                      <span
                        key={index}
                        className="animate-bounce inline-block"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {emoji}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-black/30 rounded-2xl p-6 border border-white/20">
                <p className="text-white text-xl font-bold mb-2">
                  Made with infinite love and magic 💖
                </p>
                <p className="text-pink-200 text-lg">
                  By your brother — the OG version you tried to copy… and
                  failed. 😏
                </p>
              </div>

              {/* UPDATED BUTTONS SECTION */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                {onBack && (
                  <button
                    onClick={onBack}
                    className="px-8 py-4 bg-white/20 backdrop-blur-lg text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300 border-2 border-white/30 hover:bg-white/30"
                  >
                    ← Back to Countdown
                  </button>
                )}

                <button
                  onClick={() => navigate("/gallery")}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300 border-2 border-white/30 hover:from-green-600 hover:to-emerald-600 flex items-center gap-2"
                >
                  <span>📸</span>
                  <span>View Photo Gallery</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .envelope {
          transform-style: preserve-3d;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thumb-yellow-300::-webkit-scrollbar-thumb {
          background-color: #fcd34d;
          border-radius: 3px;
        }
        .scrollbar-track-yellow-100::-webkit-scrollbar-track {
          background-color: #fef3c7;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default BirthdaySpecial;
