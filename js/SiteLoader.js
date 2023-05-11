const neededScripts = {
    // pathToScript: [type, callback/null]
    'js/Assets.js': ['text/javascript', () => {
        const dark = useDarkmode();
        let first_state;

        (screen.width >= 1600) ? first_state = "pc" : first_state = "other";
        (dark) ? load_css_file("css/darkmode.css") : load_css_file("css/lightmode.css");

        document.addEventListener('resize', () => {
            if (first_state === "pc") load_container(get_current_container().id);
        });

        document.getElementById("ageinfo").innerHTML = "Hmm, let me think. There is not much about me. I am " + get_age() + " years old, my name is Lukas, I live in Munich and I know the following programming languages:";
    }],
    'https://fonts.googleapis.com/css2?family=Mulish:wght@300&family=Quicksand:wght@300;400;500;554;600;700&family=Roboto+Condensed&display=swap': ['text/css', null],
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css': ['text/css', null],
    'css/main.css': ['text/css', null]
};

class SiteLoader {
    constructor() {
        this.loadedCss = 0;
        this.neededCss = Object.keys(neededScripts).filter(path => neededScripts[path] === 'text/css').length;
        this.spinner = document.querySelector('#spinner-overlay');
    }

    addCss(path, callback) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = path;
        link.onload = () => {
            this.cssHandler();
            if (callback) callback();
        }
        link.onerror = () => this.cssHandler();
        document.head.appendChild(link);
    }

    addJs(path, callback = null) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = path;
        if (callback) script.onload = callback;
        document.head.appendChild(script);
    }

    loadScripts() {
        this.addPreloader();
        for (let i = 0; i < Object.keys(neededScripts).length; i++) {
            const path = Object.keys(neededScripts)[i];
            const type = neededScripts[path][0];
            const callback = neededScripts[path][1];
            switch (type) {
                case 'text/css':
                    this.addCss(path, callback);
                    break;
                case 'text/javascript':
                    this.addJs(path, callback);
                    break;
            }
        }
    }

    cssHandler() {
        this.loadedCss++;
        if (this.loadedCss !== this.neededCss) return;
        this.fadeOutSpinner();
    }

    fadeOutSpinner() {
        for (let i = 0; i < 11; i++) {
            setTimeout(() => {
                this.spinner.style.opacity = 1 - (i / 10);
                if (i === 10) this.spinner.remove();
            }, i * 25);
        }
    }

    addPreloader() {
        /* Google Fonts preloader */
        const preloader = document.createElement('link');
        preloader.rel = 'preconnect';
        preloader.href = 'https://fonts.googleapis.com';
        document.head.appendChild(preloader);
        const preloader2 = document.createElement('link');
        preloader2.rel = 'preconnect';
        preloader2.href = 'https://fonts.gstatic.com';
        preloader2.crossOrigin = true;
        document.head.appendChild(preloader2);
    }
}

const siteLoader = new SiteLoader();

function removeSpinner() {
    siteLoader.loadScripts();
    siteLoader.fadeOutSpinner();
}

if (window.document.readyState === 'complete') removeSpinner();
else window.addEventListener('load', removeSpinner);