import "./styles.css";
const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loader">
        <div className="box box0">
          <div></div>
        </div>
        <div className="box box1">
          <div></div>
        </div>
        <div className="box box2">
          <div></div>
        </div>
        <div className="box box3">
          <div></div>
        </div>
        <div className="box box4">
          <div></div>
        </div>
        <div className="box box5">
          <div></div>
        </div>
        <div className="box box6">
          <div></div>
        </div>
        <div className="box box7">
          <div></div>
        </div>
        <div className="ground">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
