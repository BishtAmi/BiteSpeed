const { client } = require('../db');

// identify the contacts
async function identifyContact(req, res) {
	try {
		const { phoneNumber, email } = req.body;
		if (!phoneNumber && !email) {
			// check if there is the either of them are valid
			return res.status(400).json('either phoneNumber or email is required');
		}

		// retrieve if there is any contacts having the email or phoneNumber
		const contacts = await client.contact.findMany({
			where: {
				OR: [
					{ phoneNumber: phoneNumber },
					{
						email: email,
					},
				],
			},
		});

		let primaryContact; // to store primary contacts
		let secondaryContacts = []; // to store secondary contacts

		if (contacts.length > 0) {
			primaryContact = contacts.find(
				(contact) => contact.linkPrecedence === 'primary',
			);

			if (!primaryContact) {
				primaryContact = contacts[0];
				primaryContact.linkPrecedence = 'primary';
			}
			secondaryContacts = contacts.filter(
				(contact) => contact.linkPrecedence === 'secondary',
			);
		}

		// if there is no primary contact save the contact as primary
		if (!primaryContact) {
			primaryContact = await client.contact.create({
				data: {
					email: email || null,
					phoneNumber: phoneNumber || null,
					linkPrecedence: 'primary',
				},
			});
		} else {
			// if its already exits but a new secondary account
			let isExist = false;
			for (const i in secondaryContacts) {
				const secondary = secondaryContacts[i];
				if (secondary.email == email && secondary.phoneNumber == phoneNumber) {
					isExist = true;
				}
			}

			if (!isExist) {
				// if the contact not exist then create a new secondary contact
				const secondaryContact = await client.contact.create({
					data: {
						email: email || null,
						phoneNumber: phoneNumber || null,
						linkedId: primaryContact.id,
						linkPrecedence: 'secondary',
					},
				});
				secondaryContacts.push(secondaryContact);
			}
		}
		const emails = [
			primaryContact.email,
			...secondaryContacts.map((contact) => contact.email),
		].filter(Boolean);
		const phoneNumbers = [
			primaryContact.phoneNumber,
			...secondaryContacts.map((contact) => contact.phoneNumber),
		].filter(Boolean);
		const secondaryContactIds = secondaryContacts.map((contact) => contact.id);

		res.json({
			contact: {
				primaryContatctId: primaryContact.id,
				emails: emails,
				phoneNumbers: phoneNumbers,
				secondaryContactIds: secondaryContactIds,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

module.exports = {
	identifyContact,
};
