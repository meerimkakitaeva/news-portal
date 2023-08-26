export interface INews {
    id: string,
    title: string,
    content: string,
    image: string | null,
    datetime: string,
}

export interface INewsMutation {
    title: string,
    content: string,
    image?: string | null,
}

export interface IComment {
    id: string,
    news_id: string,
    author: string ,
    content: string,
}

export interface ICommentMutation {
    news_id: string,
    author: string | null,
    content: string,
}