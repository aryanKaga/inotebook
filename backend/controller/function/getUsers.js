const usermodel = require("../model/usermodel");

async function getUsers(req, res) {
  console.log("Request to get users");

  const user = req.query.user;
  console.log(user);

  if (!user) {
    return res.send({ message: "No search term provided" });
  }

  try {
    const results = await usermodel
      .find({
        $or: [
          { $text: { $search: user } }, // Text search for relevance
          { username: new RegExp(user, "i") }
         , { email: new RegExp(user, "i") },// Case-insensitive regex for similar names
        ],
      })
      .sort({ score: { $meta: "textScore" } })
      .select({ score: { $meta: "textScore" }, username: 1, email: 1, role: 1, status: 1, image: 1 })
      .limit(20); // Limit to 20 results

    console.log("Results are:", results);
    res.send(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = { getUsers };
