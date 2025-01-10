require('dotenv').config();
const http = require('http');
const express  = require('express');
const { Server } = require('socket.io');
const cors = require("cors");
const { authAndFetchData,fetchBookMarkData,fetchId, fetchTodoList} = require('./mongo1');
const {updateTodoList, UpdateBookMarkFunc} = require('./mongo2');
const {fetchHabitsList , updateHabits, fetchNotes, accountChecker, createAccountuserData, createAccounthabitsData} = require('./mongo3');
const {updateNotes} = require('./mongo4');
const { sendMail } = require('./utils/EmailSender');
const { uploadPhoto } = require('./supbase1');
const { createAccountnotesData, createAccountbookmarksData, deleteNotes } = require('./mongo5');
const bcrypt = require("bcrypt");



const app = express()
app.use(cors());
const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        // origin: process.env.CORS_URL,
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", async (socket) => {
    //socket ons

    socket.on("createAccount", async (name, email, password, pfp, isMarketingAgreed, currentIP) => {
        try {
          // Check if the account already exists
          const isAccountThere = await accountChecker(email);
          if (isAccountThere) {
            console.log("Account already exists.");
            return socket.emit("accountExists", null);
          }
      
          // Upload the photo if provided, else set it to null
          let photoLink = null;
          if (pfp) {
            try {
            const base64String = pfp
            photoLink = await uploadPhoto(base64String);
            if (photoLink) {
                console.log("Photo link:", photoLink);
              } else {
                console.error("Failed to upload photo or retrieve link.");
              }
            } catch (error) {
              console.error("Error uploading photo:", error.message);
              return socket.emit("error", "Photo upload failed.");
            }
          }
      
          const saltRounds = 10; // Recommended value for security
          const hashedPassword = await bcrypt.hash(password, saltRounds);

          // Create user data
          const userData = await createAccountuserData(name, email, hashedPassword, photoLink, isMarketingAgreed, currentIP);
          console.log("userData", userData)
          if (!userData) {
            return socket.emit("error", "Failed to create account data.");
          }
      
          // Create habits data
          const habitsData = await createAccounthabitsData(userData);
          console.log("habitsData", habitsData)
          if(!habitsData) {
            return socket.emit("error", "Failed to create habits data.");
          }
      
          // Create notes data
          const notesData = await createAccountnotesData(userData);
          console.log("notesData", notesData)
          if (!notesData) {
            return socket.emit("error", "Failed to create notes data.");
          }
      
          // Create bookmarks data
          const bookmarksData = await createAccountbookmarksData(userData);
          console.log("bookmarksData", bookmarksData)
          if (!bookmarksData) {
            return socket.emit("error", "Failed to create bookmarks data.");
          }
      
          // All data created successfully, emit success
          console.log("Everything created successfully.");
          socket.emit("accountCreated", true);
      
        } catch (error) {
          console.error("Error in createAccount:", error.message);
          socket.emit("error", "An unexpected error occurred.");
        }
      });
      

    socket.on("send-otp", async (email, otp) => {
        console.log("Recieved")
        // const text = "Your otp is " + otp;
        if(otp === undefined){

        }else{
          const subject = "Your OTP of MindFlow Is"
        const text = otp
        const emailSent = await sendMail(email, subject, text);
        socket.emit("emailSent", emailSent);
        }
    })

    socket.on("deleteNote", async (id, noteId) => {
        const success = await deleteNotes(id, noteId);
    })

    socket.on("HabitsFetch", async(id) => {
        const data = await fetchHabitsList(id);
        if(data){
        socket.emit("habitsData", data);
        }
    })

    socket.on("todoFetch",async (userId) => {
        console.log(userId)
        const list = await fetchTodoList(userId);
        console.log(list)
        if(list){  
            socket.emit("todoFetchList", list);
        }
    })

    socket.on("bookmarkFetch", async (userId) => {
        console.log("bookmarkFetch", userId)
        const data = await fetchBookMarkData(userId);
          
        if(data){
            socket.emit("dataAfterBookmarkFetch", data);
        }
    })

    socket.on("HabitsUpdate", async (id, data) => {
        console.log(id, data)
        const success = await updateHabits(id, data);
    })

    socket.on("LoginAuth", async (email, password, currentIP) => {
        console.log(email, password,currentIP)
        const userId = await fetchId(email, password, currentIP);
        console.log(userId)
        if(userId === null){
            socket.emit("failedAuth", null);
        }else{
            socket.emit("successAuth", userId);
        }
    })

    socket.on("authCheck",async (userId) => {
        const data = await authAndFetchData(userId);
        if(data){  
              
            socket.emit("dataAfterAuth", data);
        }else{
            // socket.emit("dataAfterAuth", null);
        }
    })

    socket.on("updateBookmark", async(newData, id) => {
        const isDone = await UpdateBookMarkFunc(newData, id)
    })
    
    socket.on("updateTodoList", async (id, list) => {
          
        const updateResult = await updateTodoList(id, list);
        // if (updateResult && updateResult.modifiedCount > 0) {
        //     console.log("Todo list updated successfully.");
        //     // Optionally emit an event to notify the client of the successful update
        //     socket.emit("todoListUpdated", list);
        // } else {
        //     console.log("Failed to update the todo list.");
        // }
    });

    socket.on ("fetchNotes", async (id) => {
        const data = await fetchNotes(id)
        if(data){
              
            socket.emit("dataAfterNotesFetch", data);
        }
    })

    socket.on("updateNotes", async (id, noteId, content) => {
          
        const success = await updateNotes(id, noteId, content);
    })
    
})

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log("Server is Running on " + PORT));
