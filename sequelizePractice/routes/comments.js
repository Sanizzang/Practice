const express = require('express');
const { Comment } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const comment = await Comment.create({
            commenter: req.body.id,
            comment: req.body.comment,
        });
        console.log(comment);
        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id')
    // 클라이언트단에서 axios.patch(`/comments/${comment.id}`, { comment: newComment }); 요청이 오면 발생
    .patch(async (req, res, next) => {
        try {
            const result = await Comment.update({
                comment: req.body.comment, // 클라이언트단에서 보낸 { comment: newComment }
            }, {
                where: { id: req.params.id }, // :id
            });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    // 클라이언트단에서 await axios.delete(`/comments/${comment.id}`); 요청이 오면 발생
    .delete(async (req, res, next) => {
        try {
            const result = await Comment.destroy({ where: { id: req.params.id } });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });
    
module.exports = router;