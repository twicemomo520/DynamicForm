const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json()); 

app.post('/save-data', (req, res) => {
    const newData = req.body;
    const filePath = "../src/assets/database.json"; 
    fs.readFile(filePath, (err, data) =>{

        if(err){
            return res.status(500).json({ message: "Error reading data file", error: err });
        }

    const existingData = JSON.parse(data);
    console.log("要開始了!!!!!!!!!!!!!!");
    existingData.pages.forEach(function(item, index){
        item.firstPage.id = index+1
        console.log(`索引 ${index} 更新的 id: ${item.firstPage.id}`)
    })

    let length = existingData.pages.length



    newData.firstPage.id = length+1
    console.log(newData)



    if (existingData.pages && Array.isArray(existingData.pages)){
        existingData.pages.push(newData); 
    }
    else{
        return res.status(500).json({message: "Data structure is invalid" });
    }

    // 将更新后的数据写回文件
    fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to save data', error: err });
        }
        res.send({ message: 'Data updated  successfully' });
        })
    });
});


app.post('/delete', (req, res)=>{
    console.log("Received delete request with body:", req.body);
    const deletedIds = req.body.ids;
    const filePath = '../src/assets/database.json';
    fs.readFile(filePath, (err, data)=>{
        if (err) {
            return res.status(500).send("Error reading data file")
        };
        let dataFile = JSON.parse(data);
        dataFile.pages = dataFile.pages.filter(page => !deletedIds.includes(page.firstPage.id));       
        
        dataFile.pages.forEach(function(item, index){
            item.id = index+1
        });
        fs.writeFile(filePath, JSON.stringify(dataFile), (err)=>{
            if (err) {
                return res.status(500).send("Failed to write data")} 
            res.send("data remove successfully")    
        })
    })
})


app.post('/delete', (req, res)=>{
    console.log("Received delete request with body:", req.body);
    const deletedIds = req.body.ids;
    const filePath = '../src/assets/database.json';
    fs.readFile(filePath, (err, data)=>{
        if (err) {
            return res.status(500).send("Error reading data file")
        };
        let dataFile = JSON.parse(data);
        dataFile.pages = dataFile.pages.filter(page => !deletedIds.includes(page.firstPage.id));       
        
        dataFile.pages.forEach(function(item, index){
            item.id = index+1
        });
        fs.writeFile(filePath, JSON.stringify(dataFile), (err)=>{
            if (err) {
                return res.status(500).send("Failed to write data")} 
            res.send("data remove successfully")    
        })
    })
})




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
