"use client";
import Image from "next/image";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

import GithubIconSvg from "/public/img/github.svg";
import AndroidIconSvg from "/public/img/android.svg";

export default function Home() {
  return (
    <Main>
      <Logo src="/img/logo.svg" alt="Logo" width={150} height={150} />
      <Title>CY Gemma Server</Title>

      <ButtonGroup>
        <ActionButton href="https://github.com/reinskywalker/cyber-ai-assistant" label="Get the app">
          <AndroidIcon />
        </ActionButton>
        <ActionButton href="https://github.com/reinskywalker/cy-gemma-server" label="Explore this code">
          <GitHubIcon />
        </ActionButton>
      </ButtonGroup>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Logo = styled(Image)`
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const textPulse = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Title = styled.h1`
  background: linear-gradient(-45deg, #2592cc, #e7e1dd);
  background-size: 300%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: 2.5em;
  font-weight: 500;
  animation: ${textPulse} 5s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 1.8em;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #2592cc;
  color: #ffffff;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 1em;
  transition: background 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #1e7bb4;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const IconWrapper = styled.span`
  margin-left: 10px;
  display: inline-flex;
`;

const GitHubIcon = () => (
  <IconWrapper>
    <Image src={GithubIconSvg} alt="GitHub Icon" width={20} height={20} />
  </IconWrapper>
);

const AndroidIcon = () => (
  <IconWrapper>
    <Image src={AndroidIconSvg} alt="Android Icon" width={20} height={20} />
  </IconWrapper>
);

const ActionButton = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <Link href={href} passHref legacyBehavior>
    <StyledButton target="_blank" rel="noopener noreferrer">
      {label}
      {children}
    </StyledButton>
  </Link>
);
