document.addEventListener("DOMContentLoaded", function() {

  const dataGambar = {
    "Laut Bercerita": "assets/buku1.jpg",
    "Negeri 5 Menara": "assets/buku2.jpg",
    "Bumi Manusia": "assets/buku3.jpg",
    "Harry Potter": "assets/buku4.jpg"
  };

  const btnTambah = document.getElementById("btnTambah");

  btnTambah.addEventListener("click", function() {
    let nama = document.getElementById("inputBuku").value.trim();
    let harga = document.getElementById("inputHarga").value.trim();
    let msg = document.getElementById("msgTambah");
    let container = document.querySelector("#produk .container");

    msg.textContent = "";

    if (nama === "" || harga === "" || parseInt(harga) <= 0) {
      msg.style.color = "red";
      msg.textContent = "Nama dan harga harus diisi dengan benar!";
      return;
    }

    let gambar = dataGambar[nama];

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

    card.querySelector(".hapus").addEventListener("click", function() {
      card.remove();
    });

    msg.style.color = "green";
    msg.textContent = "Berhasil ditambahkan!";

    document.getElementById("inputBuku").value = "";
    document.getElementById("inputHarga").value = "";
  });

  // Form Pembelian
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

    errNama.textContent = "";
    errEmail.textContent = "";
    errTelp.textContent = "";
    successMsg.textContent = "";

    let valid = true;

    if (nama === "") { errNama.textContent = "Nama tidak boleh kosong!"; valid = false; }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (email === "") { errEmail.textContent = "Email tidak boleh kosong!"; valid = false; }
    else if (!email.match(emailPattern)) { errEmail.textContent = "Format email tidak valid!"; valid = false; }

    if (telp === "") { errTelp.textContent = "Nomor HP tidak boleh kosong!"; valid = false; }
    else if (parseInt(telp) <= 0) { errTelp.textContent = "Nomor HP harus lebih dari 0!"; valid = false; }

    if (buku === "") { alert("Pilih buku dulu!"); valid = false; }
    if (!metode) { alert("Pilih metode pembayaran!"); valid = false; }

    if (valid) {
      successMsg.style.color = "green";
      successMsg.textContent = "Berhasil membeli dan Terimakasih!";
      form.reset();
      window.scrollTo({ top: document.getElementById("form").offsetTop, behavior: "smooth" });
    }
  });

});