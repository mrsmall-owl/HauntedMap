// ══════════════════════════════════════════════════════
//  WEBGIS HOROR — script.js
//  Data: Excel Data_Haunted_Map (32 lokasi, WGS84 Zone 49S)
// ══════════════════════════════════════════════════════

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGhybjIxIiwiYSI6ImNtbm9meDNxcTI0Y2sycXEyaG43dnJqajIifQ.p1s6U3VJQR6jJu0kSN2WLQ';
const OSRM = 'https://router.project-osrm.org/route/v1';

// ── DATA LOKASI — sumber: Excel Data_Haunted_Map.xlsx ─
// Kolom: Id | Nama_Lokasi | Latitude | Longitude | Link_Googlemaps | Link Sumber | Foto | Kisah_Pendek
const LOCATIONS = [
  {id:1,nama:"Jembatan Gondolayu",lat:-7.782975796279988,lon:110.37093289524728,
   link_gmaps:"https://maps.app.goo.gl/oVNLdkTeAEkdDUjf6",link_sumber:"https://youtu.be/5mUjwKME00g?si=CrvQXSsZvSiYodoi",
   kategori:"penampakan",level:"tinggi",persen:78,
   deskripsi:"Jembatan Gondolayu dikenal sebagai salah satu lokasi paling angker di Jogja, terutama pada malam hari. Banyak pengendara mengaku melihat sosok perempuan berdiri di pinggir jembatan lalu menghilang begitu saja. Ada juga cerita tentang suara tangisan misterius yang terdengar dari bawah jembatan saat suasana sepi. Karena sering dikaitkan dengan kecelakaan dan kejadian mistis, tempat ini membuat banyak orang memilih menghindar lewat tengah malam.",
   gambar:"https://drive.google.com/thumbnail?id=1IQ7cMP6ZkfiVrItoYqb8cz36dfctIoEl&sz=w700",
   video:"https://www.youtube.com/embed/5mUjwKME00g",videoNote:"Sumber liputan: Jembatan Gondolayu",kronologi:[]},
  {id:2,nama:"Rumah Kanthil",lat:-7.8258117923782,lon:110.39784707584876,
   link_gmaps:"https://maps.app.goo.gl/zfG1MqGwFt3KotxE8",link_sumber:"https://youtu.be/rdXLa_-xPK8?si=krJKF0j0PhJj_3Qy",
   kategori:"penampakan",level:"sangat-tinggi",persen:93,
   deskripsi:"Rumah Kanthil adalah rumah tua yang terkenal karena kisah-kisah menyeramkan di dalamnya. Konon rumah ini pernah menjadi lokasi berbagai kejadian tragis sehingga meninggalkan aura yang sangat mencekam. Warga sekitar sering mendengar suara langkah kaki, pintu terbuka sendiri, hingga penampakan sosok perempuan berbaju putih di area rumah. Meski terlihat kosong dan tak terurus, banyak orang percaya rumah itu tidak benar-benar kosong.",
   gambar:"https://drive.google.com/thumbnail?id=16SaK79TkplkpfumrmGx-InrkLRW9iQV9&sz=w700",
   video:"https://www.youtube.com/embed/rdXLa_-xPK8",videoNote:"Sumber liputan: Rumah Kanthil",kronologi:[]},
  {id:3,nama:"Gunung Merapi",lat:-7.541904827150952,lon:110.44607080160512,
   link_gmaps:"https://maps.app.goo.gl/GL7u9NzXdgq6V4AV7",link_sumber:"https://youtu.be/8Kf32u_SPCE?si=gphBhiHUvgA3pvy-",
   kategori:"urban-legend",level:"sangat-tinggi",persen:96,
   deskripsi:"Selain terkenal karena letusannya, Gunung Merapi juga dipenuhi cerita mistis yang dipercaya masyarakat sekitar. Banyak pendaki mengaku mendengar suara gamelan, melihat pasar gaib, atau bertemu sosok misterius di jalur pendakian. Masyarakat Jawa percaya Merapi memiliki kerajaan gaib yang hidup berdampingan dengan dunia manusia. Aura sunyi dan kabut tebal di malam hari membuat gunung ini terasa semakin menyeramkan sekaligus penuh misteri.",
   gambar:"https://drive.google.com/thumbnail?id=1iiNZlzTweaJcEbzqC3osExSqu8A9Mgnx&sz=w700",
   video:"https://www.youtube.com/embed/8Kf32u_SPCE",videoNote:"Sumber liputan: Gunung Merapi",kronologi:[]},
  {id:4,nama:"Bunderan UGM",lat:-7.775988156292675,lon:110.37605679810899,
   link_gmaps:"https://maps.app.goo.gl/YwiFEqmZ3nwvXMMNA",link_sumber:"https://youtu.be/LOxfrZYwaRo?si=vyom9-zagiWAxLlB",
   kategori:"suara",level:"sedang",persen:54,
   deskripsi:"Bundaran UGM sudah lama menjadi urban legend di kalangan mahasiswa Yogyakarta. Tempat ini terkenal dengan mitos larangan menyanyikan lagu tertentu pada malam hari karena dipercaya dapat mengundang sosok gaib. Beberapa mahasiswa juga mengaku melihat bayangan hitam melintas atau mendengar suara aneh saat melewati area tersebut sendirian. Suasana kampus yang sepi di malam hari membuat cerita-cerita horor di Bundaran UGM terasa semakin nyata.",
   gambar:"https://drive.google.com/thumbnail?id=1ZBWyIhGGinWwWfGW_sgWLUHpptginSGw&sz=w700",
   video:"https://www.youtube.com/embed/LOxfrZYwaRo",videoNote:"Sumber liputan: Bunderan UGM",kronologi:[]},
  {id:5,nama:"Panggung Krapyak/Kandang Menjangan",lat:-7.826870096455625,lon:110.36056412188236,
   link_gmaps:"https://maps.app.goo.gl/jmMcXSXx8tNsRsTb8",link_sumber:"https://youtu.be/LOxfrZYwaRo?si=vyom9-zagiWAxLlB",
   kategori:"penampakan",level:"tinggi",persen:71,
   deskripsi:"Bangunan tua peninggalan Keraton ini dikenal memiliki suasana yang sunyi dan menyeramkan. Konon dahulu tempat ini digunakan sebagai lokasi berburu keluarga kerajaan, namun kini sering dikaitkan dengan penampakan makhluk halus. Banyak orang mengaku melihat sosok perempuan misterius hingga mendengar suara langkah kaki tanpa wujud. Karena dipenuhi nuansa kuno dan minim penerangan, Kandang Menjangan menjadi salah satu tempat yang paling membuat bulu kuduk merinding di Jogja.",
   gambar:"https://drive.google.com/thumbnail?id=1N5aZgjczhho87yPXU8JZOa-VvvIbqpyW&sz=w700",
   video:"https://www.youtube.com/embed/LOxfrZYwaRo",videoNote:"Sumber liputan: Panggung Krapyak",kronologi:[]},
  {id:6,nama:"Benteng Vredeburg",lat:-7.800256217117466,lon:110.36616105591246,
   link_gmaps:"https://maps.app.goo.gl/PFEGi8u2kF86RMdN7",link_sumber:"https://youtu.be/_9Jm9EtPoT0?si=PZg_zf0FYTZ-IyGL",
   kategori:"penampakan",level:"tinggi",persen:74,
   deskripsi:"Benteng peninggalan Belanda ini tampak megah di siang hari, namun berubah mencekam ketika malam mulai turun. Dalam cerita yang beredar, lorong-lorong tua di dalam benteng sering memunculkan suara langkah kaki tanpa wujud dan bayangan serdadu Belanda yang berjalan sendirian. Ada juga kisah tentang sosok noni Belanda yang muncul tiba-tiba lalu menghilang di dekat ruang tahanan. Sejarah kelam masa penjajahan membuat tempat ini terasa seolah masih menyimpan penghuni dari masa lalu.",
   gambar:"https://drive.google.com/thumbnail?id=1ZehSIMv5beK3nGYRwxtpuUFK6A2_1Ge8&sz=w700",
   video:"https://www.youtube.com/embed/_9Jm9EtPoT0",videoNote:"Sumber liputan: Benteng Vredeburg",kronologi:[]},
  {id:7,nama:"Kraton Yogyakarta",lat:-7.8053470681553,lon:110.36434896969448,
   link_gmaps:"https://maps.app.goo.gl/k1EdqmQ5hWCGbhdg9",link_sumber:"https://youtu.be/qKYft_NgU2A?si=xmuCrpI7KLGNSweO",
   kategori:"urban-legend",level:"sangat-tinggi",persen:91,
   deskripsi:"Kraton Yogyakarta bukan hanya pusat budaya Jawa, tetapi juga dipercaya memiliki hubungan kuat dengan dunia spiritual. Konon beberapa area di dalam keraton dijaga oleh makhluk tak kasat mata yang setia melindungi tempat tersebut. Banyak orang mengaku mendengar suara gamelan misterius dan mencium aroma dupa padahal tidak ada aktivitas apa pun. Aura sakral yang menyelimuti keraton membuat suasananya terasa berbeda dibanding tempat lain di Jogja.",
   gambar:"https://drive.google.com/thumbnail?id=18Ltuv76esN5mHxAMtDt0YFEnJTdJ3ZJE&sz=w700",
   video:"https://www.youtube.com/embed/qKYft_NgU2A",videoNote:"Sumber liputan: Kraton Yogyakarta",kronologi:[]},
  {id:8,nama:"Taman Sari",lat:-7.810007962651476,lon:110.35920230473066,
   link_gmaps:"https://maps.app.goo.gl/wJZPQQYVqBVpm2Py6",link_sumber:"https://youtu.be/1ssJLxxK_34?si=D1b5lbxmORpVVy8a",
   kategori:"suara",level:"tinggi",persen:79,
   deskripsi:"Lorong bawah tanah Taman Sari menyimpan banyak misteri yang masih dipercaya hingga sekarang. Menurut cerita, tempat ini dahulu menjadi jalur rahasia sekaligus lokasi meditasi Sultan dengan kekuatan gaib Laut Selatan. Pengunjung sering mengaku mendengar suara langkah kaki dan gamelan samar ketika berada di lorong Sumur Gumuling. Suasana gelap dan lembap di bawah tanah membuat tempat ini terasa seperti membawa pengunjung masuk ke masa lalu yang penuh misteri.",
   gambar:"https://drive.google.com/thumbnail?id=1706C19s6WrowGC5xMVNMA4-aekRbMncP&sz=w700",
   video:"https://www.youtube.com/embed/1ssJLxxK_34",videoNote:"Sumber liputan: Taman Sari",kronologi:[]},
  {id:9,nama:"Rumah Kentang Yogyakarta",lat:-7.757834978694853,lon:110.38021896380722,
   link_gmaps:"https://maps.app.goo.gl/6dv9eBHjSsjL1APw6",link_sumber:"https://youtu.be/irnBc3MuTko?si=q-xauhv93_EtjQfv",
   kategori:"bau",level:"sangat-tinggi",persen:88,
   deskripsi:"Rumah tua di kawasan Kotabaru ini terkenal karena aroma kentang yang muncul tiba-tiba pada malam hari. Konon bau tersebut menjadi tanda kemunculan makhluk gaib yang menghuni rumah kosong itu. Banyak warga sekitar mengaku mendengar lonceng berbunyi sendiri dan melihat sosok bayangan di balik jendela. Semakin malam suasana rumah ini terasa semakin sunyi dan menyeramkan.",
   gambar:"https://drive.google.com/thumbnail?id=1ZKDKwkXFXunAMhZ6mOTXNBKOxMKk9COh&sz=w700",
   video:"https://www.youtube.com/embed/irnBc3MuTko",videoNote:"Sumber liputan: Rumah Kentang Yogyakarta",kronologi:[]},
  {id:10,nama:"Gereja Gotik Sayidan",lat:-7.80354068015279,lon:110.36984055037837,
   link_gmaps:"https://maps.app.goo.gl/C2rCmzmyr37fTJDo7",link_sumber:"https://youtu.be/64dDQ_qYn3A?si=35APTzMoxWKKv3wk",
   kategori:"penampakan",level:"tinggi",persen:76,
   deskripsi:"Bangunan tua bergaya gotik ini terlihat menyeramkan bahkan dari kejauhan. Tempatnya yang kosong dan gelap membuat banyak cerita mistis berkembang di masyarakat. Konon, suara tangisan dan sosok perempuan berbaju putih sering muncul di area dalam gereja, terutama di bagian basement. Banyak orang yang datang untuk uji nyali mengaku merasakan hawa dingin yang tidak biasa begitu memasuki bangunan.",
   gambar:"https://drive.google.com/thumbnail?id=1lrcoZtE7tfc3tFJRLkKv13M8IP6xSOuZ&sz=w700",
   video:"https://www.youtube.com/embed/64dDQ_qYn3A",videoNote:"Sumber liputan: Gereja Gotik Sayidan",kronologi:[]},
  {id:11,nama:"Bioskop Regent / Eks Empire XXI",lat:-7.783491288328871,lon:110.38672859855538,
   link_gmaps:"https://maps.app.goo.gl/v6ctw8syvgG8RMZNA",link_sumber:"https://youtu.be/ANGy2lctXNI?si=wFQUrUz2pyXWC9An",
   kategori:"kejadian",level:"sangat-tinggi",persen:90,
   deskripsi:"Bioskop ini pernah mengalami kebakaran besar yang menewaskan sejumlah orang di dalamnya. Setelah lama terbengkalai, muncul berbagai cerita tentang jeritan misterius dan penampakan sosok penonton di malam hari. Beberapa orang mengaku mendengar suara kursi bioskop bergerak sendiri padahal gedung dalam keadaan kosong. Kisah kelam itu membuat lokasi ini dikenal sebagai salah satu tempat paling angker di Jogja.",
   gambar:"https://drive.google.com/thumbnail?id=1kMhgoJcT0EYfptXy8-aC8tPoKJQbFeFL&sz=w700",
   video:"https://www.youtube.com/embed/ANGy2lctXNI",videoNote:"Sumber liputan: Bioskop Regent",kronologi:[]},
  {id:12,nama:"Ambarukmo Plaza (Amplaz)",lat:-7.781739594240378,lon:110.4011606985982,
   link_gmaps:"https://maps.app.goo.gl/kKNka1AFxHEyd86W6",link_sumber:"https://youtu.be/I5Q0LRtKxE0?si=IOvLJTcSF2CdebUl",
   kategori:"kejadian",level:"sedang",persen:58,
   deskripsi:"Di balik megahnya pusat perbelanjaan ini, tersimpan cerita mistis sejak awal pembangunannya. Konon banyak pekerja mengalami kesurupan dan gangguan aneh saat proyek berlangsung. Pengunjung juga sering membicarakan sosok perempuan misterius yang muncul di lift dan toilet mall ketika suasana mulai sepi. Karena berdiri di bekas area kerajaan lama, banyak orang percaya tempat ini memiliki aura gaib yang kuat.",
   gambar:"https://drive.google.com/thumbnail?id=1NMGimCWbjnhvnAiw6W6p2Qomi10HenuH&sz=w700",
   video:"https://www.youtube.com/embed/I5Q0LRtKxE0",videoNote:"Sumber liputan: Ambarukmo Plaza",kronologi:[]},
  {id:13,nama:"Goa Jepang Kaliurang",lat:-7.587184827237461,lon:110.43040339115763,
   link_gmaps:"https://maps.app.goo.gl/y7fvgNrSZnzrKrGTA",link_sumber:"https://youtu.be/yOKCDwvzv6M?si=ES5sfPvwgb1xhKre",
   kategori:"suara",level:"tinggi",persen:82,
   deskripsi:"Goa peninggalan masa penjajahan Jepang ini memiliki lorong gelap yang terasa sangat mencekam. Dibangun dengan kerja paksa romusha, tempat ini dipercaya menyimpan banyak energi negatif dari masa lalu. Banyak pengunjung mengaku mendengar suara rintihan, langkah kaki, hingga bisikan misterius dari dalam goa. Semakin masuk ke lorong terdalam, suasananya terasa semakin dingin dan menyesakkan.",
   gambar:"https://drive.google.com/thumbnail?id=13e1tKpI-oK1R3eP-2FJ1GcJZo_YEwhBL&sz=w700",
   video:"https://www.youtube.com/embed/yOKCDwvzv6M",videoNote:"Sumber liputan: Goa Jepang Kaliurang",kronologi:[]},
  {id:14,nama:"Hutan Pinus Mangunan",lat:-7.925714491445177,lon:110.4303292668632,
   link_gmaps:"https://maps.app.goo.gl/pwyXH5sSQzicgMzAA",link_sumber:"https://www.youtube.com/live/3-g2zjYA1As?si=BdyDNGfnreKQCZj1",
   kategori:"suara",level:"sedang",persen:62,
   deskripsi:"Di balik tenangnya Hutan Pinus Mangunan, tersimpan kisah-kisah misterius yang membuat siapa pun merinding saat malam tiba. Kabut tipis yang turun perlahan di antara deretan pinus seolah membawa bisikan tak terlihat dari dalam hutan. Banyak pengunjung mengaku mendengar suara langkah tanpa wujud dan merasakan suasana yang tiba-tiba berubah sunyi mencekam.",
   gambar:"https://drive.google.com/thumbnail?id=1PFNwR46Xu6TbShgmtblU5Dnb9b0BysXB&sz=w700",
   video:"https://www.youtube.com/embed/3-g2zjYA1As",videoNote:"Sumber liputan: Hutan Pinus Mangunan",kronologi:[]},
  {id:15,nama:"Bunker Kaliadem",lat:-7.582798348510889,lon:110.44768280517276,
   link_gmaps:"https://maps.app.goo.gl/yKPKXgVDSNp5PSLe8",link_sumber:"https://youtu.be/e-QtZk2digM?si=slRws_JY86azIezh",
   kategori:"kejadian",level:"sangat-tinggi",persen:94,
   deskripsi:"Tempat ini menjadi saksi tragedi erupsi Merapi yang menewaskan dua relawan di dalam bunker. Sejak saat itu, banyak cerita tentang suara tangisan dan sosok misterius muncul di sekitar lokasi. Saat malam tiba, suasana bunker terasa sunyi dan berat seolah menyimpan kesedihan yang belum hilang. Kabut dingin yang turun dari Merapi membuat tempat ini semakin menyeramkan dan penuh misteri.",
   gambar:"https://drive.google.com/thumbnail?id=1Xfos4jTWUgkHiJw1EgkWKKkmiS11eO2J&sz=w700",
   video:"https://www.youtube.com/embed/e-QtZk2digM",videoNote:"Sumber liputan: Bunker Kaliadem",kronologi:[]},
  {id:16,nama:"Simpang Tiga Janti",lat:-7.783344622259968,lon:110.41046831755632,
   link_gmaps:"https://maps.app.goo.gl/9yutATGEkBnBkaC28",link_sumber:"https://vt.tiktok.com/ZSxN2fjHs/",
   kategori:"suara",level:"sedang",persen:55,
   deskripsi:"Flyover Janti dikenal sebagai salah satu titik jalan yang menyimpan cerita mistis di Jogja. Banyak cerita beredar tentang pengendara yang tiba-tiba kehilangan fokus saat melintas malam hari. Sosok misterius yang sering dikaitkan dengan tempat ini disebut Setan Budeg, karena dipercaya membuat orang tidak mendengar suara kereta atau kendaraan di sekitarnya.",
   gambar:"https://drive.google.com/thumbnail?id=1cIqm1v2c5fkO-QCL6Rw03OD-d8eyj3uy&sz=w700",
   video:"https://vt.tiktok.com/ZSxN2fjHs/",videoNote:"Sumber liputan: Simpang Tiga Janti (TikTok)",kronologi:[]},
  {id:17,nama:"Sanatorium Pakem",lat:-7.630606682027485,lon:110.42551708017356,
   link_gmaps:"https://maps.app.goo.gl/qfpSm9F6F3xVQQw16",link_sumber:"https://mojok.co/kilas/memori/sejarah-sanatorium-pakem-di-yogyakarta/",
   kategori:"penampakan",level:"tinggi",persen:77,
   deskripsi:"Sanatorium Pakem dikenal sebagai bangunan tua yang menyimpan suasana kelam di kawasan Pakem, Sleman. Banyak cerita beredar tentang suara langkah kaki di lorong kosong, pintu yang seperti terbuka sendiri, hingga hawa dingin yang tiba-tiba terasa meski siang hari. Beberapa orang juga mengaitkan tempat ini dengan bayangan sosok perawat yang muncul sebentar lalu menghilang di sekitar bangsal lama.",
   gambar:"https://drive.google.com/thumbnail?id=1dSMVtgcVeG11wUFk1yonZ0SJYg5uQ8y7&sz=w700",
   video:"",videoNote:"Sumber: mojok.co — Sejarah Sanatorium Pakem",kronologi:[]},
  {id:18,nama:"Villa Putih Kaliurang",lat:-7.5947195856634275,lon:110.42671099904409,
   link_gmaps:"https://maps.app.goo.gl/N9L8snf7oyjdRVXg8",link_sumber:"https://www.detik.com/",
   kategori:"penampakan",level:"tinggi",persen:73,
   deskripsi:"Villa Putih Kaliurang dikenal sebagai bangunan tua peninggalan Belanda yang berada di kawasan Hargobinangun, Pakem, Sleman. Tempat ini sering disebut angker karena bangunannya lama tidak terawat setelah terdampak erupsi Merapi. Banyak cerita beredar tentang suara langkah kaki, tangisan, hingga penampakan sosok noni Belanda di sekitar bangunan.",
   gambar:"https://drive.google.com/thumbnail?id=1QfM4dVi_xKfOkDGiUzarmMzVSpZSyTR7&sz=w700",
   video:"",videoNote:"Sumber: Detik.com",kronologi:[]},
  {id:19,nama:"Pantai Parangkusumo",lat:-8.022766143102741,lon:110.32498304259579,
   link_gmaps:"https://maps.app.goo.gl/ihhriNo9PkzeHJEm8",link_sumber:"https://www.detik.com/jogja/budaya/d-7077133/cepuri-parangkusumo-lokasi-pertemuan-panembahan-senopati-dan-nyi-roro-kidul",
   kategori:"urban-legend",level:"sangat-tinggi",persen:97,
   deskripsi:"Pantai Parangkusumo dikenal sebagai salah satu tempat paling sakral dan mistis di Yogyakarta. Tempat ini sering dikaitkan dengan legenda pertemuan Panembahan Senopati dan Nyi Roro Kidul. Banyak orang percaya kawasan ini menjadi gerbang menuju Kerajaan Gaib Laut Selatan. Saat malam tiba, suara ombak besar, angin pantai, dan aroma sesajen membuat suasananya terasa semakin magis.",
   gambar:"https://drive.google.com/thumbnail?id=1JVUshD88TfjK6gSH51_lflTMnFDeU4mK&sz=w700",
   video:"",videoNote:"Sumber: Detik.com Jogja",kronologi:[]},
  {id:20,nama:"Plengkung Gading",lat:-7.813714695946789,lon:110.3629048708474,
   link_gmaps:"https://maps.app.goo.gl/CrU3CoJWmPW1s6ur6",link_sumber:"https://www.liputan6.com/regional/read/4912229/mitos-ilmu-hitam-luntur-saat-melintasi-plengkung-gading-yogyakarta",
   kategori:"urban-legend",level:"sedang",persen:65,
   deskripsi:"Plengkung Gading dikenal sebagai gerbang tua di sisi selatan Keraton Yogyakarta yang menyimpan banyak mitos. Tempat ini dipercaya sebagai jalur keluarnya jenazah Sultan menuju Imogiri, sehingga Sultan yang masih bertahta tidak diperbolehkan melewatinya. Masyarakat juga mengenal mitos bahwa ilmu hitam bisa luntur saat melewati gerbang ini.",
   gambar:"https://drive.google.com/thumbnail?id=1CkwwXcfwmh9-w7YbetMy5ouHe9yKT0bY&sz=w700",
   video:"",videoNote:"Sumber: Liputan6.com",kronologi:[]},
  {id:21,nama:"Pantai Parangtritis",lat:-8.02518127913735,lon:110.32938926668406,
   link_gmaps:"https://maps.app.goo.gl/ZbnbE2RBtviZgirC7",link_sumber:"https://www.bola.com/ragam/read/5634587/8-mitos-pantai-parangtritis-yang-dipercaya-orang-banyak",
   kategori:"urban-legend",level:"sangat-tinggi",persen:95,
   deskripsi:"Pantai Parangtritis dikenal sebagai salah satu pantai paling mistis di Yogyakarta. Tempat ini sering dikaitkan dengan legenda Nyi Roro Kidul, penguasa Laut Selatan. Cerita yang paling terkenal adalah larangan memakai pakaian hijau karena dipercaya dapat menarik perhatian makhluk gaib laut selatan. Ombak besar, angin kencang, dan suasana pantai yang gelap saat malam membuat Parangtritis terasa semakin menyeramkan.",
   gambar:"https://drive.google.com/thumbnail?id=1cP3J9clK_573eDxCLdSW1k0uc24ifVyP&sz=w700",
   video:"",videoNote:"Sumber: Bola.com",kronologi:[]},
  {id:22,nama:"Situs Gua Seluman",lat:-7.8027972320522405,lon:110.4139002152744,
   link_gmaps:"https://maps.app.goo.gl/3ECyqZ7PxczFpXe78",link_sumber:"https://www.youtube.com/watch?v=62uII-mU0xs",
   kategori:"penampakan",level:"tinggi",persen:80,
   deskripsi:"Gua Siluman dikenal sebagai situs tua di kawasan Wonocatur, Banguntapan, Bantul. Tempat ini dulunya merupakan pesanggrahan peninggalan Keraton Yogyakarta. Lorong dan bangunan tua di sekitarnya sering terasa lembap, gelap, dan sepi, sehingga menimbulkan kesan menyeramkan bagi pengunjung.",
   gambar:"https://drive.google.com/thumbnail?id=148HVnKtsZIAX6yU2ILH-6UaVF-DpA43y&sz=w700",
   video:"https://www.youtube.com/embed/62uII-mU0xs",videoNote:"Sumber liputan: Situs Gua Seluman",kronologi:[]},
  {id:23,nama:"Situs Warungboto",lat:-7.810272970158874,lon:110.39321495945566,
   link_gmaps:"https://maps.app.goo.gl/v6C5uDk85SjgheYb6",link_sumber:"https://www.youtube.com/watch?v=9BF23SCxBHA",
   kategori:"suara",level:"sedang",persen:60,
   deskripsi:"Pesanggrahan Rejawinangun atau Situs Warungboto dikenal sebagai bangunan tua peninggalan Keraton Yogyakarta. Cerita yang beredar menyebut beberapa pengunjung merasa seperti diawasi saat berada di bagian dalam bangunan. Saat sore menjelang malam, bayangan dari dinding tua dan lorong kosong membuat tempat ini terasa semakin angker.",
   gambar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3P1c2EKCqAcq0BqXwRtZEj7o6wSJxrIn7AA&s",
   video:"https://www.youtube.com/embed/9BF23SCxBHA",videoNote:"Sumber liputan: Situs Warungboto",kronologi:[]},
  {id:24,nama:"Grand Inna Malioboro",lat:-7.790454997974716,lon:110.36686496580049,
   link_gmaps:"https://maps.app.goo.gl/BTJFKwCPWpWNjtFx9",link_sumber:"https://www.youtube.com/watch?v=0XJRWbAWw-s",
   kategori:"penampakan",level:"tinggi",persen:83,
   deskripsi:"Hotel Grand Inna Malioboro atau yang dulu dikenal sebagai Hotel Garuda sering dikaitkan dengan cerita mistis karena usianya yang sudah lebih dari satu abad. Beberapa tamu mengaku mengalami kejadian aneh di kamar hotel, seperti suara langkah kaki, ketukan pintu, hingga suasana kamar yang tiba-tiba terasa berat.",
   gambar:"https://eventguide.id/wp-content/uploads/2023/01/GI-Malioboro.png",
   video:"https://www.youtube.com/embed/0XJRWbAWw-s",videoNote:"Sumber liputan: Grand Inna Malioboro",kronologi:[]},
  {id:25,nama:"Roemah Indisch Kotagede",lat:-7.827598125753703,lon:110.4005071597122,
   link_gmaps:"https://maps.app.goo.gl/xnYZ8aUykHdGUSx77",link_sumber:"https://www.youtube.com/watch?v=X0JYbiCmpXw",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"Rumah Pocong Sumi dikenal sebagai salah satu rumah tua paling terkenal di Kotagede, Yogyakarta. Rumah bergaya kolonial ini sering dikaitkan dengan sosok Mbah Sumi, makhluk astral yang disebut muncul saat kru acara mistis datang ke lokasi. Cerita lain juga menyebut adanya penampakan noni Belanda dan suasana rumah yang berubah menyeramkan saat malam hari.",
   gambar:"https://assets.pikiran-rakyat.com/crop/0x0:0x0/1200x675/webp/photo/2023/11/22/207715987.jpg",
   video:"https://www.youtube.com/embed/X0JYbiCmpXw",videoNote:"Sumber liputan: Roemah Indisch Kotagede",kronologi:[]},
  {id:26,nama:"Gua Langse",lat:-8.040223134930121,lon:110.34862270998003,
   link_gmaps:"https://maps.app.goo.gl/Za43Ch3jD4yhnsoe8",link_sumber:"https://www.youtube.com/watch?v=2tyjT9guwbM",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"Goa Langse dikenal sebagai goa pertapaan yang berada di kawasan tebing dekat Pantai Parangtritis. Tempat ini sering dikaitkan dengan laku spiritual, semedi, dan cerita mistis masyarakat pesisir selatan. Banyak cerita beredar tentang suara bisikan, hawa berat, hingga sosok tak kasat mata yang dipercaya menjaga area goa.",
   gambar:"https://img.okezone.com/content/2023/06/21/408/2834526/gua-langse-tempat-mistis-saksi-pertemuan-panembahan-senopati-dan-nyi-roro-kidul-cUlCxCUOVF.JPG",
   video:"https://www.youtube.com/embed/2tyjT9guwbM",videoNote:"Sumber liputan: Gua Langse",kronologi:[]},
  {id:27,nama:"Stasiun Tugu Yogyakarta",lat:-7.789248610922994,lon:110.36346797851452,
   link_gmaps:"https://maps.app.goo.gl/H467Ad1PdqaPMj187",link_sumber:"https://www.youtube.com/watch?v=kadNKwZxGXk",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"Stasiun Tugu Yogyakarta dikenal sebagai stasiun tua yang menyimpan banyak cerita mistis di tengah ramainya kawasan Malioboro. Cerita yang beredar menyebut adanya sosok penumpang misterius yang muncul di area peron lalu menghilang begitu saja. Ada juga kisah tentang suara langkah kaki dan bayangan yang terlihat saat suasana stasiun mulai sepi pada malam hari.",
   gambar:"https://asset.kompas.com/crops/IC-IfATri08CArqGLt9Rx3Y7830=/156x0:3428x2181/750x500/data/photo/2021/08/05/610b8a82d5255.jpg",
   video:"https://www.youtube.com/embed/kadNKwZxGXk",videoNote:"Sumber liputan: Stasiun Tugu Yogyakarta",kronologi:[]},
  {id:28,nama:"RSUP Dr. Sardjito Yogyakarta",lat:-7.768371793765737,lon:110.37345273881209,
   link_gmaps:"https://maps.app.goo.gl/rWZmANrU4GJ4Wj718",link_sumber:"https://www.hipwee.com/travel/kisah-kisah-misteri-di-rumah-sakit-dr-sardjito-jogja-mulai-dari-hantu-estella-sampai-si-muka-rata/",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"RSUP Dr. Sardjito dikenal memiliki beberapa cerita mistis yang cukup terkenal di Jogja. Salah satunya adalah kisah hantu gadis kecil bernama Estella yang konon sering terlihat di area rumah sakit. Ada juga cerita tentang sosok ibu-ibu misterius yang masuk ke gudang, lalu saat dipanggil wajahnya terlihat rata tanpa ekspresi.",
   gambar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmLGeBfTae27ZZ4VpzgKW3H3hoLLTnfuKeTw&s",
   video:"",videoNote:"Sumber: Hipwee.com",kronologi:[]},
  {id:29,nama:"Stasiun Rewulu",lat:-7.795989102884853,lon:110.28418524728905,
   link_gmaps:"https://maps.app.goo.gl/LEexthDKHaMyarhY9",link_sumber:"https://mojok.co/terminal/5-terowongan-di-jogja-yang-menyimpan-kisah-unik-hingga-mistis/",
   kategori:"suara",level:"tinggi",persen:75,
   deskripsi:"Stasiun Rewulu dan kawasan terowongan di sekitarnya dikenal dengan cerita mistis tentang suara pengumuman kereta yang terdengar pada malam hari menggunakan bahasa Belanda. Suara tersebut sering dikaitkan dengan bekas Stasiun Sedayu yang berada di sekitar jalur lama kereta.",
   gambar:"https://assets.kompasiana.com/items/album/2024/06/01/download-6-665b2899c925c45ca0541c22.jpg?t=o&v=300",
   video:"",videoNote:"Sumber: Mojok.co",kronologi:[]},
  {id:30,nama:"Terminal Giwangan",lat:-7.834537779182118,lon:110.3922851673949,
   link_gmaps:"https://maps.app.goo.gl/8j9BgEkpHDKuKaZJ7",link_sumber:"https://www.liputan6.com/regional/read/4889957/penampakan-sosok-perempuan-di-terminal-yogyakarta-bikin-sopir-hitung-kaki-penumpang",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"Terminal Giwangan dikenal memiliki cerita mistis tentang sosok perempuan tinggi berambut panjang yang sering muncul di area terminal. Cerita yang beredar menyebut sosok itu biasanya muncul setelah tercium bau wangi melati. Para sopir dan kernet bus malam konon sering menghitung kaki penumpang untuk memastikan tidak ada penumpang lain yang ikut naik.",
   gambar:"https://joss.co.id/data/uploads/2021/04/terminal-giwangan-larangan-mudik-678x381.jpg",
   video:"",videoNote:"Sumber: Liputan6.com",kronologi:[]},
  {id:31,nama:"Balai Yasa Yogyakarta",lat:-7.787227848067427,lon:110.38405431216262,
   link_gmaps:"https://maps.app.goo.gl/GcGp59Ph3KUfAU8s9",link_sumber:"https://youtu.be/FSp5J0OPajs?si=3CF_2sRrBbH4XbUs",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"Balai Yasa menyimpan peninggalan bekas kecelakaan kereta, salah satunya kecelakaan kereta Bintaro. Selain itu bangunannya merupakan bangunan kuno peninggalan zaman penjajahan Belanda. Cukup banyak orang yang menceritakan pengalaman mistis horornya seperti penampakan wajah hancur dan penampakan tubuh besar dan gondrong.",
   gambar:"https://imgcdn.harianjogja.com/images/posts/2024/09/22/1188945/balai_yasa.jpg",
   video:"https://www.youtube.com/embed/FSp5J0OPajs",videoNote:"Sumber liputan: Balai Yasa Yogyakarta",kronologi:[]},
  {id:32,nama:"Jembatan Gajahwong II",lat:-7.791819599522881,lon:110.39624091669587,
   link_gmaps:"https://maps.app.goo.gl/YaRgNcZg5Nvv2EGe7",link_sumber:"https://jogjapolitan.harianjogja.com/r-1096080/cerita-warga-di-balik-terowongan-telu-yang-terlarang-untuk-anak-kecil",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"Jembatan Gajahwong II dikenal berada di kawasan Sungai Gajah Wong dan sering dikaitkan dengan Terowongan Telu. Warga sekitar juga mengenal tempat ini sebagai lokasi yang menyimpan cerita mistis. Beberapa cerita menyebut kawasan ini pernah dikaitkan dengan kejadian bunuh diri dan larangan anak-anak bermain di sekitar terowongan.",
   gambar:"https://assets.kompasiana.com/items/album/2024/06/01/download-6-665b2899c925c45ca0541c22.jpg?t=o&v=300",
   video:"",videoNote:"Sumber: Harian Jogja",kronologi:[]},
];


// ── STATE ─────────────────────────────────────────────
let map, markers=[], allLocations=[...LOCATIONS];
let selectedLocId=null, userLat=null, userLon=null;
let isAudioPlaying=false, audioStarted=false;
let bgMusic=null, audioCtx=null, gainNode=null, oscNodes=[], usingFile=false;

// Network Analysis state
let routeMode='driving';
let originLat=null, originLon=null, destLat=null, destLon=null;
let routeLayer=null, originMarkerL=null, destMarkerL=null;

// ══════════════════════════════════════════════════════
//  LANDING — ANIMASI
// ══════════════════════════════════════════════════════

(function makeDrips(){
  const c = document.getElementById('drips');
  if(!c) return;
  const n = Math.max(12, Math.floor(window.innerWidth/45));
  for(let i=0;i<n;i++){
    const d = document.createElement('div');
    d.className = 'drip';
    const h   = 60 + Math.random()*160;
    const dur = 2.5 + Math.random()*6;
    const del = Math.random()*12;
    d.style.cssText = `--dh:${h}px;--dur:${dur}s;--del:${del}s;left:${Math.random()*100}%;opacity:${0.5+Math.random()*0.5}`;
    c.appendChild(d);
  }
})();

(function makeGhosts(){
  const c = document.getElementById('ghostContainer');
  if(!c) return;

  const ghosts = ['🕷','🦇','🦇','🕸','🦇','☠','🦇','👁'];

  const positions = [
    {x:10, y:20},
    {x:25, y:70},
    {x:40, y:15},
    {x:55, y:80},
    {x:70, y:25},
    {x:85, y:60},
    {x:15, y:50},
    {x:90, y:10},
  ];

  ghosts.forEach((g,i)=>{
    const el = document.createElement('div');
    el.className = 'ghost';

    const x = positions[i].x;
    const y = positions[i].y;

    const dur   = 4 + Math.random()*10;
    const delay = Math.random()*-10;
    const tx = (Math.random()-0.5)*80;
    const ty = -25 - Math.random()*50;

    el.style.cssText =
      `left:${x}%;
       top:${y}%;
       --gd:${dur}s;
       --gdelay:${delay}s;
       --gx:${tx}px;
       --gy:${ty}px;
       font-size:${1+Math.random()*3}rem`;

    el.textContent = g;
    c.appendChild(el);
  });
})();

(function makeSkulls(){
  const c = document.getElementById('skullContainer');
  if(!c) return;
  for(let i=0;i<18;i++){
    const el = document.createElement('div');
    el.className = 'skull-p';
    el.textContent = ['🩸','👁','🩸','☠'][Math.floor(Math.random()*6)];
    const dur   = 7 + Math.random()*14;
    const delay = Math.random()*18;
    el.style.cssText = `left:${Math.random()*100}%;bottom:${-10+Math.random()*10}%;--sd:${dur}s;--sdelay:${delay}s;font-size:${0.6+Math.random()*1.4}rem`;
    c.appendChild(el);
  }
})();

// Crawling text at bottom
(function makeCrawlText(){
  const c = document.getElementById('crawlText');
  if(!c) return;
  const texts = [
    '⚠ TIDAK DISARANKAN MENGUNJUNGI SITUS SENDIRIAN ⚠',
    'SETIAP TEMPAT MENYIMPAN CERITA YANG TAK TERUCAP',
    'ADA YANG SELALU MEMPERHATIKAN DARI KEGELAPAN 👁👁',
    'BEBERAPA YANG DATANG... TIDAK PERNAH KEMBALI',
    'TIDAK SEMUA YANG TERLIHAT DI PETA INI BENAR-BENAR KOSONG ☠',
    'BEBERAPA JEJAK TIDAK PERNAH BENAR-BENAR MENGHILANG',
  ];

  c.textContent = (texts.join('   ✦   ')+ '   ✦   ').repeat(5);
  c.style.animationDuration = '300s';
})();

// ══════════════════════════════════════════════════════
//  AUDIO SYSTEM
// ══════════════════════════════════════════════════════

function initAudio(){
  if(audioStarted) return;
  audioStarted = true;

  bgMusic         = new Audio('horror-ambient.mp3');
  bgMusic.loop    = true;
  bgMusic.volume  = 0.38;
  bgMusic.preload = 'auto';

  bgMusic.addEventListener('canplaythrough', ()=>{
    usingFile = true;
    bgMusic.play().catch(()=>{});
    isAudioPlaying = true;
    setAudioUI(true);
  }, {once:true});

  bgMusic.addEventListener('error', ()=>{
    usingFile = false;
    startWebAudio();
  }, {once:true});

  bgMusic.load();
}

function toggleAudio(){
  if(!audioStarted){ initAudio(); return; }
  if(usingFile && bgMusic){
    if(bgMusic.paused){
      bgMusic.play().catch(()=>{});
      isAudioPlaying=true; setAudioUI(true);
    } else {
      bgMusic.pause();
      isAudioPlaying=false; setAudioUI(false);
    }
  } else {
    isAudioPlaying ? stopWebAudio() : startWebAudio();
  }
}

function setAudioUI(on){
  const btn = document.getElementById('audioBtn');
  if(btn) btn.textContent = on ? '🔊' : '🔇';
  const ind = document.getElementById('audioIndicator');
  const lbl = document.getElementById('audioLabel');
  if(ind && lbl){
    ind.classList.toggle('muted', !on);
    lbl.textContent = on ? 'AUDIO AKTIF' : 'AUDIO MATI';
  }
}

function startWebAudio(){
  if(audioCtx) return;
  audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(audioCtx.destination);
  gainNode.gain.linearRampToValueAtTime(0.09, audioCtx.currentTime+2);

  [55,58.27,82.41,110].forEach((freq,i)=>{
    const osc=audioCtx.createOscillator(), g=audioCtx.createGain();
    const lfo=audioCtx.createOscillator(), lg=audioCtx.createGain();
    osc.type = i%2===0 ? 'sawtooth':'triangle';
    osc.frequency.value=freq;
    lfo.frequency.value=0.12+i*0.07; lg.gain.value=freq*0.004;
    g.gain.value=0.16;
    lfo.connect(lg); lg.connect(osc.frequency);
    osc.connect(g); g.connect(gainNode);
    osc.start(); lfo.start(); oscNodes.push(osc,lfo);
  });

  const buf=audioCtx.createBuffer(1,audioCtx.sampleRate*3,audioCtx.sampleRate);
  const data=buf.getChannelData(0);
  for(let i=0;i<buf.length;i++) data[i]=Math.random()*2-1;
  const noise=audioCtx.createBufferSource();
  noise.buffer=buf; noise.loop=true;
  const lpf=audioCtx.createBiquadFilter();
  lpf.type='lowpass'; lpf.frequency.value=160;
  const ng=audioCtx.createGain(); ng.gain.value=0.035;
  noise.connect(lpf); lpf.connect(ng); ng.connect(gainNode);
  noise.start(); oscNodes.push(noise);

  isAudioPlaying=true; setAudioUI(true);
}

function stopWebAudio(){
  if(!audioCtx) return;
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime+1);
  setTimeout(()=>{
    oscNodes.forEach(o=>{ try{o.stop()}catch(e){} });
    oscNodes=[]; audioCtx.close(); audioCtx=null; gainNode=null;
  },1100);
  isAudioPlaying=false; setAudioUI(false);
}

function playScream(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const dur=1.0;
    const buf=ctx.createBuffer(1,ctx.sampleRate*dur,ctx.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++){
      const t=i/ctx.sampleRate;
      const env=Math.exp(-t*2.5)*Math.sin(Math.PI*t/dur);
      d[i]=(
        Math.sin(2*Math.PI*880*t)*0.4 +
        Math.sin(2*Math.PI*1320*t*(1+t*0.5))*0.3 +
        (Math.random()*2-1)*0.3
      )*env;
    }
    const src=ctx.createBufferSource();
    src.buffer=buf;
    const g=ctx.createGain(); g.gain.value=0.6;
    src.connect(g); g.connect(ctx.destination);
    src.start();
    setTimeout(()=>ctx.close(), 1400);
  } catch(e){}
}

document.addEventListener('click', ()=>{ if(!audioStarted) initAudio(); },{once:true});

window.addEventListener('DOMContentLoaded', ()=>{
  // Set tanggal publikasi di metadata
  const el = document.getElementById('metaTanggalPub');
  if(el) el.textContent = new Date().toLocaleDateString('id-ID', {year:'numeric',month:'long',day:'numeric'});

  setTimeout(()=>{
    if(!audioStarted) initAudio();
    const lbl=document.getElementById('audioLabel');
    if(lbl) lbl.textContent='KLIK UNTUK AKTIFKAN AUDIO';
  }, 800);
});

// ══════════════════════════════════════════════════════
//  ENTER MAP
// ══════════════════════════════════════════════════════
let mapInitialized = false;

function enterMap(){
  const flash = document.getElementById('scareFlash');
  flash.classList.add('active');
  playScream();

  setTimeout(()=>{
    const overlay = document.getElementById('transOverlay');
    overlay.classList.add('fade-in');
  }, 300);

  setTimeout(()=>{
    document.getElementById('landing').style.display='none';
    document.getElementById('appScreen').style.display='block';

    if(!mapInitialized){
      initMap();
      mapInitialized=true;
    }

    // Fix map hitam — paksa Leaflet recalculate ukuran setelah elemen visible
    setTimeout(()=>{ if(map) map.invalidateSize(); }, 250);
    setTimeout(()=>{ if(map) map.invalidateSize(); }, 700);

    const overlay = document.getElementById('transOverlay');
    overlay.style.transition='opacity 0.8s ease';
    overlay.style.opacity='0';
    setTimeout(()=>{ overlay.classList.remove('fade-in'); overlay.style.opacity=''; }, 900);

    flash.classList.remove('active');
  }, 700);
}

// ══════════════════════════════════════════════════════
//  MAP INIT
// ══════════════════════════════════════════════════════
function initMap(){
  map = L.map('map',{
    center:[-7.8013, 110.3647],
    zoom:13,
    zoomControl:false,
    preferCanvas:false
  });

  // ── Base layers ────────────────────────────────────
  const layerDark = L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/512/{z}/{x}/{y}@2x?access_token=' + MAPBOX_TOKEN,
    { attribution:'© <a href="https://mapbox.com">Mapbox</a> © <a href="https://openstreetmap.org">OSM</a>', tileSize:512, zoomOffset:-1, maxZoom:20, minZoom:2, crossOrigin:true }
  );

  const layerSatellite = L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token=' + MAPBOX_TOKEN,
    { attribution:'© <a href="https://mapbox.com">Mapbox</a> © <a href="https://openstreetmap.org">OSM</a>', tileSize:512, zoomOffset:-1, maxZoom:20, minZoom:2, crossOrigin:true }
  );

  const layerStreet = L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token=' + MAPBOX_TOKEN,
    { attribution:'© <a href="https://mapbox.com">Mapbox</a> © <a href="https://openstreetmap.org">OSM</a>', tileSize:512, zoomOffset:-1, maxZoom:20, minZoom:2, crossOrigin:true }
  );

  // Default: dark
  layerDark.addTo(map);

  // ── Load GeoJSON dari file GeoJSON.geojson ─────────
  // Simpan ke window._layerGeoJSON supaya bisa di-toggle dari checkbox
  fetch('GeoJSON.geojson')
    .then(r => { if(!r.ok) throw new Error('GeoJSON not found'); return r.json(); })
    .then(data => {
      window._layerGeoJSON = L.geoJSON(data, {
        // Style untuk POLYGON
        style: {
          color: '#ff2222',
          weight: 2,
          opacity: 0.85,
          fillColor: '#cc0000',
          fillOpacity: 0.14,
          dashArray: '4,3'
        },
        // Style untuk POINT di dalam GeoJSON
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 7,
            fillColor: '#ff2222',
            color: '#fff',
            weight: 1.5,
            fillOpacity: 0.85
          });
        },
        // Popup dari properties GeoJSON
        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};
          const nama = p.name || p.nama || p.NAME || 'Tidak ada nama';
          const desc = p.deskripsi || p.description || p.keterangan || '';
          const tipe = p.tipe || p.type || p.kategori || '';
          layer.bindPopup(`
            <div class="popup-inner">
              <div class="popup-title" style="font-size:0.95rem">🗺 ${nama}</div>
              ${desc ? `<p style="font-family:var(--f-body);font-size:0.8rem;color:var(--white);margin-top:0.3rem;line-height:1.6">${desc}</p>` : ''}
              ${tipe ? `<div class="popup-row">Tipe: <strong>${tipe}</strong></div>` : ''}
              <div class="popup-row" style="margin-top:0.3rem;font-size:0.65rem;color:rgba(255,100,100,0.7)">
                📌 Layer Digitasi GeoJSON
              </div>
            </div>`, {maxWidth:280});
          // Hover effect
          layer.on('mouseover', function(){ this.setStyle({fillOpacity:0.3,weight:3}); });
          layer.on('mouseout',  function(){ window._layerGeoJSON?.resetStyle(this); });
        }
      }).addTo(map);

      // Update jumlah fitur di metadata
      const fc = data.features ? data.features.length : 0;
      const metaFitur = document.getElementById('metaJumlahFitur');
      if(metaFitur) metaFitur.textContent = `6 titik + ${fc} fitur GeoJSON`;

      // Pastikan checkbox sync
      const chk = document.getElementById('chkGeoJSON');
      if(chk) chk.checked = true;

      console.log(`✅ GeoJSON loaded: ${fc} fitur`);
    })
    .catch(err => {
      console.warn('GeoJSON tidak ditemukan atau gagal dimuat:', err.message);
      // Uncheck checkbox supaya user tahu layer tidak ada
      const chk = document.getElementById('chkGeoJSON');
      if(chk){ chk.checked = false; chk.disabled = true; }
    });

  // ── Layer Batas Administrasi DIY — Multiple fallback ─
  // Coba beberapa sumber GeoJSON batas DIY
  const adminSources = [
    'https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/daerah-istimewa-yogyakarta.geojson',
    'https://raw.githubusercontent.com/ans-4175/peta-indonesia-geojson/master/daerah-istimewa-yogyakarta/daerah-istimewa-yogyakarta.geojson',
  ];

  async function loadAdminLayer(){
    for(const url of adminSources){
      try{
        const res = await fetch(url, {signal: AbortSignal.timeout(8000)});
        if(!res.ok) continue;
        const data = await res.json();
        window._layerAdmin = L.geoJSON(data, {
          style: {
            color: '#ff6644',
            weight: 2,
            opacity: 0.75,
            fillOpacity: 0.06,
            fillColor: '#ff3300',
            dashArray: '6,4'
          }
        });
        console.log('✅ Layer admin DIY loaded dari:', url);
        // Cek apakah checkbox sudah dicentang
        const chk = document.getElementById('chkAdmin');
        if(chk && chk.checked) window._layerAdmin.addTo(map);
        return;
      } catch(e){
        console.warn('Gagal load admin dari', url, ':', e.message);
      }
    }
    console.warn('⚠ Semua sumber layer admin gagal. Layer tidak tersedia.');
    const chk = document.getElementById('chkAdmin');
    if(chk){ chk.disabled = true; chk.title = 'Layer tidak tersedia (koneksi gagal)'; }
  }
  loadAdminLayer();

  // ── Custom Layer Switcher ──────────────────────────
  const LayerSwitcher = L.Control.extend({
    options:{ position:'topright' },
    onAdd: function(){
      const wrap = L.DomUtil.create('div','layer-switcher-wrap');
      L.DomEvent.disableClickPropagation(wrap);

      const layers = [
        { id:'dark',     label:'🌑 Horor',    layer: layerDark },
        { id:'satellite',label:'🛰 Satelit',  layer: layerSatellite },
        { id:'street',   label:'🗺 Jalan',    layer: layerStreet },
      ];

      let active = 'dark';

      layers.forEach(l=>{
        const btn = L.DomUtil.create('button','layer-btn', wrap);
        btn.id = 'lbtn-'+l.id;
        btn.textContent = l.label;
        if(l.id === active) btn.classList.add('active');

        L.DomEvent.on(btn,'click',()=>{
          if(active === l.id) return;
          // remove old
          layers.forEach(x=>{ if(map.hasLayer(x.layer)) map.removeLayer(x.layer); });
          l.layer.addTo(map);
          active = l.id;
          wrap.querySelectorAll('.layer-btn').forEach(b=>b.classList.remove('active'));
          btn.classList.add('active');
        });
      });

      return wrap;
    }
  });

  new LayerSwitcher().addTo(map);
  L.control.zoom({position:'bottomright'}).addTo(map);

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      userLat=pos.coords.latitude; userLon=pos.coords.longitude;
      document.getElementById('locationStatus').textContent=
        `📍 Lokasi kamu: ${userLat.toFixed(5)}, ${userLon.toFixed(5)}`;
      L.circleMarker([userLat,userLon],{
        radius:8,fillColor:'#00aaff',color:'#fff',weight:2,fillOpacity:0.9
      }).addTo(map).bindPopup('<b style="color:#00aaff">📍 Lokasi Kamu</b>');
      // auto-set origin
      setRouteOrigin(userLat, userLon, 'Lokasi Saya');
    },()=>{
      document.getElementById('locationStatus').textContent='⚠ Izin lokasi ditolak';
    });
  }

  // Right-click to set route origin
  map.on('contextmenu', e => setRouteOrigin(e.latlng.lat, e.latlng.lng, 'Titik di peta'));

  // Populate route destination select
  const sel = document.getElementById('destSelect');
  allLocations.forEach(l => {
    const o = document.createElement('option'); o.value = l.id; o.textContent = l.nama; sel.appendChild(o);
  });

  renderMarkers(allLocations);
  setTimeout(()=>map.invalidateSize(), 300);
  setTimeout(()=>map.invalidateSize(), 800);

  // ── Skala bar dinamis (update tiap zoom/move) ──────
  L.control.scale({
    imperial: false,
    metric: true,
    position: 'bottomleft',
    maxWidth: 150
  }).addTo(map);

  // ── Info skala + sistem koordinat dinamis ──────────
  const scaleInfo = L.control({position:'bottomleft'});
  scaleInfo.onAdd = function(){
    const div = L.DomUtil.create('div','scale-info-box');
    div.innerHTML = getScaleInfoHTML(map);
    return div;
  };
  scaleInfo.addTo(map);

  // Update saat zoom berubah
  map.on('zoomend moveend', function(){
    const el = document.querySelector('.scale-info-box');
    if(el) el.innerHTML = getScaleInfoHTML(map);
  });
}

function getScaleInfoHTML(map){
  const zoom = map.getZoom();
  const center = map.getCenter();
  // Approx scale berdasarkan zoom level & latitude
  const lat = center.lat * Math.PI / 180;
  const metersPerPx = 156543.03392 * Math.cos(lat) / Math.pow(2, zoom);
  const scale = Math.round(metersPerPx * 96 / 0.0254); // px to meter, 96dpi

  // Bulatkan ke angka yang rapi
  const niceScale = niceNumber(scale);

  // Zone UTM untuk Jogja = 49S
  const zone = center.lng >= 108 && center.lng < 114 ? '49S' : '49S';

  return `
    <div style="font-family:'Share Tech Mono',monospace;font-size:0.58rem;color:#c8a0a0;
                background:rgba(4,0,0,0.88);border:1px solid rgba(180,0,0,0.25);
                border-radius:3px;padding:0.32rem 0.6rem;line-height:1.7;
                text-shadow:none;margin-top:4px">
      <div style="color:#ff4444;font-size:0.55rem;letter-spacing:0.1em;margin-bottom:0.1rem">METADATA PETA</div>
      <div>📐 Skala ≈ 1 : ${niceScale.toLocaleString('id-ID')}</div>
      <div>🌐 Sistem Koordinat: WGS 84 / UTM Zone ${zone}</div>
      <div>🔭 EPSG: 32749</div>
      <div>🗓 Data: 2024 — 2025</div>
      <div>📍 Sumber: Survey Lapangan & Media Online</div>
    </div>`;
}

function niceNumber(n){
  const magnitude = Math.pow(10, Math.floor(Math.log10(n)));
  const norm = n / magnitude;
  let nice;
  if(norm < 1.5) nice = 1;
  else if(norm < 3.5) nice = 2;
  else if(norm < 7.5) nice = 5;
  else nice = 10;
  return nice * magnitude;
}

// ── MARKER CONFIG ─────────────────────────────────────
const COLORS={
  'rendah':'#2dcc2d','sedang':'#ffd700',
  'tinggi':'#ff3333','sangat-tinggi':'#cc44ff'
};
const BADGES={
  'penampakan':'👻 PENAMPAKAN','suara':'🔊 SUARA MISTERIUS',
  'bau':'💨 BAU ANEH','kejadian':'⚡ KEJADIAN ANEH','urban-legend':'📖 URBAN LEGEND'
};

function markerIcon(loc){
  const color=COLORS[loc.level]||'#ff3333';
  const big=loc.level==='sangat-tinggi';
  const sz=big?22:15, wrap=big?sz+14:sz+10;
  const pulse=big?`<div style="position:absolute;inset:-7px;border-radius:50%;border:2px solid ${color};opacity:0.5;animation:mpulse 1.4s ease-out infinite;"></div><div style="position:absolute;inset:-14px;border-radius:50%;border:1px solid ${color};opacity:0.2;animation:mpulse 1.4s ease-out infinite 0.4s;"></div>`:'';
  return L.divIcon({
    className:'',
    iconSize:[wrap,wrap], iconAnchor:[wrap/2,wrap/2],
    html:`<style>@keyframes mpulse{0%{transform:scale(1);opacity:0.5}100%{transform:scale(2.8);opacity:0}}</style>
    <div style="position:relative;width:${sz}px;height:${sz}px;background:${color};border-radius:50%;border:2px solid rgba(255,255,255,0.6);box-shadow:0 0 14px ${color},0 0 28px ${color}55,0 0 42px ${color}22;cursor:pointer;">
      ${pulse}${big?'<div style="position:absolute;top:-5px;left:-4px;font-size:16px;filter:drop-shadow(0 0 4px red);">💀</div>':''}
    </div>`
  });
}

// ── RENDER MARKERS ────────────────────────────────────
function renderMarkers(locs){
  markers.forEach(m=>map.removeLayer(m));
  markers=[];

  locs.forEach(loc=>{
    const m=L.marker([loc.lat,loc.lon],{icon:markerIcon(loc)}).addTo(map);

    m.on('click', function(){
      const dist=(userLat&&userLon)
        ? calcDist(userLat,userLon,loc.lat,loc.lon)
        : 'Izin lokasi belum diberikan';

      m.bindPopup(`
        <div class="popup-inner">
          <div class="popup-title">${loc.nama}</div>
          <div class="popup-row">Kepercayaan: <strong style="color:${COLORS[loc.level]}">${loc.persen}% (${loc.level})</strong></div>
          <div class="popup-coords">🧭 ${loc.lat.toFixed(6)}, ${loc.lon.toFixed(6)}</div>
          <div class="popup-dist">📍 Jarak dari kamu: ${dist}</div>
          <div class="popup-actions">
            <button class="popup-btn" onclick="openDetail(${loc.id})">👁 Detail</button>
            <button class="popup-btn" onclick="routeToLoc(${loc.id})">🧭 Rute</button>
            <a class="popup-btn popup-maps" href="${loc.link_gmaps}" target="_blank">🗺 Maps</a>
          </div>
        </div>`,{maxWidth:290}).openPopup();
    });

    markers.push(m);
  });
}

// ── HELPERS ───────────────────────────────────────────
function calcDist(la1,lo1,la2,lo2){
  const R=6371e3,f1=la1*Math.PI/180,f2=la2*Math.PI/180;
  const df=(la2-la1)*Math.PI/180,dl=(lo2-lo1)*Math.PI/180;
  const a=Math.sin(df/2)**2+Math.cos(f1)*Math.cos(f2)*Math.sin(dl/2)**2;
  const d=2*R*Math.asin(Math.sqrt(a));
  return d<1000?`${Math.round(d)} m`:`${(d/1000).toFixed(1)} km`;
}

// ── FILTER ────────────────────────────────────────────
function applyFilters(){
  const lvls=[...document.querySelectorAll('.filter-checks input')]
    .filter(i=>['rendah','sedang','tinggi','sangat-tinggi'].includes(i.value)&&i.checked).map(i=>i.value);
  const cats=[...document.querySelectorAll('.filter-checks input')]
    .filter(i=>['penampakan','suara','bau','kejadian','urban-legend'].includes(i.value)&&i.checked).map(i=>i.value);
  renderMarkers(allLocations.filter(l=>lvls.includes(l.level)&&cats.includes(l.kategori)));
}
function searchLocations(){
  const q=document.getElementById('searchInput').value.trim().toLowerCase();
  const box=document.getElementById('searchResults');
  box.innerHTML='';
  if(!q){box.classList.remove('show');return;}
  const m=allLocations.filter(l=>l.nama.toLowerCase().includes(q)).slice(0,6);
  m.forEach(l=>{
    const d=document.createElement('div');
    d.className='search-item';
    d.innerHTML=`${l.nama}<small>${BADGES[l.kategori]||l.kategori} · ${l.level}</small>`;
    d.onclick=()=>{
      map.flyTo([l.lat,l.lon],17); openDetail(l.id);
      box.classList.remove('show'); document.getElementById('searchInput').value='';
    };
    box.appendChild(d);
  });
  if(!m.length) box.innerHTML='<div class="search-item" style="color:#6a4a4a;pointer-events:none">Tidak ditemukan</div>';
  box.classList.add('show');
}
document.addEventListener('click',e=>{
  if(!e.target.closest('.search-wrap')) document.getElementById('searchResults').classList.remove('show');
});

// ── DETAIL MODAL ──────────────────────────────────────
function openDetail(id){
  const loc=allLocations.find(l=>l.id===id);
  if(!loc) return;
  selectedLocId=id;
  document.getElementById('detailImg').src         =loc.gambar;
  document.getElementById('detailDesc').textContent =loc.deskripsi;
  document.getElementById('detailMapsLink').href    =loc.link_gmaps;
  document.getElementById('detailVideo').src        =loc.video;
  document.getElementById('videoNote').textContent  =loc.videoNote;

  // Render kronologi (data bawaan + kisah dari user)
  renderKronologi(id);

  const ratings=(() => { try { return JSON.parse(localStorage.getItem(`rating_${id}`)||'[]'); } catch(e){ return []; } })();
  const avg=ratings.length?(ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1):'—';
  document.getElementById('ratingAvg').textContent=`Rata-rata: ${avg} ⭐ (${ratings.length} penilaian)`;
  document.querySelectorAll('.star').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.mtab').forEach((t,i)=>t.classList.toggle('active',i===0));
  document.querySelectorAll('.mtab-content').forEach((c,i)=>c.classList.toggle('active',i===0));
  loadKomentar(id);
  document.getElementById('detailModal').classList.add('active');
}

function closeDetailModal(e){if(e.target===document.getElementById('detailModal'))closeDetailModalBtn();}
function closeDetailModalBtn(){
  document.getElementById('detailModal').classList.remove('active');
  document.getElementById('detailVideo').src='';
}
function switchModalTab(tab,btn){
  document.querySelectorAll('.mtab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.mtab-content').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab'+tab.charAt(0).toUpperCase()+tab.slice(1)).classList.add('active');
}

// ── RATING ────────────────────────────────────────────
function setRating(val){
  document.querySelectorAll('.star').forEach((s,i)=>s.classList.toggle('active',i<val));
  const key=`rating_${selectedLocId}`;
  const ratings=(() => { try { return JSON.parse(localStorage.getItem(key)||'[]'); } catch(e){ return []; } })();
  ratings.push(val);
  try { localStorage.setItem(key,JSON.stringify(ratings)); } catch(e){}
  const avg=(ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1);
  document.getElementById('ratingAvg').textContent=`Rata-rata: ${avg} ⭐ (${ratings.length} penilaian)`;
  // Load komentar pakai selectedLocId (bukan 'id' yang undefined)
  if(selectedLocId) loadKomentar(selectedLocId);
}

// ── ADD LOCATION ──────────────────────────────────────
function openAddModal(){ document.getElementById('addModal').classList.add('active'); }
function closeAddModal(e){ if(e.target===document.getElementById('addModal'))document.getElementById('addModal').classList.remove('active'); }
function submitNewLocation(e){
  e.preventDefault();
  const newLoc={
    id:Date.now(),
    nama:document.getElementById('addName').value,
    lat:parseFloat(document.getElementById('addLat').value),
    lon:parseFloat(document.getElementById('addLon').value),
    link_gmaps:`https://www.google.com/maps?q=${document.getElementById('addLat').value},${document.getElementById('addLon').value}`,
    kategori:document.getElementById('addKategori').value,
    level:document.getElementById('addLevel').value,
    persen:{rendah:25,sedang:50,tinggi:75,'sangat-tinggi':92}[document.getElementById('addLevel').value],
    deskripsi:document.getElementById('addDesc').value||'Laporan dari komunitas.',
    kronologi:[{waktu:'Dilaporkan',nama:'Pelapor Anonim',teks:'Lokasi baru dilaporkan oleh anggota komunitas. Detail masih dalam investigasi.'}],
    gambar:document.getElementById('addImg').value||'https://via.placeholder.com/700x200/0a0005/cc0000?text=HAUNTED',
    video:'',videoNote:'Podcast/Liputan belum tersedia untuk lokasi ini.'
  };
  allLocations.push(newLoc);
  applyFilters();
  document.getElementById('addModal').classList.remove('active');
  map.flyTo([newLoc.lat,newLoc.lon],16);
  e.target.reset();
}

// ── SIDEBAR ───────────────────────────────────────────
function toggleSidebar(){
  const sb=document.getElementById('sidebar');
  sb.classList.toggle('collapsed');
  document.getElementById('sidebarToggleIcon').textContent=sb.classList.contains('collapsed')?'▶':'◀';
  setTimeout(()=>map&&map.invalidateSize(),320);
}

// ── SIDEBAR TABS ──────────────────────────────────────
function switchSbTab(id, btn){
  document.querySelectorAll('.sb-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.sb-panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('sbp-'+id).classList.add('active');
  const sb=document.getElementById('sidebar');
  if(sb.classList.contains('collapsed')){
    sb.classList.remove('collapsed');
    document.getElementById('sidebarToggleIcon').textContent='◀';
    setTimeout(()=>map&&map.invalidateSize(),320);
  }
}

// ── SIDEBAR SEARCH ────────────────────────────────────
function doSbSearch(){
  const q=document.getElementById('sbSearchInput').value.trim().toLowerCase();
  const box=document.getElementById('sbSearchResults');
  box.innerHTML='';
  if(!q) return;
  const res=allLocations.filter(l=>l.nama.toLowerCase().includes(q)||l.deskripsi.toLowerCase().includes(q));
  if(!res.length){
    box.innerHTML='<div class="sb-search-item" style="pointer-events:none;color:var(--dim)">Tidak ditemukan</div>';
    return;
  }
  res.slice(0,8).forEach(loc=>{
    const d=document.createElement('div'); d.className='sb-search-item';
    d.innerHTML=`${loc.nama}<small>${BADGES[loc.kategori]||loc.kategori} · ${loc.level}</small>`;
    d.onclick=()=>{
      map.flyTo([loc.lat,loc.lon],16);
      const idx=allLocations.indexOf(loc);
      if(markers[idx]) markers[idx].openPopup();
      document.getElementById('sbSearchInput').value='';
      box.innerHTML='';
    };
    box.appendChild(d);
  });
}

// ══════════════════════════════════════════════════════
//  NETWORK ANALYSIS / ROUTING
// ══════════════════════════════════════════════════════
function setRouteMode(mode, btn){
  routeMode=mode;
  document.querySelectorAll('.route-mode-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

function setRouteOrigin(lat, lon, label){
  originLat=lat; originLon=lon;
  const el=document.getElementById('originVal');
  el.textContent=`${label}\n${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  el.classList.add('filled');
  if(originMarkerL) map.removeLayer(originMarkerL);
  originMarkerL=L.circleMarker([lat,lon],{radius:10,fillColor:'#00aaff',color:'#fff',weight:2.5,fillOpacity:0.9})
    .addTo(map).bindPopup('<b style="color:#00aaff">📍 Titik Asal</b>');
  checkRouteReady();
}

function setRouteDest(lat, lon, label){
  destLat=lat; destLon=lon;
  const el=document.getElementById('destVal');
  el.textContent=`${label}\n${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  el.classList.add('filled');
  if(destMarkerL) map.removeLayer(destMarkerL);
  destMarkerL=L.circleMarker([lat,lon],{radius:10,fillColor:'#cc0000',color:'#fff',weight:2.5,fillOpacity:0.9})
    .addTo(map).bindPopup(`<b style="color:#cc0000">🏚 ${label}</b>`);
  checkRouteReady();
}

function checkRouteReady(){
  const btn=document.getElementById('routeGoBtn');
  if(btn) btn.disabled=!(originLat&&originLon&&destLat&&destLon);
}

function useMyLoc(){
  if(userLat&&userLon){ setRouteOrigin(userLat,userLon,'Lokasi Saya'); return; }
  const v=document.getElementById('originVal');
  v.textContent='Mendeteksi lokasi...';
  navigator.geolocation?.getCurrentPosition(p=>{
    userLat=p.coords.latitude; userLon=p.coords.longitude;
    setRouteOrigin(userLat,userLon,'Lokasi Saya');
    document.getElementById('locationStatus').textContent=`📍 Lokasi kamu: ${userLat.toFixed(5)}, ${userLon.toFixed(5)}`;
  },()=>{ v.textContent='Gagal — izin lokasi ditolak'; v.classList.remove('filled'); });
}

function setDestFromSelect(val){
  if(!val) return;
  const loc=allLocations.find(l=>l.id==val);
  if(loc) setRouteDest(loc.lat, loc.lon, loc.nama);
}

function routeToLoc(id){
  const loc=allLocations.find(l=>l.id===id); if(!loc) return;
  setRouteDest(loc.lat, loc.lon, loc.nama);
  document.getElementById('destSelect').value=id;
  switchSbTab('route', document.getElementById('stb-route'));
  if(!originLat && userLat) setRouteOrigin(userLat, userLon, 'Lokasi Saya');
  if(originLat && originLon && destLat && destLon) calcRoute();
}

async function calcRoute(){
  if(!originLat||!destLat) return;
  const btn=document.getElementById('routeGoBtn');
  btn.textContent='⏳ Menghitung...'; btn.disabled=true; btn.classList.add('loading');
  document.getElementById('routeError').classList.remove('show');
  document.getElementById('routeResult').classList.remove('show');

  const profileMap={'driving':'driving','foot':'foot','bike':'bike'};
  const profile=profileMap[routeMode]||'driving';
  const url=`${OSRM}/${profile}/${originLon},${originLat};${destLon},${destLat}?overview=full&geometries=geojson&steps=true`;

  try{
    const res=await fetch(url);
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const data=await res.json();
    if(data.code!=='Ok'||!data.routes?.length) throw new Error('Rute tidak ditemukan');
    renderRoute(data.routes[0]);
  } catch(e){
    const err=document.getElementById('routeError');
    err.textContent=`Gagal: ${e.message}`;
    err.classList.add('show');
  } finally{
    btn.textContent='☠ HITUNG RUTE'; btn.disabled=false; btn.classList.remove('loading');
    checkRouteReady();
  }
}

function renderRoute(route){
  if(routeLayer){ map.removeLayer(routeLayer); routeLayer=null; }
  const coords=route.geometry.coordinates.map(c=>[c[1],c[0]]);
  routeLayer=L.polyline(coords,{color:'#ff2222',weight:5,opacity:0.88,dashArray:'10,5'}).addTo(map);
  map.fitBounds(routeLayer.getBounds(),{padding:[50,50]});

  const km=route.distance, sec=route.duration;
  document.getElementById('rDist').textContent=km<1000?`${Math.round(km)} m`:`${(km/1000).toFixed(2)} km`;
  const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=Math.floor(sec%60);
  document.getElementById('rTime').textContent=h>0?`${h}j ${m}m`:m>0?`${m} mnt ${s} dtk`:`${s} dtk`;

  const stepsDiv=document.getElementById('routeSteps'); stepsDiv.innerHTML='';
  const steps=route.legs?.[0]?.steps||[];
  steps.forEach((st,i)=>{
    const icon=getStepIcon(st.maneuver?.type, st.maneuver?.modifier);
    const dist=st.distance<1000?`${Math.round(st.distance)} m`:`${(st.distance/1000).toFixed(1)} km`;
    const name=st.name||st.maneuver?.type||'';
    if(!name && i>0 && i<steps.length-1) return;
    const el=document.createElement('div'); el.className='route-step';
    el.innerHTML=`<span class="route-step-icon">${icon}</span><span>${name||'Lanjutkan'} <span style="color:var(--dim);font-size:0.7rem">(${dist})</span></span>`;
    stepsDiv.appendChild(el);
  });

  document.getElementById('routeResult').classList.add('show');
}

function getStepIcon(type, mod){
  if(!type) return '→';
  const t=type.toLowerCase(), m=(mod||'').toLowerCase();
  if(t==='depart') return '🔵';
  if(t==='arrive') return '🔴';
  if(t==='turn'||t==='new name'){ if(m.includes('left')) return '↰'; if(m.includes('right')) return '↱'; return '↑'; }
  if(t==='roundabout'||t==='rotary') return '🔄';
  if(t==='fork'){ if(m.includes('left')) return '↖'; return '↗'; }
  if(t==='merge') return '⇒';
  return '↑';
}

function clearRoute(){
  if(routeLayer){ map.removeLayer(routeLayer); routeLayer=null; }
  if(originMarkerL){ map.removeLayer(originMarkerL); originMarkerL=null; }
  if(destMarkerL){ map.removeLayer(destMarkerL); destMarkerL=null; }
  originLat=originLon=destLat=destLon=null;
  const ov=document.getElementById('originVal');
  ov.textContent='Belum ditentukan'; ov.classList.remove('filled');
  const dv=document.getElementById('destVal');
  dv.textContent='Belum dipilih'; dv.classList.remove('filled');
  document.getElementById('destSelect').value='';
  document.getElementById('routeResult').classList.remove('show');
  document.getElementById('routeError').classList.remove('show');
  checkRouteReady();
}

// ── KOMUNITAS TOGGLE ──────────────────────────────────
function toggleKom(id, btn){
  const list = document.getElementById(id);
  const isOpen = list.classList.contains('open');
  // Tutup semua dulu
  document.querySelectorAll('.kom-links-list').forEach(l=>l.classList.remove('open'));
  document.querySelectorAll('.kom-platform-btn').forEach(b=>b.classList.remove('open'));
  // Buka yang diklik (kalau belum open)
  if(!isOpen){
    list.classList.add('open');
    btn.classList.add('open');
  }
}

// ── SHARE ─────────────────────────────────────────────
function shareWA(){
  const text = encodeURIComponent(
    '👻 Cek peta lokasi angker Yogyakarta ini!\n' +
    '🗺 WebGIS Haunted Map — Pemetaan Mistis Masyarakat Yogyakarta\n\n' +
    window.location.href
  );
  window.open('https://wa.me/?text=' + text, '_blank');
}

function shareIG(){
  navigator.clipboard.writeText(
    '👻 Cek peta lokasi angker Yogyakarta! ' + window.location.href
  ).then(()=>{
    alert('Link sudah disalin! Paste di caption Instagram kamu 📸');
    window.open('https://www.instagram.com/', '_blank');
  }).catch(()=> copyLink());
}

function copyLink(){
  navigator.clipboard.writeText(window.location.href)
    .then(()=>{
      const msg = document.getElementById('shareMsg');
      msg.style.display = 'block';
      setTimeout(()=> msg.style.display = 'none', 2500);
    })
    .catch(()=>{
      prompt('Salin link ini:', window.location.href);
    });
}

// ── TOGGLE LAYER ADMIN BIG ────────────────────────────
function toggleAdminLayer(checkbox){
  if(!window._layerAdmin){
    if(checkbox.checked){
      checkbox.checked = false;
      alert('⚠ Layer batas administrasi DIY belum berhasil dimuat.\n\nPastikan koneksi internet aktif dan reload halaman.');
    }
    return;
  }
  if(checkbox.checked){
    window._layerAdmin.addTo(map);
  } else {
    if(map.hasLayer(window._layerAdmin)) map.removeLayer(window._layerAdmin);
  }
}

// ── TOGGLE GEOJSON LAYER ──────────────────────────────
// Fungsi ini sebelumnya HILANG — menyebabkan checkbox tidak berfungsi
function toggleGeoJSONLayer(checkbox){
  if(!window._layerGeoJSON){
    if(checkbox.checked){
      checkbox.checked = false;
      alert('⚠ Layer GeoJSON belum berhasil dimuat.\n\nPastikan file GeoJSON.geojson ada di folder yang sama dengan index.html.');
    }
    return;
  }
  if(checkbox.checked){
    window._layerGeoJSON.addTo(map);
  } else {
    if(map.hasLayer(window._layerGeoJSON)) map.removeLayer(window._layerGeoJSON);
  }
}

// ── KOMENTAR ──────────────────────────────────────────
function loadKomentar(id){
  const list = document.getElementById('komentarList');
  if(!list) return;
  list.innerHTML = '';
  let data = [];
  try { data = JSON.parse(localStorage.getItem('kom_'+id)||'[]'); } catch(e){ data=[]; }
  if(!data.length){
    list.innerHTML = '<div class="kom-empty">Belum ada komentar. Jadilah yang pertama!</div>';
    return;
  }
  data.forEach(k=>{
    const el = document.createElement('div');
    el.className = 'kom-item-display';
    el.innerHTML = `<div class="kom-item-time">${k.waktu}</div><div class="kom-item-text">${k.teks}</div>`;
    list.appendChild(el);
  });
  // Auto scroll ke bawah
  list.scrollTop = list.scrollHeight;
}

function submitKomentar(){
  const input = document.getElementById('komentarInput');
  if(!input) return;
  const teks = input.value.trim();
  if(!teks || !selectedLocId) return;
  const key = 'kom_'+selectedLocId;
  let data = [];
  try { data = JSON.parse(localStorage.getItem(key)||'[]'); } catch(e){ data=[]; }
  const now = new Date();
  data.push({
    teks,
    waktu: now.toLocaleDateString('id-ID')+' '+now.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})
  });
  try { localStorage.setItem(key, JSON.stringify(data)); } catch(e){}
  input.value = '';
  loadKomentar(selectedLocId);
}

// ── TAMBAH KISAH (di tab Kesaksian) ──────────────────
function submitKisah(){
  const waktu = document.getElementById('kisahWaktu')?.value.trim();
  const nama  = document.getElementById('kisahNama')?.value.trim();
  const teks  = document.getElementById('kisahTeks')?.value.trim();
  if(!teks || !selectedLocId){ alert('Isi cerita dulu ya!'); return; }
  const key = 'kisah_'+selectedLocId;
  let data = [];
  try { data = JSON.parse(localStorage.getItem(key)||'[]'); } catch(e){ data=[]; }
  data.push({
    waktu: waktu || 'Tidak diketahui',
    nama:  nama  || 'Anonim',
    teks
  });
  try { localStorage.setItem(key, JSON.stringify(data)); } catch(e){}
  // Reset form
  if(document.getElementById('kisahWaktu')) document.getElementById('kisahWaktu').value='';
  if(document.getElementById('kisahNama'))  document.getElementById('kisahNama').value='';
  if(document.getElementById('kisahTeks'))  document.getElementById('kisahTeks').value='';
  // Reload kronologi
  renderKronologi(selectedLocId);
  alert('Kisahmu sudah ditambahkan! Terima kasih 🕯');
}

function renderKronologi(id){
  const loc = allLocations.find(l=>l.id===id);
  if(!loc) return;
  // Ambil kisah bawaan dari data
  const baseKrono = loc.kronologi || [];
  // Ambil kisah tambahan dari localStorage
  let userKrono = [];
  try { userKrono = JSON.parse(localStorage.getItem('kisah_'+id)||'[]'); } catch(e){ userKrono=[]; }
  const allKrono = [...baseKrono, ...userKrono];
  const container = document.getElementById('detailKronologi');
  if(!container) return;
  if(!allKrono.length){
    container.innerHTML = '<p style="font-family:var(--f-mono);font-size:0.65rem;color:var(--dim);text-align:center;padding:1rem 0">Belum ada kesaksian untuk lokasi ini.</p>';
    return;
  }
  container.innerHTML = allKrono.map((k,i)=>`
    <div class="krono-item">
      <div class="krono-dot"><span class="krono-num">${i+1}</span></div>
      <div class="krono-content">
        <div class="krono-time">${k.waktu}</div>
        <div class="krono-name">— ${k.nama}</div>
        <div class="krono-desc">${k.teks}</div>
      </div>
    </div>`).join('');
}
// ── EXPORT METADATA JSON (SDI) ────────────────────────
function exportMetadataJSON(){
  const geojsonCount = window._layerGeoJSON
    ? (window._layerGeoJSON.getLayers().length)
    : 0;

  const metadata = {
    metadata: {
      judul: "Pemetaan Lokasi Angker & Cerita Mitos Lokal DIY",
      abstrak: "WebGIS interaktif yang memetakan lokasi-lokasi yang dipercaya angker oleh masyarakat di Daerah Istimewa Yogyakarta berdasarkan hasil survei lapangan dan wawancara langsung.",
      wilayah: "Daerah Istimewa Yogyakarta, Indonesia",
      batas_koordinat: {
        utara: -7.53, selatan: -8.05,
        barat: 110.27, timur: 110.55
      }
    },
    referensi_spasial: {
      sistem_koordinat: "WGS84",
      epsg: "EPSG:4326",
      proyeksi: "Geographic (Lat/Lon)",
      satuan: "Decimal Degrees"
    },
    kualitas_data: {
      skala_referensi: "1:25.000",
      tipe_geometri: "Point",
      akurasi_posisi: "± 10 meter (GPS smartphone)",
      metode_pengumpulan: "Survei lapangan & wawancara masyarakat",
      kelengkapan: "6 titik lokasi terverifikasi dari survei"
    },
    dataset: {
      jumlah_titik: 6,
      jumlah_fitur_geojson: geojsonCount,
      format: "GeoJSON (RFC 7946)",
      encoding: "UTF-8",
      tanggal_pengumpulan: "Maret – Mei 2025",
      tanggal_publikasi: new Date().toISOString().split('T')[0]
    },
    teknologi: {
      webgis_platform: "Leaflet.js v1.9.4",
      basemap: "Mapbox Dark v11 (tiles)",
      routing: "OSRM (Open Source Routing Machine)",
      data_administrasi: "GeoJSON Batas DIY (Geoportal BIG)",
      audio: "Web Audio API",
      hosting: "GitHub Pages"
    },
    pembuat: {
      tim: ["Ilma", "Erfina", "Dirra", "Imel", "Tota", "Delima", "Octo"],
      institusi: "Teknik Geomatika, UPN Veteran Yogyakarta",
      tahun: 2025
    },
    lisensi: {
      nama: "Creative Commons Attribution-ShareAlike 4.0",
      kode: "CC BY-SA 4.0",
      url: "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    standar_sdi: {
      format_data: "OGC GeoJSON Standard",
      koordinat_standard: "ISO 6709",
      metadata_standard: "ISO 19115 (sebagian)",
      interoperabilitas: ["QGIS", "ArcGIS", "Google Earth", "GDAL", "Geoportal BIG"]
    },
    catatan: "Data bersifat persepsi masyarakat berdasarkan hasil wawancara. Tidak merupakan klaim kebenaran mutlak atau data resmi pemerintah."
  };

  const blob = new Blob([JSON.stringify(metadata, null, 2)], {type:'application/json'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'metadata_haunted_map_sdi.json';
  a.click();
  URL.revokeObjectURL(url);
}
