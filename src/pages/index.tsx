import { CompletedChalenges } from "../components/CompletedChallenges"
import { Countdown } from "../components/Countdow"
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from "../components/Profile"

import Head from "next/head";
import { GetServerSideProps } from 'next'
import styled from 'styled-components'
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { useContext } from "react";

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  user: String
}
export default function Home(props) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      name={props.name}
      username={props.username}
    >
      <Wrapper>
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
      </Wrapper>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted, name, username } = ctx.req.cookies
  if (name == undefined){
    return {props: {
      level: Number(level),
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted), 
      name: null, 
      username: null
    }
  }
  }
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted), 
      name: String(name), 
      username: String(username)
    }
  }
}

const Wrapper = styled.div`
  height: 100vh;
  max-width: 992px;
  margin: 0 auto;
  padding: 2.5rem 2rem;

  display: flex;
  flex-direction: column;

  section {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6.25rem;
    align-content: center;
  }
`
