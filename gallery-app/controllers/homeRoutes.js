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
            ]
        });
        const galleryData = dbGalleryData.map((gallery)=>gallery.get({plain: true}));
        res.render('homepage', {galleryData})
    }catch(e){

    }
})