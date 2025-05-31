import { useState } from "react";
import Container from "../../components/base/Container";
import FlashCard from "../../components/base/FlashCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const FlashCardDetail = () => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const data = [
    { question: "Thủ đô của Việt Nam là gì?", answer: "Hà Nội" },
    { question: "2 + 2 bằng bao nhiêu?", answer: "4" },
    { question: "Ngôn ngữ chính của trình duyệt là gì?", answer: "JavaScript" },
    { question: "React là thư viện của ai?", answer: "Facebook" },
  ];

  return (
    <Container>
      <div
        style={{
          margin: "32px 0",
          width: "100%",
          maxWidth: 800,
          marginInline: "auto",
          position: "relative",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <button
            onClick={() => swiperInstance?.slidePrev()}
            style={{
              marginRight: 8,
              padding: "8px 16px",
              cursor: "pointer",
              border: "none",
              background: "var(--primary-color)",
              color: "white",
              borderRadius: 8,
            }}
          >
            ← Prev
          </button>
          <button
            onClick={() => swiperInstance?.slideNext()}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              border: "none",
              background: "var(--primary-color)",
              color: "white",
              borderRadius: 8,
            }}
          >
            Next →
          </button>
        </div>

        <Swiper
          modules={[Pagination, A11y]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          style={{ padding: "0 20px" }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <FlashCard question={item.question} answer={item.answer} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default FlashCardDetail;
