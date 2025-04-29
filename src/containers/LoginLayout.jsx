import React, { useEffect} from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import EarthCanvas from "../canvas/Earth";
import { slideIn } from "../utils/motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useMediaQuery } from "@uidotdev/usehooks";

const LoginLayout = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, []);

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
  height: 100vh;
  overflow: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const MotionFormContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: #213555;
  padding: 2rem;
  border-radius: 1rem;
  min-width: 40vw;

  @media (max-width: 768px) {
    min-width: 90vw;
    padding: 1.5rem;
  }
`;

const MotionCanvasContainer = styled(motion.div)`
  height: 700px;
  width: 100%;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

export default LoginLayout;
