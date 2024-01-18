import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router';


const Notes = (props) => {
    const context = useContext(noteContext);
    let history = useNavigate();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            history("/login");
        }
        //   eslint-disable-next-line
    }, [])

    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "General" })
    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });

    }
    const ref = useRef(null)
    const refClose = useRef(null)


    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Note updated successfully", "success");
    }

    const handleChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    const handleAdd = () => {
        if (document.getElementById("addform").hidden === true)
            document.getElementById("addform").hidden = false;
        else
            document.getElementById("addform").hidden = true;
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{color:"black"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="" onChange={handleChange} required value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={handleChange} required value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className='form-label' value={note.etag}>Tag</label>
                                    <input type='text' className='form-control' id='etag' name='etag' />
                                </div>

                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container row my-3" style={{border:"1px solid black",borderRadius:"10px",padding:"10px",backgroundColor:"rgb(73 88 86)"}}>
                    <div className='row justify-content-between'>
                        <h2 style={{color:"white"}} className='col-3'>Your notes</h2>
                        <button onClick={handleAdd} style={{ marginTop: "10px", marginBottom: "50px", backgroundColor: "#323232", color: "white" }} className="btn btn-dark col-3">Add a new note</button>
                    </div>
                    <div className="container mx-2">
                        {notes.length === 0 && 'No notes to display.'}
                    </div>
                    {notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
