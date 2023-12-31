import React, { Component } from "react";
import { Helmet } from "react-helmet";
import LightboxImage from "../common/lightboxImg";
import Slider from "react-slick";
import "../../sass/Slick-theme.css";
import "../../sass/Slick.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <img loading="lazy" src="/images/design/slick-arrow.svg" alt="" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <img loading="lazy" src="/images/design/slick-arrow.svg" alt="" />
    </div>
  );
}

export default class ModelInfoBlockImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {},
      nav1: null,
      nav2: null,
    };
    this.onImgLoad = this.onImgLoad.bind(this);
  }
  componentDidMount() {
    $(".zoomContainer").remove();
    $("#zoom_01").elevateZoom({ zoomType: "inner" });
    if (this.props.quickPreview) $("#app").addClass("quickPreview");
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }
  componentWillUnmount() {
    $(".zoomContainer").remove();
    $("#app").removeClass("quickPreview");
  }
  componentDidUpdate(nextProps) {
    if (
      nextProps.blockImageState.currentMainImage !==
      this.props.blockImageState.currentMainImage
    ) {
      $(".zoomContainer").remove();
      $("#zoom_01").elevateZoom({ zoomType: "inner" });
    }
  }
  mapRealImg(item, i) {
    let { altTitle } = this.props;
    let className =
      this.props.blockImageState.currentMainImage === item.src
        ? "col-xs-3 modelInfoBlock-img-small active"
        : "col-xs-3 modelInfoBlock-img-small";
    return (
      <div className={className} key={i}>
        <img
          src={item.src}
          onClick={this.props.clickSmallImg}
          alt={`${altTitle} - Teil ${i + 2}`}
        />
      </div>
    );
  }
  onImgLoad({ target: img }) {
    this.setState({
      dimensions: { imgHeight: img.naturalHeight, imgWidth: img.naturalWidth },
    });
  }
  render() {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            infinite: true,
          },
        },
      ],
    };
    const settingsSmallImg = {
      infinite: false,
      speed: 500,
      slidesToScroll: 1,
      swipeToSlide: true,
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      focusOnSelect: true,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            infinite: true,
          },
        },
      ],
    };
    let {
      image,
      clickSmallImg,
      openLightBox,
      closeLightBox,
      blockImageState,
      showDescription,
      altTitle,
      addModelToWishlist,
      productIsAddedToWishlist,
    } = this.props;
    let { imgHeight, imgWidth } = this.state.dimensions;
    let className =
      blockImageState.currentMainImage === image.mainImg.src
        ? "col-xs-3 modelInfoBlock-img-small"
        : "col-xs-3 modelInfoBlock-img-small";

    return (
      <div className="col-md-6 modelInfoBlock-img ">
        {
          <Helmet
            meta={[
              { property: "og:image:width", content: imgWidth },
              { property: "og:image:height", content: imgHeight },
            ]}
          />
        }

        <div className="row imageDetailOnly">
          {image.realImg.length ? (
            <Slider
              asNavFor={this.state.nav2}
              ref={(slider) => (this.slider1 = slider)}
              {...settings}
            >
              {image.realImg.length > 0 &&
                image.realImg.map((el, i) => {
                  return (
                    <div className="item" key={`slider-item${i}`}>
                      <div className="col-md-12 modelInfoBlock-img-big">
                        <img
                          onLoad={this.onImgLoad}
                          onClick={openLightBox}
                          src={el.src}
                          alt={altTitle}
                        />
                        <i
                          className="modelInfoBlock-img-big-searchBtn"
                          onClick={openLightBox}
                          aria-hidden="true"
                        >
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M27.8527 26.5212L20.1089 18.7493C21.8011 16.7076 22.6417 14.0926 22.4562 11.4473C22.2707 8.80207 21.0733 6.32994 19.1128 4.54439C17.1523 2.75885 14.5793 1.79714 11.9283 1.85901C9.27729 1.92089 6.75198 3.0016 4.87691 4.87667C3.00184 6.75173 1.92113 9.27704 1.85926 11.9281C1.79738 14.5791 2.75909 17.1521 4.54464 19.1126C6.33018 21.0731 8.80232 22.2704 11.4476 22.4559C14.0928 22.6414 16.7079 21.8008 18.7496 20.1087L26.4933 27.8524C26.6698 28.029 26.9093 28.1281 27.1589 28.1281C27.4086 28.1281 27.648 28.029 27.8246 27.8524C28.0011 27.6759 28.1003 27.4365 28.1003 27.1868C28.1003 26.9372 28.0011 26.6977 27.8246 26.5212H27.8527ZM3.74955 12.1868C3.74955 10.518 4.2444 8.88672 5.17153 7.49919C6.09865 6.11165 7.41641 5.03019 8.95816 4.39158C10.4999 3.75296 12.1964 3.58587 13.8331 3.91143C15.4698 4.237 16.9733 5.04059 18.1533 6.2206C19.3333 7.4006 20.1369 8.90402 20.4624 10.5407C20.788 12.1774 20.6209 13.8739 19.9823 15.4157C19.3437 16.9575 18.2622 18.2752 16.8747 19.2023C15.4871 20.1295 13.8558 20.6243 12.1871 20.6243C9.94929 20.6243 7.80318 19.7354 6.22084 18.153C4.6385 16.5707 3.74955 14.4246 3.74955 12.1868Z"
                              fill="#BED3CB"
                            />
                            <path
                              d="M15.9375 11.25H13.125V8.4375C13.125 8.18886 13.0262 7.9504 12.8504 7.77459C12.6746 7.59877 12.4361 7.5 12.1875 7.5C11.9389 7.5 11.7004 7.59877 11.5246 7.77459C11.3488 7.9504 11.25 8.18886 11.25 8.4375V11.25H8.4375C8.18886 11.25 7.9504 11.3488 7.77459 11.5246C7.59877 11.7004 7.5 11.9389 7.5 12.1875C7.5 12.4361 7.59877 12.6746 7.77459 12.8504C7.9504 13.0262 8.18886 13.125 8.4375 13.125H11.25V15.9375C11.25 16.1861 11.3488 16.4246 11.5246 16.6004C11.7004 16.7762 11.9389 16.875 12.1875 16.875C12.4361 16.875 12.6746 16.7762 12.8504 16.6004C13.0262 16.4246 13.125 16.1861 13.125 15.9375V13.125H15.9375C16.1861 13.125 16.4246 13.0262 16.6004 12.8504C16.7762 12.6746 16.875 12.4361 16.875 12.1875C16.875 11.9389 16.7762 11.7004 16.6004 11.5246C16.4246 11.3488 16.1861 11.25 15.9375 11.25Z"
                              fill="#BED3CB"
                            />
                          </svg>
                        </i>
                        <i
                          className={
                            productIsAddedToWishlist
                              ? "modelInfoBlock-img-big-wishBtn on"
                              : "modelInfoBlock-img-big-wishBtn"
                          }
                          onClick={(e) => addModelToWishlist(e)}
                        >
                          <svg viewBox="0 0 24 24">
                            <use href="#heart" />
                            <use href="#heart" />
                          </svg>
                          <svg className="hide" viewBox="0 0 24 24">
                            <defs>
                              <path
                                id="heart"
                                d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
                              />
                            </defs>
                          </svg>
                        </i>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          ) : (
            <div className="col-md-12 modelInfoBlock-img-big">
              <img
                onLoad={this.onImgLoad}
                onClick={openLightBox}
                src={image.mainImg.src}
                alt={altTitle}
              />
              <i
                className="modelInfoBlock-img-big-searchBtn"
                onClick={openLightBox}
                aria-hidden="true"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.8527 26.5212L20.1089 18.7493C21.8011 16.7076 22.6417 14.0926 22.4562 11.4473C22.2707 8.80207 21.0733 6.32994 19.1128 4.54439C17.1523 2.75885 14.5793 1.79714 11.9283 1.85901C9.27729 1.92089 6.75198 3.0016 4.87691 4.87667C3.00184 6.75173 1.92113 9.27704 1.85926 11.9281C1.79738 14.5791 2.75909 17.1521 4.54464 19.1126C6.33018 21.0731 8.80232 22.2704 11.4476 22.4559C14.0928 22.6414 16.7079 21.8008 18.7496 20.1087L26.4933 27.8524C26.6698 28.029 26.9093 28.1281 27.1589 28.1281C27.4086 28.1281 27.648 28.029 27.8246 27.8524C28.0011 27.6759 28.1003 27.4365 28.1003 27.1868C28.1003 26.9372 28.0011 26.6977 27.8246 26.5212H27.8527ZM3.74955 12.1868C3.74955 10.518 4.2444 8.88672 5.17153 7.49919C6.09865 6.11165 7.41641 5.03019 8.95816 4.39158C10.4999 3.75296 12.1964 3.58587 13.8331 3.91143C15.4698 4.237 16.9733 5.04059 18.1533 6.2206C19.3333 7.4006 20.1369 8.90402 20.4624 10.5407C20.788 12.1774 20.6209 13.8739 19.9823 15.4157C19.3437 16.9575 18.2622 18.2752 16.8747 19.2023C15.4871 20.1295 13.8558 20.6243 12.1871 20.6243C9.94929 20.6243 7.80318 19.7354 6.22084 18.153C4.6385 16.5707 3.74955 14.4246 3.74955 12.1868Z"
                    fill="#BED3CB"
                  />
                  <path
                    d="M15.9375 11.25H13.125V8.4375C13.125 8.18886 13.0262 7.9504 12.8504 7.77459C12.6746 7.59877 12.4361 7.5 12.1875 7.5C11.9389 7.5 11.7004 7.59877 11.5246 7.77459C11.3488 7.9504 11.25 8.18886 11.25 8.4375V11.25H8.4375C8.18886 11.25 7.9504 11.3488 7.77459 11.5246C7.59877 11.7004 7.5 11.9389 7.5 12.1875C7.5 12.4361 7.59877 12.6746 7.77459 12.8504C7.9504 13.0262 8.18886 13.125 8.4375 13.125H11.25V15.9375C11.25 16.1861 11.3488 16.4246 11.5246 16.6004C11.7004 16.7762 11.9389 16.875 12.1875 16.875C12.4361 16.875 12.6746 16.7762 12.8504 16.6004C13.0262 16.4246 13.125 16.1861 13.125 15.9375V13.125H15.9375C16.1861 13.125 16.4246 13.0262 16.6004 12.8504C16.7762 12.6746 16.875 12.4361 16.875 12.1875C16.875 11.9389 16.7762 11.7004 16.6004 11.5246C16.4246 11.3488 16.1861 11.25 15.9375 11.25Z"
                    fill="#BED3CB"
                  />
                </svg>
              </i>
              <i
                className={
                  productIsAddedToWishlist
                    ? "modelInfoBlock-img-big-wishBtn on"
                    : "modelInfoBlock-img-big-wishBtn"
                }
                onClick={(e) => addModelToWishlist(e)}
              >
                <svg viewBox="0 0 24 24">
                  <use href="#heart" />
                  <use href="#heart" />
                </svg>
                <svg className="hide" viewBox="0 0 24 24">
                  <defs>
                    <path
                      id="heart"
                      d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
                    />
                  </defs>
                </svg>
              </i>
            </div>
          )}
        </div>

        <div className="row smallImageWrapper">
          {/*{*/}
          {/*    image.realImg.length > 0 &&*/}
          {/*    <div className={className}>*/}
          {/*        <img loading="lazy" src={image.mainImg.src} onClick={clickSmallImg} alt={`${altTitle} - Teil 1`}/>*/}
          {/*    </div>*/}
          {/*}*/}
          {image.realImg.length ? (
            <Slider
              asNavFor={this.state.nav1}
              ref={(slider) => (this.slider2 = slider)}
              {...settingsSmallImg}
            >
              {/*{ image.realImg.map( this.mapRealImg.bind(this) )}*/}
              {image.realImg.map((el, i) => {
                return (
                  <div>
                    <div className={className} key={i}>
                      <img
                        src={el.src}
                        alt=""
                        onClick={this.props.clickSmallImg}
                      />
                    </div>
                  </div>
                );
              })}
            </Slider>
          ) : (
            ""
          )}
        </div>

        {blockImageState.isOpenLightBox && (
          <LightboxImage
            src={blockImageState.currentMainImage}
            showFirstImage={false}
            showRealImageText={true}
            close={closeLightBox}
            array={[].concat(image.mainImg, image.realImg)}
          />
        )}
      </div>
    );
  }
}

ModelInfoBlockImage.propTypes = {};
ModelInfoBlockImage.defaultProps = {
  showDescription: false,
};
