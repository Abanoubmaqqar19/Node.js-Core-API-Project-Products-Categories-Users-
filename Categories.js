const { categories } = require("./data.js");

module.exports.Categories = ((req, res) => {
      res.writeHead(200, { "content-type": "application/json" });
        
    
         const response = {
           message: "That's all Categories",
           categories: categories,
         };
        
        
         res.write(JSON.stringify(response));
         return res.end();
})


module.exports.AddnewCategory = (req, res) => {
  
 let body = "";
  req.on("data", (chunck) => {
    body += chunck;
  });
  req.on("end", () => {
    let  category= JSON.parse(body);
    

    categories.push(category);
    res.writeHead(201, { "content-type": "application/json" });
    res.write(
      JSON.stringify({
        message: "Category added Succesfully",
        category,
      }),
    );
    return res.end();
  });
};



