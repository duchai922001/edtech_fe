import { Typography } from "antd";
import scholarship1 from "../../../assets/scholarship1.png";
import scholarship2 from "../../../assets/scholarship2.png";
import scholarship3 from "../../../assets/scholarship3.png";
import scholarship4 from "../../../assets/scholarship4.png";
import Container from "../../../components/base/Container";

const Scholarship = () => {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          margin: "48px 0",
        }}
      >
        <Typography className="title-lg-black">SCHOLARSHIP</Typography>
        <Typography>
          We partnered with language schools from all over the country to help
          students who would like to further their language studies. Discounts &
          scholarship opportunities awaits!
        </Typography>
      </div>
      <div style={{display: "flex", gap: 24, marginBottom: 48}}>
        <img src={scholarship1} style={{width: "50px", height: "auto"}} />
        <img src={scholarship2} style={{width: "50px", height: "auto"}} />
        <img src={scholarship3} style={{width: "50px", height: "auto"}} />
        <img src={scholarship4} style={{width: "50px", height: "auto"}} />
      </div>
    </Container>
  );
};

export default Scholarship;
