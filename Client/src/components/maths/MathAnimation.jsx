import { useEffect } from "react";
import gsap from "gsap";

const MathAnimation = ({ question, steps }) => {
  useEffect(() => {
    gsap.fromTo(
      ".step1",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      ".step2",
      { scale: 0 },
      { scale: 1, duration: 1, delay: 1 }
    );
    gsap.fromTo(
      ".step3",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2 }
    );
  }, [question]);

  return (
    <div>
      <h2>Let's solve: {question}</h2>
      <p className="step1">Step 1: {steps[0]}</p>
      <p className="step2">Step 2: {steps[1]}</p>
      <p className="step3">Answer: {steps[2]}</p>
    </div>
  );
};

export default MathAnimation;
