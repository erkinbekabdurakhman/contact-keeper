import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import contactReducer from '../../Context/contact/contactReducer';

const Home = () => {
    return(
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts key={contactReducer.id} />
            </div>
        </div>
    )
}

export default Home;