const express = require('express');
const { Post } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const post = await Post.create({
            writer: req.body.id,
            title: req.body.title,
            content: req.body.content,
            grade: req.body.grade,
        });
        console.log(post);
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id')
    .patch(async (req, res, next) => {
        try {
            const result = await Post.update({
                title: req.body.title,
                content: req.body.content,
            }, {
                where: { id: req.params.id },
            });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Post.destroy({ where: { id: req.params.id } });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });
    
module.exports = router;