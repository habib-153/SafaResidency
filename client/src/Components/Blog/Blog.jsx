import { useGetAllBlogsQuery } from '../../redux/features/blog/blogApi'

export default function Blog() {
  const {data, isLoading} = useGetAllBlogsQuery()

  const blogs = data?.data
  
  return (
    <div>Blog</div>
  )
}
