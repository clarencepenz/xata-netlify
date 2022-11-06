import React, { useState } from "react";
import { Text, Stack, Button, Box, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((t) => t.json());
      router.push({
        pathname: "/",
        query: {
          userId: res?.userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Box className="auth-container">
      <form onSubmit={handleOnSubmit}>
        <Stack bg="#fff" py={8} px={6} width="400px">
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Login
          </Text>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            type="email"
          />{" "}
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            type="password"
          />
          <Button
            disabled={loading}
            variant={"solid"}
            colorScheme="purple"
            type="submit"
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
