import express from 'express';
import { signUp, signIn,getChildProfile, updateChildProgress} from '../controllers/childController.js';
import { isAuthenticated } from '../controllers/auth.js';
const router = express.Router();

router.post('/signup', signUp); // Sign-up route
router.post('/signin', signIn); // Sign-in route
router.get("/profile", isAuthenticated, getChildProfile);
router.put("/updateProgress", updateChildProgress);


export default router;