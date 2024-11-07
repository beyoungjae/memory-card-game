import React, { useState, useEffect, useRef } from 'react'
import Card from './Card'
import './App.css'

const cardValues = [
   { id: 'A', image: 'images/A.png' },
   { id: 'B', image: 'images/B.png' },
   { id: 'C', image: 'images/C.png' },
   { id: 'D', image: 'images/D.png' },
   { id: 'E', image: 'images/E.png' },
   { id: 'F', image: 'images/F.png' },
   { id: 'G', image: 'images/G.png' },
   { id: 'H', image: 'images/H.png' },
   { id: 'A', image: 'images/A.png' },
   { id: 'B', image: 'images/B.png' },
   { id: 'C', image: 'images/C.png' },
   { id: 'D', image: 'images/D.png' },
   { id: 'E', image: 'images/E.png' },
   { id: 'F', image: 'images/F.png' },
   { id: 'G', image: 'images/G.png' },
   { id: 'H', image: 'images/H.png' },
]

const App = () => {
   const [cards, setCards] = useState([])
   const [flippedIndices, setFlippedIndices] = useState([])
   const [matchedCards, setMatchedCards] = useState([])
   const [score, setScore] = useState(0)
   const [gameOver, setGameOver] = useState(false)
   const [timeLeft, setTimeLeft] = useState(60)
   const [isGameStarted, setIsGameStarted] = useState(false)

   const timerRef = useRef(null)

   useEffect(() => {
      const shuffledCards = cardValues.sort(() => Math.random() - 0.5)
      setCards(shuffledCards)
   }, [])

   useEffect(() => {
      if (score === cardValues.length / 2) {
         setGameOver(true)
         clearInterval(timerRef.current)
      }
   }, [score])

   useEffect(() => {
      if (isGameStarted && !gameOver && timeLeft > 0) {
         timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
               if (prev <= 1) {
                  clearInterval(timerRef.current)
                  setGameOver(true)
                  return 0
               }
               return prev - 1
            })
         }, 1000)
         return () => clearInterval(timerRef.current)
      }
   }, [isGameStarted, gameOver])

   const handleCardClick = (index) => {
      if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedCards.includes(index) || gameOver || timeLeft <= 0) return

      setFlippedIndices((prev) => [...prev, index])

      if (flippedIndices.length === 1) {
         const firstIndex = flippedIndices[0]
         if (cards[firstIndex].id === cards[index].id) {
            setMatchedCards((prev) => [...prev, firstIndex, index]) // 맞춘 카드 추가
            setScore((prev) => prev + 1)
            setFlippedIndices([])
         } else {
            setTimeout(() => {
               setFlippedIndices([])
            }, 1000)
         }
      }
   }

   const resetGame = () => {
      setScore(0)
      setGameOver(false)
      setMatchedCards([]) // 맞춘 카드 초기화
      setTimeLeft(60) // 타이머 초기화
      setIsGameStarted(true) // 게임 시작 상태 설정
      const shuffledCards = cardValues.sort(() => Math.random() - 0.5)
      setCards(shuffledCards)
   }

   const startGame = () => {
      resetGame()
      setIsGameStarted(true)
   }

   return (
      <div className="game-container">
         <h1 className="game-title">🎮 메모리 카드 게임</h1>
         <div className="game-info">
            <div className="info-item">
               <span className="info-label">점수</span>
               <span className="info-value">{score}</span>
            </div>
            <div className="info-item">
               <span className="info-label">남은 시간</span>
               <span className="info-value">{timeLeft}초</span>
            </div>
         </div>

         {!isGameStarted && !gameOver ? (
            <button className="start-button" onClick={startGame}>
               게임 시작하기
            </button>
         ) : gameOver ? (
            <div className="game-over">
               <h2>{timeLeft <= 0 ? '시간 초과!' : '축하합니다! 🎉'}</h2>
               <p>최종 점수: {score}점</p>
               <button className="reset-button" onClick={resetGame}>
                  다시 시작하기
               </button>
            </div>
         ) : null}

         <div className="game-board">
            {cards.map((card, index) => (
               <Card
                  key={index}
                  card={card}
                  onClick={() => handleCardClick(index)}
                  isFlipped={flippedIndices.includes(index) || matchedCards.includes(index)} // 맞춘 카드도 표시
               />
            ))}
         </div>
      </div>
   )
}

export default App
