const { users, products } = require("./data.js");

module.exports.Users = (req, res) => {
  res.writeHead(200, { "content-type": "application/json" });

  const response = {
    message: "That's all Users",
    users: users,
  };

  res.write(JSON.stringify(response));
  return res.end();
};


module.exports.getUserById = (req, res) => {
  const id = req.url.split("/")[2];

  const usr = users.find((u) => u.id == id);

  if (usr) {
    res.writeHead(200, { "content-type": "application/json" });

    const response = {
      message: "user exist",
      usr,
    };

    res.write(JSON.stringify(response));
    return res.end();
  } else {
    res.writeHead(200, { "content-type": "application/json" });

    res.write(JSON.stringify("Error :no matched user"));
    return res.end();
  }
};





// Add new user
module.exports.addUser = (req, res) => {
  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", () => {
    try {
      const newUser = JSON.parse(body);
      users.push(newUser);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({
        message: "User added successfully",
        user: newUser
      }));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  });
};

// Update user password
module.exports.updateUserPassword = (req, res) => {
  const id = Number(req.url.split("/")[2]);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "User not found" }));
  }

  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", () => {
    try {
      const { password } = JSON.parse(body);
      users[index].password = password;
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({
        message: "Password updated successfully",
        user: users[index]
      }));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  });
};

module.exports.deleteUser = (req, res) => {
  const id = Number(req.url.split("/")[2]); // index 3
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "User not found" }));
  }

  const deletedUser = users.splice(index, 1)[0];

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(
    JSON.stringify({
      message: "User deleted successfully",
      user: deletedUser,
    }),
  );
};