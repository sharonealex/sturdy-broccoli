const router = require("express").Router();
const Dish = require("../../models/Dish");

router.post("/", async(req, res)=>{
    try {
        const dishData = await Dish.create({
            dish_name: req.body.dish_name,
            description: req.body.description,
            guest_name: req.body.guest_name,
            has_nuts: req.body.has_nuts
        });
        res.status(200).json(dishData);
    }catch(e){
        res.status(400).json(e)
    }
});

module.exports = router;