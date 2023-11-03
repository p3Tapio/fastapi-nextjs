import React, { useContext, useState } from 'react'
import TextInput from '../../_elements/textInput/textInput'
import { createPost, updatePost } from '../../_state/post/postSlice'
import { useAppDispatch } from '../../_state/store'
import { AuthContext } from '../../_state/user/authContext'
import { IPost } from '../../_types/post'

interface IPostFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  setPostToUpdate: React.Dispatch<React.SetStateAction<IPost | undefined>>
  postToUpdate: IPost | undefined
}

const PostForm: React.FC<IPostFormProps> = ({
  setShowForm,
  setPostToUpdate,
  postToUpdate,
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useAppDispatch()
  const { authDetails } = useContext(AuthContext)

  const createNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (typeof authDetails === 'object') {
        const { accessToken } = authDetails
        await dispatch(
          createPost({ token: accessToken, post: { title, description } })
        ).unwrap()
        // TODO show message create tjsp, setResult?
        setShowForm(false)
      }
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        const { message } = error
        // eslint-disable-next-line no-alert
        window.alert(message || error)
      }
    }
  }

  const updateOldPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (typeof authDetails === 'object' && postToUpdate) {
        const post = {
          id: postToUpdate.id,
          title: postToUpdate.title,
          description: postToUpdate.description,
        }
        const { accessToken } = authDetails
        await dispatch(updatePost({ token: accessToken, post })).unwrap()
        setPostToUpdate(undefined)
      }
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        const { message } = error
        // eslint-disable-next-line no-alert
        window.alert(message || error)
      }
    }
  }

  const setUpdatedTitle = (value: string) => {
    if (postToUpdate) {
      setPostToUpdate({ ...postToUpdate, title: value })
    }
  }
  const setUpdatedDescription = (value: string) => {
    if (postToUpdate) {
      setPostToUpdate({ ...postToUpdate, description: value })
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (postToUpdate) {
      updateOldPost(e)
    } else {
      createNewPost(e)
    }
  }

  // TODO vaihda descriptionille <TextField ... /> + style + <Button ??

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="new-post-title"
        type="text"
        label="Title"
        value={postToUpdate?.title || title}
        setValue={postToUpdate ? setUpdatedTitle : setTitle}
      />
      <TextInput
        id="new-post-description"
        type="text"
        label="Description"
        value={postToUpdate?.description || description}
        setValue={postToUpdate ? setUpdatedDescription : setDescription}
      />

      <button
        onClick={() => {
          setShowForm(false)
          setPostToUpdate(undefined)
        }}
        type="button"
      >
        Back
      </button>
      <button id="save-new-post" type="submit">
        Save
      </button>
    </form>
  )
}

export default PostForm
