// authRoutes.js
import express from "express";
// import { Users } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

// authRouter.post("/signIn", function (req, res) {
//   if (!req.body.password) {
//     return res.json({ success: false, message: "Password was not given" });
//   }

//   // Explicitly call the authenticate middleware
//   passport.authenticate("local", function (err, user, info) {
//     if (err) {
//       return res.json({ success: false, message: err });
//     }

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "Username or password incorrect",
//       });
//     }

//     // If authentication is successful, manually log in the user
//     req.login(user, (er) => {
//       if (er) {
//         return res.json({ success: false, message: er });
//       }

//       // User is now logged in, generate JWT token
//       const token = jwt.sign(
//         { userId: user._id, username: user.email },
//         process.env.session_key, // Replace with your actual secret key
//         { expiresIn: "24h" }
//       );
//       console.log("auth succ");
//       return res.json({
//         success: true,
//         message: "Authentication successful",
//         token: token,
//       });
//     });
//   })(req, res); // Pass the request and response objects to the middleware
// });

// authRouter.post("/signUp", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const newUser = new Users({ email });
//     await Users.register(newUser, password, (err, user) => {
//       if (err) {
//         res.json({
//           success: false,
//           message: `Your account could not be saved: ${err}`,
//         });
//       } else {
//         req.login(user, (er) => {
//           if (er) {
//             res.json({ success: false, message: er });
//           } else {
//             res.json({ success: true, message: "Your account has been saved" });
//           }
//         });
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error registering user.");
//   }
// });

// authRouter.get("/signOut", (req, res) => {
//   req.logout();
//   res.send("User logged out.");
// });

export default authRouter;
