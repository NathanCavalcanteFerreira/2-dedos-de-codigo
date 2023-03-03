import React, { useEffect, useState } from 'react'
import axios from 'axios'
import grayMatter from "gray-matter";
import { Link } from 'react-router-dom';

interface IProps {
    content?: any[]
}

export const Items = ({ content }: IProps) => {
    const [posts, setPosts] = useState(content)
    useEffect(() => {
        const getPosts = async () => {
            const response = await axios.get("/posts");
            const contentPosts = response.data.map((post: any) => {
                const contentFormat = grayMatter(post.content);
                return {
                    slug: post.slug,
                    title: contentFormat?.data?.title,
                    date: contentFormat?.data.date
                };
            });
            setPosts(contentPosts)
        }
        getPosts()
    }, [])
    return (
        <div>
        <h1>Blog</h1>
        <ul>
          {posts?.map((post: any) => (
            <li key={post.slug}>
              <Link to={`/post/${post.slug}`}>{post.title}</Link>
              <span>{post.date}</span>
            </li>
          ))}
        </ul>
      </div>
    )
}

