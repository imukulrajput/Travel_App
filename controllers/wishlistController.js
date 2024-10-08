const Wishlist = require("../model/wishlist.model");

const createWishlistHandler = async(req,res)=>{
    console.log(req.body);
    const newWishlist = new Wishlist(req.body);

    try{
        const savedWishlist = await newWishlist.save();
        res.status(201).json(savedWishlist);  
    }catch(err){
        
          res.status(500).json({message:"failed to create a wishlist"})
    }
}

const deleteWishlistHandler = async(req,res)=>{
    try{
        await Wishlist.findByIdAndDelete(req.params.id);
        res.json({ message: "Hotel deleted from wishlist"});
    }catch(err){
      res.status(500).json({message : "could not delete hotel from wishlist"})
    }
}

const getWishlistHandler = async (req,res)=>{
    try{
        const wishlist = await Wishlist.find({});
         wishlist ? res.json(wishlist) : recs.json({message: "No items found in wishlist"})
    }catch(err){
         res.status(500).json(err);
    }
}

module.exports = {createWishlistHandler,deleteWishlistHandler,getWishlistHandler};