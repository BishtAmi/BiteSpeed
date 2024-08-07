const { client } = require("../db"); // get a prisma client from db.js

// post contacts data to db
async function postContact(req, res) {
	try {
		const {
			phoneNumber,
			email,
			linkedId,
			linkPrecedence,
			createdAt,
			updatedAt,
			deletedAt,
		} = req.body;
		if (!phoneNumber && !email) {
			return res
				.status(400)
				.json({ msg: "Either phoneNumber or email is required" });
		}

		// Create a new contact
		const response = await client.contact.create({
			data: {
				phoneNumber: phoneNumber || null,
				email: email || null,
				linkedId: linkedId || null,
				linkPrecedence: linkPrecedence || "primary", // Default to 'primary' if not provided
				createdAt: createdAt || new Date(),
				updatedAt: updatedAt || new Date(),
				deletedAt: deletedAt || null,
			},
		});
		res.status(200).json({ response, msg: "record saved" });
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
}

// get a new contact
async function getContact(req, res) {
	try {
		const response = await client.contact.findMany({});
		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
}

module.exports = {
	getContact,
	postContact,
};
