import multer from 'multer';
import crypto from 'node:crypto';

// Importez le module crypto

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

    // Utilisez crypto pour générer un nom de fichier unique
    crypto.randomBytes(16, (err, buffer) => {
      if (err) {
        callback(err, '');
        return;
      }
      // Créez un nom de fichier unique en utilisant la chaîne hexadécimale générée par randomBytes
      const uniqueName = buffer.toString('hex') + '_' + name + '.' + extension;
      callback(null, uniqueName);
    });
  },
});

const multerConfig = multer({ storage: storage }).single('cocktailPic');

export default multerConfig;
