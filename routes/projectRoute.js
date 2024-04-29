const Router = require("express").Router;
const projectController = require("../controllers/projectController");
const multipart = require("connect-multiparty");

const router = Router();
const multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get("/helloworld", projectController.helloWorld);
router.post("/create", projectController.createProject);
router.get("/get/:id", projectController.get);
router.get("/get", projectController.getAll);
router.put("/update/:id", projectController.update);
router.delete("/delete/:id", projectController.delete);
router.post("/upload-image/:id", multipartMiddleware, projectController.uploadImage);

module.exports = router;