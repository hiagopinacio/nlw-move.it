import { CompletedChalenges } from "../components/CompletedChallenges"
import { Countdown } from "../components/Countdow"
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from "../components/Profile"

import Head from "next/head";
import { GetServerSideProps } from 'next'
import styles from '../styles/pages/Home.module.css'
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export default function Home(props) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
          <script data-ad-client="ca-pub-1419288585381307" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChalenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies
  return {
    props: {
      level: Number(level), currentExperience: Number(currentExperience), challengesCompleted: Number(challengesCompleted)
    }
  }
}

