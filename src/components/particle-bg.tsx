"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get parent container dimensions
    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Particle properties
    const particlesArray: Particle[] = [];
    const numberOfParticles = 200;
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150,
    };

    // Get mouse position relative to canvas
    const getMousePos = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    // Mouse move event
    const handleMouseMove = (event: MouseEvent) => {
      const pos = getMousePos(event);
      mouse.x = pos.x;
      mouse.y = pos.y;
    };

    // Mouse leave event
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseout", handleMouseOut);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        ctx!.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fill();
      }

      update() {
        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;

            this.x -= directionX;
            this.y -= directionY;
          } else {
            if (this.x !== this.baseX) {
              const dx = this.x - this.baseX;
              this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
              const dy = this.y - this.baseY;
              this.y -= dy / 10;
            }
          }
        } else {
          // Gentle floating motion when no mouse interaction
          this.x += this.speedX;
          this.y += this.speedY;

          // Bounce off edges
          if (this.x > canvas!.width || this.x < 0) {
            this.speedX = -this.speedX;
          }
          if (this.y > canvas!.height || this.y < 0) {
            this.speedY = -this.speedY;
          }
        }
      }

      connect() {
        for (let i = 0; i < particlesArray.length; i++) {
          const dx = this.x - particlesArray[i].x;
          const dy = this.y - particlesArray[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
            ctx!.lineWidth = 0.2;
            ctx!.moveTo(this.x, this.y);
            ctx!.lineTo(particlesArray[i].x, particlesArray[i].y);
            ctx!.stroke();
          }
        }
      }
    }

    // Create particles
    const init = () => {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    init();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        particlesArray[i].connect();
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-black">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
