const express = require('express');
const Character = require('../models/characterModel');
const router = express.Router();



router.post('/', async (req, res) => {
    try {
        const { name, level, isOnline } = req.body

        if (!name || typeof level !== 'number') {
            return res.status(400).json({ message: 'name과 level은 필수 입니다.' })
        }
        const newChar = new Character({
            name,
            level,
            isOnline: isOnline ?? false
        })

        const saveChar = await newChar.save()

        res.status(200).json({ message: '캐릭터 추가하기 성공', character: saveChar })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

router.get('/', async (req, res) => {
    try {

        const characters = await Character.find()


        res.status(200).json({ message: '캐릭터 전체 조회하기 성공', characters })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const charId = req.params.id



        const character = await Character.findById(charId)

        if (!character) {
            res.status(404).json({ message: '캐릭터를 찾을 수 없습니다' })
        }
        res.status(200).json({ message: '캐릭터 조회하기 성공', character })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

router.put('/:id', async (req, res) => {
    try {

        const { name, level, isOnline } = req.body

        if (!name || typeof level !== 'number') {
            return res.status(400).json({ message: 'name과 level은 필수 입니다.' })
        }

        const updateChar = await Character.findByIdAndUpdate(
            req.params.id,
            {
                name,
                level,
                isOnline
            }, {
            new: true,
            runValidators: true
        }
        )

        if (!updateChar) {
            res.status(404).json({ message: '캐릭터 를 찾을 수 없습니다.' })
        }
        res.status(200).json({ message: '캐릭터 수정하기 성공', character: updateChar })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const charId = req.params.id


        const character = await Character.findByIdAndDelete(charId)

        if (!character) {
            res.status(404).json({ message: '캐릭터를 찾을 수 없습니다' })
        }
        res.status(200).json({ message: '캐릭터 삭제하기 성공', character })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

module.exports = router;
