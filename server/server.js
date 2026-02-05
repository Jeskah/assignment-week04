import dotenv from "dotenv"

dotenv.config();
const db = new pg.Pool({
    connectionString: process.env.DB_CONN,
})

console.log(process.env.DB_CONN);


import express from "express"
import pg from "pg"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (request, response) => {
    response.status(200).json({ status: "ok"});
});


app.get('/ParanormalExperiences', async (request, response) => {
try {
    const data = await db.query(`SELECT * FROM "ParanormalExperiences"`);

    response.status(200).json(data.rows);
}
catch (err) {
    console.error(err);
    response.status(500).json({error: err.message})
}
});

app.post('/ParanormalExperiences', async (request, response) => {
    try {
    const { name, date, event } = request.body

    const dbQuery = await db.query(`INSERT INTO "ParanormalExperiences" (name, date, event) VALUES ($1, $2, $3)`, [name, date, event]);

    response.status(200).json({ success: true});

}   catch (err) {
        console.error(err);
        response.status(500).json({ error: err.message});
    }
});

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



// app.listen(7777, () => {
//     console.log("server listening for requests made to http://localhost:7777");
// });

