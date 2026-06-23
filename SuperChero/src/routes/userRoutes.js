import { Router } from "express";
import { 
    createUser,
    findUsers, 
    findUserById, 
    editUser, 
    removeUser 
} from "../controllers/userController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authenticate, authorize("admin"));

router.get("/", findUsers);
router.get("/:id", findUserById);
router.post("/", createUser);    
router.patch("/:id", editUser);
router.delete("/:id", removeUser);

export default router;