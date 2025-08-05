const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

// 초기 데이터 3개 
let posts = [
    {
        id: 1,
        displayId: 1,
        subject: "subject-1",
        desc: "desc-1",
        createdAt: "2025-08-01",
        status: "draft",          // 상태: draft / published / archived
    },
    {
        id: 2,
        displayId: 2,
        subject: "subject-2",
        desc: "desc-2",
        createdAt: "2025-08-01",
        status: "published",
    },
    {
        id: 3,
        displayId: 3,
        subject: "subject-3",
        desc: "desc-3",
        createdAt: "2025-08-01",
        status: "archived",
    }
];

let initId = 4
const findeIndexId = (idParam) => { return posts.findIndex(p => p.id == Number(idParam)) }

app.post('/posts', (req, res) => {
    try {
        const { subject, desc } = req.body

        if (typeof subject !== 'string', subject.trim() == '',
            typeof desc !== 'string' || desc.trim() == '') {
            return res.status(400).json({ message: "subject, desc는 비워있지 않은 문자열 이어야 합니다." })
        }

        const newPost = {
            id: initId++,
            displayId: posts.length + 1,
            subject: subject,
            desc: desc,
            createdAt: new Date().toISOString(),
            status: "draft",
        }
        posts.push(newPost)
        res.status(201).json({ message: "게시글 생성 완료", posts })
    } catch (error) {
        console.error("게시글 생성중 오류", error)
        res.status(500).json({ message: "서버오류" })
    }
})
app.get('/posts', (req, res) => {
    try {
        res.status(201).json({ message: "게시글 생성 완료", posts })
    } catch (error) {
        console.error("게시글 생성 중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})
app.get('/posts/:id', (req, res) => {
    try {
        const postId = req.params.id

        const index = findeIndexId(postId)


        return res.status(201).json({
            message: "게시글 1개 불러오기 완료",
            post: posts[index]
        })
    } catch (error) {
        console.error("게시글 1개 불러오기 중 오류", error)
        res.status(500).json({ message: "서버오류" })
    }
})

app.put('/posts/:id', (req, res) => {
    try {
        const postId = Number(req.params.id)

        const index = findeIndexId(postId)


        if (index == -1) return res.status(404).json({ message: "게시글 없음" })

        const updateData = req.body

        posts[index] = {
            ...posts[index],
            ...updateData
        }
        return res.status(201).json({
            message: "게시글 1개 수정하기 완료", post: posts[index]
        })
    } catch (error) {
        console.error("게시글 1개 수정하기 중 오류", error)
        res.status(500).json({ message: "서버오류" })
    }
})

app.delete('/posts/:id', (req, res) => {
    try {
        const postId = Number(req.params.id)

        const index = findeIndexId(postId)


        if (index == -1) return res.status(404).json({ message: "게시글 없음" })

        posts.splice(index, 1)

        return res.status(201).json({
            message: "게시글 1개 삭제하기 완료", posts
        })
    } catch (error) {
        console.error("게시글 1개 삭제하기 중 오류", error)
        res.status(500).json({ message: "서버오류" })
    }
})

app.patch('/posts/:id/status', (req, res) => {
    try {
        const postId = Number(req.params.id)

        const index = findeIndexId(postId)


        if (index == -1) return res.status(404).json({ message: "게시글 없음" })

        const { status } = req.body

        const ALLOWED = ["draft", "published", "archived"];

        if (!ALLOWED.includes(status)) {
            return res.status(400).json({ message: `status는 ${ALLOWED.join(", ")} 중 하나여야 합니다.` });
        }
        posts[index] = {
            ...posts[index],
            status
        }
        return res.status(201).json({
            message: "게시글 1개 상태변경 완료", post: posts[index]
        })
    } catch (error) {
        console.error("게시글 1개 상태변경 중 오류", error)
        res.status(500).json({ message: "서버오류" })
    }
})




app.get("/", (req, res) => {
    res.send("Hello Express!")
})
app.listen(PORT, () => {
    console.log("Server is running!")
})