//add component AboutUs
import React from "react";

//img
import bgAbout from "../../assets/img/bgAbout.png";

const AboutUs = () => {
  return (
    <section className="bg-dark p-120 pb-240">
      <div
        className=" bg-dark position-relative"
        style={{
          backgroundImage: `url(${bgAbout})`,
          minHeight: "672px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <img
            className="w-100"
            src={bgAbout}
            alt="bg About"
            style={{
              backgroundImage: `url(${bgAbout})`,
            }}
          /> */}
        {/* <div className="position-absolute top-50 start-100 translate-middle"> */}
        <div className="container">
          <div className="row position-relative" style={{ bottom: "-80px" }}>
            <div className="col-2"></div>
            <div className="col-10 bg-primary brown-box">
              <div className="brown-box-info">
                <div className="d-flex justify-content-start align-item-center mb-80">
                  <h4 className="fs-2 text-light">
                    關於<br></br>我們
                  </h4>
                  <span
                    className="ms-4 solid-underline-light align-self-center"
                    style={{ width: "150px" }}
                  ></span>
                </div>
                <p className="fs-6 text-light mb-2 mt-4 ">
                  享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。
                  我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。{" "}
                </p>
                <p className="fs-6 text-light mb-2 mt-4">
                  我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。
                  我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。{" "}
                </p>
                <p className="fs-6 text-light mb-2 mt-4">
                  在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。{" "}
                </p>
                <p className="fs-6 text-light mb-2 mt-4">
                  享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default AboutUs;
