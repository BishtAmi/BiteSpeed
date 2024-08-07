const contacts = require("../controllers/contact");
const identifyContact = require("../controllers/identifyContact");
const express = require("express");
const cors = require("cors");
const router = express.Router();

router.use(cors());

// get and post route for contacts
router.post("/postContact", contacts.postContact);
router.get("/get", contacts.getContact);


// identify the primary and secondary routes
router.post("/identify", identifyContact.identifyContact);

module.exports = router;
