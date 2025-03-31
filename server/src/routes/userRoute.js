import { Router } from "express";
const router = Router();

import * as userController from "../controllers/userController.js";
import * as userMiddleware from "../middlewares/userMiddleware.js";
router.post(
  "/register",
  userMiddleware.registerMiddleware,
  userController.createUserController
);

router.post('/login',
  userMiddleware.loginUserMiddleware,
  userController.loginUserController
)
router.get('/profile',userMiddleware.authUser,(req,res)=>{
  res.json(req.user)
});
router.get('/logout',
  userMiddleware.authUser,
  userController.logoutController
)
export default router;
