var express = require("express");
var exe = require("./../connection");

var route = express.Router();

/* ================= LOGIN ================= */

route.get("/", function (req, res) {
    res.redirect("/admin/login");
});

route.get("/login", function (req, res) {
    res.render("admin/login"); 
});

route.post("/login", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (username === "admin" && password === "admin") {
        res.render("admin/home.ejs");
    } else {
        res.send("LOGIN FAILED");
    }
});

/* ================= CATEGORY ================= */

route.get("/category-management", async function(req, res){
    var sql = "SELECT * FROM categories";
    var result = await exe(sql);
    res.render("admin/categories.ejs", { categories: result });
});

route.post("/category_save", async function (req, res) {
    var sql = "INSERT INTO categories (category_name, category_status) VALUES (?, ?)";
    await exe(sql, [req.body.category_name, req.body.category_status]);
    res.redirect("/admin/category-management");
});

route.get("/delete_category/:id", async function (req, res) {
    var sql = "DELETE FROM categories WHERE category_id = ?";
    await exe(sql, [req.params.id]);
    res.redirect("/admin/category-management");
});

route.get("/category_edit/:id", async function (req, res) {
    var result = await exe(
        "SELECT * FROM categories WHERE category_id = ?",
        [req.params.id]
    );

    if (result.length === 0) {
        return res.send("Category not found");
    }

    res.render("admin/categoriesedit.ejs", { category: result[0] });
});

route.post("/category_update/:id", async function (req, res) {
    var sql = `
        UPDATE categories 
        SET category_name = ?, category_status = ?
        WHERE category_id = ?
    `;
    await exe(sql, [
        req.body.category_name,
        req.body.category_status,
        req.params.id
    ]);
    res.redirect("/admin/category-management");
});

/* ================= PRODUCT ================= */





/* ================= ORDER MANAGEMENT ================= */

/* ================= ORDER MANAGEMENT ================= */

/* ================= ORDER MANAGEMENT ================= */

// SAVE ORDER
route.post("/order-save", async function(req, res){
    var sql = `
        INSERT INTO orders (order_date, total_amount, order_status)
        VALUES (?, ?, ?)
    `;

    await exe(sql, [
        req.body.order_date,
        req.body.total_amount,
        req.body.order_status
    ]);

    res.redirect("/admin/ordermanagement");
});

// LIST ORDERS
route.get("/OrderManagement", async function(req, res){
    var sql = "SELECT * FROM orders";
    var result = await exe(sql);

    res.render("admin/ordermanagement.ejs", { orders: result });
});

route.get("/order-edit/:id", async function(req, res){

    var result = await exe(
        "SELECT * FROM orders WHERE order_id = ?",
        [req.params.id]
    );

    if (result.length == 0) {
        return res.send("Order not found");
    }

    res.render("admin/order_edit.ejs", {
        order: result[0]
    });
});

route.post("/order-update/:id", async function(req, res){

    var d = req.body;

    var sql = `
        UPDATE orders SET
        order_date = ?,
        total_amount = ?,
        order_status = ?
        WHERE order_id = ?
    `;

    await exe(sql, [
        d.order_date,
        d.total_amount,
        d.order_status,
        req.params.id
    ]);

    res.redirect("/admin/OrderManagement");
});
route.get("/order-delete/:id", async function(req, res){

    await exe(
        "DELETE FROM orders WHERE order_id = ?",
        [req.params.id]
    );

    res.redirect("/admin/OrderManagement");
});


// CUSTOMER LIST PAGE
route.get("/customers", async function (req, res) {

    var sql = "SELECT * FROM customers";
    var result = await exe(sql);

    res.render("admin/customers.ejs", { customers: result });
});


/* ================= CUSTOMER MANAGEMENT ================= */

// list + form page
route.get("/CustomerManagement", async function(req, res){
    var customers = await exe("SELECT * FROM customers");
    res.render("admin/customermanagement.ejs", {
        customers: customers
    });
});

// save customer
route.post("/customer_save", async function(req, res){

    var d = req.body;

    var sql = `
        INSERT INTO customers
        (customer_name, customer_mobile, customer_email, customer_address)
        VALUES (?, ?, ?, ?)
    `;

    await exe(sql, [
        d.customer_name,
        d.customer_mobile,
        d.customer_email,
        d.customer_address
    ]);

    res.redirect("/admin/CustomerManagement");
});

// edit page
route.get("/customer-edit/:id", async function(req, res){
    var result = await exe(
        "SELECT * FROM customers WHERE customer_id = ?",
        [req.params.id]
    );

    res.render("admin/customer_edit.ejs", {
        customer: result[0]
    });
});

// update
route.post("/customer-update/:id", async function(req, res){
    await exe(
        `UPDATE customers SET
         customer_name = ?,
         customer_mobile = ?,
         customer_email = ?,
         customer_address = ?
         WHERE customer_id = ?`,
        [
            req.body.customer_name,
            req.body.customer_mobile,
            req.body.customer_email,
            req.body.customer_address,
            req.params.id
        ]
    );

    res.redirect("/admin/CustomerManagement");
});

// CUSTOMER DELETE
route.get("/customer-delete/:id", async function (req, res) {

    var sql = "DELETE FROM customers WHERE customer_id = ?";
    await exe(sql, [req.params.id]);

    res.redirect("/admin/CustomerManagement");
});


/* ================= PRODUCT MANAGEMENT ================= */

// list + form
// PRODUCT LIST PAGE

route.get("/ProductManagement", async function(req, res){

    var products = await exe("SELECT * FROM products");

    res.render("admin/product Management.ejs", {
        products: products
    });
});
route.post("/product_save", async function (req, res) {

    var d = req.body;

    var sql = `
        INSERT INTO products
        (product_name, product_price, product_discount,
         product_color, product_size, product_catrgory,
         description, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await exe(sql, [
        d.product_name,
        d.product_price,
        d.product_discount,
        d.product_color,
        d.product_size,
        d.product_catrgory,
        d.description,
        d.status
    ]);
    res.redirect("/admin/ProductManagement");
});

// PRODUCT EDIT PAGE
route.get("/product-edit/:id", async function(req, res){

    var result = await exe(
        "SELECT * FROM products WHERE product_id = ?",
        [req.params.id]
    );

    if (result.length == 0) {
        return res.send("Product not found");
    }

    res.render("admin/product_edit.ejs", {
        product: result[0]
    });
});

// PRODUCT UPDATE
route.post("/product-update/:id", async function(req, res){

    var d = req.body;

    var sql = `
        UPDATE products SET
        product_name = ?,
        product_price = ?,
        product_discount = ?,
        product_color = ?,
        product_size = ?,
        product_catrgory = ?,
        description = ?,
        status = ?
        WHERE product_id = ?
    `;

    await exe(sql, [
        d.product_name,
        d.product_price,
        d.product_discount,
        d.product_color,
        d.product_size,
        d.product_catrgory,
        d.description,
        d.status,
        req.params.id
    ]);

    res.redirect("/admin/ProductManagement");
});


// PRODUCT DELETE
route.get("/delete_product/:id", async function(req, res){

    await exe(
        "DELETE FROM products WHERE product_id = ?",
        [req.params.id]
    );

    res.redirect("/admin/ProductManagement");
});



















module.exports = route;
