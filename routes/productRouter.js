import express from "express";
// import Product from "../modules/products";
import {
  getproducts,
  createProduct,
  deleteProducts,
  getproductByName,
} from "../controller/productController.js";

const productRouter = express.Router();

productRouter.get("/", getproducts);

// productRouter.get("/byname", getproductByName) mehema eka name ekk vge eva api json valata dana eka hari na

// productRouter.get("/:name",getproductByName)//api mokuth nathuva dm,moth enne uda get ekata
// //methana kiynne api eke agata ena value eka /:name  kiyana veriable ekata aragena function eka athulata yanna hadala thiyenne ethakota apita api ekema
// //value eka denna puluvan post man eken apata apata jason req ekk vidihata evnna oni na ethakota

productRouter.post("/", createProduct);

//  productRouter.delete("/:pname",deleteProducts)

//pahala  filter kiyana ekaka api api eken req ekk dmmoth eka  ru venne uda /:name eka mokda meaka thiyenne ekata kalin
//e vgema api api eke filt4er kiyana eka trgama dala evnne ethakota filter kiyane eka yata ekata enna kalin uda thiyena eka hariyana nisa ekata yanava
//ehema venne filter eka value ekk vidihata aran parameterf ekk vidihata pass karanava   enisa  me uda mevage
//para vidihata  yavana eva api avasnatea daganna oni

productRouter.get("/fillter", (req, res) => {
  res.json({
    message: "fetfillter",
  });
});

productRouter.delete("/:pname", deleteProducts);

productRouter.get("/:name", getproductByName); //api mokuth nathuva dm,moth enne uda get ekata
//methana kiynne api eke agata ena value eka /:name  kiyana veriable ekata aragena function eka athulata yanna hadala thiyenne ethakota apita api ekema
//value eka denna puluvan post man eken apata apata jason req ekk vidihata evnna oni na ethakota

export default productRouter;
