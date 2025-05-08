
import Profile from './Profile/Profile'
import userData from '../userData.json'
import friends from '../friends.json'
import transactions from'../transactions.json'
import FriendList from './FriendList/FriendList'
import TransactionHistory from './TransactionHistory/TransactionHistory'
import ContactForm from './ContactForm/ContactForm'
import SearchBox from './SearchBox/SearchBox'
import ContactList from './ContactList/ContactList'
{/* <TransactionHistory /> */}
import './App.css'
// import CustomButton from './CustomButton'
import { useState, useEffect} from 'react';
import Description from './Description/Descriptin'
import Options from './Options/Options'
import Feedback from './Feedback/Feedback'
import Notification from './Notification/Notification'


function App() {


  // 1. Початковий стан з локального сховища
  const [feedback, setFeedback] = useState(() => {
    const saveFeedback = window.localStorage.getItem('feedback');// перевіряємо, чи є збережені дані
    return saveFeedback ? JSON.parse(saveFeedback) : { good: 0, neutral: 0, bad: 0 } // якщо є - використовуємо їх, якщо немає - 0

  });
  

  // 2. Функція для оновлення відгуків
  const updateFeedback = (key) => {
    setFeedback(prev => {
      const newFeedback = { ...prev, [key]: prev[key] + 1 } // оновлюємо відповідний відгук
      window.localStorage.setItem('feedback', JSON.stringify(newFeedback)) // зберігаємо оновлені дані в локальне сховище
      return newFeedback;// повертаємо нові дані для оновлення стану

    })
  }
  
  // 3. Функція для скидання відгуків
  const resetFeedback = () => {
    const resetData = {
      good: 0,
      neutral: 0,
      bad: 0
    };
    setFeedback(resetData); //скидаємо стан
    window.localStorage.setItem('feedback', JSON.stringify(resetData))
  }
  //   const updateFeedback = (key) => {
  //   if (key === 'good') {
  //     setFeedback(prev => ({
  //       ...prev,                // Копіюємо всі попередні значення
  //       good: prev.good + 1,    // Оновлюємо лише 'good'
  //     }));
  //   } else if (key === 'neutral') {
  //     setFeedback(prev => ({
  //       ...prev,                // Копіюємо всі попередні значення
  //       neutral: prev.neutral + 1,  // Оновлюємо лише 'neutral'
  //     }));
  //   } else if (key === 'bad') {
  //     setFeedback(prev => ({
  //       ...prev,                // Копіюємо всі попередні значення
  //       bad: prev.bad + 1,      // Оновлюємо лише 'bad'
  //     }));
  //   }
  // };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100)
  //=======================================================================================================================
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]

  
  const [contacts, setContacts] = useState(() => {
    const saveContacts = localStorage.getItem('contacts');
    return saveContacts ? JSON.parse(saveContacts) : initialContacts
  }
  )

   useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  const [filter, setFilter] = useState('')
  
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLocaleLowerCase()))

  const handleChange = (e) => { setFilter(e.target.value) }
  
  const deletContact = (id) => {
    setContacts(prevContact => prevContact.filter(contact => contact.id !== id))//залишаємо лише ті контакти, у яких id НЕ дорівнює тому id, який треба видалити.
  }

  const onAddContact = (newContact) => {
    const contactToAdd = { id: newContact.id, ...newContact };
    setContacts(prevContacts => [...prevContacts, newContact])
  }

//=======================================================================================================================
  return (
    <>
     
        <Profile
         name={userData.username}
        tag={userData.tag}
        location={userData.location}
        image={userData.avatar}
        stats={userData.stats} />
      <FriendList friends={friends} />
      <TransactionHistory items={transactions} />
      <div style={{
        marginTop: 15,
        marginLeft: 125,
        marginRight: 125,
        padding: "12px 16px",
        borderRadius: 4,
        border: "1px solid black",
        maxWidth: 600,
        margin: "0 auto",
      }}>
        <Description />
        <Options updateFeedback={updateFeedback} resetFeedback={resetFeedback } totalFeedback={totalFeedback}/>
        {/* <Notification massage='No feedback yet' /> */}
        {totalFeedback > 0 ? (
          <Feedback feedback={feedback} positiveFeedback={positiveFeedback} totalFeedback={totalFeedback} />) : 
          (<Notification massage = "No feedback yet" />)}
      </div>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAdd={onAddContact} />
        <SearchBox filter={filter} onChange={handleChange}/>
        <ContactList contacts={filteredContacts} onDelete={deletContact}  />
      </div>
      
    </>
  )
}

export default App
