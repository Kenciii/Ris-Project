import express from "express";
import {
    getMobiles,
    postMobile,
    getOneMobile,
    deleteMobile,
    updateMobile,
    getComments,
    postComment,
    deleteComment,
    searchMobiles,
    createReservation,
    getReservations
} from "../controller/mobiles.js";

const router = express.Router();

router.get("/search", searchMobiles);               
router.get("/comments/:id", getComments);           
router.get("/:id", getOneMobile);                   
router.delete("/:id", deleteMobile);
router.patch("/:id", updateMobile);
router.post("/comments", postComment);
router.delete("/comments/:id", deleteComment);
router.post("/reservations", createReservation);    
router.get("/reservations", getReservations);       
router.get("/", getMobiles);                       
router.post("/", postMobile);

export default router;
