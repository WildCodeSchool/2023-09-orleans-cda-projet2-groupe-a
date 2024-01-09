import multer from 'multer';

const MIME_TYPES: Record<string, string> = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});

interface MulterConfig {
  storage: multer.StorageEngine;
}

const multerConfig: MulterConfig = {
  storage: storage,
};

export default multer(multerConfig).single('cocktailPic');
