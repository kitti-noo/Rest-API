let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let bears = {
    list: [
        { "id": 1, "name": "Winnie", "weight": 50 },
        { "id": 2, "name": "Pooh", "weight": 66 }]
}
let user = { 'name': 'Warodom', 'age': 23 }
 
router.route('/users')
   .get((req, res) => res.json(user))
   .put((req, res) => {
       user = { name: req.body.name, age: user.age }
       res.json(user)
   })

router.route('/bears')
    .get((req, res) => res.json(bears))

    .post((req, res) => {
        console.log(req.body)
        let newBear = {}
        newBear.id = (bears.list.length) ? bears.list[bears.list.length - 1].id + 1 : 1
        newBear.name = req.body.name
        newBear.weight = req.body.weight
        bears = { "list": [...bears.list, newBear] }
        res.json(bears)
    })

router.route('/bears/:bear_id')
    .get((req, res) => {
        const bear_id = req.params.bear_id
        const id = bears.list.findIndex(item => +item.id === +bear_id)
        res.json(bears.list[id])
    })
    .put((req, res) => {
        const bear_id = req.params.bear_id
        const id = bears.list.findIndex(item => +item.id === +bear_id)
        bears.list[id].name = req.body.name
        bears.list[id].weight = req.body.weight
        res.json(bears)
    })

    .delete((req, res) => {
        const bear_id = req.params.bear_id
        console.log('bearId: ', bear_id)
        bears.list = bears.list.filter(item => +item.id !== +bear_id)
        res.json(bears)
    })

app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, () => console.log('server is running...'))