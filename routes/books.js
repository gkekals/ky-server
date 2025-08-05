const express = require("express");
const router = express.Router();

let books = [
    { id: 1, title: "javascript", auther: "김**" },
    { id: 2, title: "html", auther: "김**" },
    { id: 3, title: "css", auther: "김**" },
];

const findIndexId = (idParam) => {
    return postMessage.findIndex(p => p.id == Number(idParam))
}

// 1) POST /books — 도서 등록
router.post("/", (req, res) => {
    try {
        const { title, auther } = req.body;
        if (typeof title !== "string" || title.trim() === "" ||
            typeof auther !== "string" || auther.trim() === "") {
            return res.status(400).json({ message: "title, auther는 비워있지 않은 문자열이어야 합니다." });
        }
        const nextId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
        const newBook = {
            id: nextId,
            ti0tle: title,
            auther: auther
        };
        books.push(newBook);
        res.status(201).json({ message: "도서 등록 완료", books });
    } catch (error) {
        console.error("도서 등록 중 오류", error);
        res.status(500).json({ message: "서버오류" });
    }
});

// 2) GET /books — 전체 도서 조회
router.get("/", (req, res) => {
    try {
        res.status(200).json({ message: "전체도서 가져오기", books });
    } catch (error) {
        console.error("전체 도서 가져오기 중 오류", error);
        res.status(500).json({ message: "서버오류" });
    }
});

// 3) GET /books/:id — 특정 도서 조회
router.get("/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const book = books.find(b => b.id === id);
        if (!book) {
            return res.status(404).json({ message: "도서를 찾을 수 없습니다." });
        }
        res.status(200).json({ message: "도서 하나 가져오기", book });
    } catch (error) {
        console.error("도서 하나 불러오기 중 오류", error);
        res.status(500).json({ message: "서버오류" });
    }
});

// 4) PUT /books/:id — 도서 수정(치환/병합)
router.put("/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const idx = books.findIndex(b => b.id === id);
        if (idx === -1) {
            return res.status(404).json({ message: "도서를 찾을 수 없습니다." });
        }
        books[idx] = { ...books[idx], ...req.body };
        res.status(200).json({ message: "도서 하나 수정 완료", book: books[idx] });
    } catch (error) {
        console.error("도서 수정 중 오류", error);
        res.status(500).json({ message: "서버오류" });
    }
});

// 5) DELETE /books/:id — 도서 삭제
router.delete("/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const idx = books.findIndex(b => b.id === id);
        if (idx === -1) {
            return res.status(404).json({ message: "도서를 찾을 수 없습니다." });
        }
        books.splice(idx, 1);
        res.status(200).json({ message: "도서 삭제 완료", books });
    } catch (error) {
        console.error("도서 삭제 중 오류", error);
        res.status(500).json({ message: "서버오류" });
    }
});

module.exports = router;
