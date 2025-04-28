import React, { useState, useRef } from "react";
import styled from "styled-components";

const Login = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    console.log(name);
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <UpperDiv>
      <Heading>Globetrotter</Heading>
      <SubHeading>Guess the places around the world</SubHeading>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormLabel>
          <LabelSpan>Email</LabelSpan>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your email?"
          />
        </FormLabel>
        <FormLabel>
          <LabelSpan>Password</LabelSpan>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="What's your password?"
          />
        </FormLabel>
        <ButtonContainer>
          <SubmitButton type="submit">
            {loading ? "loading..." : "Login"}
          </SubmitButton>
        </ButtonContainer>
      </Form>
    </UpperDiv>
  );
};

const UpperDiv = styled.div`
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.div`
  width: 100%;
  text-align: center;
  font-size: 50px;
  padding: 10px;
  color: white;
  font-family: "Pacifico", cursive;
  font-weight: 400;
  font-style: normal;
`;
const SubHeading = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: white;
`;

const Form = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 30px;
`;

const LabelSpan = styled.span`
  color: white;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 1.5rem 1.5rem;
  color: black;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  font-weight: 500;

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 1rem;
  width: 200px;
  border-radius: 0.75rem;
  outline: none;
  color: black;
  font-size: 20px;
  cursor: pointer;
`;

export default Login;
