const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');
const { getClient, closeClient, releaseClient } = require('./clientChecker.js');

// async function updateTodoList (userId, list) {
//     let client = await getClient();
//     try{
//         const db = client.db("mindflow");   
//         const collection = db.collection("userData");
//         const result = await collection.updateOne({ _id: new ObjectId(userId) }, { $set: { todo: list } });
        
//     }catch(error){
//         console.log(error)
//     }finally{
//         await closeClient(client);
//         await client.close();
//     }
// }

async function updateTodoList(userId, list) {
    let client = await getClient();
    try {
        const db = client.db("mindflow");
        const collection = db.collection("userData");

        // Use findOneAndUpdate to update and retrieve the updated document in one go
        const result = await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { todo: list } }
        );

        console.log("Updated Todo List");  // Log the updated todo list
        return result.value ? result.value.todo : null;  // Return the updated todo list or null if not found
    } catch (error) {
        console.log("Error in updateTodoList:", error);
    } finally {
        releaseClient()
    }
}

async function UpdateBookMarkFunc (newData, id) {
    let client = await getClient();
    try {
        const db = client.db("mindflow");
        const collection = db.collection("bookmarks");
        const query = await collection.findOne({ ownerId: new ObjectId(id)});
        const result = await collection.updateOne({ ownerId: new ObjectId(id) }, { $set: { bookmarks: newData } });
        console.log(result)
    } catch (error) {
        console.log("Error in updateTodoList:", error);
    } finally {
        releaseClient()
    }
}


module.exports={updateTodoList, UpdateBookMarkFunc}