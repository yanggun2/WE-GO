import meter1 from "../images/meter1.svg";
import meter2 from "../images/meter2.svg";
import meter3 from "../images/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import perment from '../images/perment.jpg';
import jj from '../images/jj.jpg';
import pieces from '../images/pieces.jpg';
import ssl from '../images/ssl.jpg';
import arrow2 from "../images/arrow2.svg";
// import colorSharp from "../images/color-sharp.png"

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>오늘, 커피 한 잔 어때요?</h2>
                        <p>바쁜 일상 속, 잠시 쉬어가고 싶은 순간이 있나요?<br></br> 숨겨진 골목에서 만나는 따뜻함, 향긋한 커피향☕
                        </p>
                        {/* <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5>Web Development</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Image" />
                                <h5>Brand Identity</h5>
                            </div>
                            <div className="item">
                                <img src={meter3} alt="Image" />
                                <h5>Logo Design</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5>Web Development</h5>
                            </div>
                        </Carousel> */}
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
  <div className="item">
    <div className="overlay-container">
    <img src={perment} alt="Image" />
      <div className="overlay">
        <h6>'서울숲' 데이트 장소 <br></br>카페 모음집</h6>
      </div>
    </div>
  </div>
  <div className="item">
    <div className="overlay-container">
      <img src={jj} alt="Image" />
      <div className="overlay">
        <h6>경주여행에 필요한 <br></br>카페 지도 5곳</h6>
      </div>
    </div>
  </div>
  <div className="item">
    <div className="overlay-container">
      <img src={pieces} alt="Image" />
      <div className="overlay">
        <h6>연희동에서 보내는 하루<br></br>(카페 편)</h6>
      </div>
    </div>
  </div>
  <div className="item">
    <div className="overlay-container">
      <img src={ssl} alt="Image" />
      <div className="overlay">
        <h6>언제가도 좋은<br></br>은평구 카페 5곳</h6>
      </div>
    </div>
  </div>
</Carousel>

                    </div>
                </div>
            </div>
        </div>
        {/* <img className="background-image-left" src={colorSharp} alt="Image" /> */}
    </section>
  )
}