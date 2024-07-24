document.addEventListener("DOMContentLoaded", function() {
    const appGrid = document.querySelector(".app-grid");
    const loadingScreen = document.getElementById("loading-screen");
    const redirectMode = "iframe";

    fetch("assets/data/apps.csv")
        .then(response => response.text())
        .then(csvData => {
            const apps = parseCSV(csvData);
            populateApps(apps);
        });

    function parseCSV(data) {
        const lines = data.split("\n").slice(1);
        return lines.map(line => {
            const [title, icon, destination] = line.split(",").map(item => item.replace(/"/g, '').trim());
            return { title, icon, destination };
        });
    }

    function populateApps(apps) {
        apps.forEach(app => {
            const appElement = document.createElement("div");
            appElement.classList.add("app");
            appElement.innerHTML = `
                <img src="${app.icon}" alt="${app.title}">
                <div class="title">${app.title}</div>
            `;
            appElement.addEventListener("click", () => handleAppClick(app.destination));
            appGrid.appendChild(appElement);
        });
    }

    function handleAppClick(destination) {
        if (redirectMode === "iframe") {
            if (destination.startsWith('javascript:')) {
                eval(destination.slice(11));
            } else if (destination.startsWith('intent://')) {
                window.location.href = destination;
            } else {
                showLoadingScreen();
                setTimeout(() => {
                    const iframe = document.createElement("iframe");
                    iframe.src = destination;
                    iframe.style.width = "100vw";
                    iframe.style.height = "100vh";
                    iframe.style.border = "none";
                    iframe.onload = hideLoadingScreen;
                    document.body.innerHTML = "";
                    document.body.appendChild(iframe);
                    document.body.appendChild(loadingScreen);
                }, 500);
            }
        } else if (redirectMode === "redir") {
            window.location.href = destination;
        }
    }

    function showLoadingScreen() {
        loadingScreen.style.display = "flex";
        requestAnimationFrame(() => {
            loadingScreen.classList.add("show");
        });
    }
    
    function hideLoadingScreen() {
        loadingScreen.classList.remove("show");
        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.style.display = "none";
        }, { once: true });
    }
    
    function handleAppClick(destination) {
        if (redirectMode === "iframe") {
            if (destination.startsWith('javascript:')) {
                eval(destination.slice(11));
            } else if (destination.startsWith('intent://')) {
                window.location.href = destination;
            } else {
                showLoadingScreen();
                setTimeout(() => {
                    const iframe = document.createElement("iframe");
                    iframe.src = destination;
                    iframe.style.width = "100vw";
                    iframe.style.height = "100vh";
                    iframe.style.border = "none";
                    iframe.onload = hideLoadingScreen;
                    document.body.innerHTML = "";
                    document.body.appendChild(iframe);
                    document.body.appendChild(loadingScreen);
                }, 500);
            }
        } else if (redirectMode === "redir") {
            window.location.href = destination;
        }
    }    
});

// installable module //
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('plup-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
                '/assets/typefaces/bogle_std/BogleWeb-Black.eot',
                '/assets/typefaces/bogle_std/BogleWeb-Black.eot',
                '/assets/typefaces/bogle_std/BogleWeb-Black.woff2',
                '/assets/typefaces/bogle_std/BogleWeb-Black.woff',
                '/assets/typefaces/bogle_std/BogleWeb-Black.ttf',
                '/assets/typefaces/bogle_std/BogleWeb-BlackItalic.eot',
                '/assets/typefaces/bogle_std/BogleWeb-BlackItalic.woff2',
                '/assets/typefaces/bogle_std/BogleWeb-BlackItalic.woff',
                '/assets/typefaces/bogle_std/BogleWeb-BlackItalic.ttf',
                '/assets/typefaces/bogle_std/BogleWeb-Bold.eot',
                '/assets/typefaces/bogle_std/BogleWeb-Bold.woff2',
                '/assets/typefaces/bogle_std/BogleWeb-Bold.woff',
                '/assets/typefaces/bogle_std/BogleWeb-Bold.ttf',
                '/assets/typefaces/bogle_std/BogleWeb-BoldItalic.eot',
                '/assets/typefaces/bogle_std/BogleWeb-BoldItalic.woff2',
                '/assets/typefaces/bogle_std/BogleWeb-BoldItalic.woff',
                '/assets/typefaces/bogle_std/BogleWeb-BoldItalic.ttf',
                '/assets/typefaces/bogle_std/BogleWeb-Regular.eot',
                '/assets/typefaces/bogle_std/BogleWeb-Regular.woff2',
                '/assets/typefaces/bogle_std/BogleWeb-Regular.woff',
                '/assets/typefaces/bogle_std/BogleWeb-Regular.ttf',
                '/assets/typefaces/bogle_std/BogleWeb-RegularItalic.eot',
                '/assets/typefaces/bogle_std/BogleWeb-RegularItalic.woff2',
                '/assets/typefaces/bogle_std/BogleWeb-RegularItalic.woff',
                '/assets/typefaces/bogle_std/BogleWeb-RegularItalic.ttf',
                '/assets/data/apps.csv'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js').then(registration => {
//             console.log('Service Worker registered with scope:', registration.scope);
//         }, err => {
//             console.log('Service Worker registration failed:', err);
//         });
//     });
// };

document.addEventListener('DOMContentLoaded', () => {
    // selftest
});