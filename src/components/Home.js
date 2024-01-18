import React from 'react'
import Notes from './Notes'
import { Alert } from './Alert';

export const Home = (props) => {
  let visible=true;
  return (
    <div >
      <Notes showAlert={props.showAlert}/>
    </div>
  )
}

