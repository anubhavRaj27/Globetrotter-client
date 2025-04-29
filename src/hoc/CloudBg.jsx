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

  return (
    <Container ref={bgRef}>
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;

export default VantaLayout;
