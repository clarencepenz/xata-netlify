import { Text, Stack, Box } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Stack
      justifyContent="center"
      px={{ base: 6, md: 20 }}
      className="hero-section"
    >
      <Box w={{ md: "80%" }}>
        <Text
          fontSize={{ base: "2xl", md: "4xl", lg: "6xl" }}
          fontWeight={"bold"}
          color="#fff"
        >
          A photo sharing platform for everyone
        </Text>
        <Text
          color="#fff"
          fontWeight={"light"}
          py={6}
          fontSize={{ base: "12px", md: "14px", lg: "16px" }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
          voluptatum explicabo libero obcaecati dolore quaerat molestiae
          debitis, quisquam cum corporis omnis
        </Text>
      </Box>
    </Stack>
  );
};

export default Hero;
