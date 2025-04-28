import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { getApiUrl } from "../utils/config";
import { createAccount } from "../api";

const Register = () => {
  getApiUrl();
  const formRef = useRef();
  const [form, setForm] = useState({
    email: "",
    password: "",
    userName: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log('here');
    e.preventDefault();
    const userId = await createAccount(form.email,form.password,form.userName);
    console.log(userId);
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
            placeholder="Set a secure password!"
          />
        </FormLabel>
        <FormLabel>
          <LabelSpan>User Name</LabelSpan>
          <Input
            type="text"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            placeholder="Create a creative user name!"
          />
        </FormLabel>
        <ButtonContainer>
          <SubmitButton type="submit" >
            {loading ? "loading..." : "Create"}
          </SubmitButton>
        </ButtonContainer>
      </Form>
      <NavigateContainer onClick={()=>navigate("/login")}>
        Already have an account? Login.
      </NavigateContainer>
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
padding-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  margin-bottom: 10px;
`;

const LabelSpan = styled.span`
  color: white;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Input = styled.input`
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

const NavigateContainer = styled.div`
margin-top: 20px;
    font-size: 10px;
    color: white;
    gap: 4px;
    cursor: pointer;
`;

export default Register;
