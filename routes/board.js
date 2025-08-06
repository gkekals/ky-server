const express = require("express")
const router = express.Router()

let boards=require('../models/boardModel')

router.get('/',(req,res)=>{
    try {
        res.status(200).json({message:'전체 게시물 가져오기',boards})
    } catch (error) {
        res.status(500).json({message:"서버 오류",error})
    }
})

// 1개 데이터 가져오기
router.get('/:id', (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const board = boards.find(item => item.id === boardId)

        if (!board) {
            return res.status(404).json({ message: '게시물을 찾을수 없음' })

        }
        return res.status(200).json({
            message: '1개 게시물 가져오기',
            board
        })
    } catch (error) {
        res.status(500).json({ message: "서버오류", error })
    }
})
//데이터 추가하기
router.post('/',(req,res)=>{
    try {
        const { title, content } = req.body

        if(!title || !content){
            return res.status(400).json({message:'제목과 내용을 모두 입력하세요'})
        }
        const newBoard={
            id:Date.now(),
            title,
            content
        }
        boards.push(newBoard)
        res.status(200).json({message:'전체 게시물 가져오기',boards})
    } catch (error) {
        res.status(500).json({message:"서버 오류",error})
    }
})

// 1개 데이터 수정
router.put("/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id)

        const index = boards.findIndex(item => item.id === boardId)

        if (index === -1) {
            return res.status(404).json({ message: "조회할 게시물이 없습니다" })
        }
        const updateData = req.body

        boards[index]={
            ...boards[index],
            ...updateData
        }
        res.status(200).json({ message: "1개 게시물 수정 완료", board: boards[index] })
    } catch (error) {
        console.error("게시물 수정 중 오류", error)
        res.status(500).json({ message: "서버 내부 오류 발생" })
    }
})

//삭제
router.delete("/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(item => item.id === boardId)
        if (index === -1) {
            res.status(404).json({ message: "게시글 삭제 중 오류" })
        }


        boards.splice(index,1)

        res.status(200).json({ message: "게시글1개 삭제 완료", boards })
    } catch (error) {
        console.error("게시글 1개 삭제 중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})


module.exports=router
