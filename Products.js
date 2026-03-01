const { products } =require("./data.js")


module.exports.Products = (req, res) => {


    

    res.writeHead(200, { "content-type": "application/json" });
    

     const response = {
       message: "That's all products",
       products: products,
    };
    

     res.write(JSON.stringify(response));
     return res.end();
    
};

module.exports.getProductById = (req, res) => {
    const id = req.url.split("/")[2];


    const product = products.find(p => p.id == id)
    if (product)
    {
         res.writeHead(200, { "content-type": "application/json" });

         const response = {
           message: "product exist",
            product
         };

         res.write(JSON.stringify(response));
         return res.end();
    

    }
    else {

         res.writeHead(200, { "content-type": "application/json" });

       

         res.write(JSON.stringify("Error :no matched product"));
         return res.end();
        
    }
}


module.exports.replaceProductById = (req, res) => {
  const id = Number(req.url.split("/")[2]);
  const indx = products.findIndex(u => u.id == id);
  if (indx === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Product not found" }));
  }

  // recive all data 
  let body = "";
  req.on("data", chunks => body += chunks)
  

  req.on("end", () => {
    const newProduct = JSON.parse(body)
    
    products[indx] = {
      id: id,
      ...newProduct
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        message: "Product replaced successfully",
        product: products[indx],
      }),
    );
    
  })
  

  


};


module.exports.replaceProductById = (req, res) => {
  const id = Number(req.url.split("/")[2]);

  const indx = products.findIndex((u) => u.id === id);

  if (indx === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Product not found" }));
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const newProduct = JSON.parse(body);

      products[indx] = {
        id: id,
        ...newProduct,
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
       
      );
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  });
};


module.exports.updatePrice = (req, res) => {
     const id = Number(req.url.split("/")[2]);

     const indx = products.findIndex((u) => u.id === id);
     if (indx === -1) {
          res.writeHead(404, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ message: "Product not found" }));
     }

     let body = "";

     req.on("data", (chunk) => {
          body += chunk;
     });

     req.on("end", () => {
          try {
               const { price } = JSON.parse(body);

               products[indx].price = price;

               res.writeHead(200, { "Content-Type": "application/json" });
               return res.end(
                    JSON.stringify({
                         message: "Price updated successfully",
                         product: products[indx].price,
                    }),
               );
          } catch (error) {
               res.writeHead(400, { "Content-Type": "application/json" });
               return res.end(JSON.stringify({ message: "Invalid JSON" }));
          }
     });

};




module.exports.deleteProduct = (req, res) => {
  const id = Number(req.url.split("/")[2]);
  const indx = products.findIndex(u => u.id === id);

  if (indx === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Product not found" }));
  }

 
  const deletedProduct = products.splice(indx, 1)[0];

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({
    message: "Product deleted successfully",
    product: deletedProduct
  }));
};

     







