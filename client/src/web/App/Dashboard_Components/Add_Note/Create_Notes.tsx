import React from 'react'
import { useState, useContext } from 'react'
import { UserContext, UserContextType } from '../../../../App'
import './create_notes.css'

export const CREATE_NOTES:React.FC = () => {

  const { currentUserData } = useContext<UserContextType>(UserContext)

  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const [view, setView] = useState('public')
  const [university, setUniversity] = useState('')
  const [file, setFile] = useState('')
  const [fileData, setFileData] = useState<string | null>(null)

  const handleSubmit = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    
    const date = `${year}-${month}-${day}`
    const creator = currentUserData.Username

    console.log(creator, date)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selectedFileTemp = e.target.files;
    if (selectedFileTemp) {
      let selectedFile = selectedFileTemp[0];
      if (selectedFile) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          let target = e.target;
          if (target !== null) {
            const dataUrl = target.result as string;
            setFileData(dataUrl);
            const fileUrl = URL.createObjectURL(selectedFile);
            setFile(fileUrl);
          }
        };
      } else {
        setFileData(null);
        setFile('');
      }
    }
  };

  return (
    <div className='Create_Note'>
      <div className='Create_Note_Form'>
        <p>ADD NOTES</p>
        <input type='text' placeholder='University' onChange={(e) => { setUniversity(e.target.value) }}/>
        <input type='text' placeholder='Course Number' onChange={(e) => { setCourse(e.target.value) }}/>
        <input type='text' placeholder='Title' onChange={(e) => { setTitle(e.target.value) }}/>
        <label htmlFor='uploadPdf'>Upload PDF File</label>
        <input type='file' onChange={ handleFile } id='uploadPdf'/>
        <button onClick={ handleSubmit }>Submit</button>
      </div>
      <div className='Create_Note_Viewer'>
        <embed src={file}/>
      </div>
    </div>
  )
}

