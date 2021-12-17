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



router.get("/gallery/:id", async(req, res)=>{
    try{
        const dbGalleryData = await Gallery.findByPk(req.params.id, {
            include: [
                {
                    model: Painting,
                    attributes: [
                        'id',
                        'title',
                        'artist',
                        'exhibition_date',
                        'filename',
                        'description',
                    ]
                }
            ]
        });
        const gallery = dbGalleryData.get({plain: true});
        res.render('gallery', {gallery})
    }catch(e){
console.log(e)
    };
});

router.get('/painting/:id', async (req, res) => {
    try {
      const dbPaintingData = await Painting.findByPk(req.params.id);
  
      const painting = dbPaintingData.get({ plain: true });
  
      res.render('painting', { painting });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


module.exports = router;