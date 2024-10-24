function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(angka);
}

function hitungPembayaran() {
    const hargaPahaAyam = 12000;
    const hargaDadaAyam = 12000;
    const hargaSayapAyam = 10000;
    const hargaNasi = 5000;
    const hargaKentang = 5000;

    const jumlahPahaAyam = parseInt(document.getElementById('pahaAyam').value) || 0;
    const jumlahDadaAyam = parseInt(document.getElementById('dadaAyam').value) || 0;
    const jumlahSayapAyam = parseInt(document.getElementById('sayapAyam').value) || 0;
    const jumlahNasi = parseInt(document.getElementById('nasi').value) || 0;
    const jumlahKentang = parseInt(document.getElementById('kentang').value) || 0;

    const total = Math.round(
        (jumlahPahaAyam * hargaPahaAyam) +
        (jumlahDadaAyam * hargaDadaAyam) +
        (jumlahSayapAyam * hargaSayapAyam) +
        (jumlahNasi * hargaNasi) +
        (jumlahKentang * hargaKentang)
    );

    let totalSebelumDiskon = total;
    let diskon = Math.floor(totalSebelumDiskon / 100000) * 0.1 * totalSebelumDiskon;
    let totalSetelahDiskon = totalSebelumDiskon - diskon;

    document.getElementById('totalSebelumDiskon').innerText = formatRupiah(totalSebelumDiskon);
    document.getElementById('totalSetelahDiskon').innerText = formatRupiah(totalSetelahDiskon);
    document.getElementById('totalPembayaran').innerText = formatRupiah(totalSetelahDiskon);

    const rincianContainer = document.getElementById('rincianPembelianContainer');
    const rincianBody = document.getElementById('rincianPembelianBody');
    rincianBody.innerHTML = '';

    if (jumlahPahaAyam > 0) tambahRincian('Paha Ayam', jumlahPahaAyam);
    if (jumlahDadaAyam > 0) tambahRincian('Dada Ayam', jumlahDadaAyam);
    if (jumlahSayapAyam > 0) tambahRincian('Sayap Ayam', jumlahSayapAyam);
    if (jumlahNasi > 0) tambahRincian('Nasi', jumlahNasi);
    if (jumlahKentang > 0) tambahRincian('Kentang Goreng', jumlahKentang);

    // Bonus Logic
    let bonus = '';

    if (jumlahPahaAyam >= 5 && jumlahDadaAyam === 0) {
        bonus = '1 Sayap Ayam Gratis';
        tambahRincian('Bonus', '1 Sayap Ayam Gratis');
    }
    if (jumlahPahaAyam >= 5 && jumlahDadaAyam >= 1) {
        bonus = '2 Sayap Ayam Gratis';
        tambahRincian('Bonus', '2 Sayap Ayam Gratis');
    }
    if (jumlahPahaAyam >= 5 && jumlahDadaAyam >= 5 && jumlahNasi >= 5) {
        bonus = '1 Pop Ice Gratis';
        tambahRincian('Bonus', '1 Pop Ice Gratis');
    }

    document.getElementById('bonus').innerText = bonus || '-';

    rincianContainer.style.display = rincianBody.innerHTML ? 'block' : 'none';
}

function tambahRincian(item, jumlah) {
    const rincianBody = document.getElementById('rincianPembelianBody');
    rincianBody.innerHTML += `<tr><td>${item}</td><td>${jumlah}</td></tr>`;
}

function batasPesanan(input) {
    if (input.value > 100) {
        input.value = 100;
    } else if (input.value < 0) {
        input.value = 0;
    }
      }
