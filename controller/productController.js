import Product from "../modules/products.js";

export function getproducts(req, res) {
  Product.find().then((productList) => {
    res.json({
      plist: productList,
    });
  });
}

export function createProduct(req, res) {
  //metahanata token eka avanam request .user hagauavama details enava
  // ethakota metahanata ena request eka enne index eke jwt eka athulen gihin habay methanata  eka apiata balnna puluvan
  console.log(req.user); //apata dan methaninn  user details balanna puluvan mokda methanata enna index eken miidle whre eka athulen gin0

  // evagema meka user details ballana puluvan me req eke   . req.body use karoth evana details balanna puluvan
  //userge data decrept karala\

  //   const userData = req.body;
  //   console.log(userData);
  //evagema methandi api kiyanava token ekk dala evala naththam
  // product ek create karnana denne na
  if (req.user == null) {
    res.json({
      message: "user not logging",
    });
    return;
  }


  if(req.json != "admin"){
    res.json({
      message  : " You are not in admin"
    })
    return
  }
  const product = new Product(req.body);
  product
    .save()
    .then(() => {
      res.json({
        message: "product created",
      });
    })
    .catch(() => {
      res.json({
        message: "product not created",
      });
    });
}

export function deleteProducts(req, res) {
  //   Product.deleteOne({ name : req.body.name}).then(()=>{

  const Pname = req.params.pname;

  Product.deleteOne({ name: Pname }).then(() => {
    res.json({
      message: " product deleted successfully",
    });
  });
}

export function getproductByName(req, res) {
  // const name = req.body.name dan api meka use karanne  na  meka use karnne json ekk vidihata enakota

  const name = req.params.name;

  Product.find({ name: name })
    .then((productList) => {
      if (productList.length == 0) {
        res.json({
          message: "we dont have that item ",
        });
      } else {
        res.json({
          list: productList,
        });
      }
    })
    .catch(() => {
      res.json({
        message: "it product not this database",
      });
    });
}
