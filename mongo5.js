const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');
const { getClient, closeClient, releaseClient } = require('./clientChecker.js');

async function createAccountnotesData (data) {
    let client = await getClient();
    try {
        const db = client.db("mindflow");
        const collection = db.collection("notesData");
        const userData = {
            _id: new ObjectId(),
            ownerId: data,
            notesData: []
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

async function createAccountbookmarksData (data){
    let client = await getClient();
    try {
        const db = client.db("mindflow");
        const collection = db.collection("bookmarks");
        const userData = {
            _id: new ObjectId(),
            ownerId: data,
            bookmarks: []
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

async function deleteNotes (id, noteId) {
    let client = await getClient();
    try {
        const db = client.db("mindflow");
        const collection = db.collection("notesData");
        console.log("id", id, "noteId", noteId)
        const ownerId = new ObjectId(id);
        const result = await collection.updateOne({ownerId: ownerId}, {$pull: {notesData: {noteId: noteId}}});
        console.log(!!result)
    } catch (error) {
        console.log("Error in the createAccount", error);
    } finally {
        releaseClient()
        // await closeClient(client);
        // await client.close();
    }
}

module.exports = {createAccountnotesData, createAccountbookmarksData, deleteNotes}