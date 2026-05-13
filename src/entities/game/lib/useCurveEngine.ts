"use client";

import { useEffect, useRef } from "react";
import { CURVE_COLORS } from "../model/constants";

interface CurveEngineOptions {
  curvePoints: { x: number; y: number }[];
  crashed: boolean;
}

export function useCurveEngine({ curvePoints, crashed }: CurveEngineOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef({
    curvePoints: [] as { x: number; y: number }[],
    crashed: false,
    lastTickAt: 0,
  });

  useEffect(() => {
    stateRef.current.curvePoints = curvePoints;
    if (curvePoints.length > 0) stateRef.current.lastTickAt = Date.now();
  }, [curvePoints]);

  useEffect(() => {
    stateRef.current.crashed = crashed;
  }, [crashed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      const { curvePoints, crashed, lastTickAt } = stateRef.current;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      if (curvePoints.length < 2) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const last = curvePoints[curvePoints.length - 1];
      const prev = curvePoints[curvePoints.length - 2];

      let displayPoints = curvePoints;

      if (!crashed) {
        const tickInterval = Math.max(last.x - prev.x, 0.05);
        const timeSinceTick = (Date.now() - lastTickAt) / 1000;
        const growthRate =
          Math.log(last.y / Math.max(prev.y, 1)) / tickInterval;
        const cappedTime = Math.min(timeSinceTick, tickInterval * 2);
        displayPoints = [
          ...curvePoints,
          {
            x: last.x + cappedTime,
            y: last.y * Math.exp(growthRate * cappedTime),
          },
        ];
      }

      const tip = displayPoints[displayPoints.length - 1];
      const maxX = tip.x;
      const maxY = Math.max(...displayPoints.map((p) => p.y));
      const scaleX = (width - 40) / Math.max(maxX, 1);
      const scaleY = (height - 40) / Math.max(maxY, 1.5);

      const toCanvas = (p: { x: number; y: number }) => ({
        x: 20 + p.x * scaleX,
        y: height - 20 - p.y * scaleY,
      });

      const colors = crashed ? CURVE_COLORS.crashed : CURVE_COLORS.running;

      ctx.strokeStyle = colors.stroke;
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      ctx.beginPath();
      displayPoints.forEach((p, i) => {
        const { x, y } = toCanvas(p);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      ctx.fillStyle = colors.fill;
      ctx.beginPath();
      displayPoints.forEach((p, i) => {
        const { x, y } = toCanvas(p);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      const tipCanvas = toCanvas(tip);
      ctx.lineTo(tipCanvas.x, height - 20);
      ctx.lineTo(20, height - 20);
      ctx.closePath();
      ctx.fill();

      const glow = ctx.createRadialGradient(
        tipCanvas.x,
        tipCanvas.y,
        0,
        tipCanvas.x,
        tipCanvas.y,
        18,
      );
      glow.addColorStop(0, colors.glow);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(tipCanvas.x, tipCanvas.y, 18, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(tipCanvas.x, tipCanvas.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = colors.stroke;
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return { canvasRef };
}
