// --- STATE APLIKASI ---
let searchHistory = [];
const MAX_HISTORY = 5;

// --- AMBIL ELEMEN DOM ---
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const historyTagsContainer = document.getElementById("history-tags");
const btnClearAll = document.getElementById("btn-clear-all");
const activeKeywordBadge = document.getElementById("active-keyword-badge");
const resultsBox = document.getElementById("results-box");

// --- 1. LOCAL STORAGE OPERATIONS ---
function loadHistory() {
    const saved = localStorage.getItem("recent_search_history");
    if (saved) {
        try {
            searchHistory = JSON.parse(saved);
        } catch (e) {
            searchHistory = [];
        }
    } else {
        // Sample default
        searchHistory = ["Belajar HTML", "Koding CSS", "JavaScript Pemula"];
        saveHistory();
    }
    renderHistory();
}

function saveHistory() {
    localStorage.setItem("recent_search_history", JSON.stringify(searchHistory));
}

// --- 2. TAMBAH KATA KUNCI BARU ---
function addSearchKeyword(keyword) {
    const cleanKeyword = keyword.trim();
    if (!cleanKeyword) return;

    // Hapus jika kata kunci sudah ada sebelumnya (supaya tidak duplikat)
    searchHistory = searchHistory.filter(
        (item) => item.toLowerCase() !== cleanKeyword.toLowerCase()
    );

    // Sisipkan kata kunci baru di paling depan (index 0)
    searchHistory.unshift(cleanKeyword);

    // Batasi maksimal 5 kata kunci
    if (searchHistory.length > MAX_HISTORY) {
        searchHistory = searchHistory.slice(0, MAX_HISTORY);
    }

    saveHistory();
    renderHistory();
    executeSearchSimulation(cleanKeyword);
}

// --- 3. RENDER TAGS RIWAYAT ---
function renderHistory() {
    historyTagsContainer.innerHTML = "";

    if (searchHistory.length === 0) {
        historyTagsContainer.innerHTML = `<span class="history-empty">Belum ada riwayat pencarian.</span>`;
        return;
    }

    searchHistory.forEach((keyword, index) => {
        const tag = document.createElement("div");
        tag.className = "tag-item";

        tag.innerHTML = `
            <span class="tag-text">${keyword}</span>
            <button class="btn-delete-tag" title="Hapus dari riwayat">&times;</button>
        `;

        // Klik teks tag untuk melakukan pencarian ulang
        tag.querySelector(".tag-text").addEventListener("click", () => {
            searchInput.value = keyword;
            executeSearchSimulation(keyword);
        });

        // Klik tombol x untuk menghapus item spesifik
        tag.querySelector(".btn-delete-tag").addEventListener("click", (e) => {
            e.stopPropagation();
            removeSingleHistory(index);
        });

        historyTagsContainer.appendChild(tag);
    });
}

// --- 4. HAPUS RIWAYAT ---
function removeSingleHistory(index) {
    searchHistory.splice(index, 1);
    saveHistory();
    renderHistory();
}

function clearAllHistory() {
    if (confirm("Hapus seluruh riwayat pencarian?")) {
        searchHistory = [];
        saveHistory();
        renderHistory();
    }
}

// --- 5. SIMULASI HASIL PENCARIAN ---
function executeSearchSimulation(keyword) {
    activeKeywordBadge.textContent = `"${keyword}"`;

    resultsBox.innerHTML = `
        <div class="simulated-result-item">
            <span class="simulated-title">Panduan Lengkap: ${keyword}</span>
            <span class="simulated-snippet">Menampilkan artikel, modul pembelajaran, dan tutorial interaktif seputar "${keyword}" untuk pemula.</span>
        </div>
        <div class="simulated-result-item">
            <span class="simulated-title">Tips & Trik Terbaik tentang ${keyword}</span>
            <span class="simulated-snippet">Temukan metode praktis dalam mempelajari ${keyword} secara cepat dan menyenangkan.</span>
        </div>
    `;
}

// --- 6. EVENT LISTENERS ---
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value;
    if (query) {
        addSearchKeyword(query);
    }
});

btnClearAll.addEventListener("click", clearAllHistory);

// Inisialisasi awal
loadHistory();
