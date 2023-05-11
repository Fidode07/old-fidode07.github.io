function useDarkmode() {
  let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return matched;
}

function load_css_file(file_location) {
  var link = document.createElement("link");
  link.href = file_location;
  link.type = "text/css";
  link.rel = "stylesheet";
  link.media = "screen,print";

  document.getElementsByTagName("head")[0].appendChild(link);
}

function load_container(target_id) {
  for (var cur of document.getElementsByClassName("content-side")) {
    if(cur.id.includes(target_id)) {
      if(screen.width >= 1600) {
        cur.style.display = "";
        cur.style.marginLeft = "13%";
        $( '#'+target_id ).animate({
          'margin-left': '18%'
        });
      } else {
        cur.style.display = "";
        cur.style.marginLeft = "-10%";
        $( '#'+target_id ).animate({
          'margin-left': '0%'
        });
      }
    } else {
      cur.style.display = "none";
    }
  }
}

function get_current_container() {
  for (var cur of document.getElementsByClassName("content-side")) {
    if(!(cur.style.display.includes("none"))) {
      return cur;
    }
  }
}

function toggle_header2() {
  var tg = document.getElementById("header2");
  if(tg.style.display === "none") {
    tg.style.display = "";
    $("#header2").animate({
      'margin-left': '0px'
    });
  } else {
    $("#header2").animate({
      'margin-left': '-100px'
    });
    tg.style.display = "none";
  }
}

function get_age() {
  var dob = new Date("03/26/2007");
  var month_diff = Date.now() - dob.getTime();

  var age_dt = new Date(month_diff);

  var year = age_dt.getUTCFullYear();

  var age = Math.abs(year - 1970);
  return age;
}
