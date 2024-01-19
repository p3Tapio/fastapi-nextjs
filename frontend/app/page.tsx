import variables from './_style/variables.modules.scss'
import PublicPosts from './_components/publicPosts/publicPosts'

const Page = () => {
  return (
    <>
      <h1 style={{ color: variables.font_color }}>Hello, Next.js!</h1>
      <PublicPosts />
    </>
  )
}

export default Page
