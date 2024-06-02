const updateContent = async (req, res, next) => {
  try {
    const {
      title,
      content
    } = req.body;
    const newContent = await Content.findOneAndUpdate({
      title
    }, {
      content
    }, {
      new: true
    }); 
    res.status(200).json({
      status: 'success',
      data: {
        newContent
      }
    });
    } catch (err) {
    next(err);
    }
}
module.exports = {  updateContent }