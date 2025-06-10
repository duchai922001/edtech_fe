
import "../style.css";
import { Typography } from "antd";

const activities = [
  {
    title: "Entrance Test",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7uvDUo1x285fKKjT_qblu9lZrDhEDnEugig&s",
  },
  {
    title: "Jap1 Flashcard",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbQUpMsyLd0Lgzc_3Q8deMvZAGB3WNDK0xqP4OY7Pen4Awi2sw-5XexMwSEqnKPuzN9Ps&usqp=CAU",
  },
  {
    title: "Game: Word Bash",
    img: "https://snacknation.com/wp-content/uploads/2022/09/5-minute-team-building-activities-e1662484078287.png",
  },
  {
    title: "IELTS Reading 2",
    img: "https://blogimage.vantagecircle.com/content/images/2023/07/Host-Activities-During-Working-Hours.png",
  },
  
];

const TrendingActivities = () => {
  return (
    <div className="trending-container">
      <Typography className="title-lg-black">TRENDING ACTIVITIES</Typography>

      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
        {activities.map((item: any) => (
          <div
            style={{
              background: "#fff",
              boxShadow: "2px 2px 2px 2px gray",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "350px",
              height: "300px",
              borderRadius: 12,
            }}
          >
            <img src={item.img} alt={item.title} className="activity-img" />
            <div className="activity-title">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingActivities;
