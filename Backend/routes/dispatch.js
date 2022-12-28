const express = require('express');
const db = require('../database');
let bodyParser = require('body-parser');

const router = express.Router();

router.get('/retrive', async(req,res)=>{
    
    const items = await db.promise().query(`SELECT DISTINCT(item) FROM category ORDER BY item;`);
    // console.log(items[0]);
    res.status(200).send(items[0]);

});

router.post('/getQuantity',async(req,res)=>{

    const item = req.body.itemName;
    // console.log(item);
    const quantity = await db.promise().query(`select * from current where item='${item}'`);
    // console.log(quantity[0])
    res.send(quantity[0])

})

router.post('/updateDispatch',async(req,res)=>{

    const arr = req.body.ItemArray;
    console.log(arr)
    let length = arr.length;
    console.log(length)
    let i=0;
    for(let i=0; i<length; i++){
    let itemName = arr[i].ItemName;
    let currentQuantity = arr[i].CurrentQuantity;
    let rmk = arr[i].RMK;
    let rmd = arr[i].RMD;
    let rmkcet = arr[i].RMKCET;
    let date = arr[i].DATE;

    console.log(itemName,currentQuantity,rmk,rmd,rmkcet,date)
 
    let result = await db.promise().query(`select distinct(category) from category where item = '${itemName}'`);
    let category = result[0][0].category;
    console.log(category)

    db.promise().query(`INSERT INTO dispatch(item,quantity,place,date,category) VALUES('${itemName}','${rmk}','RMK','${date}','${category}')`);
    db.promise().query(`INSERT INTO dispatch(item,quantity,place,date,category) VALUES('${itemName}','${rmd}','RMD','${date}','${category}')`);
    db.promise().query(`INSERT INTO dispatch(item,quantity,place,date,category) VALUES('${itemName}','${rmkcet}','RMKCET','${date}','${category}')`);

    db.promise().query(`update current set quantity=${currentQuantity} where item='${itemName}'`);
    }
    res.send("GOOD");
    

})



module.exports = router;

