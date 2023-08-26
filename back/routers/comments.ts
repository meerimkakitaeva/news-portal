import express from "express";
import mysqlDb from "../mysqlDb";
import {IComment, ICommentMutation} from "../types";
import {OkPacketParams} from "mysql2/index";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
  const connection = mysqlDb.getConnection();
  try {
    let result = await connection.query('SELECT * FROM comments');

    const queryNews = req.query.news_id as string;
    if (queryNews) {
      result = await connection.query(
          `SELECT * FROM comments WHERE news_id = ?`,
          [queryNews]);
    }
    const comments = result[0] as IComment[];
    res.send(comments);
  } catch (e) {
    res.send("error");
  }
});

commentsRouter.get('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query(
      'SELECT * FROM comments WHERE id = ?',
      [req.params.id]
  );
  const comments = result[0] as IComment[];
  const comment = comments[0];

  if (!comment) {
    res.status(404).send({"error": "Not found!"});
  }
  res.send(comment);
});

commentsRouter.post('/', async (req, res) => {
  try {
    if (!req.body.news_id || !req.body.content) {
      return res.status(400).send({error: "news_id and content are required"});
    }

    const connection = mysqlDb.getConnection();

    const comment: ICommentMutation = {
      news_id: req.body.news_id,
      author: req.body.author ? req.body.author : 'Anonymous',
      content: req.body.content,
    };

    const result = await connection.query(
        'INSERT INTO comments (news_id, author, content) VALUES (?, ?, ?)',
        [comment.news_id, comment.author, comment.content]
    );

    const info = result[0] as OkPacketParams;

    res.send({
      id: info.insertId,
      ...comment,
    });
  } catch (e) {
    res.send(e);
  }
});

commentsRouter.delete('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();
  try {
    await connection.query(
        'DELETE FROM comments WHERE id = ?',
        [req.params.id]
    );
    res.send('ok');
  } catch (e) {
    res.status(400).send('Restrict delete')
  }
});

export default commentsRouter;
