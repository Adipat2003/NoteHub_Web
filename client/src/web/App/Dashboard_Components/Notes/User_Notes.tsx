import React, { useEffect, useState, useContext, useRef } from 'react'
import { UserContext, UserContextType } from '../../../../App'
import { FeedProps } from '../Feed/Feed_Interface'
import { db } from '../../../Firebase/Firebase'
import { collection, doc,  getDocs, deleteDoc, updateDoc } from 'firebase/firestore'
import { uploadPDFAndGetURL, createFileName, cleanStorage } from '../../../Firebase/Firebase'
import './user_notes.css'

export const USER_NOTES:React.FC = () => {

  const { currentUserData } = useContext<UserContextType>(UserContext)
  const [data, setData] = useState<FeedProps[]>([])
  const [selected, setSelected] = useState<FeedProps | null>(null)

  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedCourse, setUpdatedCourse] = useState('')
  const [updatedUniversity, setUpdatedUniversity] = useState('')
  const [updatedFiles, setUpdatedFiles] = useState<File | null>(null)
  const [updatedNoteID, setUpdatedNoteID] = useState('')
  const [updatedAccess, setUpdatedAccess] = useState('')

  const notesCollectionRef = collection(db, "notes")

  const USER_NOTES = useRef<{ params: { [x: string]: any }, id: string }[] | null>(null)


  let count = -1;

  const updateNote = async () => {
    alert("Note Updated")
    if (USER_NOTES.current !== null && selected !== null) {
      const document = USER_NOTES.current.filter((val: { params: { [x: string]: any }, id: string }) => val.params.Note_URL === selected.Note_ID)
      const document_params = document[0].params
      const document_id = document[0].id
      const note_doc = doc(db, "notes", document_id)
      let new_url = ''

      if (updatedFiles !== null) {
        const fileName = createFileName(updatedFiles)
        await uploadPDFAndGetURL(updatedFiles, fileName).then((url) => { new_url = url })
        const updated_data = {
          Access: updatedAccess !== '' ? updatedAccess : document_params.Access,
          Course: updatedCourse !== '' ? updatedCourse : document_params.Course,
          Title: updatedTitle !== '' ? updatedTitle : document_params.Title,  
          University: updatedUniversity !== '' ? updatedUniversity : document_params.University,
          Note_URL: new_url,
          Note_FileName: fileName
        }
        await cleanStorage(document_params.Note_FileName)
        await updateDoc(note_doc, updated_data)
      } else {
        const updated_data = {
          Access: updatedAccess !== '' ? updatedAccess : document_params.Access,
          Course: updatedCourse !== '' ? updatedCourse : document_params.Course,
          Title: updatedTitle !== '' ? updatedTitle : document_params.Title,  
          University: updatedUniversity !== '' ? updatedUniversity : document_params.University,
        }
        await updateDoc(note_doc, updated_data)
      }
    }
  }

  const deleteNote = async() => {
    alert("Note Deleted")
    if (USER_NOTES.current !== null && selected !== null) {
      const document = USER_NOTES.current.filter((val: { params: { [x: string]: any }, id: string }) => val.params.Note_URL === selected.Note_ID)
      const fileName = document[0].params.Note_FileName
      const document_id = document[0].id
      const note_doc = doc(db, "notes", document_id)
      await cleanStorage(fileName)
      await deleteDoc(note_doc)
    }
  }

  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(notesCollectionRef)
      const ALL_NOTES = data.docs.map((doc) => ({ params: { ...doc.data() }, id: doc.id }))
      USER_NOTES.current = ALL_NOTES.filter((note) => note.params.Creator == currentUserData.Username)
      const UserNotesTemp:FeedProps[] = [] 

      USER_NOTES.current?.map((val) => {
        const data = {
          Note_ID: val?.params.Note_URL,
          Profile: val?.params.Profile_URL,
          Created: val?.params.Creator,
          Title: val?.params.Title,
          Course: val?.params.Course,
          University: val?.params.University,
          Views: val?.params.Views,
          Likes: val?.params.Likes,
          Dislikes: val?.params.Dislikes,
          Date: val?.params.Date,
          Comment: val?.params.Comments,
          Access: val?.params.Access,
        }
        UserNotesTemp.push(data)
      })

      console.log(UserNotesTemp)
      setData(UserNotesTemp)
    }
    getNotes()
  }, [])

  return (
    <div className='Your_Notes'>
        <div className='Note_Select'>
          <div className={selected === null ? 'Note_View' : 'Note_View_Half'}>
            <div className='Note_View_Header_1'>
              <p>Select Note</p>
            </div>
            <div className='Note_View_Header_2'>
              <p>Title</p>
              <p>Course</p>
              <p>University</p>
              <p>Access</p>
            </div>
            {
              data.map((note) => {
                count++;
                return (
                  <button className={ note === selected ? 'Note_Selected' : 'Note_Unselected'} onClick={() => { 
                    note === selected ? setSelected(null) : setSelected(note) 
                  }}>
                    <p>{note.Title}</p>
                    <p>{note.Course}</p>
                    <p>{note.University}</p>
                    <p>{note.Access}</p>
                  </button>
                )
              })
            }
          </div>
          {
            selected !== null ? 
            <div className='Note_Properties'>
              <div className='Note_Property_Header_1'>
                <p>Update Note</p>
                <div className='Note_Property_Form'>
                  <div className='Note_Property_Block'>
                    <p></p>
                    <input placeholder='Updated Title'onChange={(e) => { setUpdatedTitle(e.target.value) }} />
                  </div>
                  <div className='Note_Property_Block'>
                    <p></p>
                    <input placeholder='Updated Course'onChange={(e) => { setUpdatedCourse(e.target.value) }} />
                  </div>
                  <div className='Note_Property_Block'>
                    <p></p>
                    <input placeholder='Updated University' onChange={(e) => { setUpdatedUniversity(e.target.value) }} />
                  </div>
                  <div className='Note_Property_Block'>
                    <p></p>
                    <input placeholder='Updated File' type='file' onChange={(e) => { 
                      let allFiles = e.target.files
                      if (allFiles !== null) {
                        setUpdatedFiles(allFiles[0])
                      }
                    }}/>
                  </div>
                  <div className='Note_Property_Block'>
                    <p></p>
                    <select value={updatedAccess} onChange={(e) => { 
                      setUpdatedAccess(e.target.value) 
                    }}>
                      <option value="">Updated Access</option>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                  <button className='Update_Note' onClick={ updateNote }>Update Note</button>
                  <button className='Delete_Note' onClick={ deleteNote }>Delete Note</button>
                </div>
              </div>
            </div> : <></>
          }
        </div>
        <div className='Note_Preview'>
          <embed className="Note_Preview_Viewer" src={selected !== null ? selected.Note_ID : ""} />
        </div>
    </div>
  )
}
