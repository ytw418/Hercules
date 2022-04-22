import React from 'react';
import Post from '../components/Post';

const Home = () => {
  return (
    <>
    <Post></Post>
    <Post></Post>
    <Post></Post>
    <Post></Post>
    </>

  );
};

export default React.memo(Home);