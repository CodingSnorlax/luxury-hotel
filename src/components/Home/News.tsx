//img
import bgDot from "../../assets/img/bgDot.svg";
import { TNews } from "../../interface/News";
import './home.scss'

interface NewsProps {
  news: TNews[];
}

const News: React.FC<NewsProps> = ({ news }) => {
  return (
    <section className="bg-brown news-area">
      <div className="container p-120">
        {news.map((news, index: number) => (
          <div className="row container-fluid" key={index}>
            <div className="col-12 col-md-2 text-primary d-flex align-items-center">
              {index === 0 && (
                <div className="text-start">
                  <h4 className="fs-1">最新</h4>
                  <h4 className="fs-1">消息</h4>
                  <p className="gradient-underline mt-10"></p>
                </div>
              )}
            </div>
            <div className="col-12 col-md-10 text-light d-flex align-items-center mb-4">
              <div
                className="card mb-3 border border-0"
                style={{ maxWidth: "100%", height: "294px" }}
              >
                <div className="row g-0 bg-brown">
                  <div className="col-md-6">
                    <img
                      src={news.image}
                      className="img-fluid border border-0 rounded-3 w-100 object-fit-cover"
                      alt="Card"
                      style={{ height: "294px" }}
                    />
                  </div>
                  <div className="col-md-6 d-flex align-self-center">
                    <div className="card-body">
                      <h5 className="card-title fs-3 fw-bold mb-6">
                        {news.title}
                      </h5>
                      <p className="card-text fs-6">{news.description}</p>
                    </div>
                    {/* bg */}
                    {index === 0 && (
                      <div className="d-none d-lg-block position-absolute dot-img translate-middle overflow-hidden">
                        <img src={bgDot} alt="bgDot" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
          </div>
        ))}
      </div>
      {/* bg */}
      <div className="container">
        <div className="position-absolute translate-middle overflow-hidden">
          <img src={bgDot} alt="bgDot" />
        </div>
      </div>
    </section>
  );
};

export default News;
