import { Router } from "express";

const router = Router()

router.get('/', (req, res)=> {
    console.log('This is student homepage');
    res.status(200).send('This is student homepage')
})



export {router as studentRouter}