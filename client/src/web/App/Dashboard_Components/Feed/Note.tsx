import { FeedCardProps } from "./Feed_Interface"
import { BsArrowLeftCircle } from 'react-icons/bs'
import { FormEvent, useState, useEffect } from "react"
import { ReplyProps, CommentProps } from "./Feed_Interface"
import { GoReply } from 'react-icons/go'
import { HiMiniPaperAirplane } from 'react-icons/hi2'
import './feed.css'
import e from "express"


export const Note:React.FC<FeedCardProps> = ({
    Note_ID,
    Profile,
    Created,
    Title,
    Course,
    University,
    Views,
    Likes,
    Dislikes,
    Date,
    Comment,
    displayCard
}) => {

    const [comment, setComment] = useState('')

    const SubmitComment = (e: FormEvent) => {
        e.preventDefault()
    }

    const block = Comment !== undefined ? (                
        <div className="Comments">
        {
            Comment.map((val) => {
                return (
                    <COMMENT_SECTION {...val} />
                )
            })
        }
        </div>
    ) : (<></>)

    return (
        <>
            <button className='Exit_Note' onClick={() => { displayCard('') }}><BsArrowLeftCircle className='Exit_Note_Button'/></button>
            <div className="Viewer">
                <embed src={Note_ID} />
            </div>
            <div className="About">

            </div>
            <div className="Thread">
                <div className="Input_Comment_Outer_Container">
                    <form className="Input_Comment" onSubmit={ SubmitComment }>
                        <textarea onChange={(e) => setComment(e.target.value)} placeholder="Input Comment"></textarea>
                        <button className="Submit_Reply"><HiMiniPaperAirplane style={{ transform: 'translateY(1.5px)' }}/></button>
                    </form>
                </div>
                {block}
            </div>
        </>
    )
}

const COMMENT_SECTION:React.FC<CommentProps> = ({ User_ID, Comment, Replies}) => {

    const [replyState, setReplyState] = useState(false)
    const [reply, setReply] = useState('')

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

    }

    return (
        <>
            <div className="Comment">
                <div className="Comment_Image_Container">
                    <div className="Comment_Image">

                    </div>
                </div>
                <div className="Comment_Text">
                    <div className="Header">
                        <p>Username</p>
                    </div>
                    <div className="User_Comment">
                        <p>{Comment}</p>
                    </div>
                    <div className="Reply_Button">
                        <button onClick={ () =>  { setReplyState(!replyState); console.log(replyState); } }><GoReply style={{ transform: 'translateY(2px)' }}/> Reply</button>
                    </div>
                </div>
            </div>
            {
                replyState ? 
                    <>
                        <textarea className="Reply_Text" onChange={(e) => setReply(e.target.value)} placeholder="Input Comment"></textarea>
                        <button className="Submit_Reply_2" onSubmit={ handleSubmit }><HiMiniPaperAirplane style={{ transform: 'translateY(1.5px)' }}/></button>
                    </> : <></>
            }
            <div className="Replies_Container">
                {
                    Replies.map((val) => {
                        return (
                            <Reply {...val} />
                        )
                    })
                }
            </div>
        </>
    )
}

const Reply:React.FC<ReplyProps> = ({ User_ID, Comment, ReplyId }) => {

    const [replyState, setReplyState] = useState(false)
    const [reply, setReply] = useState('')

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

    }
    
    return (
        <>
            <div className="Reply">
                <div className="Comment_Image_Container">
                    <div className="Comment_Image">

                    </div>
                </div>
                <div className="Comment_Text">
                    <div className="Header">
                        <p>Username</p>
                    </div>
                    <div className="User_Comment">
                        <p>{Comment}</p>
                    </div>
                    <div className="Reply_Button">
                        <button onClick={() => { setReplyState(!replyState) }}><GoReply style={{ transform: 'translateY(2px)' }}/> Reply</button>
                    </div>
                </div>
            </div>
            {
                replyState ? 
                    <>
                        <textarea className="Reply_Text_2" onChange={(e) => setReply(e.target.value)} placeholder="Input Comment"></textarea>
                        <button className="Submit_Reply_2" onSubmit={ handleSubmit }><HiMiniPaperAirplane style={{ transform: 'translateY(1.5px)' }}/></button>
                    </> : <></>
            }
        </>
    )
}