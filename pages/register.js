import React, { useState } from "react";
import { Text, Stack, Button, Box, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      }).then((t) => t.json());
      router.push('/login')
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="auth-container">
      <form onSubmit={handleOnSubmit}>
        <Stack bg="#fff" py={8} px={6} width="400px">
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Register
          </Text>
          <Input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Enter Firstname"
          />{" "}
          <Input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Enter Lastname"
          />{" "}
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
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;
