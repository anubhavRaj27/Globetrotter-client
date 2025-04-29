import styled, { keyframes } from "styled-components";

export const UpperDiv = styled.div`
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const Heading = styled.div`
  width: 100%;
  text-align: center;
  font-size: 50px;
  padding: 10px;
  color: white;
  font-family: "Pacifico", cursive;
  font-weight: 400;
  font-style: normal;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;
export const SubHeading = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: white;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  gap: 10px;
`;

export const LabelSpan = styled.span`
  color: white;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 1rem 1rem;
  color: black;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  font-weight: 500;

  &::placeholder {
    color: #9ca3af;
  }

  
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;

export const GeneralErrorContainer = styled(ButtonContainer)`
  height: 2rem;
`;

export const SubmitButton = styled.button`
  background: #daebe3;
  padding: 1rem;
  width: 200px;
  border-radius: 10px;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
  border: 0px;
`;

export const NavigateContainer = styled.div`
  margin-top: 20px;
  font-size: 12px;
  color: white;
  gap: 4px;
  cursor: pointer;
`;

export const ErrorContainer = styled.span`
  color: red;
  font-size: 12px;
`;

export const shimmer = keyframes`
  0% {
    background-position: -150% 0;
  }
  50% {
    background-position: 150% 0;
  }
  100% {
    background-position: 250% 0;
  }
`;

export const ShimmerBox = styled.div`
  width: ${({ w = "100%" }) => w};
  height: ${({ h = "5rem" }) => h};
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.06) 25%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.06) 75%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 3.2s linear infinite;
`;
