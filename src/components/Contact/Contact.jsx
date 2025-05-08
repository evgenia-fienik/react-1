import { FaUser } from "react-icons/fa"
import { FaPhoneAlt } from "react-icons/fa"
import css from './Contact.module.css'
export default function Contact({name, number, onDelete}) {
    return ( 
            <div className={css.container} >
                <div className={css.item}>
                    <p className={css.element}><FaUser /> { name}</p>
                    <p className={css.element}><FaPhoneAlt /> { number}</p>
                </div>
                <button className={css.btn} onClick={onDelete}>Delete</button>
            </div>  
    )
       
}