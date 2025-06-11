import { useState } from "react";
import Container from "../../components/base/Container";
import FlashCard from "../../components/base/FlashCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFlashCardsSubject } from "../../hooks/useFlashCard";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { IoCaretBack } from "react-icons/io5";
import Loading from "../../components/base/Loading";

const FlashCardDetail = () => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const { title } = useParams();
  const { data, isLoading } = useGetFlashCardsSubject(title ?? "");
  const navigate = useNavigate();
  const total = data?.length ?? 0;
  const menuItems = [
    { label: "Thẻ ghi nhớ", path: "/flashcard" },
    { label: "Kiểm tra", path: "/mocktest" },
    { label: "Chơi game", path: "/games" },
    { label: "Practice", path: "/speaking-test" },
  ];
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      <div>
        <div
          style={{
            position: "fixed",
            top: 455,
            left: "10%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            zIndex: 1000,
          }}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 39px",
                backgroundColor: "#2d365c",
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                color: "#fff",
                fontWeight: 500,
                fontSize: 16,
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3c4875")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#2d365c")
              }
            >
              <div style={{ position: "relative", width: 16, height: 16 }}>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: "#6366F1",
                    borderRadius: 4,
                    position: "absolute",
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: "#60A5FA",
                    borderRadius: 4,
                    position: "absolute",
                    left: 4,
                    top: 4,
                    zIndex: 0,
                  }}
                />
              </div>
              {item.label}
            </div>
          ))}
        </div>
        <div
          style={{
            margin: "100px 0",
            width: "100%",
            maxWidth: 1200,
            marginInline: "auto",
            position: "relative",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", gap: 350 }}>
            <Button onClick={() => navigate(-1)}>
              <IoCaretBack />
              Trở về
            </Button>
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
            {data?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <FlashCard question={item.question} answer={item.answer} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Container>
  );
};

export default FlashCardDetail;
