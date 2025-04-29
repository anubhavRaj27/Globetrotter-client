import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getRandomCity,
  getCity,
  getAnswer,
  updateUserDb,
  resetUser,
} from "../api";
import { setLogin, updateUser, updateUserCities } from "../slices/authSlice";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";
import InviteModal from "./InviteModal";
import { useToast } from "./ToastProvider";
import { ShimmerBox } from "../styles/login";
import { useNavigate } from "react-router";

const Game = () => {
  const user = useSelector((state) => state.auth.user);
  const [current, setCurrent] = useState(0);
  const [correct, setCorrect] = useState(user.correct);
  const [incorrect, setIncorrect] = useState(user.incorrect);
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const { width, height } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      (async () => {
        let city = null;
        if (!user.currentCityId) {
          city = await getNextCity();
        } else {
          city = await getCurrentCity(user.currentCityId);
        }
        city && setCurrent(city);
      })();
    }
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const fade = setTimeout(() => setFadingOut(true), 4500);
      const done = setTimeout(() => setShowConfetti(false), 5200);

      return () => {
        clearTimeout(fade);
        clearTimeout(done);
      };
    }
  }, [showConfetti]);

  const triggerConfetti = () => {
    setFadingOut(false);
    setShowConfetti(true);
  };

  const getNextCity = async () => {
    setLoading(true);
    try {
      const city = await getRandomCity(user?.userId);
      dispatch(updateUserCities(city.cityId));
      return city;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentCity = async (cityId) => {
    setLoading(true);
    try {
      const city = await getCity(cityId);
      setCurrent(city);
      return city;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getRandomInt = (n) => {
    return Math.floor(Math.random() * n);
  };

  const handleAnswer = async (option) => {
    setLoading(true);
    try {
      const correctAnswer = await getAnswer(option, current.cityId);
      const updatedUserTemp = correctAnswer
        ? { ...user, correct: correct + 1 }
        : { ...user, incorrect: incorrect + 1 };
      const updatedUserResponse = await updateUserDb(
        user.userId,
        updatedUserTemp
      );
      dispatch(updateUser(updatedUserResponse));
      if (correctAnswer) {
        setCorrect((prev) => prev + 1);
        setFeedback(
          `🎉 Correct! Fun Fact: ${current.fun_fact[getRandomInt(2)]}`
        );
        triggerConfetti();
      } else {
        setIncorrect((prev) => prev + 1);
        setFeedback(`😢 Oops! Trivia: ${current.trivia[getRandomInt(2)]}`);
      }
    } catch (e) {
      toast.error("Had some problem in retrieving answer, Please try again");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    try {
      setShowConfetti(false);
      setFeedback("");
      const city = await getNextCity();
      setCurrent(city);
    } catch (e) {
      toast.error("Had some problem in retrieving question, Please try again");
      console.error(e);
    }
  };

  const handleReset = async () => {
    try {
      const updatedUser = await resetUser(user.userId);
      dispatch(updateUser(updatedUser));
      setCorrect(0);
      setIncorrect(0);
      handleNext();
    } catch (e) {
      toast.error("Had some problem in reseting the user, Please try again");
      console.error(e);
    }
  };

  const handleLogout = () => {
    dispatch(setLogin({user:null, token: null}));
    navigate('/login');
  }

  return (
    <OuterContainer>
      <GameContainer>
        {showConfetti && (
          <Confetti
            width={width ?? 0}
            height={height ?? 0}
            numberOfPieces={300}
            recycle={false}
            tweenDuration={6000}
            style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              transition: "opacity 0.7s ease-out",
              opacity: fadingOut ? 0 : 1,
            }}
          />
        )}
        <HeaderContainer>
          <Title>Globetrotter</Title>
          <Subtitle>The Ultimate Travel Guessing Game!</Subtitle>
        </HeaderContainer>

        <Section>
          {loading ? (
            <ShimmerBox h="5rem" />
          ) : (
            current && (
              <Clue>
                {current?.clues[getRandomInt(current?.clues?.length - 1)]}
              </Clue>
            )
          )}
        </Section>
        <Section>
          {feedback ? (
            <FeedbackContainer>
              {" "}
              <div>{feedback}</div>{" "}
            </FeedbackContainer>
          ) : loading ? (
            <OptionsContainer>
              {Array.from({ length: 4 }).map((_, i) => (
                <ShimmerBox key={i} h="3.5rem" />
              ))}
            </OptionsContainer>
          ) : (
            current && (
              <OptionsContainer>
                {current.options.map((option) => (
                  <GameButtons
                    key={option}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </GameButtons>
                ))}
              </OptionsContainer>
            )
          )}
        </Section>

        <Section>
          <SpaceAroundContainer>
            <PointsContainer>Correct: {correct}</PointsContainer>
            <PointsContainer>Incorrect: {incorrect}</PointsContainer>
          </SpaceAroundContainer>
        </Section>

        <SpaceAroundContainer>
          <NextButton
            onClick={() => {
              setOpen(true);
            }}
          >
            Invite
          </NextButton>
          <NextButton
            onClick={() => {
              feedback ? handleNext() : handleReset();
            }}
            disabled={loading}
          >
            {feedback ? "Next" : "Reset"}
          </NextButton>
        </SpaceAroundContainer>
        <InviteModal
          isOpen={open}
          onClose={() => setOpen(false)}
        />

        <Footer>
          <Logout onClick={handleLogout} >Logout</Logout>
          <p>Globetrotter &copy; 2025</p>
        </Footer>
      </GameContainer>
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 2rem;
  gap: 2.5rem;
  position: relative;
  z-index: 1;
`;

const GameContainer = styled.div`
  margin: 0;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background-color: #213555;
  padding: 2rem;
  border-radius: 1rem;
  width: 500px;
  height: 95vh;
  overflow-y: scroll;
  position: relative;
`;

const HeaderContainer = styled.header`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
`;

const Title = styled.div`
  font-family: "Pacifico", cursive;
  font-size: 4rem;
`;

const Subtitle = styled.div`
  font-size: 1rem;
`;

const Section = styled.section`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  text-align: center;
`;

const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  gap: 10px;
`;

const FeedbackContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  height: 7rem;
  overflow: scroll;
`;

const SpaceAroundContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const PointsContainer = styled.div`
  font-size: 1.5rem;
`;

const GameButtons = styled.button`
  background: #daebe3;
  color: #333;
  border: none;
  border-radius: 10px;
  padding: 20px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
`;

const Clue = styled.p`
  font-size: 1.5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`;

const NextButton = styled.button`
  background: #daebe3;
  border: none;
  border-radius: 10px;
  padding: 1rem;
  width: 40%;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
`;

const Footer = styled.footer`
  margin-top: auto;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.7;
  position: absolute;
  bottom: 20px;
`;

const Logout = styled.span`
  cursor: pointer;
`;

export default Game;
