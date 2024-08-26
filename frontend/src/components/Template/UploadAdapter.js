import axios from 'axios';

export class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  // Upload the file
  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file
        .then(file => {
          const data = new FormData();
          data.append('upload', file);

          axios.post('http://localhost:3000/upload-image', data)
            .then(response => {
              const result = response.data;
              if (result.url) {
                resolve({
                  default: result.url,
                });
              } else {
                reject('Upload failed');
              }
            })
            .catch(error => {
              console.error('Upload error:', error);
              reject('Upload failed');
            });
        });
    });
  }

  // Abort the upload
  abort() {
    // Implement if needed
  }
}
