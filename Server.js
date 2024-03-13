const express=require('express');
const app=express();

app.set("view engine", "ejs");

app.use(express.static('./public'));

app.use((req,res,next)=>{             //middleware
console.log("middleware working")
next();   //just a push so that our request moves to next thing which should be executed
});   

app.get('/',(req,res)=>{                       //default route
    res.render("index",{name:"Ritik"});
})
app.get('/about',(req,res)=>{                 //routes
    res.send("Hello About section");
})

app.get('/profile/:username',(req,res)=>{    //dynamic routes (username->params)
    res.send(`Hello from ${username}`);
})

app.get('/error', (req, res,next) => {
    throw new Error('BROKEN') // Express will catch this on its own.
  })

app.use(function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  }
);
app.listen(3000);

//req->data of user send to server
//res->respond from server