import React, {useState, useEffect} from "react"
import './App.css'

const Column = ({ id, name, cards, nameColor, switchColumns, addCard }) => {
  const nameStyle = {
    backgroundColor: nameColor
  }

  return (
    <div>
      <div className="name" style={nameStyle}>{name}</div>
      {cards.map((cardText, i) => {
        const leftArrow = id > 0 ? <span className="arrow" onClick={() => switchColumns(id, id - 1, cardText)}> {"<"} </span> : null
        const rightArrow = id < 3 ? <span className="arrow" onClick={() => switchColumns(id, id + 1, cardText)}> {">"} </span> : null
        return (
          <div key={i} className ="card">
            {leftArrow}
            <span className="card-text">{cardText}</span>
            {rightArrow}
          </div>
         )}
      )}
      <div className="add-a-card"><span onClick={() => addCard(id, window.prompt())}>+  Add a card</span></div>
    </div>
  )
}


const App = () => {

  const [col0, setCol0] = useState((localStorage['0'] && JSON.parse(localStorage['0'])) || ["Buy Eggs", "Return text books"])
  const [col1, setCol1] = useState((localStorage['1'] && JSON.parse(localStorage['1'])) || ["Cook food", "Do exercises"])
  const [col2, setCol2] = useState((localStorage['2'] && JSON.parse(localStorage['2'])) || ["Sleep away", "Buy a pillow"])
  const [col3, setCol3] = useState((localStorage['3'] && JSON.parse(localStorage['3'])) || ["Do homework", "Listen to lecture"])

  function getColumnState(id) {
    switch(id) {
      case 0: return [col0, setCol0]
      case 1: return [col1, setCol1]
      case 2: return [col2, setCol2]
      case 3: return [col3, setCol3]
      default: return undefined
    }
  }

  function addCard(id, text) {
    if (text) {
      const [cards, setCards] = getColumnState(id)
      setCards([...cards, text])
    }
  }
  
  function switchColumns(originalColumn, columnToUpdate, cardText) {
    const [originalCards, setOriginalCards] = getColumnState(originalColumn)
    setOriginalCards(originalCards.filter(text => text !== cardText))
    addCard(columnToUpdate, cardText)
  }

  useEffect(() => {localStorage[0] = JSON.stringify(col0)}, [col0])
  useEffect(() => {localStorage[1] = JSON.stringify(col1)}, [col1])
  useEffect(() => {localStorage[2] = JSON.stringify(col2)}, [col2])
  useEffect(() => {localStorage[3] = JSON.stringify(col3)}, [col3])

  return (
    <div className="App">
      <Column name="Blocked" id={0} cards={col0} nameColor="red" switchColumns={switchColumns} addCard={addCard} />
      <Column name="Todo" id={1} cards={col1} nameColor="lightblue" switchColumns={switchColumns} addCard={addCard} />
      <Column name="In-Progress" id={2} cards={col2} nameColor="gold" switchColumns={switchColumns} addCard={addCard} />
      <Column name="Completed" id={3} cards={col3} nameColor="green" switchColumns={switchColumns} addCard={addCard} />
    </div>
  )
}

export default App