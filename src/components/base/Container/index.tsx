import "./style.css";

interface ContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Container = ({ children, style }: ContainerProps) => {
  return (
    <div className="container" style={style}>
      {children}
    </div>
  );
};

export default Container;
