const LoginForm = ({
    handleLogin,
    username,
    password,
    setUsername,
    setPassword
}) => {
return (
    <form onSubmit={handleLogin}>
        <input 
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
        />
        <input 
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
        />
        <button 
            type='submit'
        >
            Login
        </button>
    </form>
)
}

export default LoginForm