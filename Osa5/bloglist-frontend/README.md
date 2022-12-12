In this part I'm making frontend to the bloglist backend created in Part 4 ('Osa 4').

The project is divided in smaller components as is done in React. Token based authentication is implemented. Token is saved in the window.localStorage in the App componnt,
which is the main component. The functions working with the backend are stored in ./services. blogs.js handles getting, updating, deleting and posting new blogs and
login.js in the same folder deals with the login.
