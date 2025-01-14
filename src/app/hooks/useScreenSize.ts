'use client'; // Marca este archivo como un Client Component

import { useState, useEffect } from "react";

/**
 * Hook personalizado para obtener el tamaño de la pantalla (ancho y alto).
 * 
 * @returns {Object} Un objeto que contiene el ancho (`width`) y el alto (`height`) de la pantalla.
 */
const useScreenSize = () => {
  // Estado para almacenar el ancho y alto de la pantalla
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Función para manejar el cambio de tamaño de la pantalla
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    // Establecer el tamaño inicial de la pantalla
    handleResize();

    // Escuchar el evento de cambio de tamaño de la pantalla
    window.addEventListener("resize", handleResize);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // El efecto solo se ejecuta una vez al montar el componente

  // Retornar el ancho y alto de la pantalla
  return { width, height };
};

export default useScreenSize;