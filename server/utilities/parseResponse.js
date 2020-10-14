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
    },
  };
  const categories = [];

  switch (type) {
    /** Items List */
    case "search":
      /** Breadcrumb */
      if (data.filters.length) {
        const { path_from_root: pathFromRoot } = data.filters[0].values[0];
        pathFromRoot.map((category) => categories.push(category.name));
      }

      let items = [];
      data.results
        .slice(0, process.env.RETURN_ITEMS_NUMBER || 4)
        .forEach((item, index) => {
          const price = item.price.toString().split(".");
          items[index] = {
            id: item.id,
            title: item.title,
            price: {
              currency: item.currency_id,
              amount: Number(price[0]),
              decimals: Number(price[1] ?? 0),
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            location: item.address.state_name,
          };
        });
      response = { ...response, categories, items };
      break;

    /** Single Item */
    case "single":
      /** Breadcrumb */
      if (data.categories.path_from_root.length) {
        const { path_from_root: pathFromRoot } = data.categories;
        pathFromRoot.map((category) => categories.push(category.name));
      }

      const price = data.item.price.toString().split(".");
      const item = {
        id: data.item.id,
        title: data.item.title,
        price: {
          currency: data.item.currency_id,
          amount: Number(price[0]),
          decimals: Number(price[1] ?? 0),
        },
        picture: data.item.pictures.length ? data.item.pictures[0].url : "",
        condition: data.item.condition,
        free_shipping: data.item.shipping.free_shipping,
        sold_quantity: Number(data.item.sold_quantity),
        description: data.description.plain_text,
      };
      response = { ...response, categories, item };
      break;

    /** Break Response */
    default:
      response = { ...response, data };
      break;
  }

  res.json(response);
};

module.exports = parseResponse;