const express = require('express');
const router = express.Router()
const User = require('../models/User');
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');

// route    GET api/contact
// desc     Get all users
// access   Private
router.get('/', auth, async (req, res) => {

    try{
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });

        res.json(contacts);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// route    POST api/contact
// desc     Get all users
// access   Private
router.post('/', 
    [
        auth, 
        [ check('name', 'Name is Required').not().isEmpty() ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, type } = req.body;

        try{
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });

            const contact = await newContact.save(); // waiting until contact saved in DB
            res.json(contact);

        } catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// route    PUT api/contacts/:id
// desc     Update contact
// access   Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    //Build Contact Object
    const contactField = {};
    if(name) contactField.name = name;
    if(email) contactField.email = email;
    if(phone) contactField.phone = phone;
    if(type) contactField.type = type;
    
    try{
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: "Contact Not found"});
        
        // Make sure User owns contacts
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized.' })
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactField }, { new: true});
        res.json(contact);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// route    DELETE api/contacts/:id
// desc     Delete contact
// access   Private
router.delete('/:id', auth, async (req, res) => {

    try{
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: "Contact Not found"});
        
        // Make sure User owns contacts
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized.' })
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: "Contact removed" });
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
