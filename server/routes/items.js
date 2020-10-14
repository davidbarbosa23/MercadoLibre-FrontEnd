const router = require("express").Router();
const axios = require("axios");
const parseResponse = require('../utilities/parseResponse');

/**
 * /api/items?q=​:query
 */
router.route("/").get(async (req, res) => {
  if (req.query["q"] !== undefined && req.query["q"] !== "") {
    try {
      const response = await axios.get(process.env.API + "/sites/MLA/search", {
        params: { q: encodeURI(req.query["q"]) },
      });

      parseResponse(res, response.data, "search");
    } catch (error) {
      console.log(error);
      parseResponse(res, { API: "Server Error" });
    }
  } else parseResponse(res, { API: "Query param not found" });
});

/**
 * /api/items/​:id
 */
router.route("/:id").get(async (req, res) => {
  try {
    const [item, description] = await Promise.all([
      axios.get(`${process.env.API}/items/${encodeURI(req.params.id)}`),
      axios.get(`${process.env.API}/items/${encodeURI(req.params.id)}/description`)
    ]);
    const categories = await axios.get(`${process.env.API}/categories/${encodeURI(item.data.category_id)}`);

    parseResponse(res, { item: item.data, description: description.data, categories: categories.data }, "single");
  } catch (error) {
    console.log(error);
    parseResponse(res, { API: "Server Error" });
  }
});

module.exports = router;
