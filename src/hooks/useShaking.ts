import { useEffect, useState, useRef } from "react";
import { DeviceMotion } from "expo-sensors";
import { NativeEventSubscription } from "react-native";

export function useShaking(
  onShake?: () => void,
  cooldownMs: number = 2000,
  shakeDuration: number = 1000
) {
  const [subscription, setSubscription] =
    useState<NativeEventSubscription | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const isCooldownRef = useRef(false);
  const shakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const _subscribe = () => {
    DeviceMotion.setUpdateInterval(400);

    const sub = DeviceMotion.addListener((motionMeasure) => {
      const { acceleration } = motionMeasure;
      if (!acceleration) return;

      const { x, y, z } = acceleration;
      const threshold = 3.5;

      const shakeDetected =
        Math.abs(x) > threshold ||
        Math.abs(y) > threshold ||
        Math.abs(z) > threshold;

      if (shakeDetected && !isCooldownRef.current) {
        isCooldownRef.current = true;

        setIsShaking(true);
        onShake?.();

        // Reset shaking state after brief duration
        shakeTimeoutRef.current = setTimeout(() => {
          setIsShaking(false);
        }, shakeDuration);

        // Cooldown to prevent retriggering
        setTimeout(() => {
          isCooldownRef.current = false;
        }, cooldownMs);
      }
    });

    setSubscription(sub);
  };

  const _unsubscribe = () => {
    subscription?.remove();
    setSubscription(null);
    if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return { isShaking };
}
