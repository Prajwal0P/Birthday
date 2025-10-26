import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { images } from "../images.js";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [easterEggsFound, setEasterEggsFound] = useState([]);
  const [secretMode, setSecretMode] = useState(false);
  const [rainbowMode, setRainbowMode] = useState(false);
  const [partyMode, setPartyMode] = useState(false);
  const [dramaticMode, setDramaticMode] = useState(false);
  const [comfortMode, setComfortMode] = useState(false);
  const [fairyDustMode, setFairyDustMode] = useState(false);
  const [magicalMessages, setMagicalMessages] = useState([]);

  const timerRef = useRef(null);
  const daysRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const surpriseModalRef = useRef(null);
  const birthdayButtonRef = useRef(null);
  const imageRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const fairyContainerRef = useRef(null);
  
  const comfortModeActivated = useRef(false);
  const dramaticModeActivated = useRef(false);
  const keySequence = useRef([]);
  const shakeCount = useRef(0);
  const tapPattern = useRef([]);
  const touchStart = useRef(null);

  const funnyImages = images || [];

  const easterEggs = {
    konami_code: { name: "Magical Code! ✨", found: false },
    birthday_typing: { name: "Birthday Magic 🎂", found: false },
    shake_celebration: { name: "Sparkle Shake ✨", found: false },
    rainbow_unicorn: { name: "Rainbow Unicorn Mode 🌈🦄", found: false },
    disco_lights: { name: "Fairy Lights 💫", found: false },
    cosmic_dance: { name: "Starlight Dance 🌟", found: false },
    swipe_magic: { name: "Magic Swipe ✨", found: false },
    comfort_mode: { name: "Comfort Mode 🛋️", found: false },
    fairy_dust: { name: "Fairy Dust Mode 🧚", found: false }
  };

  const secretSequences = {
    konami: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],
    birthday: ['KeyB', 'KeyI', 'KeyR', 'KeyT', 'KeyH', 'KeyD', 'KeyA', 'KeyY'],
    comfort: ['KeyC', 'KeyO', 'KeyM', 'KeyF', 'KeyO', 'KeyR', 'KeyT']
  };

  const tapPatterns = {
    rainbow: [1, 1, 2],
    disco: [2, 1, 2],
    cosmic: [1, 2, 1],
    comfort: [1, 1, 1],
    fairy: [2, 2, 1]
  };

  const comfortingMessages = [
    "You're the most amazing little sister in the whole universe! 🌟",
    "Every moment brings us closer to your special magical day! ✨",
    "The birthday fairies are preparing something wonderful for you! 🧚‍♀️",
    "You make every day brighter just by being you! ☀️",
    "So much love and happiness is waiting for you! 💖",
    "You deserve all the magic and wonder in the world! 🎇",
    "The stars are aligning to make your birthday perfect! 🌠",
    "Your smile lights up our whole world! 😊",
    "You're growing into such an incredible person! 🌸",
    "The world is a better place because you're in it! 🌎"
  ];

  const magicalEncouragements = [
    "Almost there, superstar! Your special day is dawning! 🌅",
    "Can you feel the magic building? It's almost time! ✨",
    "The birthday fairies are putting the final touches! 🧚",
    "Get ready for the most wonderful day ever! 🎉",
    "Your amazing adventure is about to begin! 🚀",
    "The whole universe is excited for your birthday! 🌌",
    "Take a deep breath... magic is happening! 💫",
    "You've waited so patiently - your reward is here! 🎁",
    "The stars are dancing in anticipation! 💃",
    "This is it! Your moment to shine! ⭐"
  ];

  const calculateTimeLeft = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthday = new Date(currentYear, 10, 4);
    
    if (now > birthday) {
      birthday.setFullYear(currentYear + 1);
    }
    
    const difference = birthday.getTime() - now.getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  };

  const isLast3Hours = (timeLeft) => {
    return timeLeft.days === 0 && timeLeft.hours < 3;
  };

  const isLastHour = (timeLeft) => {
    return timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes < 60;
  };

  const getRandomSurprise = () => {
    if (funnyImages.length === 0) return { image: "", message: "You're amazing! 😊" };
    const randomImageIndex = Math.floor(Math.random() * funnyImages.length);
    const randomMessageIndex = Math.floor(Math.random() * comfortingMessages.length);
    
    return {
      image: funnyImages[randomImageIndex],
      message: comfortingMessages[randomMessageIndex]
    };
  };

  const createFairyDust = () => {
    if (!fairyContainerRef.current) return;
    const fairyContainer = fairyContainerRef.current;
    const fairyCount = 30;

    for (let i = 0; i < fairyCount; i++) {
      const fairy = document.createElement('div');
      fairy.innerHTML = '✨';
      fairy.style.position = 'absolute';
      fairy.style.left = `${Math.random() * 100}%`;
      fairy.style.top = `${Math.random() * 100}%`;
      fairy.style.fontSize = `${Math.random() * 20 + 10}px`;
      fairy.style.opacity = '0';
      fairy.style.zIndex = '10';
      fairy.className = 'fairy-dust';
      fairyContainer.appendChild(fairy);

      gsap.to(fairy, {
        duration: Math.random() * 3 + 2,
        y: -100,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        opacity: 1,
        ease: "power1.out",
        onComplete: () => {
          if (fairy.parentNode === fairyContainer) {
            fairy.remove();
          }
        }
      });
    }
  };

  const activateComfortMode = () => {
    if (comfortModeActivated.current) return;
    comfortModeActivated.current = true;
    setComfortMode(true);
    setDramaticMode(false);

    gsap.to("body", {
      duration: 4,
      background: `linear-gradient(135deg, #ffb6c1 0%, #ffd1dc 25%, #e6e6fa 50%, #d8bfd8 75%, #b19cd9 100%)`,
      ease: "sine.inOut"
    });

    if (timerRef.current) {
      gsap.to(timerRef.current, {
        duration: 3,
        y: -10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    gsap.to(".time-unit", {
      duration: 2,
      boxShadow: "0 0 30px rgba(255, 255, 255, 0.8)",
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: "sine.inOut"
    });

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (!comfortModeActivated.current) {
        clearInterval(messageInterval);
        return;
      }
      const newMessage = {
        id: Date.now(),
        text: magicalEncouragements[messageIndex % magicalEncouragements.length],
        top: `${Math.random() * 70 + 15}%`,
        left: `${Math.random() * 70 + 15}%`
      };
      setMagicalMessages(prev => [...prev.slice(-3), newMessage]);
      messageIndex++;
    }, 8000);

    return () => clearInterval(messageInterval);
  };

  const activateDramaticMode = () => {
    if (dramaticModeActivated.current) return;
    dramaticModeActivated.current = true;
    setDramaticMode(true);

    gsap.to("body", {
      duration: 3,
      background: `linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #ffeaa7 100%)`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    if (timerRef.current) {
      gsap.to(timerRef.current, {
        duration: 1.5,
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    gsap.to(".time-unit", {
      duration: 2,
      y: -15,
      rotation: 5,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  };

  const triggerEasterEgg = (eggName) => {
    if (easterEggsFound.includes(eggName)) return;
    setEasterEggsFound(prev => [...prev, eggName]);
    
    switch(eggName) {
      case 'konami_code':
        setSecretMode(true);
        createFairyDust();
        gsap.to(".time-unit", {
          duration: 1,
          y: -20,
          rotation: 360,
          stagger: 0.1,
          ease: "back.out(1.7)",
          repeat: 1,
          yoyo: true
        });
        break;
      case 'birthday_typing':
        createFairyDust();
        gsap.to(".timer-container", {
          duration: 1,
          scale: 1.05,
          backgroundColor: "rgba(255, 223, 0, 0.2)",
          yoyo: true,
          repeat: 2,
          ease: "power2.inOut"
        });
        break;
      case 'shake_celebration':
        setPartyMode(true);
        createFairyDust();
        if (timerRef.current) {
          gsap.to(timerRef.current, {
            duration: 0.2,
            rotation: 5,
            yoyo: true,
            repeat: 3,
            ease: "sine.inOut"
          });
        }
        break;
      case 'rainbow_unicorn':
        setRainbowMode(true);
        createFairyDust();
        gsap.to(".time-unit", {
          duration: 2,
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 80%)`,
          stagger: 0.2,
          repeat: 2,
          yoyo: true
        });
        break;
      case 'disco_lights':
        createFairyDust();
        if (timerRef.current) {
          gsap.to(timerRef.current, {
            duration: 0.5,
            filter: "brightness(1.5)",
            yoyo: true,
            repeat: 3,
            ease: "sine.inOut"
          });
        }
        break;
      case 'cosmic_dance':
        createFairyDust();
        gsap.to(".time-unit", {
          duration: 1,
          scale: 1.2,
          yoyo: true,
          repeat: 2,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)"
        });
        break;
      case 'swipe_magic':
        createFairyDust();
        gsap.to(".floating-element", {
          duration: 2,
          x: "100vw",
          rotation: 360,
          stagger: 0.2,
          ease: "power2.out"
        });
        break;
      case 'comfort_mode':
        setComfortMode(true);
        createFairyDust();
        gsap.to("body", {
          duration: 2,
          background: "linear-gradient(135deg, #e0f7fa, #f8bbd0, #fff9c4)",
          ease: "sine.inOut"
        });
        break;
      case 'fairy_dust':
        setFairyDustMode(true);
        createFairyDust();
        break;
    }

    const notification = document.querySelector('.easter-egg-notification');
    if (notification) {
      gsap.to(notification, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        onComplete: () => {
          setTimeout(() => {
            gsap.to(notification, {
              opacity: 0,
              y: -50,
              duration: 0.5
            });
          }, 3000);
        }
      });
    }
  };

  const handleKeyPress = (event) => {
    const newSequence = [...keySequence.current, event.code].slice(-10);
    keySequence.current = newSequence;
    
    if (newSequence.join(',') === secretSequences.konami.join(',')) {
      if (!easterEggsFound.includes('konami_code')) {
        triggerEasterEgg('konami_code');
      }
    }
    
    if (newSequence.join(',') === secretSequences.birthday.join(',')) {
      if (!easterEggsFound.includes('birthday_typing')) {
        triggerEasterEgg('birthday_typing');
      }
    }

    if (newSequence.join(',') === secretSequences.comfort.join(',')) {
      if (!easterEggsFound.includes('comfort_mode')) {
        triggerEasterEgg('comfort_mode');
      }
    }
  };

  const handleShake = () => {
    const newShakeCount = shakeCount.current + 1;
    shakeCount.current = newShakeCount;
    
    if (newShakeCount >= 3 && !easterEggsFound.includes('shake_celebration')) {
      triggerEasterEgg('shake_celebration');
      shakeCount.current = 0;
    }
    
    setTimeout(() => {
      shakeCount.current = 0;
    }, 3000);
  };

  const handleTouchStart = (e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: Date.now()
    };
    const swipeDistance = {
      x: touchEnd.x - touchStart.current.x,
      y: touchEnd.y - touchStart.current.y
    };
    const swipeTime = touchEnd.time - touchStart.current.time;

    if (swipeTime < 500) {
      if (Math.abs(swipeDistance.x) > 50 && Math.abs(swipeDistance.y) < 50) {
        if (swipeDistance.x > 0 && !easterEggsFound.includes('swipe_magic')) {
          triggerEasterEgg('swipe_magic');
        }
      }
      
      if (Math.abs(swipeDistance.y) > 50 && Math.abs(swipeDistance.x) < 50) {
        if (swipeDistance.y < 0 && !easterEggsFound.includes('rainbow_unicorn')) {
          triggerEasterEgg('rainbow_unicorn');
        } else if (swipeDistance.y > 0 && !easterEggsFound.includes('fairy_dust')) {
          triggerEasterEgg('fairy_dust');
        }
      }
    }
    touchStart.current = null;
  };

  const handleTap = (isLongPress = false) => {
    const tapType = isLongPress ? 2 : 1;
    const newPattern = [...tapPattern.current, tapType].slice(-3);
    tapPattern.current = newPattern;

    if (newPattern.join(',') === tapPatterns.rainbow.join(',')) {
      if (!easterEggsFound.includes('rainbow_unicorn')) {
        triggerEasterEgg('rainbow_unicorn');
      }
    } else if (newPattern.join(',') === tapPatterns.disco.join(',')) {
      if (!easterEggsFound.includes('disco_lights')) {
        triggerEasterEgg('disco_lights');
      }
    } else if (newPattern.join(',') === tapPatterns.cosmic.join(',')) {
      if (!easterEggsFound.includes('cosmic_dance')) {
        triggerEasterEgg('cosmic_dance');
      }
    } else if (newPattern.join(',') === tapPatterns.comfort.join(',')) {
      if (!easterEggsFound.includes('comfort_mode')) {
        triggerEasterEgg('comfort_mode');
      }
    } else if (newPattern.join(',') === tapPatterns.fairy.join(',')) {
      if (!easterEggsFound.includes('fairy_dust')) {
        triggerEasterEgg('fairy_dust');
      }
    }

    setTimeout(() => {
      tapPattern.current = [];
    }, 2000);
  };

  const handleLongPress = () => {
    handleTap(true);
  };

  const redirectToBirthdayPage = () => {
    window.location.href = "/birthday-special";
  };

  const handleSurpriseClick = () => {
    if (isButtonEnabled) {
      redirectToBirthdayPage();
      return;
    }
    const surprise = getRandomSurprise();
    setCurrentImage(surprise.image);
    setCurrentMessage(surprise.message);
    setShowSurprise(true);
    
    if (surpriseModalRef.current) {
      gsap.fromTo(surpriseModalRef.current, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  };

  const closeSurpriseModal = () => {
    if (surpriseModalRef.current) {
      gsap.to(surpriseModalRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setShowSurprise(false)
      });
    } else {
      setShowSurprise(false);
    }
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    if (timerRef.current) {
      gsap.fromTo(timerRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
    }

    const timeUnits = [daysRef.current, hoursRef.current, minutesRef.current, secondsRef.current];
    if (timeUnits.every(unit => unit !== null)) {
      gsap.fromTo(timeUnits,
        { opacity: 0, scale: 0.5, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      const lastHour = isLastHour(newTimeLeft);
      const last3Hours = isLast3Hours(newTimeLeft);
      
      if (lastHour && !comfortModeActivated.current) {
        activateComfortMode();
      } else if (last3Hours && !dramaticModeActivated.current && !comfortModeActivated.current) {
        activateDramaticMode();
      }
      
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        clearInterval(timer);
        setIsButtonEnabled(true);
        createFairyDust();
        
        gsap.to("body", {
          duration: 3,
          background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #ff6b6b)",
          repeat: -1,
          yoyo: true
        });

        gsap.to(".time-unit", {
          duration: 1,
          scale: 1.3,
          rotation: 360,
          stagger: 0.1,
          repeat: -1,
          yoyo: true
        });
        
        if (timerRef.current) {
          gsap.to(timerRef.current, {
            scale: 1.1,
            duration: 0.8,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });
        }

        setTimeout(() => {
          if (birthdayButtonRef.current) {
            gsap.fromTo(birthdayButtonRef.current,
              { opacity: 0, scale: 0, y: 50 },
              { 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                duration: 1.5, 
                ease: "back.out(1.7)"
              }
            );
          }
        }, 1000);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    let lastAcceleration = { x: 0, y: 0, z: 0 };
    const handleDeviceMotion = (event) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;
      const deltaX = Math.abs(acceleration.x - lastAcceleration.x);
      const deltaY = Math.abs(acceleration.y - lastAcceleration.y);
      const deltaZ = Math.abs(acceleration.z - lastAcceleration.z);
      if (deltaX + deltaY + deltaZ > 25) {
        handleShake();
      }
      lastAcceleration = acceleration;
    };
    
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    let lastClickTime = 0;
    const handleDoubleClick = (event) => {
      const currentTime = new Date().getTime();
      if (currentTime - lastClickTime < 300) {
        handleTap();
      }
      lastClickTime = currentTime;
    };
    
    document.addEventListener('click', handleDoubleClick);

    let pressTimer;
    const handlePressStart = () => {
      pressTimer = setTimeout(handleLongPress, 800);
    };
    
    const handlePressEnd = () => {
      clearTimeout(pressTimer);
    };
    
    document.addEventListener('mousedown', handlePressStart);
    document.addEventListener('mouseup', handlePressEnd);
    document.addEventListener('touchstart', handlePressStart);
    document.addEventListener('touchend', handlePressEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('devicemotion', handleDeviceMotion);
      document.removeEventListener('click', handleDoubleClick);
      document.removeEventListener('mousedown', handlePressStart);
      document.removeEventListener('mouseup', handlePressEnd);
      document.removeEventListener('touchstart', handlePressStart);
      document.removeEventListener('touchend', handlePressEnd);
    };
  }, []);

  useEffect(() => {
    const timeUnits = [daysRef.current, hoursRef.current, minutesRef.current, secondsRef.current];
    if (timeUnits.every(unit => unit !== null)) {
      if (comfortMode) {
        gsap.to(timeUnits, {
          duration: 0.3,
          scale: 1.1,
          y: -5,
          stagger: 0.1,
          ease: "sine.out",
          yoyo: true,
          repeat: 1
        });
      } else if (dramaticMode) {
        gsap.to(timeUnits, {
          duration: 0.2,
          scale: 1.2,
          y: -10,
          rotation: 5,
          stagger: 0.05,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      } else {
        gsap.to(timeUnits, {
          scale: 1.05,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      }
    }
  }, [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds, dramaticMode, comfortMode]);

  const TimeUnit = React.memo(({ label, value, color, unitRef }) => {
    const gradientMap = {
      "from-purple-500 to-blue-500": "linear-gradient(135deg, #d8b4fe, #93c5fd)",
      "from-pink-500 to-purple-500": "linear-gradient(135deg, #f9a8d4, #d8b4fe)",
      "from-indigo-500 to-blue-400": "linear-gradient(135deg, #a5b4fc, #7dd3fc)",
      "from-green-400 to-teal-400": "linear-gradient(135deg, #86efac, #5eead4)"
    };

    return (
      <div 
        ref={unitRef}
        className="time-unit relative flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
        style={{
          background: comfortMode 
            ? `linear-gradient(135deg, #ffd6e0, #c4f0ff)`
            : rainbowMode 
            ? `linear-gradient(45deg, hsl(${Math.random() * 360}, 80%, 70%), hsl(${Math.random() * 360}, 80%, 70%))`
            : partyMode
            ? `linear-gradient(135deg, hsl(${value * 15}, 80%, 70%), hsl(${value * 15 + 60}, 80%, 70%))`
            : dramaticMode
            ? `linear-gradient(135deg, hsl(${Math.random() * 360}, 80%, 70%), hsl(${Math.random() * 360}, 80%, 70%))`
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
          backdropFilter: 'blur(12px)',
          border: comfortMode 
            ? '2px solid rgba(255, 255, 255, 0.5)' 
            : dramaticMode 
            ? '2px solid white' 
            : '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div 
          className="absolute inset-0 rounded-xl opacity-60"
          style={{
            background: comfortMode 
              ? `linear-gradient(135deg, #ffb6c1, #87ceeb)`
              : gradientMap[color],
            filter: 'blur(8px)',
            zIndex: -1
          }}
        />
        
        <div 
          className="absolute inset-1 rounded-lg flex flex-col items-center justify-center"
          style={{
            background: comfortMode 
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))'
              : dramaticMode 
              ? `linear-gradient(135deg, hsla(${Math.random() * 360}, 100%, 60%, 0.9), hsla(${Math.random() * 360}, 100%, 60%, 0.9))`
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
          }}
        >
          <div 
            className="text-2xl md:text-3xl font-bold mb-1"
            style={{
              background: comfortMode 
                ? 'linear-gradient(135deg, #ff6b6b, #4ecdc4)'
                : dramaticMode 
                ? 'linear-gradient(135deg, #ffffff, #ffff00)'
                : gradientMap[color],
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: comfortMode ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {value.toString().padStart(2, '0')}
          </div>
          <div className={`text-xs font-medium uppercase tracking-wider ${
            comfortMode ? 'text-pink-600' : 'text-gray-600'
          }`}>
            {label}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div 
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-1000 ${
        comfortMode ? 'comfort-mode' :
        dramaticMode ? 'dramatic-mode' :
        secretMode ? 'bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400' :
        partyMode ? 'bg-gradient-to-br from-yellow-300 via-red-300 to-pink-400' :
        rainbowMode ? 'bg-gradient-to-br from-red-300 via-green-300 to-blue-300' :
        'bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-500'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fairy Dust Container */}
      <div ref={fairyContainerRef} className="fixed inset-0 pointer-events-none z-40" />

      {/* Comfort Mode Alert */}
      {comfortMode && (
        <div className="comfort-alert fixed top-0 left-0 w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white text-center py-3 font-bold text-lg z-50">
          💖 You're Amazing! {timeLeft.minutes}m {timeLeft.seconds}s Until Your Special Day! 💖
        </div>
      )}

      {/* Dramatic Mode Alert */}
      {dramaticMode && !comfortMode && (
        <div className="dramatic-alert fixed top-0 left-0 w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white text-center py-2 font-bold text-lg z-50">
          ✨ Get Ready! {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s Until Magic! ✨
        </div>
      )}

      {/* Magical Floating Messages */}
      {magicalMessages.map(message => (
        <div
          key={message.id}
          className="magical-message fixed text-white text-lg font-bold text-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 z-30"
          style={{
            top: message.top,
            left: message.left,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {message.text}
        </div>
      ))}

      {/* Easter Egg Notifications */}
      <div className="easter-egg-notification fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-300 to-pink-300 text-purple-900 px-6 py-3 rounded-full font-bold text-lg shadow-2xl opacity-0 -translate-y-50 z-50">
        🧚 Magical Secret Found! ✨
      </div>

      {/* Easter Egg Collection */}
      {easterEggsFound.length > 0 && (
        <div className="fixed top-4 right-4 bg-white/30 backdrop-blur-lg rounded-lg p-3 border border-white/40 max-w-xs">
          <p className="text-white text-sm font-bold mb-2">🎯 Magical Secrets: {easterEggsFound.length}/9</p>
          <div className="flex flex-wrap gap-1">
            {easterEggsFound.map(egg => (
              <span key={egg} className="text-xs bg-gradient-to-r from-green-400 to-blue-400 text-white px-2 py-1 rounded">
                {easterEggs[egg]?.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Magical Instructions */}
      <div className="fixed bottom-4 left-4 bg-black/40 text-white px-3 py-2 rounded text-sm max-w-xs backdrop-blur-sm">
        <p className="font-bold">Magical Secrets! 🧚</p>
        <p className="text-xs mt-1">
          <strong>Desktop:</strong><br/>
          • Type "COMFORT" for cozy mode<br/>
          • Konami code: ↑↑↓↓←→←→BA<br/>
          • Type "BIRTHDAY"<br/><br/>
          <strong>Mobile:</strong><br/>
          • Gentle phone shake<br/>
          • Swipe right → for magic<br/>
          • Swipe up ↑ / down ↓<br/>
          • Tap patterns (S=short, L=long)
        </p>
      </div>

      <div 
        ref={timerRef}
        className={`timer-container relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-6 md:space-y-8 rounded-2xl p-6 md:p-8 shadow-2xl border-2 backdrop-blur-xl ${
          comfortMode 
            ? 'bg-white/40 border-white/50 comfort-glow' 
            : dramaticMode
            ? 'bg-gradient-to-br from-yellow-200/30 to-red-200/30 border-yellow-300/50 dramatic-glow'
            : 'bg-gradient-to-br from-white/30 via-pink-100/30 to-purple-100/30 border-white/40'
        }`}
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-3">
            <span className="text-4xl">
              {comfortMode ? '💖' :
               dramaticMode ? '✨' :
               secretMode ? '🎮' : 
               partyMode ? '📱' : 
               rainbowMode ? '🌈🦄' : '🎂'}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {comfortMode ? 'Almost There, Superstar! 💫' :
               dramaticMode ? 'Magical Countdown! ✨' :
               secretMode ? 'Secret Code! 🎮' : 
               partyMode ? 'Celebration Time! 🎉' : 
               rainbowMode ? 'Rainbow Magic! 🌈' : 
               'Birthday Countdown! 🎂'}
            </h1>
            <span className="text-4xl">
              {comfortMode ? '⭐' :
               dramaticMode ? '🌟' :
               secretMode ? '👾' : 
               partyMode ? '🎊' : 
               rainbowMode ? '🦄' : '🎁'}
            </span>
          </div>
          <p className="text-white text-base md:text-lg max-w-md font-medium text-shadow">
            {comfortMode 
              ? `You're doing amazing! ${timeLeft.minutes}m ${timeLeft.seconds}s until your special day begins! 💖` 
              : dramaticMode 
              ? `✨ ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s until your magical adventure! ✨` 
              : secretMode 
              ? "You discovered magical secrets! You're so clever! 🌟" 
              : partyMode
              ? "You're shining so bright! Keep that amazing energy! ✨"
              : "Counting down to the most wonderful day for the most wonderful sister! 💝"
            }
          </p>
          <p className="text-pink-200 text-sm md:text-base font-medium">
            For my incredible little sister! {comfortMode ? '💖✨💖' : '💝'}
          </p>
        </div>

        {/* Time Units */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <TimeUnit 
            label="Days" 
            value={timeLeft.days} 
            color="from-purple-500 to-blue-500"
            unitRef={daysRef}
          />
          <TimeUnit 
            label="Hours" 
            value={timeLeft.hours} 
            color="from-pink-500 to-purple-500"
            unitRef={hoursRef}
          />
          <TimeUnit 
            label="Minutes" 
            value={timeLeft.minutes} 
            color="from-indigo-500 to-blue-400"
            unitRef={minutesRef}
          />
          <TimeUnit 
            label="Seconds" 
            value={timeLeft.seconds} 
            color="from-green-400 to-teal-400"
            unitRef={secondsRef}
          />
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mt-2">
          <div className="flex justify-between text-sm text-white mb-2 font-medium">
            <span>Magic Building</span>
            <span>{Math.round(((365 - timeLeft.days) / 365) * 100)}%</span>
          </div>
          <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                comfortMode 
                  ? 'bg-gradient-to-r from-pink-400 to-blue-400' 
                  : dramaticMode 
                  ? 'bg-gradient-to-r from-yellow-400 to-red-500 animate-pulse'
                  : 'bg-gradient-to-r from-pink-500 to-purple-500'
              }`}
              style={{
                width: `${((365 - timeLeft.days) / 365) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col gap-3 mt-4 w-full max-w-md items-center">
          {/* Main Surprise Button */}
          <button 
            onClick={handleSurpriseClick}
            className={`surprise-btn w-full px-5 py-4 rounded-xl font-bold text-lg shadow-xl transform transition-all duration-300 ${
              isButtonEnabled 
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 cursor-pointer hover:shadow-2xl' 
                : comfortMode
                ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white cursor-pointer hover:scale-105 comfort-glow'
                : dramaticMode
                ? 'bg-gradient-to-r from-yellow-400 to-red-500 text-white cursor-pointer hover:scale-105 dramatic-glow'
                : 'bg-white/40 text-white cursor-pointer hover:scale-105 backdrop-blur-sm'
            }`}
          >
            <span className="fas fa-gift mr-2" />
            {comfortMode ? '💖 You Are Amazing! 💖' : 
             dramaticMode ? '✨ Magic Awaits! ✨' : 
             isButtonEnabled ? 'Enter Wonderland! 🎊' : 'Get Magical Surprise! ✨'}
          </button>

          {/* Birthday Special Page Button */}
          {isButtonEnabled && (
            <button 
              ref={birthdayButtonRef}
              onClick={redirectToBirthdayPage}
              className="birthday-special-btn w-full px-5 py-4 bg-gradient-to-r from-yellow-300 to-orange-400 text-white rounded-xl font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-yellow-200 backdrop-blur-sm"
            >
              <span className="fas fa-star mr-2" />
              🎊 Start Your Magical Day! 🎊
              <span className="fas fa-star ml-2" />
            </button>
          )}
        </div>

        {/* Magical Instructions */}
        {!isButtonEnabled && (
          <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm max-w-md border border-white/30">
            <p className="text-white text-sm italic font-medium">
              {comfortMode 
                ? "You're handling the wait like a champion! So proud of you! 💫" 
                : dramaticMode
                ? "The magic is building! You're doing great! ✨"
                : "Discover magical secrets with gestures, shaking, or secret words! 🧚"
              }
            </p>
          </div>
        )}

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(comfortMode ? 15 : dramaticMode ? 20 : 12)].map((_, i) => (
            <div
              key={i}
              className="floating-element absolute text-xl opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: comfortMode ? '1.2rem' : dramaticMode ? '1.5rem' : '1rem',
                opacity: comfortMode ? 0.6 : dramaticMode ? 0.8 : 0.5
              }}
            >
              {comfortMode 
                ? ['💖', '⭐', '✨', '🌟', '🎀'][i % 5]
                : dramaticMode 
                ? ['✨', '🌟', '⚡', '🎊', '🔥', '🎇'][i % 6]
                : ['🎈', '🎂', '🎁', '⭐'][i % 4]
              }
            </div>
          ))}
        </div>
      </div>

      {/* FULL SCREEN SURPRISE MODAL */}
      {showSurprise && (
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-4">
          <div 
            ref={surpriseModalRef}
            className="w-full h-full flex flex-col items-center justify-center max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-4 md:mb-6 px-4">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {isButtonEnabled ? "Happy Magical Birthday! 🎉✨" : currentMessage}
              </h3>
            </div>

            {/* Full Screen Image Container */}
            <div className="flex-1 w-full flex items-center justify-center p-2 md:p-4 max-h-[60vh]">
              {currentImage ? (
                <img 
                  ref={imageRef}
                  src={currentImage} 
                  alt="Magical surprise" 
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-4 border-white/30"
                  loading="lazy"
                  onError={(e) => {
                    console.error("Image failed to load");
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => {
                    gsap.fromTo(imageRef.current, 
                      { scale: 0.8, opacity: 0 },
                      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
                    );
                  }}
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl border-4 border-white/30">
                  <p className="text-gray-600 font-bold text-xl">✨ Loading magic... ✨</p>
                </div>
              )}
            </div>

            {/* Message */}
            <div className="text-center my-4 md:my-6 px-4">
              <p className="text-white text-lg md:text-xl font-medium">
                {isButtonEnabled 
                  ? "Ready for your magical birthday adventure?" 
                  : "You found a magical surprise! ✨😊"
                }
              </p>
            </div>

            {/* BUTTONS */}
            <div 
              ref={buttonContainerRef}
              className="w-full flex flex-col sm:flex-row gap-3 justify-center items-center px-4 pb-4 md:pb-8"
            >
              <button 
                onClick={isButtonEnabled ? redirectToBirthdayPage : closeSurpriseModal}
                className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform min-h-[60px] flex items-center justify-center shadow-xl"
              >
                {isButtonEnabled ? "Let's Begin Magic! 🎊" : "Close"}
              </button>
              {isButtonEnabled && (
                <button 
                  onClick={redirectToBirthdayPage}
                  className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-yellow-300 to-orange-400 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform min-h-[60px] flex items-center justify-center shadow-xl"
                >
                  Magical Journey ✨
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes comfort-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(255, 182, 193, 0.5); }
          50% { box-shadow: 0 0 50px rgba(135, 206, 235, 0.5); }
        }
        
        @keyframes dramatic-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(255, 255, 0, 0.5); }
          50% { box-shadow: 0 0 60px rgba(255, 0, 0, 0.5); }
        }
        
        @keyframes fairy-dust {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        .floating-element {
          animation: float 4s ease-in-out infinite;
        }
        
        .comfort-mode {
          animation: comfort-glow 3s ease-in-out infinite;
        }
        
        .dramatic-mode {
          animation: dramatic-glow 2s ease-in-out infinite;
        }
        
        .comfort-glow {
          animation: comfort-glow 2s ease-in-out infinite;
        }
        
        .dramatic-glow {
          animation: dramatic-glow 1.5s ease-in-out infinite;
        }
        
        .comfort-alert {
          animation: comfort-glow 2s ease-in-out infinite;
        }
        
        .dramatic-alert {
          animation: dramatic-glow 1s ease-in-out infinite;
        }
        
        .fairy-dust {
          animation: fairy-dust 3s ease-out forwards;
        }
        
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .magical-message {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Countdown;