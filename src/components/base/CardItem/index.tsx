import { Typography } from "antd";
import "./style.css";
interface CardItemProps {
  icon: React.ReactNode;
  label: string;
  type: "column" | "row";
}

const CardItem = ({ icon, label, type }: CardItemProps) => {
  return (
    <div
      className="carditem"
      style={{
        display: "flex",
        flexDirection: type,
        alignItems: "center",
        gap: 24,
        padding: "24px 0",
        height: type === "column" ? "150px" : "auto",
        textAlign: "center",
      }}
    >
      <div>{icon}</div>
      <div>
        <Typography className="body-lg-grey">{label}</Typography>
      </div>
    </div>
  );
};

export default CardItem;
