document.getElementById('downloadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageUrl = document.getElementById('imageUrl').value;
    const imageName = document.getElementById('imageName').value;
    
    if (!imageUrl || !imageName) {
        alert('Mohon masukkan link gambar dan nama gambar.');
        return;
    }

    fetch(imageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal mendownload gambar.');
            }
            return response.blob();
        })
        .then(blob => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `hyundai/${imageName}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            document.getElementById('statusMessage').textContent = 'Gambar berhasil didownload!';
        })
        .catch(error => {
            document.getElementById('statusMessage').textContent = 'Gagal mendownload gambar.';
            console.error('Error:', error);
        });
});
