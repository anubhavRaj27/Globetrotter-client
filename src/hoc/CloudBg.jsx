// VantaLayout.jsx
import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import styled from 'styled-components';

const CloudBg = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(CLOUDS({ el: bgRef.current }));
    }
    return () => vantaEffect?.destroy();
  }, [vantaEffect]);

  return (
    <Container ref={bgRef}>
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default CloudBg;
