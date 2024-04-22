import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";

const Register = ({ isAuthenticated, setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAvatar("");
      setIsAuthenticated(true);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <StyledContainer>

      <StyledForm onSubmit={handleRegister}>
        
        <Title>REGISTER</Title>

        <FormGroup controlId="name">
          <FormLabel>Name</FormLabel>
          <StyledInput
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <StyledInput
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="phone">
          <FormLabel>Phone Number</FormLabel>
          <StyledInput
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <PasswordInputContainer>
            <StyledInput
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordToggleButton
              type="button"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "Hide" : "Show"}
            </PasswordToggleButton>
          </PasswordInputContainer>
        </FormGroup>

        <FormGroup controlId="avatar">
          <FormLabel>Avatar</FormLabel>
          <StyledInput type="file" onChange={avatarHandler} />
        </FormGroup>

        <FormGroup>
          <FormLabel>
            Already Registered? <StyledLink to={"/login"}>LOGIN</StyledLink>
          </FormLabel>
        </FormGroup>

        <StyledButton variant="warning" type="submit">
          Submit
        </StyledButton>


      </StyledForm>
    </StyledContainer>
  );
};

export default Register;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 630px;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const Title = styled.h3`
  text-align: center;
`;

const FormGroup = styled(Form.Group)`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled(Form.Label)`
  display: block;
`;

const StyledInput = styled(Form.Control)`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const PasswordInputContainer = styled.div`
  position: relative;
`;

const PasswordToggleButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  color: #007bff;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

