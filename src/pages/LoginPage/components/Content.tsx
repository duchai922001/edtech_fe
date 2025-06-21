import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
// import { SitemarkIcon } from "./CustomIcons";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Effective Practice",
    description:
      "Our Mocktest system is designed based on official formats, helping you assess your English, Chinese, and Japanese proficiency accurately and flexibly.",
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Long-Term Memory Retention",
    description:
      "Learn faster and remember longer with Flashcards optimized for vocabulary and sentence pattern retention in your chosen language.",
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Interactive Learning",
    description:
      "Enhance your language acquisition through a user-friendly, multimedia-based, and highly intuitive learning experience.",
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Extensive Learning Materials",
    description:
      "Access a curated collection of learning resources organized by language to help you study systematically and save time.",
  },
];

export default function Content() {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        maxWidth: 450,
      }}
    >
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {/* <img
          src={LOGO}
          style={{ width: "50px", height: "auto", marginLeft: "-24px" }}
        /> */}
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: "medium" }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
