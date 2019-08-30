/** Relative imports */
const Media = require('../models/media');

/** 
 *  Create media
 *  expects a post request from the client with payload like so: { url: "< insert url string >"}
 *  end-point: "/api/media"
 */
exports.createMedia = async (req, res) => {
    const { body } = req;
    const media = new Media(body);
    try {
      const newMedia = await media.save();
      res.status(201).json(newMedia);
    } catch(err) {
      res.status(400).json({message: err.message});
    }
}

/**
 *  Get single media
 *  expects a get request from the client with no payload
 *  end-point: "/api/media/:id"
 */
exports.getMedia = async (req, res) => {
  const { id } = req.params;
  try {
    const media = await Media.findById(id);
    if(media === null) {
      return res.status(404).json({message: "media doesn't exist"});
    }
    return res.json({media})
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}

/**
 *  Delete media
 *  expects a delete request from the client with no payload
 *  end-point: "/api/media/:id"
 */
exports.deleteMedia = async (req, res) => {
  const { id } = req.params;
  try {
    const media = await Media.findById(id);
    if(media === null) {
      return res.status(404).json({message: "media doesn't exist"});
    }
    await media.remove();
    res.json({message: "media deleted successfully"})
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}

module.exports = exports;
