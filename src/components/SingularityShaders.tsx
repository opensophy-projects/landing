"use client";
import React, { useEffect, useRef, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SingularityShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  intensity?: number;
  size?: number;
  waveStrength?: number;
  colorShift?: number;
  isNegative?: boolean;
}

export const SingularityShaders = forwardRef<HTMLDivElement, SingularityShadersProps>(({
  className,
  speed = 0.1,
  intensity = 1.2,
  size = 1.1,
  waveStrength = 1,
  colorShift = 1,
  isNegative = false,
  children,
  ...props
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const glContextRef = useRef<WebGLRenderingContext | null>(null);
  const configRef = useRef({ speed, intensity, size, waveStrength, colorShift, isNegative });
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<WebGLProgram | null>(null);

  useEffect(() => {
    configRef.current = { speed, intensity, size, waveStrength, colorShift, isNegative };
  }, [speed, intensity, size, waveStrength, colorShift, isNegative]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAnimating(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = globalThis.innerWidth;
        canvas.height = globalThis.innerHeight;
      }, 100);
    };

    canvas.width = globalThis.innerWidth;
    canvas.height = globalThis.innerHeight;
    globalThis.addEventListener('resize', handleResize);

    const gl = canvas.getContext("webgl", { 
      preserveDrawingBuffer: false,
      antialias: false,
      powerPreference: "low-power",
      alpha: true,
      depth: false,
      stencil: false,
      failIfMajorPerformanceCaveat: true
    });
    
    if (!gl) {
      globalThis.removeEventListener('resize', handleResize);
      return;
    }

    glContextRef.current = gl;

    const vertexShader = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision lowp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float u_speed;
      uniform float u_intensity;
      uniform float u_size;
      uniform float u_waveStrength;
      uniform float u_colorShift;
      uniform float u_isNegative;

      void mainImage(out vec4 O, vec2 F) {
        float i = .2 * u_speed, a;
        vec2 r = iResolution.xy,
             p = ( F+F - r ) / r.y / (1.5 * u_size),
             d = vec2(-1.0, 1.0),
             b = p - i*d,
             c = p * mat2(1.0, 1.0, d/(.1 + i/dot(b,b))),
             v = c * mat2(cos(.5*log(a=dot(c,c)) + iTime*i*u_speed + vec4(0.0,33.0,11.0,0.0)))/i,
             w = vec2(0.0);
        for(float j = 0.0; j < 9.0; j++) {
          i++;
          w += 1.0 + sin(v * u_waveStrength);
          v += .7 * sin(v.yx * i + iTime * u_speed) / i + .5;
        }
        i = length( sin(v/.3)*.4 + c*(3.0+d) );
        vec4 colorGrad = vec4(.6,-.4,-1.0,0.0) * u_colorShift;
        float result = 1.0 - exp( -exp( c.x * colorGrad.x )
                         / w.x
                         / ( 2.0 + i*i/4.0 - i )
                         / ( .5 + 1.0 / a )
                         / ( .03 + abs( length(p)-.8 ) )
                         * u_intensity
                   );
        
        if (u_isNegative > 0.5) {
          O = vec4(vec3(result), 1.0);
        } else {
          O = vec4(vec3(1.0 - result), 1.0);
        }
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (source: string, type: number) => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vShader = compileShader(vertexShader, gl.VERTEX_SHADER);
    const fShader = compileShader(fragmentShader, gl.FRAGMENT_SHADER);

    if (!vShader || !fShader) {
      globalThis.removeEventListener('resize', handleResize);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      globalThis.removeEventListener('resize', handleResize);
      return;
    }

    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      globalThis.removeEventListener('resize', handleResize);
      return;
    }

    gl.useProgram(program);
    programRef.current = program;

    const positionLocation = gl.getAttribLocation(program, "position");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const speedLocation = gl.getUniformLocation(program, "u_speed");
    const intensityLocation = gl.getUniformLocation(program, "u_intensity");
    const sizeLocation = gl.getUniformLocation(program, "u_size");
    const waveStrengthLocation = gl.getUniformLocation(program, "u_waveStrength");
    const colorShiftLocation = gl.getUniformLocation(program, "u_colorShift");
    const isNegativeLocation = gl.getUniformLocation(program, "u_isNegative");

    let startTime = Date.now();
    const targetFPS = 20;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const animate = (currentTime: number) => {
      if (!isAnimating) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTime = currentTime;
      const config = configRef.current;
      const time = (Date.now() - startTime) / 1000;

      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(iTimeLocation, time);
      gl.uniform1f(speedLocation, config.speed);
      gl.uniform1f(intensityLocation, config.intensity);
      gl.uniform1f(sizeLocation, config.size);
      gl.uniform1f(waveStrengthLocation, config.waveStrength);
      gl.uniform1f(colorShiftLocation, config.colorShift);
      gl.uniform1f(isNegativeLocation, config.isNegative ? 1 : 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(resizeTimeout);
      globalThis.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      gl.deleteProgram(program);
    };
  }, [isAnimating]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
      {children}
    </div>
  );
});

SingularityShaders.displayName = "SingularityShaders";
