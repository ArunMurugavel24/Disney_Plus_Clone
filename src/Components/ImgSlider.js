import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider1 from '../Assets/images/slider-badging.jpg';
import Slider2 from '../Assets/images/slider-badag.jpg';
import Slider3 from '../Assets/images/slider-scales.jpg';
import Slider4 from '../Assets/images/slider-scale.jpg';

function ImgSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousal {...settings}>
      <Wrap>
        <img src={Slider1} />
      </Wrap>
      <Wrap>
        <img src={Slider2} />
      </Wrap>
      <Wrap>
        <img src={Slider3} />
      </Wrap>
      <Wrap>
        <img src={Slider4} />
      </Wrap>
    </Carousal>
  );
}

export default ImgSlider;

const Carousal = styled(Slider)`
  margin-top: 20px;
  .slick-list {
    overflow: visible;
  }
  li.slick-active button::before {
    color: white;
  }
  ul li button {
    &:before {
      font-size: 8px;
      color: rgb(150, 150, 171);
    }
  }
  button {
    z-index: 1;
  }
`;
const Wrap = styled.div`
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    border: 4px solid transparent;
    transition-duration: 300ms;
    &:hover {
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }
`;
