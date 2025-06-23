const orderModel = require("../../models/orderModel");

const allOrdersController = async (request, response) => {
    try {
        const orderList = await orderModel.find().sort({ createdAt: -1 });

        response.json({
            data: orderList,
            message: "All orders list",
            success: true
        });

    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

module.exports = allOrdersController;