import React, { useContext, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" });
        props.showAlert("Note added successfully", "success");
        document.getElementById("addform").hidden = true;
    }

    const handleChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <div className='row align-items-center' >
            <div className="col-6" style={{ marginTop: "180px",marginBottom:"100px" }}>
                <h1 style={{color:"white"}}>Your notebook</h1>
                <h1 style={{color:"white"}}>on the cloud.</h1>
            </div>
            <div className="container col-6 my-3 justify-content-center align-items-center">
                <form hidden={true} className='' id="addform" style={{border:"1px solid black",padding:"15px",borderRadius:"10px",color:"white",background:"rgb(46 75 71)",marginTop:"150px"}}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input value={note.description} type="text" className="form-control" id="description" name="description" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className='form-label'>Tag</label>
                        <input value={note.tag} type='text' className='form-control' id='tag' onChange={handleChange} name='tag'/>
                    </div>
                    <button disabled={note.title.length<1||note.description.length<1} type="submit" className="btn btn-dark" onClick={handleClick}>Add Note</button>
                </form>

            </div>
        </div>
    )
}

export default AddNote
