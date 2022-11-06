// Generated with CLI
import { getXataClient } from "../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {
    const { searchQuery } = req.body; // get search query
    const records = await xata.search.byTable(searchQuery, {
      tables: [
        { table: "users", target: [] },
        {
          table: "images",
          target: [{ column: "tags" }],
        },
      ],
      fuzziness: 0,
      prefix: "phrase",
    });
    res.status(200).json(records);
  };
  export default handler;
