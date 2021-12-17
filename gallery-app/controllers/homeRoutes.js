const router = require("express").Router();
const {Gallery, Painting} = require("../models")

router.get("/", async(req, res)=>{
    try{
        const dbGalleryData = await Gallery.findAll({ //left join 
            include: [
                {
                    model: Painting,
                    attributes: ['filename', 'description']
                }
            ],
        });
        const galleries = dbGalleryData.map((gallery)=>
        gallery.get({plain: true})
        );
        
        res.render('homepage', {
            galleries
        });
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
    }
});

module.exports = router;