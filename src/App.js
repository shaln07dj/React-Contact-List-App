import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { useState,useEffect } from 'react'
import useFetch from 'react-fetch-hook'
import ContactCards from './ContactCard'
import ContactModal from './ContactModal'

const App=()=> {

    const url='https://randomuser.me/api'
    let data1=''
    const [contactList,setContactList]=useState([])
    const [selectedContact, setSelectedContact] = useState(null)
    const [filterQuery,setFilterQuery]=useState(null)
    const{isLoading,data,error}=useFetch(`${url}?results=200`)
 data && console.log('hello',data)
   



    useEffect(()=>{
        if (!filterQuery) {
            setContactList(data?.results?.slice(0, 200))
          } else {
            const queryString = filterQuery.toLowerCase()
            const filteredData = data?.results?.filter(contact => {
              const fullName = `${contact.name.first} ${contact.name.last}`
      
              // if it's just one letter, return all names that start with it
              if (queryString.length === 1) {
                const firstLetter = fullName.charAt(0).toLowerCase()
                return firstLetter === queryString
              }
              else {
                return fullName.toLowerCase().includes(queryString)
              }
            })
            setContactList(filteredData)
          }
        }, [data, filterQuery])
    console.log(contactList)







    return (
        <div className="bg-gray-100">
       <section>
           <form>
               <input
               type="text"
               onChange={(event)=>
                setFilterQuery(event.target.value)
               }
               className="ml-20 mt-6 rounded-md p-2"
               placeholder="type here to filter..."/>
           </form>

       </section>
       <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-10 md:p-20 lg:p-20">
           
            <ContactCards contact_info={contactList} setSelectedContact={setSelectedContact}/>
        
            </section>
            <AnimatePresence>
        {selectedContact &&
          <ContactModal
            contact={selectedContact}
            setSelectedContact={setSelectedContact}
          />
        }
      </AnimatePresence>
            
        </div>
    )
}

export default App
