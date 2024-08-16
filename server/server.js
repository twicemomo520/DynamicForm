const express = require('express');
const fs = require('fs');
const cors = require('cors');

async function getUseEditStore() {
    const { useEditStore } = await import('../src/stores/databaseEdit.js');
    return useEditStore;
  }


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
    console.log("讀取檔案")

    try{
        existingData = JSON.parse(data);
        existingData.pages.forEach(function(item, index){
            item.firstPage.id = index+1
            console.log(`索引 ${index} 更新的 id: ${item.firstPage.id}`)
        })
    }catch(err){
        return res.status(500).json({ message: "Error parsing JSON data", error: err });
    }
    



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


app.post('/edit-data', (req, res) => {
    const newData = req.body;
    const filePath = "../src/assets/database.json"; 
    fs.readFile(filePath, (err, data) =>{
        
        if(err){
            return res.status(500).json({ message: "Error reading data file", error: err });
        }

    const existingData = JSON.parse(data);
    existingData.pages.forEach(function(item, index){
        if (newData.firstPage.id == item.firstPage.id){
            existingData.pages[index] = newData
        }
    })


    // 将更新后的数据写回文件
    fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to save data', error: err });
        }
        res.send({ message: 'Data updated  successfully' });
        })
    
    const useEditStore = getUseEditStore();
    useEditStore.databaseEdit = true;

    });
});

app.post('/delete', (req, res)=>{
    console.log("Received delete request with body:", req.body);
    const deletedIds = req.body.ids;
    const filePath = '../src/assets/database.json';
    fs.readFile(filePath, (err, data)=>{
        console.log("讀取檔案")
        if (err) {
            return res.status(500).send("Error reading data file")
        };
       
        let dataFile = JSON.parse(data);
        dataFile.pages = dataFile.pages.filter(page => !deletedIds.includes(page.firstPage.id));       
        

        dataFile.pages.forEach(function(item, index){
            item.firstPage.id = index+1
            console.log(`索引 ${index} 更新的 id: ${item.firstPage.id}`)
        });
        fs.writeFile(filePath, JSON.stringify(dataFile), (err)=>{
            if (err) {
                return res.status(500).send("Failed to write data")} 
            res.send("data remove successfully")    
        })
    })
})

app.post('/deleteSingle', (req, res)=>{
    console.log("Received delete request with body:", req.body);
    const deletedIds = req.body.ids;
    const filePath = '../src/assets/database.json';
    fs.readFile(filePath, (err, data)=>{
        console.log("讀取檔案")
        if (err) {
            return res.status(500).send("Error reading data file")
        };
       
        let dataFile = JSON.parse(data);
        dataFile.pages = dataFile.pages.filter(page => String(page.firstPage.id) !== String(deletedIds));       
        console.log("刪除",deletedIds)

        dataFile.pages.forEach(function(item, index){
            item.firstPage.id = index+1
            // console.log(`索引 ${index} 更新的 id: ${item.firstPage.id}`)
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
