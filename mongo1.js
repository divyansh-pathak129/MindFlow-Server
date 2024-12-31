const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');
const { getClient, closeClient, releaseClient } = require('./clientChecker.js');
const bcrypt = require('bcrypt');

async function authAndFetchData (userId) {
    
    let client = await getClient();

    try{
        const db = client.db("mindflow");
        const collection = db.collection("userData");

        const query = { _id: new ObjectId(userId) };
        const result = await collection.findOne(query);
        return result;
    } catch (error) {
        console.log(error);
    }finally{
         releaseClient();
        // await closeClient(client);  
        // await client.close();

    }
}


// async function updateTodoList (userId, list) {
//     let client = await getClient();
//     try {
//         const db = client.db("mindflow");
//         const collection = db.collection("userData");
//         // const query = { _id: new ObjectId(userId) };
//         const query = await collection.findOne({ _id: new ObjectId(userId) });
//           
//           

//         const result = await collection.updateOne({ _id: new ObjectId(userId) }, { $set: { todo: list } });
//         console.log("result", result)
        
//     } catch (error) {
//         console.log(error);
//     } finally {
//         await closeClient(client);
//         await client.close();
//     }
// }

async function fetchBookMarkData(userId) {
    let client = await getClient();
    try {
        const db = client.db("mindflow");
        const collection = db.collection("bookmarks");

        // Find documents where ownerId matches and project only the bookmarks field
        // const query = { ownerId: new ObjectId(userId) };
        const query = await collection.findOne({ ownerId: new ObjectId(userId) });
        // const projection = { bookmarks: 1, _id: 0 }; // Include only the bookmarks field


        // Return just the array of bookmarks
          // Find documents where ownerId matches and project only the bookmarks field
        //   const projection = { bookmarks: 1, _id: 0 }; // Include only the bookmarks field
  
        //   const result = await collection.find(query, { projection });

        // const result = query.bookmarks;
        // Return just the array of bookmarks
        return query.bookmarks;

    } catch (error) {
        console.log("Error fetching bookmark data:", error);
        return [];
    } finally {
         releaseClient();
        // await closeClient(client);
        // await client.close();
    }
}

// async function fetchTodoList(userId) {
//     let client = await getClient();
//     try {
//         const db = client.db("mindflow");
//         const collection = db.collection("userData");
//         // const query = { _id: new ObjectId(userId) };
//         // const result = await collection.findOne(query);
//         const result = await collection.findOne({ _id: new ObjectId(userId) });
//         return result.todo;
//     } catch (error) {
//         console.log(error);
//     } finally {
//         await closeClient(client);
//         await client.close();
//     }
// }

async function fetchTodoList(userId) {
    let client = await getClient();
    try {
        const db = client.db("mindflow");
        const collection = db.collection("userData");
        const result = await collection.findOne({ _id: new ObjectId(userId) });
        return result ? result.todo : [];  // Return an empty list if no todo list found
    } catch (error) {
        console.log("Error in fetchTodoList:", error);
    } finally {
        releaseClient()
        // await closeClient(client);
    }
}



async function fetchId (email, password, currentIP) {
    let client = await getClient();
    try {
        const db = client.db("mindflow");
        const collection = db.collection("userData");
        const query = { email: email };
        const result = await collection.findOne(query);

        console.log(result);

        const isMatch = await bcrypt.compare(password, result.password);
        console.log("Is Match:", isMatch);

        if(isMatch === true){
            if(result.currentSession === currentIP) {
                  
                return result._id;
            }else{
                const updateResult = await collection.updateOne({ _id: result._id }, { $set: { currentSession: currentIP } });
                if (updateResult.modifiedCount > 0) {
                      
                    return result._id;
                } else {
                    return null;
                }
                // return result._id;
            }
        }

        // if(result){
        //     const isMatch = await bcrypt.compare(password, result.password);
        //     console.log(isMatch);

        // if(isMatch){
        //     if(result.currentSession === currentIP) {
        //         console.log("Permission Granted");
        //         return result._id;
        //     }else{
        //         const updateResult = await collection.updateOne({ _id: result._id }, { $set: { currentSession: currentIP } });
        //         if (updateResult.modifiedCount > 0) {
        //             console.log("Permission Granted");
        //             return result._id;
        //         } else {
        //             return null;
        //         }
        //         // return result._id;
        //     }
        // }else{
        //     console.log("Password does not match")
        // }
        // }
    } catch (error) {
        console.log(error);
    } finally {
        releaseClient()
        // await closeClient(client);
        // await client.close();
    }
}

module.exports = { authAndFetchData,fetchBookMarkData, fetchId, fetchTodoList }


 // Ensure ObjectId is imported
// Find documents where ownerId matches and project only the bookmarks field
//   const query = { ownerId: new ObjectId(userId) };
//   const projection = { bookmarks: 1, _id: 0 }; // Include only the bookmarks field

//   const result = await collection.find(query, { projection }).toArray();

// async function authAndFetchData (userId) {
    
//     try{

//         let client = await getClient();
//         console.log(client)

//         const db = client.db("mindflow");
//         const collection = db.collection("userData");

//         const query = { _id: new ObjectId(userId) };
//         const result = await collection.findOne(query);
//         return result;
//     } catch (error) {
//         console.log(error);
//     }finally{
//         await closeClient(client);
//         await client.close(); 
//     }
// }
