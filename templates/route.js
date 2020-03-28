const router = require("express-promise-router")();
const {name} = require("../controllers/{name}.controller");

router.route("/").get({name}.get);
router.route("/").post({name}.post);
router.route("/:id").get({name}.getById);
router.route("/:id").delete({name}.delete);
router.route("/:id").patch({name}.patch);

module.exports = router;
