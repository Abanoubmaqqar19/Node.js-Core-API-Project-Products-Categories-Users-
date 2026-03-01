const { Home } = require("./Handeler.js");
const {
  Products,
  getProductById,
  replaceProductById,
  updatePrice,
  deleteProduct,
} = require("./Products.js");
const { Categories, AddnewCategory } = require("./Categories.js");
const {
  Users,
  getUserById,
  addUser,
  deleteUser,
  updateUserPassword,
} = require("./Users.js");

module.exports = (req, res) => {
  console.log(`current request: ${req.method} ${req.url}`);

  // all get
  if (req.method === "GET" && req.url === "/") return Home(req, res);
  if (req.method === "GET" && req.url === "/products")
    return Products(req, res);

  if (req.method === "GET" && req.url === "/categories")
    return Categories(req, res);

  if (req.method === "GET" && req.url === "/users") return Users(req, res);

  // – Get product by ID
  if (req.method === "GET" && req.url.startsWith("/products"))
    return getProductById(req, res);

  // Get user by ID
  if (req.method === "GET" && req.url.startsWith("/users"))
    return getUserById(req, res);

  // Replace product by ID
  if (req.method === "PUT" && req.url.startsWith("/products/"))
    return replaceProductById(req, res);

  // update price
  if (req.method === "PATCH" && req.url.startsWith("/products/"))
    return updatePrice(req, res);

  // Remove product

  if (req.method === "DELETE" && req.url.startsWith("/products/"))
    return deleteProduct(req, res);

  //Add new Category
  if (req.method === "POST" && req.url === "/categories")
    return AddnewCategory(req, res);
    // addUser
    
    if (req.method === "POST" && req.url === "/users")
        return addUser(req, res);

    // update user pwd
    if (req.method === "PATCH" && req.url.startsWith("/users/"))
        return updateUserPassword(req, res);
    
    // delete user

    if (req.method === "DELETE" && req.url.startsWith("/users/"))
      return deleteUser(req, res);
    

  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ message: "Not Found" }));
};
