import React from 'react'
import './styles.css'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import { Link } from 'react-router-dom'
import PostDetail from '../../components/PostDetail.js/PostDetail'


const Search = () => {
    const query = useQuery();
    const search = query.get("q")
    const {documents: posts} = useFetchDocuments("posts", search)

  return (
    <div className='search'>
        <h2>Search</h2>
        <div>
          {posts && posts.length === 0 && (
            <div className='noposts'>
            <p>Não foram encontrados posts a partir da sua busca :(</p>
            <Link to='/' className='btn '>
              Voltar
            </Link>
            </div>
          )}
          {posts && posts.map((post) => {
            return <PostDetail key={post.id} post={post} />
            })}
        </div>
        
    </div>
  )
}

export default Search