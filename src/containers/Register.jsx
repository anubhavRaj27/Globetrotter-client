import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { createAccount, loginUser } from "../api";
import { useDispatch } from "react-redux";
import { setLogin } from "../slices/authSlice";
import {
  UpperDiv,
  Heading,
  SubHeading,
  Form,
  FormLabel,
  LabelSpan,
  Input,
  ButtonContainer,
  SubmitButton,
  NavigateContainer,
  ErrorContainer,
} from "../styles/login.js";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [errors, setErrors] = useState({
    general: "",
    email: "",
    password: "",
    userName: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setForm({ ...form, [name]: value });
    if (errors.general || errors[name]) setErrors({ ...errors, [name]: "", general: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      ...errors,
      email: !form.email.trim() ? "Email is required" : "",
      password: !form.password.trim() ? "Password is required" : "",
      userName: !form.userName.trim() ? "Username is required" : "",
    };
    setErrors(newErrors);
    if (newErrors.email || newErrors.password || newErrors.userName) return;
    try {
      setLoading(true);
      const userId = await createAccount(
        form.email,
        form.password,
        form.userName
      );
      if (userId) {
        const loggedIn = await loginUser(form.email, form.password);
        if (loggedIn.user) {
          dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err);
      setErrors((prev) => {
        return { ...prev, general: err.message };
      });
    } finally {
      setLoading(false);
    }
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
          {errors.email && <ErrorContainer>{errors.email}</ErrorContainer>}
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
          {errors.password && (
            <ErrorContainer>{errors.password}</ErrorContainer>
          )}
        </FormLabel>
        <FormLabel>
          <LabelSpan>Username</LabelSpan>
          <Input
            type="text"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            placeholder="Create a creative user name!"
          />
          {errors.userName && (
            <ErrorContainer>{errors.userName}</ErrorContainer>
          )}
        </FormLabel>

        <ButtonContainer>
        {errors.general && (
            <ErrorContainer>{errors.general}</ErrorContainer>
        )}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#213555" size={20} /> : "Create"}
          </SubmitButton>
        </ButtonContainer>
      </Form>
      <NavigateContainer onClick={() => navigate("/login")}>
        Already have an account? Login.
      </NavigateContainer>
    </UpperDiv>
  );
};

export default Register;
