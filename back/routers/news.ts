import express from 'express';
import mysqlDb from "../mysqlDb";
import {OkPacketParams} from "mysql2/index";
import {INews, INewsAllFields, INewsMutation} from "../types";

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
    const connection = mysqlDb.getConnection();
    try {
        const result = await connection.query('SELECT id,title, image, datetime FROM news');
        const news = result[0] as INews[];
        res.send(news);
    } catch (e) {
        res.send("error");
    }
});

newsRouter.get('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const result = await connection.query(
        'SELECT * FROM news WHERE id = ?',
        [req.params.id]
    );
    const news = result[0] as INewsAllFields[];
    const oneNews = news[0];

    if (!oneNews) {
        res.status(404).send({"error": "Not found!"});
    }
    res.send(oneNews);
});


newsRouter.post('/', async (req, res) => {
    try {
        if (!req.body.title|| !req.body.content) {
            return res.status(400).send({error: "title and content are required"});
        }

        const connection = mysqlDb.getConnection();

        const post: INewsMutation = {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
        };

        const result = await connection.query(
            'INSERT INTO news (title, content, image) VALUES (?, ?, ?)',
            [post.title, post.content, post.image]
        );

        const info = result[0] as OkPacketParams;

        res.send({
            id: info.insertId,
            ...post,
        });
    } catch (e) {
        res.send(e);
    }
});

newsRouter.delete('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    try {
        await connection.query(
            'DELETE FROM news WHERE id = ?',
            [req.params.id]
        );

        res.send('ok');
    } catch (e) {
        res.status(400).send('Restrict delete')
    }
});

export default newsRouter;