//add component Trans
//img
import imgMap from "../../assets/img/imgMap.png";
//icon
import imgCar from "../../assets/icon/car.svg";
import imgTrain from "../../assets/icon/train.svg";
import imgLuxurycar from "../../assets/icon/luxurycar.svg";
const Trans = () => {
  return (
    <section className="bg-dark p-120">
      <div className="container">
        <div className="col-12 text-primary d-flex align-items-center">
          <div className="d-flex justify-content-start align-item-center mb-80">
            <h4 className="fs-1">
              交通<br></br>方式
            </h4>
            <span
              className="ms-4 gradient-underline align-self-center"
              style={{ width: "150px" }}
            ></span>
          </div>
        </div>
        <div className="col-12 text-primary">
          <p className="fs-6 text-light mb-2 mt-4">
            台灣高雄市新興區六角路123號
          </p>
          <img className="img-fluid mb-10" src={imgMap} alt="imgMap" />
        </div>

        <ul className="list-unstyled row text-light">
          <li className="col-12 col-lg-4 mb-4">
            <img src={imgCar} alt="car" className="text-primary mb-4" />
            <p className="fs-5 text-light">自行開車</p>
            <p>
              如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。
            </p>
          </li>
          <li className="col-12 col-lg-4 mb-4">
            <img src={imgTrain} alt="train" className="text-primary mb-4" />
            <p className="fs-5 text-light">高鐵/火車</p>
            <p>
              如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。
            </p>
          </li>
          <li className="col-12 col-lg-4 mb-4">
            <img
              src={imgLuxurycar}
              alt="Luxurycar"
              className="fs-2 text-primary mb-4"
            />
            <p className="fs-5 text-light">禮賓車服務</p>
            <p>
              酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Trans;
