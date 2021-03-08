import { useContext, useState } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/RegisterModal.module.css'

export default function RegisterModal() {
  const [username,setUsername] = useState(null)

 const {setUser} = useContext(ChallengesContext)

  async function handleSetUser() {
    try {
        const res = await fetch(`https://api.github.com/users/${username}`)
        const {name} = await res.json()

        if (name) {
            setUser(name,username)
        } else {
            setUser(username,username)
        }
    } catch (error) {
        setUser(username,username)
    }
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div>
        <img src=" https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png" alt="github" />
       
        <input type="text" onChange={e => setUsername(e.target.value)} placeholder="Github username" />
        </div>
        <div>

        <button type="button" onClick={handleSetUser}>
            Set User
        </button>
        </div>
      </div>
    </div>
  )

  }