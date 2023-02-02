import express from "express";
import { Register, Login, Logout } from "../controller/User";

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);

export default router;