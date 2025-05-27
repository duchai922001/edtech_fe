import "./style.css";
interface BackgroundProps {
  children: React.ReactNode;
  style?: React.CSSProperties
}
const Background = ({ children, style }: BackgroundProps) => {
  return <div className="background" style={style}> {children}</div>;
};

export default Background;
