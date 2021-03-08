import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges.json"
import LevelUpModal from '../components/LevelUpModal'
import RegisterModal from '../components/RegisterModal'
interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}


interface ChallengesContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    name: string,
    username: string,
    levelUp: () => void,
    startNewChallenge: () => void,
    activeChallenge: Challenge,
    resetChallenge: () => void,
    experieceToNextLevel: number,
    completeChallenge: () => void,
    closeLevelUpModal: () => void,
    setUser: (name:string, username: string) => void,
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    name: string,
    username: string
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
    const [name, setName] = useState(rest.name ?? undefined)
    const [username, setUsername] = useState(rest.username ?? undefined)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experieceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
        Cookies.set('name', String(name))
        Cookies.set('username', String(username))

    }, [level, currentExperience, challengesCompleted, name, username])

    function setUser(name: string, username) {
        setName(name)
        setUsername(username)
    }
    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
      }

    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()
        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉🎉', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge
        let finalExperience = currentExperience + amount

        if (finalExperience >= experieceToNextLevel) {
            finalExperience = finalExperience - experieceToNextLevel;
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider value={{ level, currentExperience, challengesCompleted, name, username, levelUp, startNewChallenge, activeChallenge, resetChallenge, experieceToNextLevel, completeChallenge, closeLevelUpModal, setUser}}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
            {!name && <RegisterModal />}
        </ChallengesContext.Provider>
    )
}