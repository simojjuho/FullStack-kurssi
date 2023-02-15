const Anecdote = ({ anecdote }) => {

    return (
        <div>
            <h2>{anecdote.content}</h2>
            has {anecdote.votes} votes. <br />
            For more info see: {anecdote.info} <br />

        </div>
    )
}

export default Anecdote