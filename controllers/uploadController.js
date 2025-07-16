const Upload = require('../modal/Upload');

exports.uploadFile = async (req, res) => {
  const { tenant, category } = req.body;
  const filePath = req.file.path;

  try {
    const upload = await Upload.create({ tenant, category, filePath });
    res.status(201).json(upload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUploads = async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ uploadedAt: -1 });
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const dayWise = await Upload.aggregate([
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%Y-%m-%d", date: "$uploadedAt" } },
            category: "$category",
            tenant: "$tenant"
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.day": 1 } }
    ]);

    const total = await Upload.countDocuments();

    res.json({ total, dayWise });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
