import { Router } from 'express'
import { getData, updateData, deleteData, postData } from '../controllers/restaurants.controller.js'
import { upload } from '../middlewares/upload.js'
const router = Router()

router.route("/getdata").get(getData)
router.route('/postdata').post(upload.single('image'), postData);
router.route("/updatedata").post(updateData)
router.route("/deletedata").post(deleteData)


export default router