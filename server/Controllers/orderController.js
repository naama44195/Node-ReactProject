// const Order = require("../Models/order");

// //Create- Post
// const createNewOrder = async (req, res) => {
//     const {ordername,status,shopname,delivername,description,imageUrl,address} = req.body
//     if (!ordername) { 
//     return res.status(400).json({ message: 'name is required' })}
    
    
//     const order = await Order.create({ ordername,status,shopname,delivername,description,imageUrl,address})
//     if (order) {
//     return res.status(201).json({ message: 'New order created' })
//     } else {
//     return res.status(400).json({ message: 'Invalid order ' })}}

// //Read- Get
// const getAllOrders = async (req, res) => {
    
//     const orders = await Order.find().lean()
    
//     if (!orders?.length) {
//     return res.status(400).json({ message: 'No orders found' })
//     }
//     res.json(orders)
//     }

// //Update- Put
// // const updateOrder = async (req, res) => {
    
// //     const {_id, ordername,status,shopname,delivername,description,imageUrl,address}= req.body

// //     if (!_id  ) {
// //     return res.status(400).json({message:"fields are required"})
// //     }
    
// //     const order = await Order.findById(_id).exec()
// //     if (!order) {
// //     return res.status(400).json({ message: 'order not found' })
// //     }
// //     order.ordername = ordername
// //     order.status = status
// //     order.shopname = shopname
// //     order.delivername=delivername
// //     order.description = description
// //     order.imageUrl=imageUrl,
// //     order.address=address

// //     const updateOrder = await order.save()
// //     res.json(`'${updateOrder.ordername}' updated`)
// //     }

// // const updateOrder = async (req, res) => {
// //   const { _id } = req.body;

// //   if (!_id) {
// //     return res.status(400).json({ message: "ID is required" });
// //   }

// //   try {
// //     const order = await Order.findById(_id).exec();

// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found" });
// //     }

// //     // עדכון רק של שדות שנשלחו בפועל
// //     if (req.body.ordername !== undefined) order.ordername = req.body.ordername;
// //     if (req.body.status !== undefined) order.status = req.body.status;
// //     if (req.body.shopname !== undefined) order.shopname = req.body.shopname;
// //     if (req.body.delivername !== undefined) order.delivername = req.body.delivername;
// //     if (req.body.description !== undefined) order.description = req.body.description;
// //     if (req.body.imageUrl !== undefined) order.imageUrl = req.body.imageUrl;
// //     if (req.body.address !== undefined) order.address = req.body.address;

// //     const updatedOrder = await order.save();
// //     res.json({ message: `'${updatedOrder.ordername}' updated successfully` });
// //   } catch (err) {
// //     console.error("Update error:", err);
// //     res.status(500).json({ message: "Server error while updating order" });
// //   }
// // };

// // //Delete
// // const deleteOrder = async (req, res) => {
// //     const { id } = req.params
    
// //     const order = await Order.findById(id).exec()
// //     if (!order) {
// //     return res.status(400).json({ message: 'order not found' })
// //     }
// //     const result = await order.deleteOne()
// //     const reply=`deliver '${result.ordername}' ID ${result._id} deleted`
// //     res.json(reply)
// //     }


// // //getPostById
// // const getOrderById = async (req, res) => {
// //     const {id} = req.params
    
// //     const order = await Order.findById(id).lean()
    
// //     if (!order) {
// //     return res.status(400).json({ message: 'No order found' })
// //     }
// //     res.json(order)
// //     }

// //     const getOrdersByCity = async (req, res) => {
// //         try {
// //           const { city } = req.params;
      
// //           if (!city) {
// //             return res.status(400).json({ message: "Missing city parameter" });
// //           }
  
// //         const orders = await Order.find({ "address.city": { $regex: `^${city}$`, $options: 'i' } }).lean();

// //           res.json(orders);
// //         } catch (error) {
// //           console.error("Failed to fetch orders by city:", error);
// //           res.status(500).json({ message: "Server error" });
// //         }
// //       };



// // module.exports={getOrderById,deleteOrder,updateOrder,getAllOrders,createNewOrder,getOrdersByCity}

const Order = require("../Models/order");

// Create - POST
const createNewOrder = async (req, res) => {
  const { ordername, status, shopname, delivername, description, imageUrl, address } = req.body;

  if (!ordername) {
    return res.status(400).json({ message: 'name is required' });
  }

  const order = await Order.create({ ordername, status, shopname, delivername, description, imageUrl, address });

  if (order) {
    return res.status(201).json({ message: 'New order created' });
  } else {
    return res.status(400).json({ message: 'Invalid order' });
  }
};

// Read - GET
const getAllOrders = async (req, res) => {
  const orders = await Order.find().lean();

  if (!orders?.length) {
    return res.status(400).json({ message: 'No orders found' });
  }

  res.json(orders);
};

// Update - PUT
const updateOrder = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const order = await Order.findById(_id).exec();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.body.ordername !== undefined) order.ordername = req.body.ordername;
    if (req.body.status !== undefined) order.status = req.body.status;
    if (req.body.shopname !== undefined) order.shopname = req.body.shopname;
    if (req.body.delivername !== undefined) order.delivername = req.body.delivername;
    if (req.body.description !== undefined) order.description = req.body.description;
    if (req.body.imageUrl !== undefined) order.imageUrl = req.body.imageUrl;
    if (req.body.address !== undefined) order.address = req.body.address;

    const updatedOrder = await order.save();
    res.json({ message: `'${updatedOrder.ordername}' updated successfully` });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error while updating order" });
  }
};

// Delete - DELETE
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id).exec();
  if (!order) {
    return res.status(400).json({ message: 'order not found' });
  }

  const result = await order.deleteOne();
  const reply = `order '${result.ordername}' ID ${result._id} deleted`;
  res.json(reply);
};

// Get Order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id).lean();

  if (!order) {
    return res.status(400).json({ message: 'No order found' });
  }

  res.json(order);
};

// Get Orders by City
const getOrdersByCity = async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({ message: "Missing city parameter" });
    }

    const orders = await Order.find({ "address.city": { $regex: `^${city}$`, $options: 'i' } }).lean();
    res.json(orders);
  } catch (error) {
    console.error("Failed to fetch orders by city:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Orders by Shop + onlyUnclaimed סינון לפי 10 דקות
const getOrdersByShop = async (req, res) => {
  const { shopname } = req.params;
  const { onlyUnclaimed } = req.query;

  if (!shopname) {
    return res.status(400).json({ message: "Missing shopname" });
  }

  try {
    let query = { shopname };

    if (onlyUnclaimed === 'true') {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      query = {
        ...query,
        delivername: { $in: [null, ""] }, // לא שויך עדיין לשליח
        createdAt: { $lte: tenMinutesAgo },
      };
    }

    const orders = await Order.find(query).sort({ createdAt: -1 }).lean();

    if (!orders?.length) {
      return res.status(404).json({ message: "No orders found for this shop" });
    }

    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders by shop:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getOrderById,
  deleteOrder,
  updateOrder,
  getAllOrders,
  createNewOrder,
  getOrdersByCity,
  getOrdersByShop
};