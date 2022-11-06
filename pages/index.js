import { getXataClient } from "../src/xata";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Images from "../components/Images";
import { useRouter } from "next/router";

export default function Home({ allImages, isAuthenticated }) {
  const router = useRouter();
  const userId = router.query.userId;
  return (
    <div className="body">
      <Navbar isAuthenticated={isAuthenticated} userId={userId} />
      <Hero />
      <Images allImages={allImages} /> {/*pass prop*/}
    </div>
  );
}


export const getServerSideProps = async (context) => {
  let isAuthenticated;
  context.req.cookies["token"]
    ? (isAuthenticated = true)
    : (isAuthenticated = false);

  const xata = getXataClient(); // initialize XataClient
  // Fetch all images with the firstname and lastname of the user that upload image
  const allImages = await xata.db.images
    .select(["*", "user.firstname", "user.lastname"])
    .getAll();
  return { props: { allImages, isAuthenticated } };
};