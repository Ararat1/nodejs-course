class AdminController {
    static adminView(req, res) {
        res.render("admin", { username: req.session.user.username });
    }
}

export default AdminController;