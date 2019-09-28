const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID});
const router = vertex.router();


router.get('/', (req, res) => {
    const data = {
        image_profile: 'https://i.ytimg.com/vi/qvXZcqv1C3U/maxresdefault.jpg'  ,
        greeting: 'Hello ! Welcome to my Portfolio site !',
        introduction: "I'm a web development student and a freelancer working on the development of website and webapp. Expert Laravel ",
        languages: [
            {name: 'Laravel', years: 3},
            {name: 'Angular', years: 2},
            {name: 'NodeJs', years: 1},
            {name: 'Wordpress', years: 2}
        ]
    }
    res.render('landing', data);
})

module.exports = router