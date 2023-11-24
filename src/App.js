import React, {useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
import axios from 'axios';
function App () {
 //const [arr,setArr]=useState([]);
 const [allTodos, setAllTodos] = useState ([]);
 const [newTodoTitle, setNewTodoTitle] = useState ('');
 const [newDescription, setNewDescription] = useState ('');
 const [completedTodos, setCompletedTodos] = useState ([]);
 const [isCompletedScreen, setIsCompletedScreen] = useState (false);


 const handleAddNewToDo = () => {
   const data={task: newTodoTitle,description:newDescription};
   axios.post('https://to-do-backend-7xpm.onrender.com/add',data)
   .then(result =>{
    window.location.reload()
    alert("Task added successfully!")
   })
   .catch(err=>console.log(err))
   let newToDoObj = {
    title: newTodoTitle,
    description: newDescription,
    }
   let updatedTodoArr = [...allTodos];
   updatedTodoArr.push (newToDoObj);
   // console.log (updatedTodoArr);
   //setAllTodos (updatedTodoArr);
   localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
   setNewDescription ('');
   setNewTodoTitle ('');
 }


 useEffect (() => {
   axios.get('https://to-do-backend-7xpm.onrender.com/get')
   .then(result=>setAllTodos(result.data))
   .catch(err=>console.log(err))
   let savedTodos = JSON.parse (localStorage.getItem ('todolist'));
   let savedCompletedToDos = JSON.parse (
     localStorage.getItem ('completedTodos')
   );
   /*if (savedTodos) {
     setAllTodos (savedTodos);
   }*/


   if (savedCompletedToDos) {
     setCompletedTodos (savedCompletedToDos);
   }
 }, []);


 const handleToDoDelete = index => {
   let reducedTodos = [...allTodos];
   reducedTodos.splice (index,1);
   // console.log (index);


   // console.log (reducedTodos);
   localStorage.setItem ('todolist', JSON.stringify (reducedTodos));
   setAllTodos (reducedTodos);
 };


 const handleCompletedTodoDelete = (id,index) => {
   axios.delete('https://to-do-backend-7xpm.onrender.com/delete/'+id)
   .then(result=>{
    window.location.reload()
    alert("Task removed successfully!")
  })
   .catch(err=>console.log(err))
   let reducedCompletedTodos = [...completedTodos];
   reducedCompletedTodos.splice (index,1);
   // console.log (reducedCompletedTodos);
   localStorage.setItem(
     'completedTodos',
     JSON.stringify (reducedCompletedTodos)
   );
   setCompletedTodos (reducedCompletedTodos);
 };


 const handleComplete = (id,index) => {
   axios.put('https://to-do-backend-7xpm.onrender.com/update/'+id)
   .then(result =>{
    console.log(result)
    alert("Task Completed!")
  })
   .catch(err=>console.log(err))
   const date = new Date ();
   var dd = date.getDate ();
   var mm = date.getMonth () + 1;
   var yyyy = date.getFullYear ();
   var hh = date.getHours ();
   var minutes = date.getMinutes ();
   var ss = date.getSeconds ();
   var finalDate =
     dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;


   let filteredTodo = {
     ...allTodos[index],
     completedOn: finalDate,
   }


   // console.log (filteredTodo);


   let updatedCompletedList = [...completedTodos, filteredTodo];
   console.log (updatedCompletedList);
   setCompletedTodos (updatedCompletedList);
   localStorage.setItem (
     'completedTodos',
     JSON.stringify (updatedCompletedList)
   );
   // console.log (index);


   handleToDoDelete (index);
 }


 return (
   <div className="App">
     <h1>My Todos</h1>


     <div className="todo-wrapper">


       <div className="todo-input">
         <div className="todo-input-item">
           <label>Title:</label>
           <input
             type="text"
             value={newTodoTitle}
             onChange={e => setNewTodoTitle (e.target.value)}
             placeholder="What's the title of your Task?"
           />
         </div>
         <div className="todo-input-item">
           <label>Description:</label>
           <input
             type="text"
             value={newDescription}
             onChange={e => setNewDescription (e.target.value)}
             placeholder="What's the description of your Task?"
           />
         </div>
         <div className="todo-input-item">
           <button
             className="primary-btn"
             type="button"
             onClick={handleAddNewToDo}
           >
             Add
           </button>
         </div>
       </div>
       <div className="btn-area">
         <button
           className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
           onClick={() => setIsCompletedScreen (false)}
         >
           To Do
         </button>
         <button
           className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
           onClick={() => setIsCompletedScreen (true)}
         >
           Completed
         </button>
       </div>
       <div className="todo-list">


         {isCompletedScreen === false &&
           allTodos.map ((item, index) => (
             <div className="todo-list-item" key={index}>
               <div>
                 <h3>{item.task}</h3>
                 <p>{item.description}</p>


               </div>
               <div>
                 <BsCheckLg
                   title="Completed?"
                   className=" check-icon"
                   onClick={() => handleComplete (item._id,index)}
                 />
               </div>
             </div>
           ))}


         {isCompletedScreen === true &&
           completedTodos.map ((item,index) => (
             <div className="todo-list-item" key={index}>
               <div>
                 <h3>{item.task}</h3>
                 <p>{item.description}</p>
                 <p> <i>Completed at: {item.completedOn}</i></p>
               </div>
               <div>
                 <AiOutlineDelete
                   className="icon"
                   onClick={() => handleCompletedTodoDelete(item._id,index)}
                 />
               </div>
             </div>
           ))}
       </div>
     </div>
   </div>
 );
}


export default App;
