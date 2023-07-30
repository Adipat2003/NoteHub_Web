import React from 'react'
import { useState, useContext } from 'react'
import { UserContext, UserContextType } from '../../../../App'
import './create_notes.css'
import { storage } from '../../../Firebase/Firebase'
import { database } from '../../../Firebase/Firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { CommentProps } from '../Feed/Feed_Interface'

async function uploadPDFAndGetURL(file: File): Promise<string> {
  const fileRef = ref(storage, `notes/${file.name + v4()}`)
  try {
    const snapshot = await uploadBytes(fileRef, file) // Upload the PDF to Firebase Storage
    const downloadURL = await getDownloadURL(snapshot.ref) // Get the download URL of the uploaded PDF
    return downloadURL as string
  } catch (error) {
    throw error;
  }
}

export const CREATE_NOTES:React.FC = () => {

  const { currentUserData } = useContext<UserContextType>(UserContext)

  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const [view, setView] = useState('Public')
  const [university, setUniversity] = useState('')
  const [filename, setFileName] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = () => {
    if (file == null) {
      return
    } else {
      uploadPDFAndGetURL(file).then((url) => {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')

        const date = `${year}-${month}-${day}`
        const creator = currentUserData.Username
        const fileUrl = url

        const comments: CommentProps[] = []
        
        const data = {
          Note_URL: fileUrl,
          Profile_URL: '',
          Creator: creator,
          Title: title,
          Course: course,
          University: university,
          Views: 0,
          Likes: 0,
          Dislikes: 0,
          Date: date,
          Comments: comments
        }

        // Now we need to upload this data 

      }).catch((err) => {
        throw err
      })
    }


  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selectedFileTemp = e.target.files;
    if (selectedFileTemp) {
      let selectedFile = selectedFileTemp[0];
      setFile(selectedFile)
      if (selectedFile) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          let target = e.target;
          if (target !== null) {
            const dataUrl = target.result as string;
            const fileUrl = URL.createObjectURL(selectedFile);
            setFileName(fileUrl);
          }
        };
      } else {
        setFileName('');
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
        <select value={view} onChange={(e) => { 
          setView(e.target.value) 
          console.log(e.target.value)
        }}>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        <button onClick={ handleSubmit }>Submit</button>
      </div>
      <div className='Create_Note_Viewer'>
        <embed src={filename}/>
      </div>
    </div>
  )
}

