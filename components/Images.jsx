import {
  Image,
  Flex,
  Box,
  Stack,
  Avatar,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import Masonry from "react-masonry-css"; // Library for image gallery layout

export default function Images({ allImages }) {
  const [searchQuery, setSearchQuery] = useState(""); // SEARCH QUERY PARAM
  const [images, setImages] = useState(allImages); // ARRAY OF IMAGES
  const breakpointColumnsObj = {
    default: 3,
    1500: 3,
    800: 2,
  };

  const handleSearch = async () => {
    const result = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery,
      }),
    }).then((r) => r.json());
    setImages(result?.images);
  };

  return (
    <Stack alignItems={"center"} px={{ base: 6, md: 20 }} py={6}>
      <Stack direction="row" mt={6} mb={10}>
        <Input
          maxW="40rem"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Photos"
        />
        <Button
          colorScheme={"purple"}
          onClick={() => handleSearch()}
          className="!text-[#333]"
        >
          Search
        </Button>
      </Stack>
      {images === undefined ? (
        <>
          <Text fontSize={"xl"}>No images found</Text>
          <Button
            colorScheme={"purple"}
            variant={"outline"}
            onClick={() => setImages(allImages)}
          >
            Refresh
          </Button>
        </>
      ) : (
        <Flex
          columnClassName={"my-masonry-grid_column"}
          as={Masonry}
          breakpointCols={breakpointColumnsObj}
          mt="2rem"
        >
          {images?.map((image) => (
            <CustomImage key={image.id} src={image?.img_url} user={image?.user} />
          ))}
        </Flex>
      )}
    </Stack>
  );
}

const CustomImage = ({ src, user }) => {
  return (
    <Box ml="10px" className="custom-image">
      <Image w="100%" mb={"20px"} src={src} alt="" />
      <div className="custom-image-overlay"></div>
      <Stack
        direction={"row"}
        alignItems="center"
        className="custom-image-more"
      >
        <Avatar name={`${user?.firstname} ${user?.lastname}`} />{" "}
        <Text
          color={"#fff"}
          fontSize="xl"
          fontWeight={"bold"}
          textTransform="capitalize"
        >
          {user?.firstname} {user?.lastname}{" "}
        </Text>
      </Stack>
    </Box>
  );
};
