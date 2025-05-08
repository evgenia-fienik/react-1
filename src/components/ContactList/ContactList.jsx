import Contact from '../Contact/Contact'

export default function ContactList({contacts, onDelete}) {
    return(
        <ul>
            
            {contacts.map(({ id, name, number }) => (
                <li key={id}>
                    <Contact  name={name} number={number} onDelete={()=> onDelete(id)} />
                </li>
                
            ))  }
            
       
        </ul>
    )
}
