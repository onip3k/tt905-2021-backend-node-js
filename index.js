const express = require("express");
const app = express();
app.use(express.json());

// Permissões
var cors = require('cors');
app.use(cors());

// Porta que eu estou ouvindo
app.listen(process.env.PORT || 3000);

app.get('/', 
    function (req, res){    
        res.send("Hello World!! This is a movie database!");
    }
);

app.get('/hello',
function (req, res){    
    res.send("Hello again! Here we have the best movies in my opinion!");
    }
)

const movies = [
    {title:"Seven Samurai", director:"Akira Kurosawa", year:"1954"},
    {title:"Stalker", director:"Andrei Tarkovsky", year:"1979"},
    {title:"Scandal", director:"Akira Kurosawa", year:"1950"},
    {title:"Solaris", director:"Andrei Tarkovsky", year:"1972"}
];

app.get('/movies',
    function(req, res){
        res.send(movies);
        //res.send(movies.filter(Boolean));
    }
);

app.get('/movies/:id',
    function(req, res){
        const id = req.params.id - 1;
        const movie = movies[id];

        if (!movie){
            res.send("Movie not found.");
        } else {
            res.send(movie);
        }
    }
)

app.post('/movies', 
    (req, res) => {
        console.log(req.body.title);
        console.log(req.body.director);
        console.log(req.body.year);
        const movie = {title:req.body.title, director:req.body.director, year:req.body.year};
        movies.push(movie); 
        res.send("Create one movie.")
    }
);

app.put('/movies/:id',
    (req, res) => {
        const id = req.params.id - 1;
        const movie = {title:req.body.title, director:req.body.director, year:req.body.year};
        movies[id] = movie;        
        res.send("Movie successfully updated.")
    }
)

app.delete('/movies/:id', 
    (req, res) => {
        const id = req.params.id - 1;
        delete movies[id];

        res.send("Movie successfully removed.");
    }
);