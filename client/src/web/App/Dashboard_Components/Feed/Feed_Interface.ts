export interface FeedProps {
    Note_ID: string,
    Profile: string,
    Created: string,
    Title: string,
    Course: string,
    University: string,
    Views: number,
    Likes: number,
    Dislikes: number,
    Date: string,
    Comment: CommentProps[]
}

export interface FeedCardProps {
    Note_ID: string,
    Profile: string,
    Created: string,
    Title: string,
    Course: string,
    University: string,
    Views: number,
    Likes: number,
    Dislikes: number,
    Date: string,
    Comment: CommentProps[],
    displayCard: (val: string) => void
}

export interface ReplyProps {
    User_ID: number,
    Comment: string,
    ReplyId: number
}

export interface CommentProps {
    User_ID: number,
    Comment: string,
    Replies: ReplyProps[]
}