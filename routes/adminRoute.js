const express = require('express');
const router = express.Router()
const adminController = require('../controller/adminController')
const multer = require('multer')

const upload = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb) =>{
            cb(null,'./images')
        },
        filename : (req,file,cb) => {
            cb(null, Date.now()+ '-' +file.originalname)
        }
    })

})


router.get('/add',adminController.addProductPage)
router.post('/add', upload.single('image') ,adminController.addProduct)  

router.get('/orders',adminController.manageOrder)
router.post('/orders/searchEmail',adminController.searchEmail)
router.post('/orders/satuts',adminController.chanageStatus)
router.post('/orders/delete',adminController.deleteOrder)



module.exports = router
