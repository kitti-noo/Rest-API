const express = require('express');
const bodyParser = require('body-parser');
const { resolveAny } = require('dns');
const app = express();
let cors = require('cors');
app.use(cors());
const router = express.Router();
const PORT = 80;

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = {
    list:
        [
            { id: "6135512001", name: 'Kitti', surname: 'Noo', major: "CoE", GPA: 3.3 },
            { id: "6135512002", name: 'John', surname: 'Lennon', major: "SE", GPA: 2.87 },

        ]
}


router.route('/students')
    .get((req, res) => res.json(students))
    .post((req, res) => {
        console.log(req.body)
        //let id = (students.list.length)? students.list[students.list.length-1].id+1:1
        let newStudent = {}
        newStudent.id = (students.list.length) ? students.list[students.list.length-1].id+1 : 1
        newStudent.name = req.body.name
        newStudent.surname = req.body.surname
        newStudent.major = req.body.major
        newStudent.GPA  = req.body.GPA
        students = { list: [...students.list, newStudent] }
        res.json(students)
    })

router.route('/students/:student_id') //params
    .get((req, res) => {
        let id = students.list.findIndex((item) => (+item.id === +req.params.student_id))
        
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            res.json(students.list[id])
        }
        

    })
    .put((req, res) => {
        let id = students.list.findIndex((item) => (+item.id === +req.params.student_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            students.list[id].name = req.body.name
            students.list[id].surname = req.body.surname
            students.list[id].major = req.body.major
            students.list[id].GPA = req.body.GPA
            res.json(students)
        }


    })
    .delete((req, res) => {
       
        let id = students.list.findIndex((item) => (+item.id === +req.params.student_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            students.list = students.list.filter((item) => +item.id !== +req.params.student_id)
            res.json(students)
        }
    })

app.listen(PORT, () => console.log('Server is running at', PORT));