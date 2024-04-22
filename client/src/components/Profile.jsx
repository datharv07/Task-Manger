import React from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";

const Profile = ({ user, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <StyledContainer>
      <Heading>PROFILE</Heading>
      {user && (
        <ProfileInfo>
          <AvatarImage src={user.avatar && user.avatar.url} alt="avatar" />
          <InfoGroup>
            <InfoLabel>NAME:</InfoLabel>
            <InfoText>{user.name}</InfoText>
          </InfoGroup>
          <InfoGroup>
            <InfoLabel>EMAIL:</InfoLabel>
            <InfoText>{user.email}</InfoText>
          </InfoGroup>
          <InfoGroup>
            <InfoLabel>PHONE:</InfoLabel>
            <InfoText>{user.phone}</InfoText>
          </InfoGroup>
        </ProfileInfo>
      )}
    </StyledContainer>

  );
};

export default Profile;


const StyledContainer = styled.div`
  margin-top: 50px;
  text-align: center;
  background: linear-gradient(135deg, #1e2124 0%, #888d92 100%);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  margin-bottom: 30px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-bottom: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const InfoGroup = styled.div`
  margin-bottom: 10px;
`;

const InfoLabel = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
  color: #fff;
`;

const InfoText = styled.p`
  color: #fff;
  font-size: 18px;
`;
