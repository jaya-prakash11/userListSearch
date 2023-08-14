import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [usersData, setUserData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchList, setSearchList] = useState([])
  const [gender, setGender] = useState(null)

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=50').then((response) => {
      setUserData(response.data.results)
      setSearchList(response.data.results)
    })
  }, [])

  function getSearchResults(gender) {
    if (searchText.length > 0 ) {
      console.log('insde a')
      let searchedUsers = usersData.filter((res, index) => {
        if (res.name.first.includes(searchText)) {
          return true
        }
          return false
      })

      if (gender == 'male' || gender == 'female') {
        setGender(gender)
        console.log('inside b')
        let genderResult = searchedUsers.filter(res => {
          if (res.gender == gender) {
            return true
          }
          return false
        })
        setSearchList(genderResult)
      } else {
        setSearchList(searchedUsers)
      }

    } else {
      
      if (gender == 'male' || gender == 'female') {
        setGender(gender)
        console.log('inside b')
        let genderResult = usersData.filter(res => {
          if (res.gender == gender) {
            return true
          }
          return false
        })
        setSearchList(genderResult)
      } else {
        setSearchList(usersData)
      }


    }
    
  }
  
  return (
    <>
      <div>
        <h1>User List {searchList.length} </h1>
        <input onChange={(e)=>setSearchText(e.target.value)} type="text"></input>
        <button onClick={getSearchResults}>search</button>
        <input type="radio" onChange={()=>getSearchResults('male')} checked={gender === "male"} />
        <label>male</label>
        <input type="radio"  onChange={()=>getSearchResults('female')}  checked={gender === "female"} />
        <label>Female</label>
        {searchList.map((res, index) => {
          return (
            <div key={index+23}>
              {res.name.first}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
