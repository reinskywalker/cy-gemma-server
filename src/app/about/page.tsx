"use client";
import Image from 'next/image';
import Link from 'next/link';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import React, { useState } from 'react';

const lightTheme = {
  background: '#ffffff',
  text: '#111',
  button: '#2592cc',
};

const darkTheme = {
  background: '#111111',
  text: '#ffffff',
  button: '#2592cc',
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props: any) => props.theme.background};
    color: ${(props: any) => props.theme.text};
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Navbar>
        <LogoText href="/">Cy Gemma</LogoText>
        <NavLinks>
          <StyledLink href="/">Home</StyledLink>
          <StyledLink href="/about">About</StyledLink>
          <ContributeButton href="https://github.com/reinskywalker/cyber-ai-assistant" target="_blank">
            Contribute
          </ContributeButton>
          <ToggleButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
          </ToggleButton>
        </NavLinks>
      </Navbar>

      <MainContent>
        {/* <ResponsiveImage src="/img/logo.svg" alt="Logo" width={150} height={150} /> */}
        <AnimatedGradientText>Cy Gemma Server</AnimatedGradientText>

        <IntroBlock>
          <h1>Andre Reynaldi Lusikooy</h1>
          <p>Fullstack Engineer | SDET | Automation & AI Enthusiast</p>
          <CenteredImageWrapper>
            <ProfileImage src="/img/persona.svg" alt="Reinskywalker Avatar" width={180} height={180} />
          </CenteredImageWrapper>
        </IntroBlock>

        <ButtonRow>
          <ButtonLink href="#" target="_blank">
            <Button>Get the app <AndroidIcon /></Button>
          </ButtonLink>
          <ButtonLink href="https://github.com/reinskywalker/cyber-ai-assistant" target="_blank">
            <Button>Explore code <GitHubIcon /></Button>
          </ButtonLink>
        </ButtonRow>
      </MainContent>
    </ThemeProvider>
  );
}

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: #1a1a1a;
`;

const LogoText = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2592cc;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ContributeButton = styled.a`
  padding: 6px 14px;
  border-radius: 6px;
  background-color: #2592cc;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    background-color: #1e78aa;
  }
`;

const ToggleButton = styled.button`
  margin-left: 10px;
  font-size: 1.2rem;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
`;

const AnimatedGradientText = styled.div`
  display: inline-block;
  background: -webkit-linear-gradient(-45deg, #2592cc, #e7e1dd);
  background-size: 300%;
  font-size: 2.5em;
  font-weight: 500;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: animated_text 5s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 1.8em;
  }

  @keyframes animated_text {
    0% { background-position: 0px 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0px 50%; }
  }
`;

const IntroBlock = styled.div`
  margin-top: 30px;

  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: gray;
  }
`;

const CenteredImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

const ButtonRow = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2592cc;
  color: #fff;
  border: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 1em;
  border-radius: 8px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #1e78aa;
  }
`;

const IconStyle = styled.span`
  margin-left: 10px;
`;

const ResponsiveImage = styled(Image)`
  @media (max-width: 768px) {
    width: 100px; 
    height: 100px; 
  }
`;

const GitHubIcon = () => (
  <IconStyle>
    <Image src="/img/github.svg" alt="GitHub Icon" width={20} height={20} />
  </IconStyle>
);

const AndroidIcon = () => (
  <IconStyle>
    <Image src="/img/android.svg" alt="Android Icon" width={20} height={20} />
  </IconStyle>
);
