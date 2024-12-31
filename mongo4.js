const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');
const { getClient, closeClient, releaseClient } = require('./clientChecker.js');

// async function updateNotes(id, noteId, content) {
//     let client;
  
//     try {
//       client = await getClient(); // Obtain a fresh MongoDB client
//       const db = client.db("mindflow");
//       const collection = db.collection("notesData");
  
//       const findValue = await collection.findOne({
//         ownerId: new ObjectId(id),
//         "notesData.noteId": noteId,
//       });
//       const isNoteExist = findValue?.notesData?.find((note) => note.noteId === noteId);
  
//     //   if (isNoteExist) {
//     //     // If the note exists, update the existing note entry
//     //     await collection.updateOne(
//     //       { ownerId: new ObjectId(id), "notesData.noteId": noteId },
//     //       { $set: { "notesData.$": content } }
//     //     );
//     //   } else {
//     //     // If the note doesn't exist, push a new note entry into notesData
//     //     await collection.updateOne(
//     //       { ownerId: new ObjectId(id) },
//     //       {
//     //         $push: {
//     //           notesData: {
//     //             $each: [content],
//     //             $sort: { updatedAt: -1 },
//     //           },
//     //         },
//     //       }
//     //     );
//     //   }

//     if(isNoteExist){
//         const result = await collection.updateOne({ ownerId: new ObjectId(id), "notesData.noteId": noteId }, { $set: { "notesData.$": content } });
//     }else{
//         const result = await collection.updateOne({ ownerId: new ObjectId(id) }, { $push: { notesData: { $each: [content], $sort: { updatedAt: -1 } } } });
//     }
//     } catch (error) {
//       console.error("Error in updateNotes:", error);
//     } finally {
//       // Make sure this doesn't double-close the client:
//       if (client) {
//         // If closeClient() already calls client.close(), remove the extra close below.
//         await closeClient(client);
//         await client.close();
//       }
//     }
//   }

// ...existing code...
async function updateNotes(id, noteId, content) {
  let client = await getClient();
  try {
    const db = client.db("mindflow");
    const collection = db.collection("notesData");

    // Avoid pushing null content
    if (!content) return;

    const findValue = await collection.findOne({
      ownerId: new ObjectId(id),
      "notesData.noteId": noteId,
    });
    const isNoteExist = findValue?.notesData?.some((note) => note.noteId === noteId);

    if (isNoteExist) {
      await collection.updateOne(
        { ownerId: new ObjectId(id), "notesData.noteId": noteId },
        { $set: { "notesData.$": content } }
      );
    } else {
      await collection.updateOne(
        { ownerId: new ObjectId(id) },
        {
          $push: {
            notesData: {
              $each: [content],
              $sort: { updatedAt: -1 }
            }
          }
        }
      );
    }
  } catch (error) {
    console.error("Error in updateNotes:", error);
  } finally {
    // await closeClient(client);
    releaseClient();
  }
}
// ...existing code...

  module.exports={updateNotes}