import foodModel from "../models/food_model.js";

const searchFoodController = async (req, res) => {

  try {
    const query=req.body.search;
    const searchFoodList = await foodModel.find({
        "$or": [
          { category: { $regex: query, $options: "i" } }, // Partial match for category
          { name: { $regex: query, $options: "i" } }      // Partial match for name
        ]
      });

    res.json({
        message: "Search food successfully",
        data:searchFoodList,
        success:true
    })
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error!" });
  }
};

export default searchFoodController
