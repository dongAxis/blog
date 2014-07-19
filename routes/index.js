var crypto=require('crypto');
User = require('../models/user.js');

module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index', {title:"主页"});
    });

    app.get('/reg', function(req, res){
        res.render("reg", {title:"注册"});
    });
    app.post('/reg', function(req, res){
        var name=req.body.name,
            password=req.body.password,
            password_re=req.body['password-repeat'];

        console.log("password:::"+password);

        console.log("awdawd");

        if(password_re!=password){
            req.flash('title', '两次密码输入的不一样');
            return res.redirect('/reg');
        }

        console.log("upupupupupup");

        var md5=crypto.createHash('md5'),
            password=md5.update(req.body.password).digest('hex');
        var newUser = new User({
            name: req.body.name,
            password:password,
            email:req.body.email
        });

        console.log('out');

        User.get(newUser.name, function(err, user){
            console.log("hahah ");
            if(user){
                req.flash('title', '用户存在了， 你妹');
                return res.redirect('/reg');
            }

            console.log("inininin");

            newUser.save(function(err, user){
                if(err){
                    req.flash('title', err);
                    return res.redirect('/reg');
                }

                req.session.user=user;
                req.flash('success', '注册成功');
                res.redirect('/');
            });
        });
    });

    app.get('/login', function(req, res){
        res.render('login', {title:"登陆"});
    });
    app.post('/login', function(){});

    app.get('/post', function(req, res){
        res.render('post', {title:"发表"});
    });
    app.post('/post', function(req, res){});

    app.get('/logout', function(req, res){});
};