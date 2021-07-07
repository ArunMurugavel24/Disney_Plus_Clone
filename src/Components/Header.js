import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import Disney from '../Assets/images/logo.svg';
import HomeIcon from '../Assets/images/home-icon.svg';
import SearchIcon from '../Assets/images/search-icon.svg';
import WatchlistIcon from '../Assets/images/watchlist-icon.svg';
import OriginalIcon from '../Assets/images/original-icon.svg';
import MovieIcon from '../Assets/images/movie-icon.svg';
import SeriesIcon from '../Assets/images/series-icon.svg';
import Avatar from '../Assets/images/Avatar.png';
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setSignOut,
} from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { auth, provider } from '../firebase';

function Header() {
  const history = useHistory();
  const [result, setResult] = useState();
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push('/');
      }
    });
  }, []);
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
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push('/login');
    });
  };
  return (
    <Nav>
      <Link to='/'>
        <Logo src={Disney} />
      </Link>
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a href=''>
              <img src={HomeIcon} />
              <span>HOME</span>
            </a>
            <a href=''>
              <img src={SearchIcon} />
              <span>SEARCH</span>
            </a>
            <a href=''>
              <img src={WatchlistIcon} />
              <span>WATCHLIST</span>
            </a>
            <a href=''>
              <img src={OriginalIcon} />
              <span>ORIGINALS</span>
            </a>
            <a href=''>
              <img src={MovieIcon} />
              <span>MOVIES</span>
            </a>
            <a href=''>
              <img src={SeriesIcon} />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg onClick={signOut} src={result} />
        </>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  height: 70px;
  background-color: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  justify-content: left;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    text-decoration: none;
    color: white;
    img {
      height: 20px;
    }
    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;
      &:after {
        content: '';
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transform: scaleX(0.5);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }
    &:hover {
      span: after {
        transfrom: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease 0s;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
