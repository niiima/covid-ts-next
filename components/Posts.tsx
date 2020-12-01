import React from 'react'
import fetch from 'isomorphic-unfetch'
interface RedditPost{
    data:{[key:string  ]: string};
}
type Props = {
    posts: readonly RedditPost[];
    subreddit: string;
}

const Posts = (props: Props) => {
    const { posts, subreddit } = props;
    return (<div>
        <h1>Posts in "{subreddit}"</h1>
        <ul>
            {posts.map(post => (
                <li key={post.data.id}>{post.data.title}</li>
            ))}
        </ul>
    </div>
    )
}

Posts.getInitialProps = async () => {
    const subreddit = 'typescript'
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
    const result = await response.json() //as RedditResult

    return {
        subreddit,
        posts: result.data.children
    }
}

export default Posts;