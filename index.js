const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');

const app = express();


app.use(express.urlencoded({ extended: false }));

const PORT = 8000;

//routes


app.get('/users',(req, res)=> {
    res.send("<p>Users API</p>");
});


//getting and read/write data using get and post 
app.get('api/users',(req, res)=> {
    return res.json(users);
});


app.post('/api/users',(req, res)=> {
    const body = req.body;
    users.push({...body, id : users.length +1 });


    //writing the captured data to file mockdata.json
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=> {
        return res.json({status:"Data posted successfully", id : users.length});
    });
});

    
    



//getting dynamic value from on endpoint 



app.route('/api/users/:id').get((req, res)=> {
    // res.send(req.params);
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return res.json(user);})
.patch((req, res)=> {
    // edit info of user with given id
    return res.json({status:"patch or edit pending"})})
.delete((req, res)=> {
    // delete useer
    return res.json({status:" deletion pending"})
})




app.listen(PORT, () => {
    console.log('listening on port:',PORT);
});

