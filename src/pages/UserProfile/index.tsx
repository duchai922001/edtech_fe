import React from "react";
import { useUserProfile } from "../../hooks/useUser"; // cập nhật path theo dự án của bạn
import {
  Box,
  CircularProgress,
  Typography,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import Loading from "../../components/base/Loading";

const UserProfile = () => {
  const { data: user, isLoading, isError } = useUserProfile();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !user) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">Failed to load user data.</Typography>
      </Box>
    );
  }

  const getFirstLetterOfLastName = (fullName: string): string => {
    const parts = fullName.trim().split(" ");
    return parts[parts.length - 1].charAt(0).toUpperCase();
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", p: 4, mt: 5 }}>
      <Stack spacing={2} alignItems="center">
        <Avatar sx={{ width: 64, height: 64 }}>
          {getFirstLetterOfLastName(user.fullName || "")}
        </Avatar>
        <Typography variant="h6">{user.fullName}</Typography>
        <Typography variant="body2" color="text.secondary">
          Username: {user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {user.email}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default UserProfile;
