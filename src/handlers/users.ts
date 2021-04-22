import { UserStore, User } from "../models/UserStore";
import { Request, Response, Application } from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken";
import { generateJWTToken } from "../util/jwtToken";

const userStore = new UserStore();

const index = async (_req: Request, _res: Response) => {
  const users = await userStore.index();
  _res.status(200).send({
    status: "success",
    data: users
  });
};

const login = async (_req: Request, _res: Response) => {
  const { email, password } = _req.body;
  const existingUserInDatabase = await userStore.authenticate(email, password);
  if (existingUserInDatabase) {
    _res.status(200).send({
      status: "success",
      token: generateJWTToken({
        email: email
      })
    });
  } else {
    _res.status(401).send({
      status: "failure",
      message: "Invalid user credentials"
    });
  }
};

const create = async (_req: Request, _res: Response) => {
  const user: User = _req.body;
  try {
    const newUser = await userStore.create(user);
    _res.status(200).send({
      status: "success",
      data: newUser
    });
  } catch (error) {
    _res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};

const signup = async (_req: Request, _res: Response) => {
  const user: User = _req.body;
  try {
    const newUser = await userStore.create(user);
    _res.status(200).send({
      status: "success",
      token: generateJWTToken({
        email: newUser.email
      })
    });
  } catch (error) {
    _res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};

const show = async (_req: Request, _res: Response) => {
  const userId = _req.params.id;
  try {
    const user = await userStore.show(parseInt(userId));
    _res.status(200).send({
      status: "success",
      data: user
    });
  } catch (error) {
    _res.status(500).send({
      status: "error",
      message: error.message
    });
  }
};

export const mountUsers = (app: Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", verifyAuthToken, create);
  app.post("/users/login", login);
  app.post("/users/signup", signup);
};
