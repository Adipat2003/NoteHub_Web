
import { FeedCardProps } from "./Feed_Interface"
import { BsBookmark, BsBoxArrowInRight } from 'react-icons/bs'

export const Feed_Card:React.FC<FeedCardProps> = ({
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
    displayCard
}) => {
    return (
        <div className='Feed_Card'>
            <div className='Feed_Card_Container'>
                <div className="Comment_Image">

                </div>
            </div>
            <div className='Feed_Card_Container'><p>{Created}</p></div>
            <div className='Feed_Card_Container'><p>{Title}</p></div>
            <div className='Feed_Card_Container'><p>{Course}</p></div>
            <div className='Feed_Card_Container'><p>{University}</p></div>
            <div className='Feed_Card_Container'><p>{Views}</p></div>
            <div className='Feed_Card_Container'><p>{Likes}</p></div>
            <div className='Feed_Card_Container'><p>{Dislikes}</p></div>
            <div className='Feed_Card_Container'><p>{Date}</p></div>
            <div className='Feed_Card_Container'><button><BsBookmark/></button></div>
            <div className='Feed_Card_Container'><button onClick={() => { displayCard(Note_ID) }}><BsBoxArrowInRight/></button></div>
        </div>
    )
}