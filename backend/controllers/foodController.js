
import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addfood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all food list
const listfood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// update food item
const updateFood = async (req, res) => {
  try {
    const { id, name, category, price, description } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (category !== undefined) updateFields.category = category;
    if (price !== undefined) updateFields.price = price;
    if (description !== undefined) updateFields.description = description;

    const updated = await foodModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      return res.json({ success: false, message: "Food not found" });
    }

    res.json({
      success: true,
      message: "Food updated successfully",
      data: updated,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// remove food item
const removefood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// ✅ export all together
export { addfood, listfood, updateFood, removefood };
