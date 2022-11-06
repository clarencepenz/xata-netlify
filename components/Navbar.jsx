import {
  Stack,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Upload from "./Upload";

const Navbar = ({ isAuthenticated, userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  return (
    <Stack
      direction={"row"}
      justifyContent="space-between"
      alignItems={"center"}
      px={{ base: 6, md: 20 }}
      py={6}
      position="sticky"
      top={0}
      zIndex={1000}
      bg="#fff"
      boxShadow="md"
    >
      <Link href="/" className="text-2xl">
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          Image-Hub
        </Text>
      </Link>

      <Stack justifyContent="flex-end" alignItems={"center"} direction={"row"}>
        {isAuthenticated ? (
          <Button variant={"solid"} colorScheme="purple" onClick={onOpen}>
            Upload
          </Button>
        ) : (
          <Button
            onClick={() => router.push("/register")}
            variant={"outline"}
            colorScheme="purple"
          >
            Join
          </Button>
        )}
      </Stack>
      <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Upload userId={userId} onClose={onClose} />
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default Navbar;
