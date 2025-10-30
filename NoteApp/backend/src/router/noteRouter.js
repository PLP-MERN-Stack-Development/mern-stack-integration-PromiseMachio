import express from "express";
const router = express.Router();
import{ getAllNotes,getOneNote,createNotes,updateNotes,deleteNotes } from "./controller/noteController.js"

router.get("/",getAllNotes);
router.get("/:id",getOneNote)
router.post("/",createNotes);
router.put("/:id",updateNotes);
router.delete("/:id",deleteNotes);

    
export default router;


