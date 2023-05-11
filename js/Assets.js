function useDarkmode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function load_css_file(file_location) {
    const link = document.createElement("link");
    link.href = file_location;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    document.getElementsByTagName("head")[0].appendChild(link);
}

function load_container(target_id) {
    for (let cur of document.getElementsByClassName("content-side")) {
        if (cur.id.includes(target_id)) {
            cur.style.display = "";
            (screen.width >= 1600) ? cur.style.marginLeft = "18%" : cur.style.marginLeft = "0%";
            continue;
        }
        cur.style.display = "none";
    }
}

function get_current_container() {
    for (let cur of document.getElementsByClassName("content-side")) {
        if (cur.style.display.includes('none')) continue;
        return cur;
    }
}

function toggle_header2() {
    const tg = document.getElementById("header2");
    if (tg.style.display === "none") {
        tg.style.display = "";
        document.getElementById("header2").animate({
            'margin-left': '0px'
        });
        return;
    }
    document.getElementById("header2").animate({
        'margin-left': '-100%'
    });
    tg.style.display = "none";
}

function get_age() {
    const dob = new Date("03/26/2007");
    const month_diff = Date.now() - dob.getTime();
    const age_dt = new Date(month_diff);
    const year = age_dt.getUTCFullYear();
    return Math.abs(year - 1970);
}