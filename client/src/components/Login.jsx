import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import styled from "styled-components";

function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      
      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <LoginForm>
      <FormContainer onSubmit={handleLogin}>
        <Title>LOGIN</Title>
        <FormGroup>
          <Label>Email address</Label>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SmallText>We'll never share your email with anyone else.</SmallText>
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <div style={{ position: "relative" }}>
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordToggle type="button" onClick={togglePasswordVisibility}>
              {passwordVisible ? "Hide" : "Show"}
            </PasswordToggle>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>
            Not Registered? <Link to={"/register"}>REGISTER NOW</Link>
          </Label>
        </FormGroup>

        <StyledButton variant="warning" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </StyledButton>

      </FormContainer>
    </LoginForm>
  );
}

export default Login;









const LoginForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  padding: 20px;
`;

const StyledButton = styled.button`
  background-color: ${(props) => (props.variant === "warning" ? "#ffc107" : "#007bff")};
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.variant === "warning" ? "#ffca28" : "#0056b3")};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;



const FormContainer = styled.form`
  width: 100%;
`;

const Title = styled.h3`
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
`;

const SmallText = styled.small`
  display: block;
`;

const PasswordToggle = styled.button`
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

