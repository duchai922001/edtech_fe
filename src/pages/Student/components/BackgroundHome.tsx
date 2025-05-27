import bgHome from "../../../assets/bghome.png";
const BackgroundHome = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgHome})`,
        height: "800px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      BackgroundHome
    </div>
  );
};

export default BackgroundHome;
