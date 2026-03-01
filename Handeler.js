module.exports.Home = (req, res) => {
  console.log("Welcom in home page");

  res.writeHead(200, { "content-type": "application/json" });
  res.write(JSON.stringify({ message: "Welcome to our app." }));
  return res.end();
};
