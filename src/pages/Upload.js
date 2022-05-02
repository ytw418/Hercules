import React, { useEffect, useState } from 'react';
import { firebase_db, imageStorage } from "../firebaseConfig"
import { useTodoState, useTodoDispatch, useUID } from '../ContextApi';
import { useNavigate } from 'react-router-dom';

function Upload() {
    const navigate = useNavigate();
    const uid = useUID();
    const dispatch = useTodoDispatch();
    const state = useTodoState();



    const [view, setView] = useState([]);
    const [file, setFile] = useState('');
    const [attachment, setAttachment] = useState();
    const [url, setUrl] = useState();

    const goHome = () => {
        navigate('/');
    }

    const onSubmit = async (event) => {
        //사진 등록 함수 버튼
        event.preventDefault()
        let attachmentUrl = ""
        if (attachment !== "") {
            const attachmentRef = imageStorage.ref().child(`${uid}/posts/${Date()}`)
            const response = await attachmentRef.putString(attachment, 'data_url')
            attachmentUrl = await response.ref.getDownloadURL()
        }
        setUrl(attachmentUrl)
        setFile('')
    }


    const onFileChange = (event) => {
        //사진 등록 함수
        const { target: { files, value } } = event;
        const theFile = files[0];
        const reader = new FileReader();
        setFile(value)
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent
            setAttachment(result)
        }
        reader.readAsDataURL(theFile)
    }

    const onClearAttachment = () => {
        setAttachment(null)
        setFile('')
    }

    const [content, setContent] = useState({
        postContent: '',
    })
    const {postContent} = content;

    const getValue = e => {
        const { name, value } = e.target;
        setContent({ ...content, [name]: value })
        console.log(content)
    }

    const writeNewPost = () => {
        

        // Get a key for a new Post.
        var newPostKey = firebase_db.ref().child('posts').push().key;

        // A post entry.
        var postData = {
            userName: state.User[uid].Profile.Username,
            uid: uid,
            postContent: postContent,
            postKey: newPostKey,
            starCount: 0,
            postPic: url,
            date:Date.now()
            
        };
        setView(postData)

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/users/' + uid + '/UserPost/' + newPostKey] = postData;

        firebase_db.ref().update(updates).then(() => alert("제출되었습니다"))
        return goHome();
        ;
    }

    return (
        <div>
            <h1>upload</h1>
            <div>
                <form onSubmit={onSubmit}>
                    <input type='file' accept='image/*' onChange={onFileChange} value={file} />
                    <input type='submit' value='사진등록하기' />
                    {attachment && (
                        <div>
                            <img src={attachment} width="50px" height="50px" alt="attachment" />
                            <button onClick={onClearAttachment}>Clear</button>
                        </div>
                    )}
                </form>
            </div>
                    <div>
                        <h2>{state.User[uid].Username}</h2>
                        <div>{postContent}</div>
                        <div><img src={url}></img></div>
                    </div>


            <input type="text"
                placeholder='내용'
                onChange={getValue}
                name='postContent' />


            <button onClick={writeNewPost}>제출</button>
        </div>
    )
}

export default Upload;