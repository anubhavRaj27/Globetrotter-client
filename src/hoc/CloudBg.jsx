// VantaLayout.jsx  (React 19 / Vite)
import { Outlet } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import * as THREE from 'three';
import styled from 'styled-components';

const VantaLayout = () => {
  const bgRef   = useRef(null);   
  const effect  = useRef(null);   

  useEffect(() => {
    if (!effect.current) {
      effect.current = CLOUDS({
        el: bgRef.current,
        THREE,                   
        speed:0.75,
      });
    }
    return () => {             
      effect.current?.destroy();
      effect.current = null;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      effect.current?.resize();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container ref={bgRef}>
      <Outlet />
    </Container>
  );
};

const Container = styled.div`         
  overflow: auto;
  height: 100vh;
`;

export default VantaLayout;
