const PhoneForm=({onSubmit,setNewName,setNewNumber,newName,newNumber})=>(

    <form onSubmit={onSubmit}>
    <div>
        name: <input value={newName} onChange={(event)=>(setNewName(event.target.value))}/>
    </div>
    <div>
        number: <input value={newNumber} onChange={(event)=>{setNewNumber(event.target.value)}}/>
    </div>
    <div>
        <button type="submit">add</button>
    </div>
    </form>
)

export default PhoneForm