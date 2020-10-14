const router = require("express").Router();
const axios = require("axios");

/**
 * Parse Data response
 * @param {Object} res 
 * @param {Object} data 
 * @param {String} type 
 */
const parseResponse = (res, data = {}, type = "") => {
  let response = {
    author: {
      name: process.env.AUTHOR_NAME,
      lastname: process.env.AUTHOR_LASTNAME,
    }
  };
  
  switch (type) {
    case "search":
      let items = [];
      const categories = data.filters;
      data.results.forEach((item, index) => {
        const price = item.price.toString().split(".");
        items[index] = {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: Number(price[0]),
            decimals: Number(price[1] ?? 0)
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping
        };
      });
      response = { ...response, categories, items };
      break;

    case "single":
      const price = data.item.price.toString().split(".");
      const item = {
        id: data.item.id,
        title: data.item.title,
        price: {
          currency: data.item.currency_id,
          amount: Number(price[0]),
          decimals: Number(price[1] ?? 0)
        },
        picture: data.item.pictures[0].url ?? '',
        condition: data.item.condition,
        free_shipping: data.item.shipping.free_shipping,
        sold_quantity: Number(data.item.sold_quantity),
        description: data.description.plain_text
      };
      response = { ...response, item };
      break;

    default: 
      response = { ...response, data }
      break;
  }

  res.json(response);
};

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
      axios.get(`${process.env.API}/items/${encodeURI(req.params.id)}/description`),
    ]);

    parseResponse(res, { item: item.data, description: description.data }, "single");
  } catch (error) {
    console.log(error);
    parseResponse(res, { API: "Server Error" });
  }
});

module.exports = router;
