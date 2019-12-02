const router = require("express-promise-router")();
const {name} = require("../controllers/{name}.controller");

router.route("/").get({name}.get);
router.route("/").post({name}.post);
router.route("/").delete({name}.delete);
router.route("/").patch({name}.patch);

module.exports = router;
