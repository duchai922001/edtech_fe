import { useEffect, useState } from "react";

export const useDeviceType = () => {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isMonitor: false,
  });

  const updateDevice = () => {
    const width = window.innerWidth;
    const screenWidth = window.screen.width;
    const ua = navigator.userAgent.toLowerCase();

    const isMobile = width <= 767;
    const isTablet = width > 767 && width <= 1024;

    // Heuristic: nếu dùng macbook hoặc laptop, thường screen width < 1600
    const isLaptop =
      !isMobile &&
      !isTablet &&
      screenWidth <= 1600 &&
      (ua.includes("macintosh") || ua.includes("windows"));

    const isMonitor = !isMobile && !isTablet && !isLaptop && screenWidth > 1600;

    setDevice({ isMobile, isTablet, isLaptop, isMonitor });
  };

  useEffect(() => {
    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => window.removeEventListener("resize", updateDevice);
  }, []);

  return device;
};
