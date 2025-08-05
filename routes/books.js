const express = require("express");
const router = express.Router();

// 메모리 데이터
let books = [
    { id: 1, title: "javascript", auther: "김**" },
    { id: 2, title: "html", auther: "김**" },
    { id: 3, title: "css", auther: "김**" },
];


const findeIndexId = (idParam) => {
    return books.findIndex(p => p.id == Number(idParam))
}

router.post('/', (req, res) => {
    try {
        const { title, auther } = req.body

        if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({ message: "title은 비어있지 않은 문자열이어야 합니다." });
        }
        if (typeof auther !== "string" || auther.trim() === "") {
            return res.status(400).json({ message: "auther는 비어있지 않은 문자열이어야 합니다." });
        }

        const nextId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1

        const newBook = {
            id: nextId,
            title: title,
            auther: auther
        }
        books.push(newBook)
        res.status(200).json({ message: "도서  추가 하기", books })
    } catch (error) {
        console.error(" 도서 추가 하기 중 오류")
        res.status(500).json({ message: "서버오류" })
    }
})
router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: "전체도서 가져오기", books })
    } catch (error) {
        console.error("전체 도서 가져오기 중 오류")
        res.status(500).json({ message: "서버오류" })
    }
})
router.get('/:id', (req, res) => {
    try {
        const bookId = Number(req.params.id)

        const index = findeIndexId(bookId)
        if (index === -1) {
            return res.status(404).json({ message: "유효하지 않은 id 값입니다." });
        }
        console.log(index)
        res.status(200).json({ message: "도서 한권 가져오기", book: books[index] })
    } catch (error) {
        console.error("도서 1권 가져오기 중 오류")
        res.status(500).json({ message: "서버오류" })
    }
})
router.put('/:id', (req, res) => {
    try {
        const bookId = Number(req.params.id)

        const index = findeIndexId(bookId)
        if (index === -1) {
            return res.status(404).json({ message: "유효하지 않은 id 값입니다." });
        }
        const updateData = req.body;
        books[index] = { ...books[index], ...updateData };

        res.status(200).json({ message: "도서 한권 수정하기", book: books[index] })
    } catch (error) {
        console.error("도서 1권 수정하기 중 오류")
        res.status(500).json({ message: "서버오류" })
    }
})
router.delete('/:id', (req, res) => {
    try {
        const bookId = Number(req.params.id)

        const index = findeIndexId(bookId)
        if (index === -1) {
            return res.status(404).json({ message: "유효하지 않은 id 값입니다." });
        }
        books.splice(index, 1)

        res.status(200).json({ message: "도서 한권 수정하기", books })
    } catch (error) {
        console.error("도서 1권 수정하기 중 오류")
        res.status(500).json({ message: "서버오류" })
    }
})

router.patch('/:id/title', (req, res) => {
    try {
        const bookId = Number(req.params.id)

        const index = findeIndexId(bookId)

        if (index === -1) {
            return res.status(404).json({ message: "유효하지 않은 id 값입니다." });
        }
        const { title } = req.body;
        if (typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ message: "title은 비어있지 않은 문자열이어야 합니다." });
        }
        books[index] = {
            ...books[index],
            title
        };

        res.status(200).json({ message: "도서 한권 제목수정하기", book: books[index] })
    } catch (error) {
        console.error("도서 1권 제목수정하기 중 오류")
        res.status(500).json({ message: "서버오류" })
    }
})
router.patch('/:id/auther', (req, res) => {
    try {
        const bookId = Number(req.params.id)

        const index = findeIndexId(bookId)

        if (index === -1) {
            return res.status(404).json({ message: "유효하지 않은 id 값입니다." });
        }
        const { auther } = req.body;
        if (typeof auther !== 'string' || auther.trim() === '') {
            return res.status(400).json({ message: "title은 비어있지 않은 문자열이어야 합니다." });
        }
        books[index] = {
            ...books[index],
            auther
        };

        res.status(200).json({ message: "도서 한권 제목수정하기", book: books[index] })
    } catch (error) {
        console.error("도서 1권 제목수정하기 중 오류")
        res.status(500).json({ message: "서버오류" })
    }
})

module.exports = router