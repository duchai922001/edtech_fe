import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
// import Divider from '@mui/material/Divider';
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { Menu } from "../../../common/configMenu";
import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "../../../hooks/useUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const loginMutation = useLogin();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    if (!email.value) {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter a valid username.");
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (usernameError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });

    const payload = {
      username: data.get("username") as string,
      password: data.get("password") as string,
    };

    loginMutation.mutate(payload, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("name", res.data.user.fullName);
        console.log(res.data);
        navigate(Menu.URL_STUDENT_PAGE);
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message || error?.message || "Login failed";
        toast.error(message);
      },
    });
  };

  // const validateInputs = () => {
  //   const email = document.getElementById("email") as HTMLInputElement;
  //   const password = document.getElementById("password") as HTMLInputElement;

  //   let isValid = true;

  //   if (!email.value) {
  //     setEmailError(true);
  //     setEmailErrorMessage("Please enter a valid username.");
  //     isValid = false;
  //   } else {
  //     setEmailError(false);
  //     setEmailErrorMessage("");
  //   }

  //   if (!password.value || password.value.length < 6) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage("Password must be at least 6 characters long.");
  //     isValid = false;
  //   } else {
  //     setPasswordError(false);
  //     setPasswordErrorMessage("");
  //   }

  //   if (isValid) {
  //   }
  //   return isValid;
  // };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField
            error={usernameError}
            helperText={usernameErrorMessage}
            id="username"
            type="username"
            name="username"
            placeholder="your username"
            autoComplete="username"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={usernameError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "baseline" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <ForgotPassword open={open} handleClose={handleClose} />
        {/* <Button
          type="submit"
          fullWidth
          variant="contained"
          // onClick={validateInputs}
          disabled={loginMutation.isPending}
          sx={{
            bgcolor: "#16a34a",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            fontWeight: 600,
            fontSize: "1rem",
            "&:hover": {
              bgcolor: "#15803d",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </Button> */}
        <button
          type="submit"
          // onClick={validateInputs}
          disabled={loginMutation.isPending}
          className="profile-button profile-button-primary"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </button>
        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <span>
            <Link
              component={RouterLink}
              to={Menu.URL_SIGNUP_PAGE}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
      {/* <Divider>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Google')}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Facebook')}
          startIcon={<FacebookIcon />}
        >
          Sign in with Facebook
        </Button>
      </Box> */}
    </Card>
  );
}
