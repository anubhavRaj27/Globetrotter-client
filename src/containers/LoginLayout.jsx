import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import EarthCanvas from "../canvas/Earth";
import { slideIn } from "../utils/motion";

const LoginLayout = ({children}) => {

  return (
    <OuterDiv>
      <MotionFormContainer
        variants={slideIn("left", "tween", 0.2, 0.5)}
        initial="hidden"
        animate="show"
      >
        {children}
      </MotionFormContainer>

      <MotionCanvasContainer
        variants={slideIn("right", "tween", 0.2, 0.5)}
        initial="hidden"
        animate="show"
      >
        <EarthCanvas />
      </MotionCanvasContainer>
    </OuterDiv>
  );
};

const OuterDiv = styled.div`
  display: flex;
  padding: 2rem;
  gap: 2.5rem;
  position: relative;
  z-index: 1;
`;

const MotionFormContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: #213555;
  padding: 2rem;
  border-radius: 1rem;
  min-width: 40vw;
`;

const MotionCanvasContainer = styled(motion.div)`
  height: 700px;
  width: 100%;
`;

export default LoginLayout;
