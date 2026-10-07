const db = require("../config/db");

// GET /api/products  ->  SELECT * FROM products;
const getProducts = async (req, res) => {
    try {
        // const query = "SELECT * FROM products";

        // const [rows] = await db.execute(query);

        res.status(200).json({
            success: true,
            data: "working fine",
        });
    } catch (error) {
        console.error("SQL error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    }
};

// GET /api/products/:id  ->  SELECT * FROM products WHERE id = ?;
const getProductById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product id",
            });
        }

        const query = "SELECT * FROM products WHERE id = ?";

        const [rows] = await db.execute(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: rows[0],
        });
    } catch (error) {
        console.error("SQL error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
        });
    }
};

// POST /api/products  ->  INSERT INTO products (...) VALUES (?, ?, ?, ?);
const createProduct = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;

        if (!name || price === undefined || isNaN(Number(price))) {
            return res.status(400).json({
                success: false,
                message: "name and a numeric price are required",
            });
        }

        const query =
            "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)";

        const [result] = await db.execute(query, [
            name,
            description ?? null,
            Number(price),
            image ?? null,
        ]);

        res.status(201).json({
            success: true,
            message: "Product created",
            data: { id: result.insertId, name, description, price, image },
        });
    } catch (error) {
        console.error("SQL error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to create product",
        });
    }
};

// PUT /api/products/:id  ->  UPDATE products SET ... WHERE id = ?;
const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, description, price, image } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product id",
            });
        }

        if (!name || price === undefined || isNaN(Number(price))) {
            return res.status(400).json({
                success: false,
                message: "name and a numeric price are required",
            });
        }

        const query =
            "UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?";

        const [result] = await db.execute(query, [
            name,
            description ?? null,
            Number(price),
            image ?? null,
            id,
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated",
        });
    } catch (error) {
        console.error("SQL error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to update product",
        });
    }
};

// DELETE /api/products/:id  ->  DELETE FROM products WHERE id = ?;
const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product id",
            });
        }

        const query = "DELETE FROM products WHERE id = ?";

        const [result] = await db.execute(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted",
        });
    } catch (error) {
        console.error("SQL error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
