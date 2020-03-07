const express = require ('express');
const path = require('path');
const port = 8001;


const db = require('./config/mongoose')
const Contact = require('./models/contact');

const  app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());   
app.use(express.static('assets'));

//  middleware 1
// app.use(function(req,res,next){
//     console.log('middleware 1 is called');
//     next();
// })


//  middleware 2;

// app.use(function(req,res,next){
//     console.log('middleware 2 called');
//     next();
// })

var contactList = [
    {
        name :"AAA",
        phone:"11111111111"
    },
    {
        name :"bbb",
        phone : "12345678910"
    },
    {
        name :"ccc",
        phone : "1234568910"
    }
]

app.get('/',(req,res) => {
        // console.log(req);
  //  console.log(__dirname);

  Contact.find({},function(err,contacts){

    if(err){
        console.log('error in fetching contacts from db');
        return ;
    }

    
   return res.render('home' ,
   {title :"My Contact List",
   contact_list: contacts
})

  });

});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title : "Let us Play with EjS"
    })
})

app.post('/create-contact',function(req,res){
    //    console.log(req.body);
    //    console.log(req.body.name);
    //    console.log(req.body.phone);

    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    // contactList.push(req.body);

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact');return;
        }

        console.log('*********', newContact);
          return    res.redirect('back');
    });

    //return res.redirect('/');
})

app.get('/delete-contact/',function(req,res){

   // console.log(req.query);
    let id= req.query.id;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1)
    // }

    Contact.findByIdAndDelete(id , function(err){
        if(err){
            console.log('error in deleting an object from database');
            return ;
        }

        return res.redirect('back');    
    })

   
})



app.listen(port , (err)=>{
    if(err){
        console.log("error in server",err);
    }
    console.log('yup , my express server is running on port:', port)
});