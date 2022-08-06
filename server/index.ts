import express from "express";
import cors from "cors";
import sequelize from "./models/index.js";
import Router from "./router.js";
import session from "express-session";
import fileUpload from "express-fileupload";

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const maxAge = process.env.MAX_AGE ? parseInt(process.env.MAX_AGE) : 3600000;
const secret = process.env.SESSION_SECRET || "secret123";
const PORT = 3001;

app.use(cors(corsOptions));

app.use(express.json());

app.use(
  fileUpload({
    createParentPath: true,
  })
);


const sessionOptions = {
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

(async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}.`);
    });
  } catch (err) {
    console.log("error in server: ", err);
  }
})();
