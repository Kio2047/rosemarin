import express from "express";
import cors from "cors";
import sequelize from "./models/index";
import Router from "./router";
import session, { SessionOptions } from "express-session";
import './types/session'
import fileUpload from "express-fileupload";;

const app = express();
const maxAge = process.env.MAX_AGE ? parseInt(process.env.MAX_AGE) : 3600000;
const secret = process.env.SESSION_SECRET || "secret123";
const PORT = 3001;
const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

(async () => {
  try {
    await sequelize.sync({ force: false });
  } catch (error) {
    console.log("Database connection failed: ", error);
  }
})();



app.use(cors(corsOptions));

app.use(express.json());

app.use(
  fileUpload({
    createParentPath: true,
  })
  );
  
  
  const sessionOptions: SessionOptions = {
    name: 'sid',
    secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge,
      sameSite: true,
      httpOnly: false,
      // we would want to set secure=true in a production environment
      secure: false,
    },
  }
  
  
  app.use(
    session(sessionOptions)
    );
    
    app.use(Router);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
  });
    