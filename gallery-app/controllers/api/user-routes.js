const router = require("express").Router();
const User = require("../../models/User");

router.post('/', async(req, res)=>{
    try{
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(()=>{
            req.session.loggedIn = true;
            res.status(200).json(dbUserData.get({plain: true}));
        })
    }catch(e){
        res.status(500).json({message: e})
    }
});

router.post('/login', async(req, res)=>{
    try{

        const dbUserData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if(!dbUserData){
            return res.status(404).json("user not exists");
        };

        const validPassword = await dbUserData.checkPassword(req.body.password);
        if(!validPassword){
            return res.status(404).json("invalid user or password");
        }
        req.session.save(()=>{
            req.session.loggedIn = true;
            res.status(200).json({user: dbUserData, message: 'logged in!!'})
        })
    }catch(e){

    }
});

router.post('/logout', async(req, res)=>{
    //when user logs out destroly the session
    if(req.session.loggedIn){
        req.session.destroy(()=>{
            res.status(204).end();
        })
    }else{
        res.status(404).end()//means no more writable will be written to the stream
    }
})


module.exports = router;