document.addEventListener("DOMContentLoaded", function() {

  const dataGambar = {
    "Laut Bercerita": "assets/buku1.jpg",
    "Negeri 5 Menara": "assets/buku2.jpg",
    "Bumi Manusia": "assets/buku3.jpg",
    "Harry Potter": "assets/buku4.jpg"
  };

  const btnTambah = document.getElementById("btnTambah");

  btnTambah.addEventListener("click", function() {

    // ambil input
    let nama = document.getElementById("inputBuku").value.trim();
    let harga = document.getElementById("inputHarga").value.trim();
    let msg = document.getElementById("msgTambah");
    let container = document.querySelector("#produk .container");

    msg.textContent = "";

    // cek input sederhana aja
    if (nama == "" || harga == "" || harga <= 0) {
      msg.style.color = "red";
      msg.textContent = "input belum benar";
      return;
    }

    let gambar = dataGambar[nama];

    // kalau tidak ada gambar pakai random
    if (!gambar) {
      const defaultImages = [
        "assets/default1.jpg",
        "assets/default2.jpg",
        "assets/default3.jpg"
      ];
      let randomIndex = Math.floor(Math.random() * defaultImages.length);
      gambar = defaultImages[randomIndex];
    }

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${gambar}">
      <h3>${nama}</h3>
      <p>Rp ${harga}</p>
      <button class="hapus">Hapus</button>
    `;

    container.appendChild(card);

    // tombol hapus
    card.querySelector(".hapus").addEventListener("click", function() {
      card.remove();
    });

    msg.style.color = "green";
    msg.textContent = "berhasil ditambah";

    document.getElementById("inputBuku").value = "";
    document.getElementById("inputHarga").value = "";
  });

  // form beli
  const form = document.getElementById("buyForm");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let nama = document.getElementById("nama").value.trim();
    let email = document.getElementById("email").value.trim();
    let telp = document.getElementById("telp").value.trim();
    let buku = document.getElementById("buku").value;
    let metode = document.querySelector('input[name="metode"]:checked');

    let errNama = document.getElementById("errNama");
    let errEmail = document.getElementById("errEmail");
    let errTelp = document.getElementById("errTelp");
    let successMsg = document.getElementById("successMsg");

    // reset dulu
    errNama.textContent = "";
    errEmail.textContent = "";
    errTelp.textContent = "";
    successMsg.textContent = "";

    let valid = true;

    if (nama == "") {
      errNama.textContent = "nama kosong";
      valid = false;
    }

    // validasi email simple
    if (email == "") {
      errEmail.textContent = "email kosong";
      valid = false;
    } else if (!email.includes("@")) {
      errEmail.textContent = "email tidak valid";
      valid = false;
    }

    if (telp == "") {
      errTelp.textContent = "no hp kosong";
      valid = false;
    } else if (telp <= 0) {
      errTelp.textContent = "no hp salah";
      valid = false;
    }

    if (buku == "") {
      alert("pilih buku dulu");
      valid = false;
    }

    if (!metode) {
      alert("pilih metode bayar");
      valid = false;
    }

    if (valid) {
      successMsg.textContent = "berhasil beli, terima kasih";
      form.reset();
    }
  });

});

