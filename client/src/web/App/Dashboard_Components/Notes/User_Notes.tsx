import React, { useEffect, useState, useContext } from 'react'
import { UserContext, UserContextType } from '../../../../App'
import { FeedProps } from '../Feed/Feed_Interface'
import { db } from '../../../Firebase/Firebase'
import { collection, getDocs } from 'firebase/firestore'
import './user_notes.css'

export const USER_NOTES:React.FC = () => {

  const { currentUserData } = useContext<UserContextType>(UserContext)
  const [data, setData] = useState<FeedProps[]>([])
  const notesCollectionRef = collection(db, "notes")
  const [selected, setSelected] = useState<FeedProps | null>(null)
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedCourse, setUpdatedCourse] = useState('')
  const [updatedUniversity, setUpdatedUniversity] = useState('')
  const [updatedNoteID, setUpdatedNoteID] = useState('')
  const [updatedAccess, setUpdatedAccess] = useState('')


  let count = -1;

  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(notesCollectionRef)
      const ALL_NOTES = data.docs.map((doc) => ({ ...doc.data() }))
      const USER_NOTES = ALL_NOTES.filter((note) => note.Creator == currentUserData.Username)
      const UserNotesTemp:FeedProps[] = [] 

      USER_NOTES?.map((val) => {
        const data = {
          Note_ID: val?.Note_URL,
          Profile: val?.Profile_URL,
          Created: val?.Creator,
          Title: val?.Title,
          Course: val?.Course,
          University: val?.University,
          Views: val?.Views,
          Likes: val?.Likes,
          Dislikes: val?.Dislikes,
          Date: val?.Date,
          Comment: val?.Comments,
          Access: val?.Access,
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
                <form className='Note_Property_Form'>
                  <div className='Note_Property_Block'>
                    <p></p>
                    <input placeholder='Updated Title'></input>
                  </div>
                  <div className='Note_Property_Block'>
                    <p></p>
                    <input placeholder='Updated Course'></input>
                  </div>
                  <div className='Note_Property_Block'>
                    <p></p>
                    <input placeholder='Updated University'></input>
                  </div>
                  <div className='Note_Property_Block'>
                    <p></p>
                    <input placeholder='Updated File' type='file'></input>
                  </div>
                  <div className='Note_Property_Block'>
                    <p></p>
                    <select>
                      <option>Updated Access</option>
                      <option>Public</option>
                      <option>Private</option>
                    </select>
                  </div>
                  <button className='Update_Note'>Update Note</button>
                  <button className='Delete_Note'>Delete Note</button>
                </form>
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
