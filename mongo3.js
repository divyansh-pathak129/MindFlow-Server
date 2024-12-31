const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');
const { getClient, closeClient, releaseClient } = require('./clientChecker.js');

async function fetchHabitsList (id) {
    let client = await getClient();
    try{
        const db = client.db("mindflow");
        const collection = db.collection("habitsData");
        const result = await collection.findOne({ ownerId: new ObjectId(id) });
        return result.habitLog  // Return an empty list if no todo list found
    }catch(error){
        console.log("error is coming in the fetchHabitsList", error)
    }finally{
        releaseClient()
        // await closeClient(client);
        // await client.close();
    }
}

async function updateHabits (id, data){
    let client = await getClient();
    try{
        const db = client.db("mindflow");
        const collection = db.collection("habitsData");
        const result = await collection.updateOne({ ownerId: new ObjectId(id) }, { $set: { habitLog: data } });
        console.log(result)
    }catch(error){
        console.log("error is coming in the updateHabits", error)
    }finally{
        releaseClient();
        // await closeClient(client);
        // await client.close();
    }
}

async function fetchNotes (id) {
    let client = await getClient();
    try{
        const db = client.db("mindflow");
        const collection = db.collection("notesData");
        const result = await collection.findOne({ ownerId: new ObjectId(id) });
        return result.notesData  // Return an empty list if no todo list found
    }catch(error){
        console.log("error is coming in the fetchNotes", error)
    }finally{
        releaseClient();
        // await closeClient(client);  
        // await client.close();
    }
}

async function accountChecker(email) {
        let client = await getClient();
        try {
            const db = client.db("mindflow");
            const collection = db.collection("userData");
            const result = await collection.findOne({ email: email });
            return (!!result);
        } catch (error) {
            console.log("Error in the accountChecker", error);
        } finally {
            releaseClient()
            // await closeClient(client);
            // await client.close();
        }
}

async function createAccountuserData (name, email, password, photoLink, isMarketingAgreed, currentIP) {
    let client = await getClient();
    try {
        const db = client.db("mindflow");
        const collection = db.collection("userData");
        const userData = {
            _id: new ObjectId(),
            Name: name,
            RegIP : [currentIP],
            currentSession: currentIP,
            PremiumData: {
                RazorpayId: "",
                ActivationDate: {
                    "$timestamp": {
                        "t": 0,
                        "i": 0
                    }
                },
                endDate: {
                    "$timestamp": {
                        "t": 0,
                        "i": 0
                    }
                },
                month: ""
            },
            email: email,
            isMailVerified: true,
            isPremium: false,
            password: password,
            pfp: photoLink,
            todo: [],
            isMarketingAgreed: isMarketingAgreed,
        }
        const result = await collection.insertOne(userData);
        return userData._id;
    } catch (error) {
        console.log("Error in the createAccount", error);
    } finally {
        releaseClient()
        // await closeClient(client);
        // await client.close();
    }
}

async function createAccounthabitsData (data) {
    let client = await getClient();
    try {
        const db = client.db("mindflow");
        const collection = db.collection("habitsData");
        const userData = {
            _id: new ObjectId(),
            ownerId: data,
            habitLog: []
        }
        const result = await collection.insertOne(userData);
        return userData._id;
    } catch (error) {
        console.log("Error in the createAccount", error);
    } finally {
        releaseClient()
        // await closeClient(client);
        // await client.close();
    }
}

module.exports={fetchHabitsList, updateHabits, fetchNotes, accountChecker, createAccountuserData, createAccounthabitsData}