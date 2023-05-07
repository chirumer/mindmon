enemy_hp = 100;
own_hp = 100;

dmg = 0;

function update_hp() {
  if (section[index].querySelector("input").value == question[index].ans) {
    battle_txt(`Correct!\nYou score ${dmg} dmg and receive 20 dmg!`);
    own_hp -= 20;
    if (own_hp <= 0) {
      own_hp = 0;
      document.getElementById('own_hp').innerText = `${own_hp}/100`;
      document.getElementById('own_bar').style = `width: ${own_hp}%;`;
      battle_txt("You've lost all hp!\n You lose the battle!");
      document.getElementById('battleOptions').innerHTML = "<button onclick='history.back();'>Back</button>";
      return;
    }
    document.getElementById('own_hp').innerText = `${own_hp}/100`;
    document.getElementById('own_bar').style = `width: ${own_hp}%;`;
    enemy_hp -= dmg;
    if (enemy_hp <= 0) {
      enemy_hp = 0;
      document.getElementById('enemy_hp').innerText = `${enemy_hp}/100`;
      document.getElementById('enemy_bar').style = `width: ${enemy_hp}%;`;
      battle_txt("Your opponent has lost all hp!\n You win the battle!");
      document.getElementById('battleOptions').innerHTML = "<button onclick='history.back();'>Back</button>";
      return;
    }
    document.getElementById('enemy_hp').innerText = `${enemy_hp}/100`;
    document.getElementById('enemy_bar').style = `width: ${enemy_hp}%;`;
  }
  else {
    battle_txt(`Wrong!\nYou receive ${20 + dmg} dmg!`);
    own_hp -= 20 + dmg;
    if (own_hp <= 0) {
      own_hp = 0;
      document.getElementById('own_hp').innerText = `${own_hp}/100`;
      document.getElementById('own_bar').style = `width: ${own_hp}%;`;
      battle_txt("You've lost all hp!\n You lose the battle!");
      document.getElementById('battleOptions').innerHTML = "<button onclick='history.back();'>Back</button>";
      return;
    }
    document.getElementById('own_hp').innerText = `${own_hp}/100`;
    document.getElementById('own_bar').style = `width: ${own_hp}%;`;
  }
  change_to_choose();
}

function battle_txt(text) {
  document.getElementsByClassName('battle-text')[0].innerText = text;
}

function change_to_choose() {
  document.getElementById('battleOptions').innerHTML = `<h4 class="battle-text-top-left" id="op-1">Swap</h4>
  <h4 class="battle-text-top-right" id="op-2">Run</h4> 
  <h4 class="battle-text-bottom-left" id="op-3">Fight</h4>
  <h4 class="battle-text-bottom-right" id="op-4">Consumable</h4>`

  document.getElementsByClassName('battle-text-bottom-left')[0].addEventListener('click', () => {
    document.getElementById('quiz_container').style.display = 'flex';
    change_to_fight();
  });
  document.getElementsByClassName('battle-text-bottom-right')[0].addEventListener('click', () => {
    battle_txt('No special items in bag!')
  });
  document.getElementsByClassName('battle-text-top-right')[0].addEventListener('click', () => {
    history.back();
  });
  document.getElementsByClassName('battle-text-top-left')[0].addEventListener('click', () => {
    battle_txt('You have only one Mindmon!')
  });
}

function change_to_fight() {
  battle_txt('Choose your Attack!')
document.getElementById('battleOptions').innerHTML = `
      <div class="hi-risk-top">High Risk</div> 
      <h4 class="battle-text-top-left">Dragon Tail</h4>

      
      <div class="med-risk-top">Medium Risk</div> 
      <h4 class="battle-text-top-right">Scratch</h4>
      <div class="med-risk-bottom">Medium Risk</div>  
      
      <h4 class="battle-text-bottom-left">Flare Blitz</h4>
      <div class="low-risk-bottom">Low Risk</div>  
    <h4 class="battle-text-bottom-right">Tackle</h4>
`
document.getElementsByClassName('battle-text-bottom-left')[0].addEventListener('click', () => {
  dmg = 20;
  update_hp();
});
document.getElementsByClassName('battle-text-bottom-right')[0].addEventListener('click', () => {
  dmg = 10;
  update_hp();
});
document.getElementsByClassName('battle-text-top-left')[0].addEventListener('click', () => {
  dmg = 30;
  update_hp();
});
document.getElementsByClassName('battle-text-top-right')[0].addEventListener('click', () => {
  dmg = 20;
  update_hp();
});
}


function timer() {
  timeLimit--;
  min = (timeLimit / 60).toString().split(".")[0];
  sec = timeLimit % 60;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  if (timeLimit == 0) {
    // clearInterval(interval);
    // nextBtn.classList.add("hide");
    // finishBtn.classList.remove("hide");
    // queBox.style.pointerEvents = "none";
    timeLimit += 30
  }
  timerDiv.innerHTML = min + " : " + sec;
}

function increament() {
  index++;
  if (index < question.length) {
    queBox.style.transform = `translateX(${-section[0].offsetWidth * index}px)`;
  }
  if (index == question.length - 1) {
    nextBtn.classList.add("hide");
    finishBtn.classList.remove("hide");
  }
}

function startQuiz(starter) {
  startBox.classList.add("hide");
  container.classList.remove("hide");
  interval = setInterval(timer, 1000);
}

function resultShow() {
  index = 0;
  sum = 0;
  container.classList.remove("hide");
  resultBox.classList.add("hide");
  nextBtn.classList.remove("hide");
  finishBtn.classList.remove("hide");
  queBox.style.transform = `translateX(0px)`;
  for (m = 0; m < question.length; m++) {
    section[m].querySelector(`#${question[m].ans}`).classList.add("correct");
  }
  queBox.style.pointerEvents = "none";
}

function replay() {
  sum = 0;
  index = 0;
  timeLimit = fixedTime;
  clearInterval(interval);
  interval = setInterval(timer, 1000);

  container.classList.remove("hide");
  resultBox.classList.add("hide");
  nextBtn.classList.remove("hide");
  finishBtn.classList.add("hide");
  queBox.style.transform = `translateX(0px)`;
  queBox.style.pointerEvents = "initial";
  queBox.querySelectorAll("div").forEach((opt2) => {
    opt2.classList.remove("selected", "correct", "wrong");
  });
  queBox.querySelectorAll(".ricon").forEach((ricon) => {
    ricon.remove();
  });
  queBox.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
}

let abc = ["a", "b", "c", "d"];
let sum = 0;
let interval;
let opt;
let startBox = document.querySelector(".starter");
let container = document.querySelector(".container");
let queBox = document.querySelector(".question-box");
let nextBtn = document.getElementById("next-btn");
let finishBtn = document.getElementById("finish-btn");
let timerDiv = document.querySelector(".timer");
let resultBox = document.querySelector(".result-box");
let index = 0;
const eachTime = 15;

let timeLimit, fixedTime, question;

(async () => {

  // const game_ele = document.getElementById('game');
  const quiz_id = document.getElementById('quiz_container');

  // game_ele.style.display = 'none';
  quiz_id.style.display = 'none';

  // const loading_ele = document.createElement('div');
  // loading_ele.setAttribute('id', 'loading_ele');
  // loading_ele.innerText = 'Loading...';
  // document.body.appendChild(loading_ele);

  let resp;
  try {
    params = new URLSearchParams(window.location.search);
    resp = await fetch('/get_questions?' + params.toString());
    console.log(resp);
    question = await resp.json();
  } catch (e) {
    console.log(e);
    document.getElementById('battleOptions').innerText = 'Failed. Video not suitable.'
  }

  change_to_choose();

  try {
    fetch('/mindmon').then(function(response) {
      return response.blob();
    }).then(function(myBlob) {
      var objectURL = URL.createObjectURL(myBlob);
      document.getElementsByClassName('pokemon-top')[0].src = objectURL;
    });
  }
  catch (e) {
  }

  try {
    fetch('/player_mindmon').then(function(response) {
      return response.blob();
    }).then(function(myBlob) {
      var objectURL = URL.createObjectURL(myBlob);
      document.getElementsByClassName('pokemon-bottom')[0].src = objectURL;
    });
  }
  catch (e) {
  }

  console.log(question);
  timeLimit = question.length * eachTime;
  fixedTime = timeLimit;
  // loading_ele.remove();
  // game_ele.style.display = 'block';
  // quiz_id.style.display = 'flex';

  // document.getElementById('battleOptions').innerHTML = `<h4 class="battle-text-top-left">Swap Mindmon</h4>
  // <h4 class="battle-text-top-right">Run</h4> 
  // <h4 class="battle-text-bottom-left">Fight</h4>
  // <h4 class="battle-text-bottom-right">Special Item</h4>`
  
  // start quiz


  for (i = 0; i < question.length; i++) {
    queBox.innerHTML +=
      `<div class='section' id='${question[i].num}'>` +
      `<p class='title'>${question[i].title}</p>` +
      `</div>`;
    let section = queBox.querySelectorAll(".section");
    for (k = 0; k < 4; k++) {
      section[
        i
      ].innerHTML += `<div id='${abc[k]}'>(${abc[k]}) ${question[i].option[k]}</div>`;
    }
  }
  section = queBox.querySelectorAll(".section");
  section.forEach((section1) => {
    opt = section1.querySelectorAll("div");
    let input = document.createElement("input");
    input.hidden = true;
    input.readOnly = true;
    section1.appendChild(input);
    opt.forEach((opt1) => {
      opt1.onclick = (e) => {
        section1.querySelectorAll("div").forEach((optR) => {
          optR.classList.remove("selected");
        });
        opt1.classList.add("selected");
        input.value = e.target.id;
      };
    });
  });

  nextBtn.onclick = () => {
    increament();
    const modal = document.getElementById('quiz_container');
    modal.style.display = "none";
  };

  finishBtn.onclick = () => {
    clearInterval(interval);
    index = 0;
    container.classList.add("hide");
    resultBox.classList.remove("hide");
    for (j = 0; j < section.length; j++) {
      if (section[j].querySelector("input").value == question[j].ans) {
        sum++;
        section[j].querySelector(".selected").innerHTML +=
          "<i class='fa fa-check ricon'></i>";
      } else if (section[j].querySelector(".selected")) {
        section[j].querySelector(".selected").classList.add("wrong");
        section[j].querySelector(".selected").innerHTML +=
          "<i class='fa fa-times ricon'></i>";
      }
    }
    resultBox.querySelector("#got-num").innerHTML = sum;
    resultBox.querySelector("#total-num").innerHTML = question.length;
  };
  
  // timer start
  let min = (timeLimit / 60).toString().split(".")[0];
  let sec = timeLimit % 60;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  timerDiv.innerHTML = min + " : " + sec;

  //timer end
  document.onkeydown = (e) => {
    e.preventDefault();
    if (e.keyCode == 13 && index + 1 < question.length) {
      increament();
    }
  };
  window.onresize = () => {
    queBox.style.transform = `translateX(${-section[0].offsetWidth * index}px)`;
  };
  window.oncontextmenu = (e) => {
    e.preventDefault();
  };

})();