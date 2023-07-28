import React, { useContext, useState } from 'react'
import TextInput from 'elements/TextInput'
import { useAppDispatch } from 'state/store'
import { AuthContext } from 'state/user/authContext'
import { createPost } from 'state/post/postSlice'

interface ICreatePostFormProps {
  setShowCreateNewForm: React.Dispatch<React.SetStateAction<boolean>>
}

const CreatePostForm: React.FC<ICreatePostFormProps> = ({
  setShowCreateNewForm,
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useAppDispatch()
  const { authDetails } = useContext(AuthContext)

  const createNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (authDetails) {
        const { accessToken } = authDetails
        await dispatch(
          createPost({ token: accessToken, post: { title, description } })
        ).unwrap()
        // TODO show message create tjsp, setResult?
        setShowCreateNewForm(false)
      }
    } catch (error) {
      // TODO setError and show it
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  // TODO vaihda descriptionille <TextField ... /> + style

  return (
    <form onSubmit={(e) => createNewPost(e)}>
      <TextInput
        id="new-post-title"
        type="text"
        label="Title"
        value={title}
        setValue={setTitle}
      />
      <TextInput
        id="new-post-description"
        type="text"
        label="Description"
        value={description}
        setValue={setDescription}
      />
      <button type="submit">Save</button>
    </form>
  )
}

export default CreatePostForm
