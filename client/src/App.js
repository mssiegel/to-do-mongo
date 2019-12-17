import React, {useState, useEffect} from "react"
import './App.css'
import TodosApi from './TodosApi'

const Column = ({ id, category, cards, nameColor, switchColumns, addCard }) => {
  const nameStyle = {
    backgroundColor: nameColor
  }

  const categories = ["Blocked", "Todo", "In-Progress", "Completed"]

  return (
    <div>
      <div className="name" style={nameStyle}>{category}</div>
      {cards.map(({todo, _id}, i) => {
        const leftArrow = id > 0 ? <span className="arrow" onClick={() => switchColumns(_id, {category: categories[id - 1], todo})}> {"<"} </span> : null
        const rightArrow = id < 3 ? <span className="arrow" onClick={() => switchColumns(_id, {category: categories[id + 1], todo})}> {">"} </span> : null
        return (
          <div key={i} className ="card">
            {leftArrow}
            <span className="card-text">{todo}</span>
            {rightArrow}
          </div>
         )}
      )}
      <div className="add-a-card"><span onClick={() => addCard({todo: window.prompt(), category})}>+  Add a card</span></div>
    </div>
  )
}


const App = () => {
  const [col0, setCol0] = useState([])
  const [col1, setCol1] = useState([])
  const [col2, setCol2] = useState([])
  const [col3, setCol3] = useState([])

  useEffect(() => {
    (async () => await getAllTodos())()
  }, [])

  async function getAllTodos() {
    const categories = await TodosApi.getTodos()
    setCol0(categories.Blocked)
    setCol1(categories.Todo)
    setCol2(categories["In-Progress"])
    setCol3(categories.Completed)
  }

  async function addCard(todo) {
    if (todo.todo) {
      await TodosApi.addTodo(todo)
      await getAllTodos()
    }
  }
  
  async function switchColumns(_id, newCard) {
    await TodosApi.deleteTodo(_id)
    await TodosApi.addTodo(newCard)
    await getAllTodos()
  }

  return (
    <div className="App">
      <Column category="Blocked" id={0} cards={col0} nameColor="red" switchColumns={switchColumns} addCard={addCard} />
      <Column category="Todo" id={1} cards={col1} nameColor="lightblue" switchColumns={switchColumns} addCard={addCard} />
      <Column category="In-Progress" id={2} cards={col2} nameColor="gold" switchColumns={switchColumns} addCard={addCard} />
      <Column category="Completed" id={3} cards={col3} nameColor="green" switchColumns={switchColumns} addCard={addCard} />
    </div>
  )
}

export default App