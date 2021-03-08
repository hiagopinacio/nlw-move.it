import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level, name, username, setUser } = useContext(ChallengesContext)
    const img_url  = `https://github.com/${username}.png`
    return (
        <div className={styles.profileContainer} onClick={() => setUser(null, null)}>
            <img src={img_url} alt="foto do perfil" />
            <div>
                <strong>{name}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    )

}