const router = require("express").Router();
const Dish = require("../models/Dish");

router.get('/', async(req, res)=>{
    const dishData = await Dish.findAll();
    const dishes = dishData.map((dish)=>{
        return dish.get({plain: true})
    })
    res.render('all', { dishes })
});

router.get('/dish/:id', async(req, res)=>{
    const dishData = await Dish.findByPk(req.params.id);
    if(!dishData){
        res.status(404).json({message: "no dish found"});
    };
    const dish = dishData.get({plain: true});
    res.render('dish', dish)
})

module.exports = router;