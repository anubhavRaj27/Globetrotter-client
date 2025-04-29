import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getRandomCity, getCity, getAnswer, updateUserDb } from "../api";
import { updateUser, updateUserCities } from "../slices/authSlice";

const Game = () => {
  const user = useSelector((state) => state.auth.user);
  const [current, setCurrent] = useState(0);
  const [correct, setCorrect] = useState(user.correct);
  const [incorrect, setIncorrect] = useState(user.incorrect);
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (user) {
      (async () => {
        let city = null;
        if (!user.currentCityId ) {
          city = await getNextCity();
        } else {
          city = await getCurrentCity(user.currentCityId);
        }
        city && setCurrent(city);
      })();
    }
  }, []);

  const getNextCity = async () => {
    try {
      const city = await getRandomCity(user?.userId);
      dispatch(updateUserCities(city.cityId));
      return city;
    } catch (e) {
      console.error(e);
    }
  };

  const getCurrentCity = async (cityId) => {
    try {
      const city = await getCity(cityId);
      setCurrent(city);
      return city;
    } catch (e) {
      console.error(e);
    }
  };

  const getRandomInt = (n) => {
    return Math.floor(Math.random() * n);
  };

  const handleAnswer = async (option) => {
    const correctAnswer = await getAnswer(option,current.cityId);
    const updatedUserTemp = correctAnswer ? {...user,correct: correct+1} : {...user, incorrect: incorrect+1};
    const updatedUserResponse = await updateUserDb(user.userId, updatedUserTemp);
    dispatch(updateUser(updatedUserResponse));
    if (correctAnswer) {
      setCorrect((prev)=>prev+1);
      setFeedback(`🎉 Correct! Fun Fact: ${current.fun_fact[getRandomInt(2)]}`);
      setShowConfetti(true);
    } else {
      setIncorrect((prev)=>prev+1);
      setFeedback(`😢 Oops! Fun Fact: ${current.fun_fact[getRandomInt(2)]}`);
      setShowConfetti(false);
    }
  };

  const handleNext = async () => {
    setShowConfetti(false);
    setFeedback("");
    const city = await getNextCity();
    setCurrent(city);
  };

  return (
    <OuterContainer>
      <GameContainer>
        <HeaderContainer>
          <Title>Globetrotter</Title>
          <Subtitle>Guess the Destination from the Clues!</Subtitle>
        </HeaderContainer>

        <Section>
          {current && (
            <Clue style={styles.clue}>
              {current?.clues[getRandomInt(current?.clues?.length - 1)]}
            </Clue>
          )}
        </Section>

        <OptionsContainer>
          {feedback ? (
            <div style={styles.feedback}>{feedback}</div>
          ) : (
            current &&
            current.options.map((option) => (
              <GameButtons key={option} onClick={() => handleAnswer(option)}>
                {option}
              </GameButtons>
            ))
          )}
        </OptionsContainer>

        <Section>
          <div style={styles.score}>Score: {correct}</div>
        </Section>

        <Section>
          {feedback && (
            <button style={styles.nextButton} onClick={handleNext}>
              Play Again / Next
            </button>
          )}
        </Section>

        <footer style={styles.footer}>
          <p>Globetrotter &copy; 2025</p>
        </footer>
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
  gap: 2rem;
  background-color: #213555;
  padding: 2rem;
  border-radius: 1rem;
  width: 500px;
  height: 90vh;
  overflow-y: scroll;
`;

const HeaderContainer = styled.header`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
`;

const Title = styled.div`
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

const OptionsContainer = styled(Section)`
  display: ${({ $feedback }) => ($feedback ? "flex" : "grid")};
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  gap: 10px;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const GameButtons = styled.button`
  background: #ffdd57;
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
`;

const styles = {
  button: {
    background: "#ffdd57",
    color: "#333",
    border: "none",
    borderRadius: 10,
    padding: "10px 20px",
    margin: 10,
    cursor: "pointer",
    fontSize: "1rem",
    transition: "0.3s",
  },
  feedback: {
    fontSize: "1.2rem",
    minHeight: 50,
  },
  score: {
    fontWeight: "bold",
    fontSize: "1.3rem",
  },
  nextButton: {
    background: "#28a745",
    border: "none",
    borderRadius: 10,
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: 10,
    transition: "0.3s",
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    fontSize: "0.9rem",
    opacity: 0.7,
  },
};

export default Game;
