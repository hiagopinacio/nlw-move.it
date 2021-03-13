import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styled from 'styled-components'

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext)
    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeSucceeded() {
        completeChallenge()
        resetCountdown()
    }
    function handleChallengeFailed() {
        resetChallenge()
        resetCountdown()
    }
    return (
        <Wrapper>
            { activeChallenge ?
                (
                    <ChallengeActive>
                        <header>Ganhe {activeChallenge.amount} xp</header>
                        <main>
                            <img src={`icons/${activeChallenge.type}.svg`} />
                            <strong>Novo Desafio</strong>
                            <p>{activeChallenge.description}</p>
                        </main>

                        <footer>
                            <FailButton
                                type='button'
                                onClick={handleChallengeFailed}
                            >
                                Falhei
                            </FailButton>
                            <SucceededButton
                                type='button'
                                onClick={handleChallengeSucceeded}
                            >
                                Completei
                            </SucceededButton>
                        </footer>

                    </ChallengeActive>
                ) : (
                    <ChallengeNotActive>
                        <strong>Finalize um ciclo para receber desafios</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                            Avance de level completando desafios.
                        </p>
                    </ChallengeNotActive>
                )
            }
        </Wrapper>
    )
}


const Wrapper = styled.div`
    height: 100%;
    background: var(--white);
    border-radius: 5px;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`
const FailButton = styled.div`
    background: var(--red);
`
const SucceededButton = styled.div`
    background: var(--green);
`
const ChallengeActive = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

    header {
        color: var(--blue);
        font-weight: 600;
        font-size: 1.25rem;
        padding: 0.2rem 1.5rem;
        border-bottom: 1px solid var(--gray-line);
    }

    main {

        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    }

    main strong {
        font-size: 2rem;
        font-weight: 600;
        color: var(--title);
    }

    main p {
        line-height: 1.5;
    }

    footer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem
    }

    footer button {
        height: 3rem;

        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 5px;

        color: var(--white);

        font-size: 1rem;
        font-weight: 600;
        transition: filter 0.2s;
    }

    footer button:hover {
        filter: brightness(0.9)
    }
`
const ChallengeNotActive = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    strong {
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.4;
    }

    p {
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 1.4;
        max-width: 70%;
        font-weight: 500;
        margin-top: 3rem;
    }

    p img {
        margin-bottom: 1rem;
    }
`























