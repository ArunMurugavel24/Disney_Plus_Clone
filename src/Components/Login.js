import React, { useState } from 'react';
import styled from 'styled-components';
import bgimg from '../Assets/images/login-background.jpg';
import ctaimg1 from '../Assets/images/cta-logo-one.svg';
import ctaimg2 from '../Assets/images/cta-logo-two.png';
import { auth, provider } from '../firebase';
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setSignOut,
} from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const [result, setResult] = useState();
  const history = useHistory();
  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      let user = result.user;
      setResult(user.photoURL);
      dispatch(
        setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      history.push('/');
    });
  };
  return (
    <Container>
      <CTA>
        <CTALogo1 src={ctaimg1} />
        <Signup onClick={signIn}>Get All There</Signup>
        <Description>
          Get Premier Access to Raya and the Last Dragon for an additional fee
          with a Disney+ subscription. As of 03/26/21, the price of Disney+ and
          The Disney Bundle will increase by $1.
        </Description>
        <CTALogo2 src={ctaimg2} />
      </CTA>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  position: relative;
  height: calc(100vh - 70px);
  display: flex;
  align-items: top;
  justify-content: center;
  &:before {
    position: absolute;
    top: 0;
    bottom: 0;
    content: '';
    left: 0;
    right: 0;
    opacity: 0.7;
    z-index: -1;
    background-image: url(${bgimg});
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const CTA = styled.div`
  max-width: 650px;
  padding: 80px 40px;
  width: 90%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CTALogo1 = styled.img``;

const Signup = styled.a`
  width: 100%;
  background-color: #0063e5;
  font-weight: bold;
  text-align: center;
  padding: 17px 0;
  font-size: 18px;
  color: #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 1.5px;
  transition: all 250ms;
  margin-top: 8px;
  margin-bottom: 12px;
  &:hover {
    background: #0483ee;
  }
`;

const Description = styled.p`
  font-size: 11px;
  letter-spacing: 1.5px;
  text-align: center;
  line-height: 1.5;
`;

const CTALogo2 = styled.img`
  width: 90%;
`;
