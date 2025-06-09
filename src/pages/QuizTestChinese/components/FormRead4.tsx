import { Card, Row, Typography } from "antd";

const { Text } = Typography;

interface Question {
  id: number;
  image?: string;
  value: string;
  text: string;
  desR?: string;
  desL?: string;
  answer: boolean;
  questions: any[];
}

interface FormRead4Props {
  questions: Question[];
  index: number;
}

const FormRead4 = ({ questions }: FormRead4Props) => {
  return (
    <Card
      style={{ margin: 10, background: "#fff" }}
      bordered
      title={
        <Row justify="space-between" align="middle">
          <Text>
            <b>Chọn từ điền vào chỗ trống</b>
          </Text>
        </Row>
      }
    >
      {questions?.[1]?.questions?.map((item: any) => (
        <img src={item.image} />
      ))}
      {questions?.[2]?.questions?.map((item: any) => (
        <img src={item.image} />
      ))}

      {questions?.[1]?.questions?.map((item: any) => (
        <div style={{ display: "flex", gap: 12 }}>
          <input /> <p>{item.desR ? item.desR : item.desL}</p>
        </div>
      ))}
      {questions?.[2]?.questions?.map((item: any) => (
        <div style={{ display: "flex", gap: 12 }}>
          <input /> <p>{item.desR ? item.desR : item.desL}</p>
        </div>
      ))}
    </Card>
  );
};

export default FormRead4;
