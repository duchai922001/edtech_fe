import { useState } from "react";
import Container from "../../components/base/Container";
import FlashCard from "../../components/base/FlashCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";

import "swiper/css";
import { useParams } from "react-router-dom";
import { useGetFlashCardsSubject } from "../../hooks/useFlashCard";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const FlashCardDetail = () => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const { title } = useParams();
  const { data } = useGetFlashCardsSubject(title ?? "");

  const total = data?.length ?? 0;

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
        <div
          style={{
            marginBottom: 12,
            color: "#666",
            fontStyle: "italic",
            fontSize: 14,
          }}
        >
          Dùng nút hoặc phím ← → để chuyển giữa các flashcard
        </div>

        <div
          style={{
            marginBottom: 12,
            fontWeight: "600",
            fontSize: 16,
            color: "var(--primary-color)",
          }}
          aria-live="polite"
        >
          Flashcard {currentIndex} / {total}
        </div>

        <div
          style={{
            marginBottom: 24,
            display: "flex",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <button
            onClick={() => swiperInstance?.slidePrev()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "8px 20px",
              cursor: "pointer",
              border: "none",
              background: "var(--primary-color)",
              color: "white",
              borderRadius: 8,
              fontWeight: "600",
              fontSize: 16,
              boxShadow: "0 2px 6px rgb(0 0 0 / 0.15)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#096dd9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--primary-color)")
            }
            aria-label="Previous Slide"
          >
            <LeftOutlined style={{ fontSize: 18 }} />
            Prev
          </button>

          <button
            onClick={() => swiperInstance?.slideNext()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "8px 20px",
              cursor: "pointer",
              border: "none",
              background: "var(--primary-color)",
              color: "white",
              borderRadius: 8,
              fontWeight: "600",
              fontSize: 16,
              boxShadow: "0 2px 6px rgb(0 0 0 / 0.15)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#096dd9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--primary-color)")
            }
            aria-label="Next Slide"
          >
            Next
            <RightOutlined style={{ fontSize: 18 }} />
          </button>
        </div>

        <Swiper
          modules={[A11y]}
          spaceBetween={24}
          slidesPerView={1}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex + 1)}
          style={{ padding: "0 20px" }}
        >
          {data?.map((item, index) => (
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
