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
        
        req.session.save(() => {
            // We set up a session variable to count the number of times we visit the homepage
            if (req.session.countVisit) {
             
              // If the 'countVisit' session variable already exists, increment it by 1
              req.session.countVisit++;
            } else {
                
              // If the 'countVisit' session variable doesn't exist, set it to 1
              req.session.countVisit = 1;
            }
      
            res.render('homepage', {
              galleries,
              loggedIn: req.session.loggedIn,
            });
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
        res.render('gallery', {gallery, loggedIn: req.session.loggedIn,
        })
    }catch(e){
console.log(e)
    };
});

router.get('/painting/:id', async (req, res) => {
    try {
      const dbPaintingData = await Painting.findByPk(req.params.id);
  
      const painting = dbPaintingData.get({ plain: true });
  
      res.render('painting', { painting, loggedIn: req.session.loggedIn, });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get("/login", async(req, res)=>{
      if(req.session.loggedIn){
          return res.redirect("/");
      } else {
          res.render('login')
      }
  })


module.exports = router;