import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../api";
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

const Login = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    general: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
      email: !form.email.trim() ? "Email is required" : "",
      password: !form.password.trim() ? "Password is required" : "",
    };
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;
    try {
      setLoading(true);
      const loggedIn = await loginUser(form.email, form.password);
      if (loggedIn.user) {
        dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      setErrors((prev) => {
        return { ...prev, general: e.message };
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
            placeholder="What's your password?"
          />
          {errors.password && (
            <ErrorContainer>{errors.password}</ErrorContainer>
          )}
        </FormLabel>
        <ButtonContainer>
          {errors.general && <ErrorContainer>{errors.general}</ErrorContainer>}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#213555" size={20} /> : "Login"}
          </SubmitButton>
        </ButtonContainer>
      </Form>
      <NavigateContainer onClick={() => navigate("/register")}>
        Dont have an Account? Create One.
      </NavigateContainer>
    </UpperDiv>
  );
};

export default Login;
